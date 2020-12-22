import {$} from '@core/dom';
import {ActiveRoute} from '@core/route/ActiveRoute';

export class Route {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    console.log(ActiveRoute.path);
    console.log(ActiveRoute.param);
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
