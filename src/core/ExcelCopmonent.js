import { DomListener } from '@core/DOMlistener';

export class ExcelCopmonent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  initListeners() {
    this.initDOMListeners();
  }

  removeListener() {
    this.removeDOMListeners();
  }
}
