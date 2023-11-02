import * as model from "./model.js";
import * as view from "./view.js";

// SELECTOR
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const lists = document.querySelector(".latest__contents--lists");
const modalContainer = document.querySelector(".modal__content--container");

// CONTROLER OF CLOSING MODAL
const controlModalClose = function () {
  modal.classList.remove("active");
  body.style.overflow = "visible";
};

// CONTROLER OF OPENING MODAL
const controlModalOpen = function (currentTarget) {
  let selectedDiary = model.model.find(
    (d) => d.id === Number(currentTarget.dataset.id)
  );

  let vocab = ``;

  for (let i = 0; i < selectedDiary.newWord.length; i++) {
    let code = `
    <li class="modal__vocab--item">
    <div class="modal__vocab--item--word">
      <p class="modal__vocab--item--word--text">${selectedDiary.newWord[i].word}</p>
      <p class="modal__vocab--item--word--type">(${selectedDiary.newWord[i].type})</p>
    </div>
    <p class="modal__vocab--item--meaning">
    ${selectedDiary.newWord[i].meaning}
    </p>
    <div class="modal__vocab--item--example">
      <h4 class="modal__vocab--item--example--title">
        EXAMPLE SENTENCES
      </h4>
      <p>${selectedDiary.newWord[i].example}</p>
    </div>
  </li>  
    `;

    vocab += code;
  }

  `
<li class="modal__vocab--item">
  <div class="modal__vocab--item--word">
    <p class="modal__vocab--item--word--text">literally</p>
    <p class="modal__vocab--item--word--type">(adverb)</p>
  </div>
  <p class="modal__vocab--item--meaning">
    &rarr; used to emphasize what you are saying
  </p>
  <div class="modal__vocab--item--example">
    <h4 class="modal__vocab--item--example--title">
      EXAMPLE SENTENCES
    </h4>
    <ul>
      <li>He missed that kick literally by miles.</li>
      <li>I was literally bowled over by the news.</li>
    </ul>
  </div>
</li>
  `;

  let html = `
  <button class="modal__content--container--close"></button>
 <p class="modal__date">${selectedDiary.date}</p>
 <h2 class="modal__title">${selectedDiary.title}</h2>
 <h3 class="modal__sentences--title">ORIGINAL DIARY</h3>
 <p class="modal__sentences--text">
 ${selectedDiary.text}
 </p>
 <h3 class="modal__fixed--title">FIXED DIARY</h3>
 <p class="modal__fixed--text">
 ${selectedDiary.fixedText}
 </p>
 <ul class="modal__vocab">
   <h3 class="modal__vocab--title">NEW WORDS</h3>
   ${vocab}
 </ul>
 <h3 class="modal__notes--title">NOTES</h3>
 <p class="modal__notes--text">
 ${selectedDiary.note}
 </p> 
 `;

  modalContainer.innerHTML = "";
  modalContainer.insertAdjacentHTML("afterbegin", html);

  modal.classList.add("active");
  body.style.overflow = "hidden";
  view.modalCloseHandler(controlModalClose);
};

// DISPLAY DIARY LIST
const displayList = function (currentGroupNum = 1) {
  let currentGroup;
  let html;
  let excerpt;

  if (currentGroupNum === 1) currentGroup = model.model.slice(-10);
  if (currentGroupNum > 1)
    currentGroup = model.model.slice(
      -10 * currentGroupNum,
      -10 * (currentGroupNum - 1)
    );

  lists.innerHTML = "";

  currentGroup.map((d) => {
    excerpt = d.text.split(" ").slice(0, 15).join(" ");
    html = `
        <li class="latest__contents--lists--item" data-id="${d.id}">
            <a href="#" class="latest__contents--lists--item--link">
            <p class="latest__contents--lists--item--date">${d.date}</p>
            <p class="latest__contents--lists--item--title">${d.title}</p>
            <p class="latest__contents--lists--item--excerpt">
                ${excerpt}.....(look more)
            </p>
            <p class="latest__contents--lists--item--vocab">
                <span><img src="/src/img/text.svg" alt="" /></span>
                New Words:
                <span>${d.newWord.length}</span>
            </p>
            </a>
        </li>
    `;
    lists.insertAdjacentHTML("afterbegin", html);
  });

  controlPaginationBtn();
};

//DISPLAY PAGINATION BUTTON
const controlPaginationBtn = function () {
  let maxPageNum = Math.ceil(model.model.length / 10);
  view.displayPaginationButton(model.currentGroup, maxPageNum);
};

// CONTROL PAGINATION
const controlPaginate = function (currentTarget) {
  let minPageNum = 1;
  let maxPageNum = Math.ceil(model.model.length / 10);

  if (
    currentTarget.classList.contains(
      "latest__cotents--pagination--btn--next"
    ) &&
    model.currentGroup < maxPageNum
  ) {
    model.controlCurrentGroup("add");
    displayList(model.currentGroup);
  }

  if (
    currentTarget.classList.contains(
      "latest__cotents--pagination--btn--prev"
    ) &&
    model.currentGroup > minPageNum
  ) {
    model.controlCurrentGroup("subtract");
    displayList(model.currentGroup);
  }

  controlPaginationBtn();
  view.paginate(controlPaginate);
  view.modalOpen(controlModalOpen);
};

// CONTROLER FOR ADDING NEW HANDLER
const addNewPostHandler = function () {
  let html = `
  <button class="modal__content--container--close"></button>
  <h2 class="modal__content--addNew--title">Add New Diary</h2>
  <form class="modal__content--container--form">
    <label for="title">Title</label><br />
    <input type="text" id="title" name="title" /><br />
    <label for="original">Original diary</label><br />
    <textarea
      name="original"
      id="original"
      cols="100"
      rows="6"
    ></textarea
    ><br />
    <label for="fixed">Fixed diary</label><br />
    <textarea name="fixed" id="fixed" cols="100" rows="6"></textarea
    ><br />
    <p>< New Word ></p>
    <label for="word1">Word</label><br />
    <input type="text" id="word1" name="word1" /><br />
    <label for="type1">Type</label><br />
    <select id="type1" name="type1">
      <option value="noun">noun</option>
      <option value="verb">verb</option>
      <option value="adjective">adjective</option>
      <option value="adverb">adverb</option></select
    ><br />
    <label for="meaning1">Meaning</label><br />
    <textarea
      name="meaning1"
      id="meaning1"
      cols="100"
      rows="2"
    ></textarea
    ><br />
    <label for="example1">Example</label><br />
    <textarea
      name="example1"
      id="example1"
      cols="100"
      rows="1"
    ></textarea>
    <div class="modal__content--container--form--more">
      <button class="modal__content--container--form--more--btn">
        + add more words
      </button>
    </div>
    <div class="modal__content--container--form--submit">
      <input type="submit" value="Submit" />
    </div>
  </form>
    `;

  modalContainer.innerHTML = "";
  modalContainer.insertAdjacentHTML("afterbegin", html);

  modal.classList.add("active");
  body.style.overflow = "hidden";
  view.modalCloseHandler(controlModalClose);
  view.addNewWords();
};

// INIT
const init = function () {
  displayList(1);
  controlPaginationBtn();
  view.modalOpen(controlModalOpen);
  view.paginate(controlPaginate);
  view.modalCloseHandler(controlModalClose);
  view.addNewPost(addNewPostHandler);
};
init();

//　Missing vocablary on the modal
