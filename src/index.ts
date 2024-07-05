import { setup, add } from "./masonry"
import { cardTemplate } from "./templates";
import { Breakpoint } from "./interfaces";

const css = {
  load: "load"
};

const loadBtn = document.querySelector<HTMLElement>(`.${css.load}`);
const options:Breakpoint[] = [
  {
    threshold: 0,
    columns: 1,
    gutter: 32,
  },
  {
    threshold: 600,
    columns: 3,
    gutter: 32,
  },
  {
    threshold: 1000,
    columns: 4,
    gutter: 32,
  }
];

/**
 * dummy code showing how to load more items into the masonry grid
 */

function resizeHandler() {
  setup(options);
}

function bindings() {
  loadBtn?.addEventListener("click", handeLoadMoreClick);
  window.addEventListener('resize', resizeHandler);
}

function handeLoadMoreClick() {
  const url = "/masonry/api/news.json";

  fetch(url, {})
    .then(response => {
      if (response.status > 200) {
        throw Error();
      }
      return response.json();
    })
    .then(response => {
      let html = "";

      response.results.forEach(card => {
        html += cardTemplate(card);
      })

      add(html)
    })
    .catch(e => {
      console.log(e);
    })
}

bindings();
setup(options)