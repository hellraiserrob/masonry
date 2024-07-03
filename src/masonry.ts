import "./main.scss";
import InView from "./in-view";
import { getViewportWidth } from "./utils";
import { Column } from "./interfaces"; 

const css = {
  results: "masonry__results",
  card: "card",
  cardActive: "card--active"
};

let results: (HTMLElement | null) = document.querySelector(`.${css.results}`);
let cards = document.querySelectorAll(`.${css.card}`);

let cols:Column[] = [];
let gutter = 0;
let width = 0;

function reset() {
  cols.forEach(col => {
    col.y = 0;
  });

  cards = document.querySelectorAll(`.${css.card}`);

  cards.forEach(el => {
    el.classList.remove(css.cardActive);
  });
}

// find the column to slot into
function nextColumn() {
  let next:(null|Column) = null;

  cols.forEach(col => {
    if (!next) {
      next = col;
    }

    if (col.y < next.y) {
      next = col;
    }
  });

  return next;
}

// find the tallest column and set the grid height
function tallest() {
  let tallest = 0;

  cols.forEach(col => {
    if (col.y > tallest) {
      tallest = col.y;
    }
  });

  if (results) {
    results.style.height = `${tallest + 20}px`;
  }
}

function setStyles(el, styles) {
  Object.assign(el.style, styles);
}


// store the height of updated column
function update(payload) {
  cols.forEach(col => {
    if (payload.id === col.id) {
      col.y = payload.y;
    }
  });
}

// position existing tiles in the dom
function layout() {
  const tiles = document.querySelectorAll<HTMLElement>(`.${css.card}`);

  tiles.forEach(el => {
    if (!el.classList.contains(css.cardActive)) {
      const next:any = nextColumn();

      if(next) {
        const left = next.x;
        const top = next.y > 0 ? next.y + gutter : 0;

        setStyles(el, {
          width,
          left,
          top: `${top}px`
        });

        let height = el.offsetHeight;

        update({
          id: next.id,
          x: left,
          y: top + height
        });

        el.classList.add(css.cardActive);
        const inView = new InView();

        inView.bindScroll(el, () => {
          el.classList.add(css.cardActive);
        });
      }
    }
  });

  tallest();
}

export function setup(options) {
  options.forEach(breakpoint => {
    if (getViewportWidth() > breakpoint.threshold) {
      cols = breakpoint.cols
      width = breakpoint.width
      gutter = breakpoint.gutter
    }
  });

  reset();
  layout();
}

export function add(markup) {
  if (results) {
    results.insertAdjacentHTML('beforeend', markup);
  }
  layout();
}