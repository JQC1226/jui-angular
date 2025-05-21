# JUI — Angular UI Component Library

**JUI ** is a clean, SCSS-based Angular component library built with **standalone components**, focused on reusability, accessibility, and developer experience. It provides composable UI blocks that integrate seamlessly into Angular apps and are documented in a live, interactive Storybook.

> Built with Angular 19, SCSS, and accessible-first design principles.

---

## Features

- **Angular 19 Standalone Components** — no need for NgModules
- **SCSS-based styling** — easy to customize and override
- **WCAG-compliant accessibility** — semantic HTML, ARIA attributes, focus management
- **Component isolation** — each component is fully self-contained
- **Testable architecture** — compatible with Jest, Karma, Jasmine
- **Keyboard-friendly** — designed with full keyboard accessibility in mind
- **Interactive Storybook** — visual documentation and live examples

---

## Live Storybook

Explore all components interactively:

🔗 [story book demo](https://jui-angular.vercel.app/?path=/docs/configure-your-project--docs)

---

## Components

### Form Inputs

| Component      | Imports As                          |
| -------------- | ----------------------------------- |
| Form Input     | `JuiFormInput`, `FormInput`         |
| Comment Input  | `JuiCommentInput`, `CommentInput`   |
| Dropdown       | `JuiDropdown`, `Dropdown`           |
| Input Dropdown | `JuiInputDropdown`, `InputDropdown` |
| Radio List     | `JuiRadioList`, `RadioList`         |
| Search Input   | `JuiSearchInput`, `SearchInput`     |

### Layout & Behavior

| Component       | Imports As                            |
| --------------- | ------------------------------------- |
| Button          | `JuiButton`, `Button`                 |
| Tabs            | `JuiTabs`, `Tabs`                     |
| Tooltip         | `JuiTooltip`, `Tooltip`               |
| Modal           | `JuiModal`, `Modal`                   |
| Switch          | `JuiSwitch`, `Switch`                 |
| Idle Timer      | `JuiIdleTimer`, `IdleTimer`           |
| Loading Spinner | `JuiLoadingSpinner`, `LoadingSpinner` |
| Action Dropdown | `JuiActionDropdown`, `ActionDropdown` |

---

## Accessibility (WCAG 2.1)

All components are designed with accessibility in mind:

- **Semantic HTML** (`<button>`, `<label>`, `<input>`, etc.)
- **ARIA attributes** for custom elements (e.g., dropdown, tabs, modals)
- **Screen reader compatibility**
- **Focus management** on dialogs and dropdowns
- **Color contrast** respects WCAG AA standards (customizable via SCSS)

---

## Keyboard Support

| Component      | Keyboard Controls                         |
| -------------- | ----------------------------------------- |
| **Tabs**       | `← →` to switch tabs, `Tab` to move focus |
| **Dropdown**   | `↓ ↑` to navigate, `Enter` to select      |
| **Modal**      | `Esc` to close, `Tab` to cycle focus      |
| **Tooltip**    | `Focus` triggers tooltip on keyboard      |
| **Radio List** | `↑ ↓` or `Tab` to select                  |

Focus is **trapped in modals** and restored on close for better user experience and accessibility.

---

## Testing

The library is compatible with:

- **Jasmine/Karma** (Angular default)
- **Jest** (with `jest-preset-angular`)
- **Storybook Test Runner** for interactive visual tests

Each component is structured for easy unit testing and can be mounted independently in test environments.

---

## SCSS Theming

All styles are written in SCSS and organized per component for easy customization. You can:

- Customize variables if defined via SCSS maps
- Apply global design tokens through shared partials

---

## Usage Example

```ts
import { Button } from "src/app/lib/components/jui-button/jui-button.component";

@Component({
  standalone: true,
  imports: [Button],
  template: `<button (click)="save()">Save</button>`,
})
export class SaveComponent {}
```
