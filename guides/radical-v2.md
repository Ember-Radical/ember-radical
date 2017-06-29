---
id: radical-v2
linkLabel:
title: Radical v2 Roadmap
---

## v2 Goals
Radical is starting the journey to v2. Over the past few months we've learned some
important lessons integrating Radical into a large scale, complex application and
we're bringing those learnings back to make Radical even more radical. Radical v2 aims
to accomplish two goals:
- Easier integration through clearer addon CSS coverage
- More reliable and simpler to work with components through consistent APIs
 
## v1 Learnings
There were two important take-aways we learned integrating Radical into our very
large, very complex application:
- The addon CSS coverage wasn't clear and required a number of shims to work with
  Bootstrap.
- The component APIs are mostly consistent, but there are a number of unnecessary
  variances from component to component that require documentation lookup.
  
The primary goal of v2 is to address these opportunities so that setting up,
customizing styles, and writing components with Radical is as easy and consistent as
possible while still allowing fine grained control of every detail when needed.

## Addon CSS Architecture Improvements
Radical is not a CSS Framework, but Radical v1 attempted to create a small scale CSS
framework while also splitting the component structures and theme styles so that apps _(
including our own production apps)_ could consume Radical alongside Bootstrap's
stylesheets. The result was inconsistent and sometimes confusing CSS imports. Some
components worked with just the corresponding component-structures imported, but
many required some of the styles in the theme sections, but not _all_ of the
theme styles. As a result we had to write some stop-gap styles or import theme
styles from Radical.

In v2 we are focusing on doing one thing extremely well: building a set of
composable, accessible components that **inherit** styling from a first class CSS
framework. The intent is that integrating Radical is simple, a single set of
application style variables drive the appearance of your CSS framework, application
custom styles and Radical component styles. Bootstrap v4 will be the first class
citizen of Radical v2, but is not required.

## Component API Improvements
The current Radical component set is fully accessible, composable and follow DDAU
best practices. But the existing component APIs have small variations from one
component to another that require frequent documentation reference. Our goal in v2
is standardize the component APIs whenever possible. The end result being more
confidence when working working with Radical components and less time spent
referencing documentation.

In addition, there are varying levels of control available for interactive elements
in the current library. Part of the enhancements in v2 is ensuring that any component
servicing user interaction can function as an uncontrolled component, be observed
through consistent event hooks, or be entirely controlled through passed properties
and closure actions. This is an important step in making components lightweight to
implement for standard cases, while offering the ability to assume fine grained
control for complex scenarios.
