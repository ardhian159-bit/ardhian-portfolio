import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        ghost: 'var(--color-ghost)',
        surface: 'var(--color-surface)',
        page: 'var(--color-page)',
        muted: 'var(--color-muted)',
        dim: 'var(--color-dim)',
        subtle: 'var(--color-subtle)',
        'on-ink': 'var(--color-on-ink)',
        'on-brand': 'var(--color-on-brand)',
        line: 'var(--color-line)',
        'line-strong': 'var(--color-line-strong)',
        border: 'var(--color-border)',
      }
    }
  },
  plugins: [],
}

export default config
