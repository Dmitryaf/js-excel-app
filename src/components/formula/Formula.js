import {ExcelCopmonent} from '@core/ExcelCopmonent';

export class Formula extends ExcelCopmonent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
  `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.emitter.emit('it is working', text);
  }
}
