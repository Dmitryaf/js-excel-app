import {ExcelCopmonent} from '@core/ExcelCopmonent';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';

export class Formula extends ExcelCopmonent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div id="formula" 
          class="input" 
          contenteditable 
          spellcheck="false"
        >
        </div>
  `;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:focus');
    }
  }
}
