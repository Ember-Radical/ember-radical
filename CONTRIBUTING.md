# Contributing

Contributions are welcome, below is an overview of roadmap items and repository conventions.

Note that all components declare their templates inline using the [ember-cli-htmlbars-inline-precompile](https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile) package. You can enable syntax highlighting for the templates by using the [ember-language](https://atom.io/packages/language-ember) Atom package.

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

### Roadmap

- [] Base styles/variables created (Skeleton theme for Bootstrap)
- [] Feature flag system for build code stripping
- [] Documentation page for accessibility guidelines and tools

### Conventions

- Use tagged templates to declare component templates inline in js files.
- Components with display elements should use a DDAU property `show` to handle visibility
- Feature flags should be used to ensure production builds are as light as possible
- Any interactable target should be a `core-button`
- Components should include a high level overview of special tricks and features used
- Components should use aria attrs for A++ Accessibility
- Simple Google Analytics tagging should be included and wrapped behind feature flag
- Additional accessibility validations created for dev builds
- Hooks included for `onShow` and `onHide`
- Component classNames used for styling should match Bootstrap conventions
- Styles should be broken out into structure/theme for easy theming

### TODO Tasks

- [] Tagging setup utility and service
- [] Convert Skeleton rems using `$ten4rem` to normal base 15 rems.
