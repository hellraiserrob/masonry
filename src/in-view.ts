// import throttle from "lodash/throttle";

function getViewportHeight(): number {
  return window.innerHeight || document.documentElement.clientHeight;
}

export function getViewportWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth;
}

function partiallyInViewport(el: HTMLElement):boolean {
  const rect = el.getBoundingClientRect();

  const vertInView:boolean = rect.top <= getViewportHeight() && rect.top + rect.height >= 0;
  const horInView:boolean = rect.left <= getViewportWidth() && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

export default class InView {
  el: null;
  cb: null;

  constructor() {
    this.checkVisibility = this.checkVisibility.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
  }
  
  bindScroll(el, cb) {
    this.el = el;
    this.cb = cb;

    window.addEventListener('scroll', this.scrollHandler);
    this.checkVisibility(el, cb);
  }

  scrollHandler(){
    this.checkVisibility(this.el, this.cb);
  }

  unbindScroll() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  checkVisibility(el, cb) {
    const isVisible = partiallyInViewport(el);
    if (isVisible) {
      this.unbindScroll();
      cb();
    }
  }
}
