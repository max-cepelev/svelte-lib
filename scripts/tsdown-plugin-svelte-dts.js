import { resolve } from 'node:path'
import process from 'node:process'
import { emitDts } from 'svelte2tsx'
import { replaceTscAliasPaths } from 'tsc-alias'

export function svelteDtsPlugin(options = {}) {
  return {
    name: 'tsdown-plugin-svelte-dts',
    async closeBundle() {
      const {
        declarationDir = './dist',
        libRoot = './src',
        tsconfig = 'tsconfig.json',
        svelteShimsPath = 'node_modules/svelte2tsx/svelte-shims-v4.d.ts',
      } = options

      const declarationDirAbs = resolve(process.cwd(), declarationDir)
      const tsconfigAbs = resolve(process.cwd(), tsconfig)

      try {
        await emitDts({
          declarationDir: declarationDirAbs,
          svelteShimsPath: resolve(process.cwd(), svelteShimsPath),
          libRoot: resolve(process.cwd(), libRoot),
          tsconfig: tsconfigAbs,
        })

        console.log('Svelte DTS generation complete')
        
        await replaceTscAliasPaths({
          configFile: tsconfigAbs,
          outDir: declarationDirAbs,
        })

        console.log('Tsc alias replacement complete')
      } catch (error) {
        console.error('❌ Svelte DTS generation failed:', error)
        throw error
      }
    },
  }
}

