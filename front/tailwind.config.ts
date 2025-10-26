import type { Config } from 'tailwindcss'

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff69b4',
        }
      }
    }
  }
} satisfies Config

const colors = tailwindConfig.theme.extend.colors;
export const PRIMARY = colors.primary.DEFAULT

export default tailwindConfig