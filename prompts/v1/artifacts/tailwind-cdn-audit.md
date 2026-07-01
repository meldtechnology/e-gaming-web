# Tailwind CDN / Dynamic Class Audit

Generated for task 1.7.

## Current State

- `public/index.html` references `https://cdn.tailwindcss.com` as `<link rel="stylesheet">`, not as the normal CDN `<script>` tag.
- `src/index.js` imports compiled local styles:
  - `src/styles/tailwind.css`
  - `src/styles/index.css`
  - `src/styles/font.css`
- `tailwind.config.js` scans `./src/**/*.{js,ts,jsx,tsx,html,mdx}` and `./public/index.html`, so static string literals in component maps are visible to the local Tailwind build.

Conclusion: no route was proven to depend on a functioning runtime CDN JIT, but the CDN reference should still be removed during Vite migration after the safelist below is added and screenshots are compared.

## Dynamic Class Families To Safelist / Review

| Family | Source | Classes / pattern |
| --- | --- | --- |
| Button primitive maps | `src/ui-components/Button/index.jsx` | `rounded-[0px]`, `rounded-[14px]`, `bg-blue_gray-100`, `bg-blue_gray-900_4c`, `bg-white-a700`, `bg-blue_gray-900`, `text-black-900_01`, `text-white-a700`, `border-gray-900_01`, `bg-gradient`, `h-[56px]`, `h-[26px]`, `h-[40px]`, `h-[44px]`, `h-[42px]`, `px-3`, `pl-2`, `pr-[30px]`, `px-[34px]`, `px-1`, `px-5`, `text-[24px]`, `text-[16px]`, `text-[20px]` |
| Text/Heading size maps | `src/ui-components/Text/index.jsx`, `src/ui-components/Heading/index.jsx` | `text-[12px]`, `text-[14px]`, `text-[16px]`, `text-[20px]`, `text-[22px]`, `text-[24px]`, `text-[32px]`, `text-[34px]`, `text-[36px]`, `font-normal`, `font-bold`, responsive variants |
| Checkbox maps | `src/ui-components/CheckBox/index.jsx` | `checked:*`, `border-blue_gray-100`, `checked:bg-gray-100_01`, `h-[28px]`, `w-[28px]`, `rounded-[10px]` |
| Dashboard metric colors | `src/ui-components/Header/index.jsx` | `bg-blue-400`, `bg-pink-300`, `bg-green-800_01`, `bg-yellow-800` |
| User metric colors | `src/ui-components/UserMetricsInfo/index.jsx` | `bg-yellow-500`, `bg-green-a700`, `bg-light_blue-a200` |
| Application metric badge colors | `src/ui-components/Metrics/Application/index.jsx` | `bg-yellow-600`, `bg-purple-600`, `bg-red-600`, `bg-green-600`, `bg-blue-600` |
| Status colors | `src/ui-components/Datatable/ApplicationDataTable/index.jsx`, `src/ui-components/Datatable/ReportDataTable/index.jsx`, `src/ui-components/DocumentApplication/index.jsx` | `bg-orange-600`, `bg-purple-600`, `bg-green-600`, `bg-blue-600`, `bg-red-600`, `bg-[#309630]`, `bg-[#963030]` |
| Loader sizing props | `src/ui-components/Loader/index.jsx` | Default `w-8`, `h-8`; audit call sites for custom `w`/`h` values before CDN removal |
| Form helper class props | `src/ui-components/Form/component/*` | `fieldClass`, `containerClass`, `width`, and `position` props can pass classes from parents; audit call sites during primitive/form refactor |
| Permission-driven classes | `checkPermission()` call sites | Currently returns `hidden`; Phase 2 removes this coupling rather than safelisting it |

## Screens To Visually Recheck After Removing CDN Reference

- Dashboard: metric cards and application metric badges
- Users: user metric cards, add/edit forms, profile search/menu
- Documents/applications: status badges, form builder, file forms, review screen
- Licenses: license status actions and QR screen
- Reports: report tabs and generated report tables
- Public apply funnel: product cards, verification form, invoice form

## Safelist Recommendation

Add explicit safelist entries for the dynamic color/status families before removing the CDN reference:

```js
safelist: [
  'bg-blue-400',
  'bg-pink-300',
  'bg-green-800_01',
  'bg-yellow-800',
  'bg-yellow-500',
  'bg-green-a700',
  'bg-light_blue-a200',
  'bg-yellow-600',
  'bg-purple-600',
  'bg-red-600',
  'bg-green-600',
  'bg-blue-600',
  'bg-orange-600',
  'bg-[#309630]',
  'bg-[#963030]',
]
```

Keep the existing raw color mappings unchanged.
