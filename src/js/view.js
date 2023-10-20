const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(
  ".modal__content--container--close"
);
const listItem = document.querySelector(".latest__contents--lists--item");

export const modalCloseHandler = function (handler) {
  modalCloseBtn.addEventListener("click", function () {
    handler();
  });
};

export const modalOpen = function (handler) {
  listItem.addEventListener("click", function () {
    handler();
  });
};

/*
// TO DO
1. make model to store the data
2. build a function to post a new diary (add new data to model and display it)
3. build a function of pagination
4. improve the modal function to display clicked data
5. to add a button "see all diaries" and a new page for all diaries (having a function of sorting them)
6. to add a function of editing existing data
*/
