import Component from 'ember-component';
import inject from 'ember-service/inject';
import hbs from 'htmlbars-inline-precompile';

/**
 * Basic reusable page layout component to ensure consistency without
 * duplicating layout code on multiple route templates. Use in block form to
 * have your content automatically be placed into the main content area of
 * the layout. For the purposes of this app, this entails placing an
 * `{{outlet}}` helper inside of the block, like so:
 *
 * ```handlebars
 * {{#page-layout}}
 *   {{outlet}}
 * {{/page-layout}}
 * ```
 *
 * Remember, _do less_.
 * @class Component.RadicalDocs.PageLayout
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Radical Service
  // ---------------------------------------------------------------------------
  radical: inject(),

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <div class="page-title">
      <h1>{{radical.currentRouteTitle}}</h1>
    </div>
    <div class="container rad-guide">
      <div class="row">
        <div class="col-xs-12 col-lg-9">
          <div class="rad-guide-content">
            {{yield}}
          </div>
        </div>
        <div class="sidebar col-xs-12 col-lg-3">
          {{sidebar-nav}}
        </div>
      </div>
    </div>
  `
});
