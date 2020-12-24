import {ExcelCopmonent} from '@core/ExcelCopmonent';
import * as actions from '@/redux/actions';
import {createInput} from '@/components/header/header.template';
import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/route/ActiveRoute';

export class Header extends ExcelCopmonent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['tableTitle'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    return createInput(this.store.getStore().tableTitle);
  }

  onInput(event) {
    this.$dispatch(actions.changeTableTitle($(event.target).text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigation('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigation('');
    }
  }
}
