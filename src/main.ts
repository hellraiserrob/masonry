import "./main.scss";
import InView from './in-view';

const css = {
  card: "card",
  cardActive: "card--active"
};

let cards = document.querySelectorAll(`.${css.card}`);

cards.forEach(card => {
  const iv = new InView();
  iv.bindScroll(card, () => {
    card.classList.add(css.cardActive);
  });
})


const cols = [{
  y: 0,
}];

function reset() {
  cols.forEach(col => {
    col.y = 0;
  });

  cards = document.querySelectorAll(`.${css.card}`);

  cards.forEach(el => {
    el.classList.remove(css.cardActive);
    el.classList.remove(css.cardActive);
  });
}

// find the column to slot into
function next() {
  let next = false;

  this.cols.forEach(col => {
    if (!next) {
      next = col;
    } else {
      if (col.y < next.y) {
        next = col;
      }
    }
  });

  return next;
}

// find the tallest column and set the grid height
function tallest() {
  let tallest = 0;

  this.cols.forEach(col => {
    if (col.y > tallest) {
      tallest = col.y;
    }
  });

  this.els.grid.style.height = `${tallest + 20}px`;
}

// find the column to slot into
function next() {
  let next:any = false;

  cards.forEach(col => {
    if (!next) {
      next = col;
    } else {
      if (col.y < next.y) {
        next = col;
      }
    }
  });

  return next;
}

function setStyles(el, styles) {
  Object.assign(el.style, styles);
}


// store the height of updated column
function update(payload) {
  this.cols.forEach(col => {
    if (payload.id === col.id) {
      col.y = payload.y;
    }
  });
}

// position existing tiles in the dom
function layout() {
  const tiles = document.querySelectorAll(`.${css.card}`);

  tiles.forEach(el => {
    // if (!el.classList.contains(css.tileOpen)) {
      const next = next();
      const left = next.x;
      const top = next.y > 0 ? next.y + this.gutter : 0;

      const width = this.width;

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

      // const inView = new InView();

      // inView.bindScroll(el, () => {
      //   el.classList.add(css.tileActive);
      //   window.setTimeout(() => {
      //     el.classList.add(css.tileOpen);
      //   }, 0);
      // });
    // }
  });

  tallest();
}

function setup() {
  // cards.forEach(breakpoint => {
  //   if (getViewportWidth() > breakpoint.threshold) {
  //     this.cols = breakpoint.cols
  //     this.width = breakpoint.width
  //   }
  // });

  reset();
  layout();
}

setup()