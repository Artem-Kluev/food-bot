export {}

declare global {
  interface TelegramWebApp {
    expand: () => void
    themeParams?: {
      isVerticalSwipesEnabled?: boolean
      [key: string]: any
    }
    onEvent: (event: string, callback: (params: any) => void) => void
    [key: string]: any
  }

  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
      [key: string]: any
    }
  }
}
