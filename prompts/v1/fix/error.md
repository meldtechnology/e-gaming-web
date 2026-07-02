# Runtime Error Report - DynamicForm Tag Editor

## Message

`Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.`

## Relevant Component Stack

```text
Downshift3
Tag (src/ui-components/Tag/index.jsx)
EditFieldPopUp (src/ui-components/Form/DynamicForm/components/EditFieldPopUp/index.jsx)
TemplateGroupForm
TemplateForm
FormBuilder
DocumentFormBuilder
PermissionRoute
AppErrorBoundary
App
```

## Related Console Entry

```text
[web-vitals] { name: 'CLS', value: 0.022228291525549282, delta: 0.022228291525549282 }
```

The CLS entry was logged near the runtime error but is not the cause of the
render loop.
