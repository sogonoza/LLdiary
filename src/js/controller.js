import * as model from "./model.js";
import * as view from "./view.js";

const modal = document.querySelector(".modal");

const controlModalClose = function () {
  modal.classList.remove("active");
};

const controlModalOpen = function () {
  modal.classList.add("active");
  console.log("aaa");
};

const init = function () {
  view.modalCloseHandler(controlModalClose);
  view.modalOpen(controlModalOpen);
};
init();
