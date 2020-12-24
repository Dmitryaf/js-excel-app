import {$} from '@core/dom';

export function resizeHandler($root, e) {
  return new Promise((resolve) => {
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
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => {
              el.style.width = value + 'px';
            });
      } else {
        $parent.css({
          height: value + 'px',
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
