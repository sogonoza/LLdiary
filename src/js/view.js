const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(
  ".modal__content--container--close"
);
const pagination = document.querySelector(".latest__contents--pagination");
const paginationBtnNext = document.querySelector(
  ".latest__cotents--pagination--btn--next"
);
const paginationBtnPrev = document.querySelector(
  ".latest__cotents--pagination--btn--prev"
);
const newPostBtn = document.querySelector(".header__button");
let paginationBtn = document.getElementsByClassName(
  "latest__contents--pagination--btn"
);
let diaryItem = document.getElementsByClassName(
  "latest__contents--lists--item"
);

// /////////////MODAL
//CLOSE
export const modalCloseHandler = function (handler) {
  const modalCloseBtn = document.querySelector(
    ".modal__content--container--close"
  );

  modalCloseBtn?.addEventListener("click", function () {
    console.log("aaa");
    handler();
  });
};

//OPEN
export const modalOpen = function (handler) {
  for (let i = 0; i < diaryItem.length; i++) {
    diaryItem[i].addEventListener("click", function (e) {
      let currentTarget;
      currentTarget = e.currentTarget;
      handler(currentTarget);
    });
  }
};

///////////////PAGINATION
//DISPLAY PAGINATION BUTTON
export const displayPaginationButton = function (currentGroupNum, maxPageNum) {
  let html;
  if (currentGroupNum === 1 && currentGroupNum < maxPageNum)
    html = `
  <button
    class="latest__contents--pagination--btn latest__cotents--pagination--btn--next"
  >
    Next
  </button>
    `;

  if (currentGroupNum > 1 && currentGroupNum < maxPageNum)
    html = `
    <button
    class="latest__contents--pagination--btn latest__cotents--pagination--btn--prev"
  >
    Prev
  </button>
  <button
    class="latest__contents--pagination--btn latest__cotents--pagination--btn--next"
  >
    Next
  </button> 
    `;

  if (currentGroupNum > 1 && currentGroupNum === maxPageNum)
    html = `
     <button
    class="latest__contents--pagination--btn latest__cotents--pagination--btn--prev"
  >
    Prev
  </button>
    `;

  if (currentGroupNum === 1 && currentGroupNum === maxPageNum) html = "";

  pagination.innerHTML = "";
  pagination.insertAdjacentHTML("afterbegin", html);
};

//PAGINATE
export const paginate = function (handler) {
  for (let i = 0; i < paginationBtn.length; i++) {
    paginationBtn[i].addEventListener("click", function (e) {
      let currentTarget;
      currentTarget = e.currentTarget;
      handler(currentTarget);
      paginationBtn = document.getElementsByClassName(
        "latest__contents--pagination--btn"
      );
    });
  }
  //   Array.from(paginationBtn).forEach((el) => {
  //     el.addEventListener("click", function (e) {
  //       let currentTarget;
  //       currentTarget = e.currentTarget;
  //       handler(currentTarget);
  //       paginationBtn = document.getElementsByClassName(
  //         "latest__contents--pagination--btn"
  //       );
  //       console.log(paginationBtn);
  //     });
  //   });
};

// ADD NEW POST
export const addNewPost = function (handler) {
  newPostBtn.addEventListener("click", function () {
    handler();
  });
};

//add additional new word
export const addNewWords = function () {
  let WordsCount = 1;

  const addMoreWords = document.querySelector(
    ".modal__content--container--form--more"
  );
  const addMoreWordsBtn = document.querySelector(
    ".modal__content--container--form--more--btn"
  );
  WordsCount++;

  addMoreWordsBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addMoreWords.insertAdjacentHTML(
      "beforebegin",
      `
      <hr>
    <label for="word1">Word</label><br />
    <input type="text" id="word${WordsCount}" name="word${WordsCount}" /><br />
    <label for="type${WordsCount}">Type</label><br />
    <select id="type${WordsCount}" name="type${WordsCount}">
      <option value="noun">noun</option>
      <option value="verb">verb</option>
      <option value="adjective">adjective</option>
      <option value="adverb">adverb</option></select
    ><br />
    <label for="meaning${WordsCount}">Meaning</label><br />
    <textarea
      name="meaning${WordsCount}"
      id="meaning${WordsCount}"
      cols="100"
      rows="2"
    ></textarea
    ><br />
    <label for="example${WordsCount}">Example</label><br />
    <textarea
      name="example${WordsCount}"
      id="example${WordsCount}"
      cols="100"
      rows="1"
    ></textarea>
    `
    );
  });
};

/*
// TO DO
1. make model to store the data✅
2. build a function of pagination✅
3. improve the modal function to display clicked data✅
4. build a function to post a new diary (add new data to model and display it)
5. to add a function of sorting diaries
6. to add a function of editing existing data
7. to write css code to make the app responsible
*/
