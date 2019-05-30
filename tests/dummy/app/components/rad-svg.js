import RadSVG from 'ember-radical/components/rad-svg'
import config from '../config/environment'

const filePath =
  config.environment === 'production'
    ? '/ember-radical/assets/symbol-defs.svg'
    : '/assets/symbol-defs.svg'

/**
 * In the demo application we need to override the svg component to handle our
 * gh-pages prod app requiring a special path.
 * @class Component.RadSVG
 * @constructor
 * @extends Component.RadSVG
 */
export default RadSVG.extend({
  filePath: filePath,
})
