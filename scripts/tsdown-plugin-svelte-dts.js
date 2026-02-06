import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import process from 'node:process';
import { emitDts } from 'svelte2tsx';

async function getAllDtsFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				return getAllDtsFiles(fullPath);
			}
			return entry.name.endsWith('.d.ts') ? [fullPath] : [];
		}),
	);
	return files.flat();
}

function resolvePathAlias(importPath, fromFile, declarationDir) {
	// Map of path aliases to their actual paths relative to libRoot
	const aliases = {
		'~/types': 'types.ts',
		'~/theme': 'theme.css.ts',
		'~/utils': 'utils.ts',
		'~/components': 'components/index.ts',
	};

	for (const [alias, targetPath] of Object.entries(aliases)) {
		if (importPath === alias || importPath.startsWith(`${alias}/`)) {
			const fromDir = dirname(fromFile);
			const targetAbs = resolve(declarationDir, targetPath.replace('.ts', ''));
			let relativePath = relative(fromDir, targetAbs);

			// Ensure relative path starts with './' or '../'
			if (!relativePath.startsWith('.')) {
				relativePath = `./${relativePath}`;
			}

			return relativePath;
		}
	}

	return importPath;
}

async function resolvePathAliasesInDtsFiles(declarationDir, libRoot) {
	const dtsFiles = await getAllDtsFiles(declarationDir);

	for (const file of dtsFiles) {
		const content = await readFile(file, 'utf-8');
		const importRegex = /from\s+['"]~\/[^'"]+['"]/g;

		if (importRegex.test(content)) {
			const updatedContent = content.replace(
				/from\s+['"]([^'"]+)['"]/g,
				(match, importPath) => {
					if (importPath.startsWith('~/')) {
						const resolved = resolvePathAlias(importPath, file, declarationDir);
						return `from '${resolved}'`;
					}
					return match;
				},
			);

			await writeFile(file, updatedContent, 'utf-8');
			console.log(
				`  ✓ Resolved path aliases in ${relative(process.cwd(), file)}`,
			);
		}
	}
}

export function svelteDtsPlugin(options = {}) {
	return {
		name: 'tsdown-plugin-svelte-dts',
		async closeBundle() {
			const {
				declarationDir = './dist',
				libRoot = './src',
				tsconfig = 'tsconfig.json',
				svelteShimsPath = 'node_modules/svelte2tsx/svelte-shims-v4.d.ts',
			} = options;

			const declarationDirAbs = resolve(process.cwd(), declarationDir);

			try {
				await emitDts({
					declarationDir: declarationDirAbs,
					svelteShimsPath: resolve(process.cwd(), svelteShimsPath),
					libRoot: resolve(process.cwd(), libRoot),
					tsconfig: resolve(process.cwd(), tsconfig),
				});

				console.log('Svelte DTS generation complete');

				// Resolve path aliases in generated .d.ts files
				console.log('Resolving path aliases in .d.ts files...');
				await resolvePathAliasesInDtsFiles(
					declarationDirAbs,
					resolve(process.cwd(), libRoot),
				);
				console.log('Path alias resolution complete');
			} catch (error) {
				console.error('❌ Svelte DTS generation failed:', error);
				throw error;
			}
		},
	};
}
