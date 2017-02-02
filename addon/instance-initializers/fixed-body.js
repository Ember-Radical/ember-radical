
/**
 * This initializer handles sniffing the current browser's scrollbar width. This
 * is used by modals to handle freezing the body on open, but can be used by
 * any fixed width element that needs to freeze the body using the class
 * `.fixed-scroll-padding-element`.
 * @class InstanceInitializer.FixedBody
 * @constructor
 */
/**
 * @method initialize
 * @static
 * @return {undefined}
 */
export function initialize(/* appInstance */) {

  // Browser hack to find the scrollbar width - used for fixed position modals and scrollable divs
  let scrollDiv = document.createElement('div');
  let fixedBodyTag = document.createElement('style');

  // Class name required to force a scroll bar to show
  scrollDiv.className = 'scrollbar-measure';

  // Get the scrollbar width
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  // Add styles for modal adjust
  fixedBodyTag.innerHTML =
    `body.fixed-body { overflow: hidden; }

    body.fixed-body,
    body.fixed-body .fixed-scroll-padding-element { padding-right: ${scrollbarWidth}px; }`;

  // Append fixed body styles to head
  fixedBodyTag.className = 'fixed-body';
  document.head.appendChild(fixedBodyTag);
}

export default {
  name: 'fixed-body',
  initialize
};
