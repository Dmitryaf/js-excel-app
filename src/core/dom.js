class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  /* Здесь и в некоторых других методах возаращается this.
     Это нужно для того, чтобы мы могли реализовывать цепочку вызовов. */

  // Геттер и сеттер для работы с HTML. Аналог innerHTML.
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  // Удаляет содержимое элемента.
  clear() {
    this.html('');
    return this;
  }

  // Аналог addEventListener. Упрощенная запись
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  // Аналог removeEventListener. Упрощенная запись
  remove(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoord() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles= {}) {
    Object
        .keys(styles)
        .forEach((styleItem) => {
          this.$el.style[styleItem] = styles[styleItem];
        });
  }

  get data() {
    return this.$el.dataset;
  }
}

export function $(selector) {
  return new Dom(selector);
}


// Создаёт элемент и добавляет ему класс,если он был указан.
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
