/**
 * Analytics Setup Script
 *
 * This script will insert a script tag to pull down the google tag manager
 * library. That library will also handle pulling down the google analytics
 * library.
 *
 * Invoke this function with the unique GTM container ID from you friendly
 * neighborhood analytics contact.
 *
 * _NOTE: will attach `dataLayer` to window for namespacing analytics events._
 * @class Util.Analytics.SetupGTM
 * @param {string} containerId Unique id matching application GTM id
 * @return {undefined}
 */
export default function(containerId) {
  const scriptTag = document.createElement('script')
  const firstScriptTag = document.getElementsByTagName('script')[0]

  // Create an empty dataLayer, unless it's already somehow magically created?
  window.dataLayer = window.dataLayer || []

  // Push some sort of start event into the data layer?
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })

  // Set up script attributes
  scriptTag.setAttribute('async', true)
  scriptTag.setAttribute(
    'src',
    `//www.googletagmanager.com/gtm.js?id=${containerId}`,
  )

  // Add script to dom to fetch tag manager script
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
}
