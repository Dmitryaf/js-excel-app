import {ExcelCopmonent} from '@core/ExcelCopmonent';
import * as actions from '@/redux/actions';
import {createInput} from '@/components/header/header.template';
import {$} from '@core/dom';
import {debounce} from '@core/utils';

export class Header extends ExcelCopmonent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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
}
