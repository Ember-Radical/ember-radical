# Changelog

## 1.5.1 (03-15-2017)
Fixed:
- 🐛 Rad Dropdowns and Rad Popovers can now be closed on touch screen devices by tapping anywhere outside of their content [#84]
- 🐛 Rad Dropdown's child components no longer auto-suffix `data-test` values with their own names unless they are invoked via props [#76]

## 1.5.0 (03-01-2017)
Added:
- ✨ `rad-dropdown` has a new `position` property for controlling the position of the content relative to the target:
  - 'left'
  - 'right'
  - 'top'

## 1.4.0 (02-21-2017)
Added:
- ⬆️ Updated to Ember CLI 2.11

Fixed:
- 🐛 `rad-dropdown` child component `menu-item`s will now correctly close the dropdown on click when a custom click action is passed in 

## 1.3.3 (02-17-2017)
Fixed:
- 🐛 `rad-dropdown` now supports touch events inside of `dropdown-content`

## 1.3.2 (02-14-2017)
Fixed:
- 🐛 `rad-dropdown` now has `position: relative` on its root element to ensure proper display/positioning of the menu in all scenarios

## 1.3.1 (02-10-2017)
Fixed:
- 🐛 `rad-tabs` now yields correct `activeId` property instead of `activeTab`

## 1.3.0 (02-09-2017)
Added:
- ✨ `rad-tabs` now yields its `showTab` action
- ✨ All components that yield children via contextual components allow you to specify a custom component to render their children as:
  - `rad-card`
  - `rad-drawer`
  - `rad-dropdown`
  - `rad-modal`
  - `rad-popover`
  - `rad-tabs`
  - `rad-tooltip`
- ✨ Components that have toggleable visibility now apply an `active` class to their root element for improved custom styling control:
  - `rad-drawer`
  - `rad-dropdown`
  - `rad-modal`
  - `rad-popover`
  - `rad-tooltip`

Fixed:
- 🐛 `rad-tabs` now yields the correct property for the active tab id (`activeId`)
- 🐛 Binding of `buttonStyle` prop on `rad-drawer` now correctly updates `link` property of child `rad-button` instance

## 1.2.0 (02-07-2017)
Added:
- ✨ `rad-tabs` now yields its `activeTab` state
- ✨ `rad-drawer` now yields its `hidden` state
- ✨ `rad-card` now accepts the following new properties for better customization:
  - `cardClassNames` (applies to the root component element)
  - `cardBodyClassNames` (applies to the body subcomponent root element)
  - `cardFooterClassNames` (applies to the footer subcomponent root element)
  - `cardTitleClassNames` (applies to the title subcomponent root element)
- ✨ `rad-card` and its children now support binding `data-test` attributes
- ✅ Tests added to verify custom classNames are properly passed through to `rad-card`'s subcomponents
- 📝 Guides updated with new passed and yielded props

## 1.1.1 (02-07-2017)
Fixed:
- 🐛 Added missing `tabButtonClassNames` property to `rad-tabs`

## 1.1.0 (02-07-2017)
Added:
- ✨ `rad-tabs` now accepts the following new properties for better customization:
  - `buttonStyleClassNames` (applies to the tab bar `<ul>` element)
  - `tabClassNames` (applies to tab item `<li>` elements in the tab bar)
  - `tabListClassNames` (applies to the tab bar `<ul>` element)
- ✅ Tests added to verify custom classNames are properly passed through

## 1.0.1 (02-06-2017)

Fixed:
- 🐛 Rad modals no longer throw errors about bad aria-headers when `removeFromDomOnClose` is set to `true`

## 1.0.0 (02-05-2017)
- 🎉 Initial Release!
