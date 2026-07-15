# Theming and Semantic Tokens

`src/styles/tailwind.css` owns the raw color palette and the semantic color layer. The raw `:root` variables such as `--indigo_a700`, `--gray_900_01`, and `--white_a700` are preserved for legacy compatibility.

Do not use raw palette classes for new UI work. Use semantic aliases so light and dark mode remain accessible.

## Semantic Layer

The semantic layer sits below the raw palette in `src/styles/tailwind.css`:

- `--color-surface`
- `--color-surface-muted`
- `--color-surface-raised`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-text-inverse`
- `--color-on-brand`
- `--color-brand`
- `--color-brand-strong`
- `--color-brand-soft`
- `--color-border`
- `--color-border-strong`
- `--color-success`
- `--color-danger`
- `--color-warning`
- `--color-info`
- `--color-sidebar`
- `--color-sidebar-muted`
- `--color-sidebar-text`

Tailwind exposes these under semantic names in `tailwind.config.js`, for example `bg-surface`, `bg-surface-muted`, `text-text-primary`, `text-text-secondary`, `text-text-muted`, `border-border`, `bg-brand`, `text-on-brand`, `bg-success-soft`, and `text-danger`.

## Legacy Mapping

When touching older UI, migrate hardcoded palette classes to semantic aliases:

- `text-gray-900`, `text-black-900`, `text-black-900_01` -> `text-text-primary`
- `text-gray-600`, `text-gray-700` -> `text-text-secondary`
- `text-gray-300`, `text-gray-400`, `text-gray-500`, `text-blue_gray-400` -> `text-text-muted` unless it is body text, then use `text-text-secondary`
- `bg-white`, `bg-white-a700` -> `bg-surface`
- `bg-gray-50`, `bg-gray-100` -> `bg-surface-muted` or `bg-surface-raised`
- `border-gray-*`, `border-blue_gray-*` -> `border-border` or `border-border-strong`
- Brand-filled controls -> `bg-brand text-on-brand hover:bg-brand-strong`
- Status text and fills -> `text-success`, `bg-success-soft`, `text-danger`, `bg-danger-soft`, `text-warning`, `bg-warning-soft`, `text-info`, `bg-info-soft`

## Light and Dark Mode

The app uses Tailwind `darkMode: "class"`. `src/theme/ThemeProvider.tsx` toggles the `dark` class and `data-theme` attribute on `<html>`, persists the mode in secure local storage under `themeMode`, and passes the mode into the MUI theme.

The first visit follows `prefers-color-scheme`. Once a user explicitly toggles the theme, the stored secure value wins over OS preference. The provider follows OS changes only while there is no stored choice.

`index.html` has a small pre-paint script that applies the OS dark preference before React mounts. It intentionally does not decrypt secure local storage outside the bundled app code; React applies stored overrides on mount.

## Testing Theme Mode

To reset the stored theme preference in DevTools:

```js
localStorage.removeItem("MELD-TECH.themeMode");
```

The value is encrypted by `src/services/secureLocalStorage`, so plaintext `themeMode` values should not be written directly. In app code, use `storeItem("themeMode", mode)` and `getItem("themeMode")`.

Useful checks:

- Toggle from the sidebar and confirm `<html>` gains or loses `.dark`.
- Reload and confirm the explicit choice persists.
- Remove `MELD-TECH.themeMode`, set the OS/browser emulation to dark, and reload to confirm first-visit dark mode.
- Keyboard focus the sidebar theme button and activate it with Enter or Space.

## Adding a Token

1. Add a semantic variable in both `:root` and `.dark`.
2. Point it at an existing raw variable.
3. Add the Tailwind alias in `tailwind.config.js`.
4. Use the semantic alias in new UI work.
5. Verify light and dark screens against WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text or UI affordances.

Do not add new raw hex values for ordinary UI work. If a new raw color is unavoidable, document the design approval and contrast impact.
