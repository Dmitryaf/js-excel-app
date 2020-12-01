import {ExcelCopmonent} from '@core/ExcelCopmonent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelCopmonent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoord();
      const type = e.target.dataset.resize;
      const sideProp = type === 'col' ? 'bottom' : 'right';
      let value;

      $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px',
      });

      document.onmousemove = (event) => {
        $resizer.$el.classList.add('active');
        if (type === 'col') {
          const delta = event.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({
            right: -delta + 'px',
          });
        } else {
          const delta = event.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({
            opacity: 1,
            bottom: -delta + 'px',
          });
        }
      };

      document.onmouseup = (event) => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
          $parent.css({width: value + 'px'});
          this.$root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach((el) => {
                el.style.width = value + 'px';
              });
        } else {
          $parent.css({
            height: value + 'px',
          });
        }
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });
      };
    }
  }

  onMousemove(e) {

  }

  onMouseup(e) {

  }
}
