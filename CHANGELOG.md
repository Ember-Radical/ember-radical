# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.2.1

- Fixed 508 a11y issue in rad-tabs

## 2.2.0

### Added

- Upgraded Ember.js to version 3.10

### Fixed

- Removed `mouseEnter`/`mouseLeave` deprecation warnings.
- Removed es5 getters.

## 2.1.1

### Refactored

- Removed jQuery from actual addon/app.

### TODO

- Remove jQuery from dummy app.

## 2.1.0

### Added

- Resolve issue #111 by adding scroll lock functionality to ember-radical.

## 2.0.2

### Bugfix

- Remove postinstall entirely

## 2.0.1

### Bugfix

- Remove bower as a devDependency and use npx instead.

### TODO

- Remove bower.

## 2.0.0

### Release

- Bump ember version all to current.
- Remove deprecations

## 1.8.4 (10-15-2018)

### Fixed

- Fixed bug where no `externalToggle` property was being passed but code was still being evaluated as though it was.

## 1.8.3 (03-14-2018)

### Fixed

- Fixed an IE Edge-specific issue where close svg steals click event, preventing modal close.

## 1.8.2 (02-22-2018)

### Fixed

- Fixed issue with updated label on `rad-tab.content` not being updated in `rad-tab` context.

## 1.8.1 (01-15-2018)

### Fixed

- Fixed popover behavior in iOS

## 1.8.0 (06-29-2017) Alerts, Buttons, Cards and SVG with Bootstrap

Release 1.8.0 includes prep work and deprecation to prepare these elements for v2
including:

#### Bootstrap

Bootstrap v4 is a dependency of Ember Radical, it can now be imported through your
node_modules. For example if you're using `ember-cli-sass-loader` you would set
the following options in your `ember-cli-build.js` config:

```javascript
sassOptions: {
  extension: 'scss',
  includePaths: ['node_modules/bootstrap/scss']
},
```

#### Alerts

- Deprecated: `canDismiss` is deprecated and should be replaced with `dismissible`
- Deprecated: `onDismiss` is deprecated and should be replaced with `onDeactivate`
- Added: class `.alert`
- Added: hook `onDeactivated`

#### Buttons

- Addition of `btn-unstyled` class bound to `link=true`. The intent of `link=true` is
  to create a button that looks/behaves just like a link element, and currently
  `btn-link` maintains the padding/margin of a button if addon is used with Bootstrap.
  In 2.0 styles will be introduced to remove that padding. If a traditional Bootstrap
  'link button' is needed, then class `btn-link` can be used.

New Button CSS that can be included now:

```css
.btn-unstyled {
  -webkit-appearance: none; // Remove Chrome native button styling
  white-space: normal;
  line-height: $line-height-base;
  vertical-align: baseline;
  user-select: auto;
  border: none;
  padding: 0;
  font-family: $font-family-sans-serif;
}
```

#### Cards

Deprecated:

- Contextual card `body` is deprecated and being replaced with `block`
- Class `card-default` is deprecated and will be removed in v2
- card class props are deprecated. If you need to pass class names use a contextual
  component

#### SVG

- Added: class `'.icon'`

#### General

- Fixed `.aria-hidden` classes to work with all elements

## 1.7.1 (06-01-2017)

Fixed:

- Addon overwriting UglifyJS `global_defs` through shallow Object.assign

## 1.7.0 (05-18-2017)

Added:

- Button component `outline` prop for outline style buttons
- Button component `link` prop also binds `btn-unstyled` class

Fixed:

- Ember template compiler is no longer accidentally pulled into build
- Popovers expanding beyond height of body
- Safari not showing SVG bug due to removal of xlink:href

Updated:

- Ember v2.13

#### On `btn-unstyled`:

The button component `link=true` config is intended for creating a button element that
looks exactly like an anchor element. This is to create accessible triggers in the
app that are not links to other pages, but should look like links for UX reasons.
Although the Ember Radical styles handle this, using Radical with Bootstrap does not.
The `btn-unstyled` class is being added in this release. In v2 CSS will be added to
the component CSS that styles it like an anchor:

```css
.btn-unstyled {
  -webkit-appearance: none; // Remove Chrome native button styling
  white-space: normal;
  line-height: $line-height-base;
  vertical-align: baseline;
  user-select: auto;
  border: none;
  padding: 0;
  font-family: $font-family-sans-serif;
}
```

_These styles are not being added in 1.7 as they are considered a breaking change,
but can be added to any consuming app prior to 2.0 if wanted._

## 1.6.0 (03-29-2017)

Added:

- ✨ Components will now automatically pass `data-test` attributes to their children when appropriate (unless custom `data-tests` are supplied to those children) [#77]
- ✨ Rad State now yields `setTrue` and `setFalse` in its `stateActions` hash [#82]
- ✨ Rad Drawer officially prefers passing a value to `hidden` instead of `externalToggle` [#80]
- 📝 New docs for using custom components [#65]
- 📝 New docs explaining testing capabilities [#65]
- 📝 Updated docs for contextual components [#65]

Deprecated:

- 😢 Rad State's `open` and `close` actions on the `stateActions` hash have been deprecated and will be removed in 2.0
- 😢 Rad Drawer's `externalToggle` property has been deprecated and will be removed in 2.0

## 1.5.4 (03-22-2017)

Fixed:

- svg use xlink:href is deprecated. Use href.

## 1.5.3 (03-21-2017)

Fixed:

- 🐛 In some cases, Rad Dropdowns could overflow past the width of the viewport; they will now be dynamically resized to fit within the constraints of
  the viewport instead. This fix is targeted primarily at mobile/small screen devices.

## 1.5.2 (03-20-2017)

Fixed:

- 🐛 Passes down `${data-test}-target` to `rad-drawer.content` in all situations and not just when Content is declared.

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
