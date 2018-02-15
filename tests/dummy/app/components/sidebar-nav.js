import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  layout: hbs`
    <nav>
      {{!-- <img src="http://i.giphy.com/3yFr6ODcNHhrW.gif"/> --}}
      <ul>
        <li>{{link-to 'Home' 'index'}}</li>
        <li>{{link-to 'Getting Started' 'getting-started'}}
          <ul>
            <li>{{link-to 'Alerts' 'getting-started.alerts'}}</li>
            <li>{{link-to 'Buttons' 'getting-started.buttons'}}</li>
            <li>{{link-to 'Cards' 'getting-started.cards'}}</li>
            <li>{{link-to 'Drawers' 'getting-started.drawers'}}</li>
            <li>{{link-to 'Dropdowns' 'getting-started.dropdowns'}}</li>
            <li>{{link-to 'Modals' 'getting-started.modals'}}</li>
            <li>{{link-to 'Popovers' 'getting-started.popovers'}}</li>
            <li>{{link-to 'State' 'getting-started.state'}}</li>
            <li>{{link-to 'SVG' 'getting-started.svg'}}</li>
            <li>{{link-to 'Tabs' 'getting-started.tabs'}}</li>
            <li>{{link-to 'Tooltips' 'getting-started.tooltips'}}</li>
          </ul>
        </li>
        <li>{{link-to 'Testing' 'testing'}}</li>
        <li>{{link-to 'API Docs' 'api'}}</li>
        <li><a href="https://www.github.com/healthsparq/ember-radical/">Source on Github</a></li>
      </ul>
    </nav>
  `
});
