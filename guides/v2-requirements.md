# Proposed v2 Component Requirements

#### State Change
- Use property `active` to track state change. This makes working with state changes
  across components standard. (Instead of switching between open, expanded, visible,
  active, etc. for different elements)
- yield active property in each element for components in block form template

#### State Change Hooks
- Use standard `onActivate`, `onDeactivate`, `onActivated`, `onDeactivated`, etc.
  hooks when making active state changes. Provides a consistent set of hooks for any
  component that has state changes.

#### Control
- Element group should default to function as an uncontrolled element. Allows for
  simple element implementation.
- Standard event hooks should be available for element events. Allows for external
  hooks to react to user events.
- Closure actions can be passed into components for controlled instances with fine
  grained control of behavior.
  
##### Component Styles
- Each component should have a single stylesheet with styles driven by style
  variables. Removes inconsistent and problematic splitting of component structure
  styles and component theme styles. 
