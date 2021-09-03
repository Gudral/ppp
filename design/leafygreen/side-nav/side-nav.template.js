import { html } from '../../../lib/template.js';
import { repeat } from '../../../lib/element/templating/repeat.js';
import { slotted } from '../../../lib/element/templating/slotted.js';

import { chevronLeft } from '../icons/chervon-left.js';
import { chevronRight } from '../icons/chervon-right.js';

// TODO - aria attributes
export const sideNavTemplate = (context, definition) => html`
  <template>
    <div class="wrapper">
      <nav
        class="nav"
        ?data-expanded="${(x) => x.expanded}"
        aria-label="side-nav"
        @pointerenter="${(x) => x.handlePointerEnter()}"
        @pointerleave="${(x) => x.handlePointerLeave()}"
        @pointercancel="${(x) => x.handlePointerLeave()}"
      >
        <div class="expanded-content">
          <ul>
            <slot
              ${slotted({
                filter: (x) => {
                  return (
                    x.nodeType !== 3 && x.firstElementChild.slot === 'start'
                  );
                },
                property: 'topLevelItems'
              })}
            ></slot>
          </ul>
        </div>
        <div class="collapsed-content">
          <ul>
            ${repeat(
              (x) => x.topLevelItems,
              html`<li>${(x) => html`${x.firstElementChild.outerHTML}`}</li>`
            )}
          </ul>
        </div>
      </nav>
      <button
        class="collapse-toggle"
        ?data-expanded="${(x) => x.expanded}"
        @click="${(x) => (x.expanded = !x.expanded)}"
      >
        <div class="icon-wrapper">
          ${(x) =>
            x.expanded
              ? chevronLeft({ role: 'presentation' })
              : chevronRight({ role: 'presentation' })}
        </div>
      </button>
    </div>
  </template>
`;
