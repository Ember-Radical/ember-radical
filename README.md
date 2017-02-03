# Ember Radical

[![TravisCI](https://travis-ci.org/healthsparq/ember-radical.svg?branch=master)](https://travis-ci.org/healthsparq/ember-radical) [![Code Climate](https://codeclimate.com/github/healthsparq/ember-radical/badges/gpa.svg)](https://codeclimate.com/github/healthsparq/ember-radical)

Feather light, dead simple and fully accessible Ember DDAU components. Ember
Radical is a set of core components that make writing consistent, quality
applications simple.

The addon includes an optional theme based off of [Skeleton CSS](http://getskeleton.com/)
for drop in usage. If you'd prefer a different look, all component classes are
Bootstrap compatible.

### Installation

```
ember install ember-radical
```

### Usage

Ember Radical's robust set of components gets you off and running with easy to use implementations of common UX patterns that are fully accessible, testable, and follow DDAU principles:

- `{{rad-alert}}`
- `{{rad-button}}`
- `{{rad-card}}`
- `{{rad-drawer}}`
- `{{rad-dropdown}}`
- `{{rad-modal}}`
- `{{rad-popover}}`
- `{{rad-state}}`
- `{{rad-svg}}`
- `{{rad-tabs}}`
- `{{rad-tooltip}}`

See [healthsparq.github.io/ember-radical/](https://healthsparq.github.io/ember-radical/) for full, in-depth documentation and demos.

### Styles
_Stylesheets are written in SCSS. The [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass)
package can be used for compilation._


To import the base theme:
```
// In your /app/styles.css file
@import 'ember-radical/styles';
```

To import only the structural styles for components:
```
// In your /app/styles.css file
@import 'ember-radical/component-structures';
```

### Troubleshooting

If you are experiencing infinite reloads while developing and running the dummy application, and have watchman installed, you may need to restart your local watchman server:

```
$ watchman shutdown-server
```

The server will be restarted automatically the next time you run `ember s`

### Contributing

If you'd like to contribute, please read our [contribution guidelines](./.github/CONTRIBUTING.md) and then get cracking! We look forward to seeing your pull requests!
