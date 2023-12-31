import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'


const darkTheme = {
  body: '#111111',
  line: '#1e1e1e',
  item: '#181818',
  card: '#252527',
  brandGreen: '#e8fe4e',
  brandGray: '#737373',
  brandBlue: '#1a2cb8',
  brandOrange: '#cbbca6',
}

const lightTheme = {
  body: '#FFFFFF',
  line: '#E0E0E0',
  item: '#F5F5F5',
  card: '#FAFAFA',
  brandGreen: '#00C985',
  brandGray: '#737373',
  brandBlue: '#1a2cb8',
  brandOrange: '#cbbca6',
}

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-2 rounded-md'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans',
        serif: 'Averia Serif Libre',
        mono: 'Oxygen Mono',
        script: 'Dancing Script',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerAttributifyJsx()],
  safelist: "prose prose-sm m-auto text-left".split(" "),
  theme: {
    extend: {
      colors: {

      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Averia Serif Libre', 'serif'],
        mono: ['Oxygen Mono', 'monospace'],
        script: ['Dancing Script', 'cursive'],
      }
    },
  rules: [
    [
      /^x(\d+)$/,
      ([, d]) => ({
        height: `${d}rem`,
        width: `${d}rem`,
      }),
    ],
    [
      /^[bg|border|color|fill|outline|shadow|text|btn]-(.*)$/,
      ([, attr, color], { theme }) => {
        if (color in theme.colors) {
          switch (attr) {
            case "bg":
              return {
                backgroundColor: theme.colors[color],
              };
            case "border":
              return {
                borderColor: theme.colors[color],
              };
            case "color":
              return {
                color: theme.colors[color],
              };
            case "fill":
              return {
                fill: theme.colors[color],
              };
            case "outline":
              return {
                outlineColor: theme.colors[color],
              };
            case "shadow":
              return {
                shadowColor: theme.colors[color],
              };
            case "text":
              return {
                color: theme.colors[color],
              };
          }
        }
      },
    ],
  ],
  }
})