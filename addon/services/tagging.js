import Service from 'ember-service';

/**
 * Base tagging class. Provides methods for pushing data into the data layer.
 * @class Tagging
 * @constructor
 * @extends Ember.Service
 */
export default Service.extend({

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Method for pushing an object into the data layer. Used to set the custom
   * dimensions included with tags.
   * @method pushData
   * @param {Object} data Object of key/value pairs mapping to custom dimensions
   * @return {undefined}
   */
  pushData(data) {
    // Don't push the data if it's not an object
    if (!data || typeof data !== 'object') { return; }
    // Ember hash helper creates a fake Object which lacks the Object prototype. fix that.
    if (!(data instanceof Object)) { data = Object.assign({}, data); }

    window.dataLayer.push(data);
  },
  /**
   * Fire tag by pushing analytics event into dataLayer
   *
   * Passing in an object representing tagging information is now supported and
   * is the preferred method for invoking `fireTag`. Additionally, custom dimensions
   * may now also be passed in as part of this object.
   *
   * Example:
   * ```javascript
   * tagging.fireTag({
   *   category: 'Big Hunks',
   *   action: 'A hunk didnt listen',
   *   label: 'Hunks are bad listeners',
   *   cd: {
   *     someCD: 'somevalue'
   *   }
   * });
   * ```
   * @method fireTag
   * @param {Object} tag Tag object containing all of the tag data
   * @return {undefined}
   */
  fireTag(tag = {}) {
    console.log('tag: ', tag);
    // Tags require a category and action, don't even think about sending without 'em
    if (!tag.tagcategory || !tag.tagaction) { return; }
    let tagcd = tag.tagcd || {};
    let taglabel = tag.taglabel;

    console.log('tagging');

    // Ember hash helper creates a fake Object which lacks the Object prototype. fix that.
    if (!(tagcd instanceof Object)) { tagcd = Object.assign({}, tagcd); }
    // Send N/A instead of an empty label b/c analytics
    taglabel = taglabel === null || taglabel === undefined ? 'N/A' : taglabel;

    // Push this tagging event's custom dimensions into the data layer
    if (tagcd) { this.pushData(tagcd); }

    window.dataLayer.push({
      event: 'analyticsEvent',
      eventCategory: tag.tagcategory,
      eventAction: tag.tagaction,
      eventLabel: taglabel,
      eventValue: tag.tagvalue,
      eventNonInt: tag.tagnonInteractive
    });

    // Reset custom dimensions that were specific to this tagging event
    if (tagcd) {
      // Replace all values in custom dimensions with undefined
      for (let dim in tagcd) {
        if ( tagcd.hasOwnProperty(dim)) {
          tagcd[dim] = undefined;
        }
      }
      this.pushData(tagcd);
    }
  },
  /**
   * Send a page view by pushing virtual pageview event into data layer
   * @method firePageView
   * @param {string} page url of the page to send
   * @return {undefined}
   */
  firePageView(page) {
    if (!page) { return; }

    window.dataLayer.push({
      event: 'virtual-pageview',
      'virtual page': page
    });
  }
});
