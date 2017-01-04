# Contributing

Hi there! Thanks for your interest in contributing to `ember-radical`!

Before implementing new features and changes, please [submit a new issue](https://github.com/healthsparq/ember-radical/issues/new). We'd love to discuss proposed changes before getting started, and also make sure we aren't already working on the issue you have!

We welcome contributions to the project! Below you will find an overview of [roadmap items](#feature-roadmap) and [repository conventions](#conventions).

Note that all components declare their templates inline using the [ember-cli-htmlbars-inline-precompile](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile) package. You can enable syntax highlighting for the templates by using the [language-ember](https://atom.io/packages/language-ember) Atom package.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-radical`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

If you add new SVG icons to the dummy app, you will need to rebuild the SVG sprite:

* `npm run svgdefs`

## Submitting Pull Requests

1. Fork [this repository](https://github.com/healthsparq/ember-radical/issues/new)
2. Create a new branch with your feature name (e.g. `add-rad-component` or `update-feature-docs` or even `fix-crazy-edge-case-bug`)
3. Make your changes
4. If you added new features, write tests for them
5. Ensure your tests pass locally, both in your primary browser and in PhantomJS
6. Push your changes
7. Submit your pull request!

## Conventions

### Code/Patterns
- Use tagged templates to declare component templates inline in js files. If you're using Atom, we recommend installing [language-ember](https://atom.io/packages/language-ember) for totally rad hbs syntax highlighting in your JS files.
- Components with display elements should use a DDAU property `show` to handle visibility
- Feature flags should be used to ensure production builds are as light as possible
- All code _must be documented_ in the YUIDoc syntax. Document the "why" in addition to the "what"
- Components should include a high level overview of special tricks and features used in their docs
- Simple Google Analytics tagging should be included and wrapped behind feature flag
- Hooks included for `onShow` and `onHide`
- Component `classNames` used for styling should match Bootstrap conventions
- Styles should be broken out into structure/theme for easy theming

### Accessibility
- Components should use aria attrs for A++ Accessibility
- Additional accessibility validations created for dev builds
- Any interactive target without an `href` should be a `core-button`

### Other
- We use [gitmoji](https://gitmoji.carloscuesta.me/) in our commit messages to help quickly identify the nature of a commit and request you do as well.

## Feature Roadmap

### Core Components

- [x] Core Alert
- [x] Core Button
- [x] Core Card
- [x] Core Drawer
- [x] Core Dropdown
- [x] Core Modal
- [ ] Core Popover
- [x] Core State
- [x] Core SVG
- [x] Core Tabs
- [x] Core Tooltip
- [ ] Omni Filter(?)

### Services

- [ ] Tagging (GA)

### Misc

- [ ] Tagging setup utility
- [ ] Base styles/variables created (Skeleton theme for Bootstrap)
- [ ] Feature flag system for build code stripping
- [ ] Documentation page for accessibility guidelines and tools
- [ ] Full public-facing documentation (gh-pages) (separate repo?)
- [ ] Convert Skeleton rems using `$ten4rem` to normal base 15 rems
- [ ] Handle funneling out tagging.js when tagging feature flag is off
