# Ember Radical [![Build Status](https://travis-ci.org/healthsparq/ember-radical.svg?branch=master)](https://travis-ci.org/healthsparq/ember-radical) [![Code Climate](https://codeclimate.com/github/healthsparq/ember-radical/badges/gpa.svg)](https://codeclimate.com/github/healthsparq/ember-radical)

Feather light, dead simple and fully accessible Ember DDAU components. Ember
Radical is a set of core components that make writing consistent, quality
components simple.

The addon includes an optional theme based off of [Skeleton CSS](http://getskeleton.com/)
for drop in usage. If you'd prefer a different look, all component classes are
Bootstrap compatible.

### Installation

```
ember install ember-radical
```

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

### Contributing

If you'd like to contribute, please read our [contribution guidelines](./.github/CONTRIBUTING.md) and then get cracking! We look forward to seeing your pull requests!
