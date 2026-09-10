# Roadmap: нативные стили Svelte и официальный packaging

> Статус: миграция реализована; требуется визуальная проверка Storybook и consumer fixture перед релизом
>
> Дата фиксации: 2026-08-10
>
> Текущая версия библиотеки на момент фиксации: `1.15.0`

## Реализованный результат

- Публичные исходники перенесены в `src/lib`, сборка выполняется через `svelte-package`.
- Все 105 файлов `styles.css.ts` удалены; CSS перенесён в `<style>` соответствующих компонентов.
- Классы короткие и локальные; `:global(...)` используется для DOM дочерних компонентов и пользовательских snippets. Файлы `styles.ts` и экспорты карт классов удалены.
- `theme.css` сохраняет исходные имена всех 62 CSS-переменных, а `reset.css` подключается отдельно.
- `theme.ts` экспортирует объект `theme` со ссылками `var(...)`, а также типы `Theme = typeof theme` и `SpacingKey`; значения по умолчанию остаются в `theme.css`.
- Пакет публикует отдельные точки входа `./theme`, `./theme.css`, `./reset.css` и совместимую `./styles.css`.
- Перед релизом остаются визуальная проверка Storybook и проверка собранного tarball в отдельном consumer fixture.

## Краткое решение

Целевое состояние библиотеки:

- компоненты хранят стили в нативных `<style>` внутри `.svelte`;
- публичным контрактом темы являются стабильные CSS custom properties;
- значения темы по умолчанию поставляются в `theme.css`;
- глобальный reset поставляется отдельно в `reset.css`;
- библиотека собирается официальным `@sveltejs/package`;
- Vanilla Extract, tsdown и собственная генерация Svelte declaration-файлов удаляются из Svelte-библиотеки;
- `theme.ts` экспортирует ссылки на переменные для Vanilla Extract и другого TypeScript-кода, не дублируя значения темы;
- подсказки переменных внутри Svelte `<style>` обеспечиваются через `svelte.plugin.css.globals`.

Основной принцип: CSS-переменные являются одновременно runtime-контрактом между библиотекой и приложением-потребителем и источником данных для Svelte Language Server.

## Зачем нужна миграция

### Текущее состояние

На момент создания документа:

- в `src/components` находится 105 файлов `styles.css.ts`;
- тема, значения токенов и глобальный reset объединены в `src/theme.css.ts`;
- компоненты импортируют сгенерированные Vanilla Extract классы из `styles.css.ts`;
- сборка выполняется через tsdown;
- `tsdown.config.ts` подключает `rollup-plugin-svelte`, Vanilla Extract Rollup plugin и собственный `scripts/tsdown-plugin-svelte-dts.js`;
- итоговый CSS публикуется через `@max-ts/svelte/styles.css`;
- исходники компонентов находятся в `src/components`, а не в рекомендуемом для `svelte-package` каталоге `src/lib`.

Vanilla Extract хорошо решает две задачи:

1. предоставляет типизированное дерево ссылок вида `theme.spacing[4]`;
2. генерирует scoped-классы и CSS во время bundler-сборки.

Но `.css.ts` должен быть обработан bundler-плагином. `svelte-package` не выполняет такие плагины: он препроцессит `.svelte`, транспилирует TypeScript, генерирует declaration-файлы и копирует остальные файлы. Поэтому прямые импорты `styles.css.ts` несовместимы с чистым официальным packaging flow.

### Что именно хотим улучшить

- публиковать нативные Svelte-компоненты в ожидаемом экосистемой формате;
- уменьшить количество нестандартной сборочной инфраструктуры;
- избавиться от собственного генератора `.d.ts`;
- сделать стили компонентов проще для чтения и изменения;
- сохранить глобально переопределяемую тему;
- сохранить удобные подсказки существующих токенов в редакторе;
- не заставлять потребителя устанавливать или настраивать Vanilla Extract.

## Цели и ограничения

### Цели

- Использовать `@sveltejs/package` как единственный инструмент упаковки библиотеки.
- Использовать нативные scoped styles Svelte для компонентных стилей.
- Сделать имена CSS-переменных документированным и версионируемым API.
- Поддержать глобальные темы и тему на отдельном DOM-поддереве через CSS cascade.
- Сохранить возможность приложения использовать те же переменные в собственном CSS.
- Проводить миграцию по компонентам без одномоментного переписывания всех стилей.

### Не является целью первой миграции

- Создание runtime `ThemeProvider`.
- Создание TypeScript API для сборки пользовательской темы.
- Создание нескольких встроенных тем, например light/dark.
- Объединение токенов React- и Svelte-библиотек в отдельный пакет.
- Создание VS Code extension.
- Изменение визуального дизайна компонентов.

Эти возможности можно добавить позже, но они не должны блокировать переход на нативные стили и `svelte-package`.

## Целевая архитектура

Предварительная структура проекта:

```text
src/
├── lib/
│   ├── index.ts
│   ├── components/
│   │   └── Button/
│   │       ├── Button.svelte
│   │       ├── index.ts
│   │       └── types.ts
│   ├── theme.css
│   ├── reset.css
│   └── utils.ts
└── stories/

dist/
├── index.js
├── index.d.ts
├── components/
├── theme.css
├── reset.css
└── utils.js
```

`src/lib` является публичной частью пакета. Stories, тесты и playground остаются за его пределами.

### Контракт темы

Контракт темы задаётся именами CSS custom properties:

```css
:root {
	--colors-primary: oklch(0.27 0 0);
	--colors-text-primary: oklch(0.21 0.03 265);
	--spacing-2: 0.5rem;
	--spacing-4: 1rem;
	--radius-medium: 0.5rem;
}
```

Компоненты и приложение-потребитель используют одинаковые переменные:

```svelte
<style>
	.card {
		padding: var(--spacing-4);
		color: var(--colors-text-primary);
		border-radius: var(--radius-medium);
	}
</style>
```

Потребитель может переопределить тему глобально:

```css
:root {
	--colors-primary: oklch(0.55 0.2 260);
}
```

Или для отдельного поддерева:

```css
[data-theme='dark'] {
	--colors-primary: oklch(0.85 0.08 260);
	--colors-text-primary: oklch(0.95 0 0);
}
```

### Зачем нужен публичный `theme.ts`

Внутри `<style>` компоненты используют CSS custom properties напрямую. Потребителям, которые пишут стили через Vanilla Extract или другую CSS-in-TS библиотеку, нужен типизированный доступ к тем же ссылкам.

`theme.ts` экспортирует только объект `theme` со значениями вида `var(--colors-primary)`. Тип `Theme` выводится как `typeof theme`, поэтому структура не описывается второй раз. Значения по умолчанию остаются только в `theme.css`, а тест проверяет синхронизацию CSS-деклараций и TypeScript-ссылок.

### Глобальные стили

Тема и reset должны быть разделены:

- `theme.css` содержит только переменные и значения темы по умолчанию;
- `reset.css` содержит глобальный reset, typography defaults и reduced-motion правила;
- компонентные стили находятся в `.svelte` и не входят в глобальный reset.

Reset должен подключаться явно, поскольку правила для `body`, списков, кнопок и полей ввода могут конфликтовать со стилями приложения.

## Публичный API пакета

Целевые экспорты:

```json
{
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"svelte": "./dist/index.js",
			"default": "./dist/index.js"
		},
		"./theme.css": "./dist/theme.css",
		"./reset.css": "./dist/reset.css",
		"./utils": {
			"types": "./dist/utils.d.ts",
			"default": "./dist/utils.js"
		}
	},
	"sideEffects": ["**/*.css"]
}
```

На переходный период существующий `@max-ts/svelte/styles.css` следует сохранить как compatibility entry point. Его точное содержимое нужно определить при планировании: вероятнее всего, он будет подключать `theme.css` и `reset.css`.

Пример использования потребителем:

```ts
import '@max-ts/svelte/theme.css';
import '@max-ts/svelte/reset.css'; // Опционально
import { Button } from '@max-ts/svelte';
```

## Подсказки CSS-переменных в Svelte

Svelte Language Server умеет читать CSS-файлы с глобальными переменными и добавлять найденные переменные в completion внутри `<style>`.

Приложение-потребитель добавляет в `.vscode/settings.json`:

```json
{
	"svelte.plugin.css.globals": "node_modules/@max-ts/svelte/dist/theme.css,src/app.css"
}
```

После этого при вводе `var(--` редактор предлагает переменные из темы и показывает файл и текущее значение.

Важное ограничение: npm-пакет не может автоматически изменить editor settings приложения. Настройку нужно:

- задокументировать в README;
- добавить в пример приложения;
- при необходимости автоматизировать будущей init-командой.

Физический путь `dist/theme.css` должен оставаться стабильным, потому что `svelte.plugin.css.globals` принимает путь или glob относительно workspace root, а не package export specifier.

### Дополнительные editor artifacts

При необходимости можно генерировать `theme.css-data.json` в формате VS Code CSS Custom Data. Он полезен для описаний и hover в обычных `.css`, но не заменяет `svelte.plugin.css.globals` для completion `var(...)` внутри `.svelte`.

`@property` можно рассмотреть отдельно для runtime-проверки типов некоторых переменных:

```css
@property --colors-primary {
	syntax: '<color>';
	inherits: true;
	initial-value: black;
}
```

Это не требуется для первой миграции и само по себе не создаёт список completion-переменных.

## Нативный стиль компонентов

### Варианты и размеры

Vanilla Extract `styleVariants` заменяются на публичные props и отражающие их `data-*` атрибуты:

```svelte
<button
	class:loading
	class:full-width={fullWidth}
	data-variant={variant}
	data-size={size}
>
	{@render children?.()}
</button>

<style>
	button {
		display: inline-flex;
		border-radius: var(--radius-medium);
	}

	button[data-variant='default'] {
		background: var(--colors-primary);
	}

	button[data-size='medium'] {
		height: var(--spacing-9);
		padding: var(--spacing-2) var(--spacing-3);
	}

	button.loading {
		pointer-events: none;
		opacity: 0.6;
	}
</style>
```

Правила миграции:

- сохранять существующие component props;
- сохранять `data-slot`;
- добавлять `data-variant`, `data-size`, `data-state` там, где они полезны для стилей и кастомизации;
- использовать обычные локальные классы для внутренних состояний;
- использовать `:global(...)` только для элементов, которыми компонент не владеет напрямую, например пользовательского snippet или вложенного SVG;
- не менять визуальное поведение в одном PR с механическим переносом CSS;
- сохранять поддержку пользовательского `class` на корневом элементе.

### Публичные экспорты сгенерированных классов

Сейчас публично экспортируются Vanilla Extract implementation details:

- `alertVariants`;
- `badgeVariants`;
- `buttonVariants`;
- `spinnerSizes`;
- `addonAlignVariants`;
- `inputGroupButtonSizes`.

Нативный scoped CSS не может предоставить эквивалентные экспортируемые хешированные классы. До удаления Vanilla Extract нужно выбрать одну стратегию:

1. объявить эти экспорты устаревшими и удалить в следующем major release;
2. заменить их стабильными глобальными классами и обычным CSS;
3. предоставить новый независимый API генерации классов, если подтверждено использование вне компонентов.

Предпочтительное направление: стилизация через component props, `class` и стабильные `data-*` атрибуты; экспорт классов реализации удалить как часть major release.

## План миграции

### Этап 0. Аудит публичного контракта

- Зафиксировать все текущие package exports.
- Проверить, используются ли публичные style exports реальными приложениями.
- Проверить, переопределяют ли приложения текущие переменные `--colors-*`, `--spacing-*` и другие.
- Сохранить текущие имена CSS-переменных.
- Выбрать правила semver и compatibility period для `styles.css`.

Результат: список breaking changes и согласованный контракт следующей major-версии.

### Этап 1. Пилот нативных стилей

Перенести несколько компонентов разных типов, продолжая использовать текущую tsdown-сборку и существующую Vanilla Extract тему:

- простой компонент без вариантов;
- компонент с `size`/`variant`, например Button или Badge;
- составной компонент с вложенными элементами;
- компонент с animation/keyframes и глобальными SVG-селекторами.

Цель пилота — выработать повторяемый шаблон `.svelte`, а не удалить Vanilla Extract сразу.

После пилота зафиксировать:

- соглашения по `data-*`;
- правила использования `:global`;
- подход к animations/keyframes;
- подход к общим стилям compound-компонентов;
- влияние scoped specificity на пользовательские стили.

### Этап 2. Постепенный перенос компонентов

- Мигрировать компоненты небольшими тематическими партиями.
- В каждом PR удалять соответствующий `styles.css.ts`.
- Сравнивать компонент в Storybook до и после.
- Не смешивать перенос CSS с изменением поведения или дизайна.
- Оставить текущий builder до удаления последнего component-level `.css.ts`.

Возможная очередность:

1. leaf-компоненты без составного состояния;
2. компоненты с вариантами и размерами;
3. form controls;
4. compound-компоненты;
5. overlay-компоненты и порталы;
6. наиболее сложные компоненты с shared/global selectors.

### Этап 3. Удаление зависимости компонентов от Vanilla Extract

- Удалить оставшиеся импорты `styles.css` из `.svelte` и `index.ts`.
- Реализовать выбранную замену публичных style exports.
- Убедиться, что в `src/components` больше нет `styles.css.ts`.
- Проверить, что все варианты выражены через props, классы или `data-*`.

### Этап 4. Замена темы и глобальных стилей

- Перенести значения из `src/theme.css.ts` в обычный `theme.css`.
- Разделить тему и reset.
- Удалить `createGlobalThemeContract`, `createGlobalTheme` и `globalStyle`.
- Добавить `theme.ts` со ссылками `var(...)` для использования из TypeScript и CSS-in-TS.
- Добавить документацию подключения темы и editor completion.
- При необходимости оставить compatibility export `styles.css`.

### Этап 5. Переход на `svelte-package`

- Перенести публичные исходники в `src/lib`.
- Добавить `@sveltejs/package`.
- Заменить `pnpm build` на `svelte-package`.
- Настроить exports на файлы в `dist`.
- Удалить `tsdown.config.ts`.
- Удалить `scripts/tsdown-plugin-svelte-dts.js`.
- Удалить `rollup-plugin-svelte` и Vanilla Extract plugins/packages.
- Удалить Vanilla Extract plugin из `vite.config.ts`.
- Сохранить Vite/Storybook только как инструменты разработки и демонстрации.
- Проверить aliases в `svelte.config.ts`, поскольку именно этот конфиг обрабатывается `svelte-package`.

### Этап 6. Проверка пакета и релиз

- Выполнить `pnpm lint`.
- Выполнить `pnpm test`.
- Выполнить новый `pnpm build`.
- Проверить содержимое tarball через `pnpm pack`.
- Установить tarball в отдельное минимальное Svelte/SvelteKit приложение.
- Проверить SSR и браузерную сборку.
- Проверить root export, `theme.css`, `reset.css` и `utils`.
- Проверить генерацию и разрешение `.d.ts`.
- Проверить tree-shaking и отсутствие случайно потерянного CSS.
- Проверить глобальное и локальное переопределение темы.
- Вручную проверить completion переменных через `svelte.plugin.css.globals`.

Если удаляются style exports, меняются имена CSS-переменных или удаляется `styles.css`, выпускать major release.

## Совместимость и versioning

Потенциальные breaking changes:

- удаление публичных style exports;
- переименование CSS custom properties;
- изменение пути или содержимого `styles.css`;
- удаление export conditions или package export paths;
- изменение специфичности селекторов после перехода на scoped CSS;
- изменение возможности внешнего CSS переопределять внутренние элементы.

Сам переход с tsdown на `svelte-package` не обязан быть breaking change, если опубликованный API и поведение остаются совместимыми. Однако перечисленные выше изменения делают итоговую миграцию вероятным кандидатом на следующую major-версию.

Имена CSS-переменных (`--colors-primary`, `--fontSize-xs` и остальные) сохраняются без изменений, чтобы не ломать темы приложений-потребителей.

## Риски

### Scoped specificity

Svelte добавляет scoped-класс к селекторам, повышая их специфичность. Стили потребителя, которые сейчас переопределяют Vanilla Extract классы, могут начать работать иначе. Это нужно проверять на пилотных компонентах.

### Compound-компоненты и snippets

Scoped CSS не проходит автоматически внутрь дочерних компонентов и пользовательских snippets. Может потребоваться `:global`, отдельные CSS variables или стабильные `data-slot` hooks.

### Публичные классы

Хешированные Vanilla Extract классы сейчас экспортируются как JavaScript-значения. Простого аналога в нативном `<style>` нет.

### CSS variable naming

Текущие переменные не имеют package prefix, а часть имён использует camelCase. Сохранение имён улучшает совместимость, переименование улучшает долгосрочное качество API.

### Reset

Отделение reset может изменить приложение потребителя, если оно раньше полагалось на автоматическое обнуление глобальных элементов.

### Visual regressions

Механический перевод JavaScript style objects в CSS может изменить порядок shorthand/longhand свойств, specificity, порядок keyframes или поведение глобальных селекторов.

## Открытые решения перед реализацией

- Удаляем ли публичные style exports или заменяем стабильными классами?
- Сколько релизов поддерживаем `@max-ts/svelte/styles.css`?
- Должен ли `reset.css` оставаться полностью опциональным?
- Нужен ли `theme.css-data.json` для обычных CSS-файлов?
- Нужна ли встроенная dark theme?
- Нужно ли в будущем вынести общий контракт React/Svelte в `@max-ts/tokens`?
- Нужна ли init-команда для добавления CSS imports и editor settings в приложение?

## Чек-лист следующей planning-сессии

1. Пересчитать оставшиеся `styles.css.ts`.
2. Проверить актуальные package exports и зависимости.
3. Провести аудит использования публичных variant/size exports.
4. Выбрать naming CSS-переменных.
5. Выбрать 3–4 пилотных компонента разных типов.
6. Создать consumer fixture для проверки tarball.
7. Разбить работу на небольшие PR без изменения дизайна.
8. После пилота обновить этот roadmap фактическими выводами.

## Критерии завершения

Миграция завершена, когда:

- в публичных исходниках нет `.css.ts` и импортов Vanilla Extract;
- все компоненты используют нативные Svelte styles;
- `theme.css` является единственным runtime-контрактом темы;
- reset опубликован отдельно;
- сборка выполняется `svelte-package` без tsdown и custom declaration plugin;
- tarball работает в чистом consumer fixture;
- SSR, типы, exports и стили проверены;
- приложение может переопределить тему глобально и локально;
- Svelte Language Server предлагает переменные из `theme.css` внутри `<style>`;
- breaking changes отражены в changelog и migration guide.

## Ссылки

- [SvelteKit: Packaging](https://svelte.dev/docs/kit/packaging)
- [Svelte: Scoped styles](https://svelte.dev/docs/svelte/scoped-styles)
- [Svelte: Custom properties](https://svelte.dev/docs/svelte/custom-properties)
- [Svelte Language Server: `svelte.plugin.css.globals`](https://github.com/sveltejs/language-tools/blob/master/packages/language-server/README.md#svelteplugincssglobals)
- [Vanilla Extract: Vite integration and library limitation](https://vanilla-extract.style/documentation/integrations/vite/)
- [VS Code: CSS Custom Data](https://code.visualstudio.com/docs/languages/css#_css-custom-data)
- [MDN: `@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property)
