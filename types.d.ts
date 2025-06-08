declare module 'ac-colors' {
  export interface Color {
    oklch: (hex: string) => {
      l: number
      c: number
      h: number
    }
  }
}
