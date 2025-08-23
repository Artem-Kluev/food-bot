# telegram-food

## Керування видимістю нижньої панелі навігації

Для керування видимістю нижньої панелі навігації використовуйте функцію `toggleBottomBar` з файлу `src/mixins/bottomBarControl.ts`:

```typescript
// Імпорт функції та змінної стану
import { toggleBottomBar, isBottomBarVisible } from '@/mixins/bottomBarControl'

// Приховати панель
toggleBottomBar(false)

// Показати панель
toggleBottomBar(true)

// Переключити стан (якщо була видима - приховати, якщо прихована - показати)
toggleBottomBar()

// Отримати поточний стан видимості (реактивна змінна)
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
