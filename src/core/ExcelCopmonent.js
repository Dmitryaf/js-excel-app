import {DomListener} from '@core/DOMlistener';

export class ExcelCopmonent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.prepare();
  }

  // Настраиваем компонент до init
  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  storeChanged() {}

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
