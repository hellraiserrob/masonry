import { setup, add } from "./masonry"
import { cardTemplate } from "./templates";

const css = {
  load: "load"
};

const loadBtn: (HTMLElement | null) = document.querySelector(`.${css.load}`);

const options = [
  {
    threshold: 0,
    width: "100%",
    cols: [
      {
        id: 1,
        x: 0,
        y: 0
      }
    ],
    gutter: 16,
  },
  {
    threshold: 600,
    width: "33.33%",
    cols: [
      {
        id: 1,
        x: 0,
        y: 0
      },
      {
        id: 2,
        x: "33.33%",
        y: 0
      },
      {
        id: 3,
        x: "66.66%",
        y: 0
      }
    ],
    gutter: 16,
  },
  {
    threshold: 1000,
    width: "25%",
    cols: [
      {
        id: 1,
        x: 0,
        y: 0
      },
      {
        id: 2,
        x: "25%",
        y: 0
      },
      {
        id: 3,
        x: "50%",
        y: 0
      },
      {
        id: 4,
        x: "75%",
        y: 0
      }
    ],
    gutter: 16,
  }
];

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