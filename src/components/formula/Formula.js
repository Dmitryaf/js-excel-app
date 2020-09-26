import {ExcelCopmonent} from '@core/ExcelCopmonent';

export class Formula extends ExcelCopmonent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
  `;
  }

  onInput() {
    console.log(this.$root);
    console.log('Formula: onInput', event);
  }
}
