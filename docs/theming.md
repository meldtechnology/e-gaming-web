# Theming and Semantic Tokens

`src/styles/tailwind.css` owns the raw color palette. The raw `:root` variables such as `--indigo_a700`, `--gray_900_01`, and `--white_a700` are the preserved source of truth.

Do not edit existing raw hex values unless a product/design change explicitly approves it. The refactor contract is that colors can be referenced through aliases, but the existing color values remain stable.

## Semantic Layer

The semantic layer sits below the raw palette in `src/styles/tailwind.css`:

- `--color-surface`
- `--color-surface-muted`
- `--color-surface-raised`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-inverse`
- `--color-brand`
- `--color-brand-strong`
- `--color-border`
- `--color-border-strong`
- `--color-success`
- `--color-danger`
- `--color-warning`
- `--color-info`
- `--color-sidebar`

Each semantic variable points at an existing raw variable. Tailwind exposes these under semantic names in `tailwind.config.js`, for example `bg-surface`, `text-text-primary`, `border-border`, and `bg-brand`.

## Light and Dark Mode

The app uses Tailwind `darkMode: "class"`. `src/theme/ThemeProvider.tsx` toggles the `dark` class and `data-theme` attribute on `<html>`, persists the mode in secure local storage under `themeMode`, and passes the mode into the MUI theme.

The provider synchronizes mode only. It does not reconcile Tailwind and MUI color values.

## Adding a Token

1. Add a semantic variable in both `:root` and `.dark`.
2. Point it at an existing raw variable.
3. Add the Tailwind alias in `tailwind.config.js`.
4. Use the semantic alias in new UI work.
5. Verify light and dark screens against the visual parity gate.

Do not add new raw hex values for ordinary UI work. If a new raw color is unavoidable, document the design approval and visual parity impact.
