import { DomListener } from '@core/DOMlistener';

export class ExcelCopmonent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }

  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  removeListener() {
    this.removeDOMListeners();
  }
}
