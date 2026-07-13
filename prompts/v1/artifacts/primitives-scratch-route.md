# Primitives Scratch Route

Route: `/app/_primitives`

The scratch route renders every primitive in both light and dark containers:

- `Button`
- `Input`
- `Card`
- `Table`
- `Modal`
- `Badge`
- `Tag`
- `Tabs`
- `Pagination`
- `EmptyState`
- `Skeleton`
- `Loader`

The route is intentionally not linked from navigation. It sits under `/app`, so the normal auth guard still applies.

Visual diff note: there is no browser screenshot/diff harness installed in this repo yet. The route uses the same class strings and primitive implementations exercised by the current app screens, and it is covered by `typecheck`, `lint`, `test`, and `build` gates.
