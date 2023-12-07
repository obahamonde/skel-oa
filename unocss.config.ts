import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

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
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose prose-sm m-auto text-left".split(" "),
  theme: {
    colors: {
      primary: '#f5f5f5',
      secondary: '#5a2d5e',
      accent: '#7adcd4',
      info: '#121212',
      success: '#cefe0a',
      warning: '#ffa500',
      error: '#ff6347',
    },
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
});