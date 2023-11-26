import DomContent from "../domContent";
import getAverageRGB from "../medianColorPicker/medianColorFinder";

let userLibrary = JSON.parse(localStorage.getItem("Library")) || [];
let boxShadowCounter = 0;

export function wrapBooks() {
  const mainContainer = document.createElement("div");
  const bookWrapper = document.createElement("div");
  const removeButton = document.createElement("div");

  mainContainer.classList.add("main-container");
  bookWrapper.classList.add("book-wrapper");

  removeButton.classList.add("remove-button");

  removeButton.innerHTML = "&times";

  DomContent.library.appendChild(bookWrapper);
  bookWrapper.appendChild(mainContainer);
  mainContainer.appendChild(removeButton);
  return mainContainer;
}

function addAuthorName(authorName, mainContainer) {
  const authorElement = document.createElement("p");
  authorElement.classList.add("author-container");
  mainContainer.appendChild(authorElement);
  authorElement.innerHTML = authorName;
}

function addBookName(bookName, mainContainer) {
  const bookNameElement = document.createElement("p");
  bookNameElement.classList.add("book-name-container");
  mainContainer.appendChild(bookNameElement);
  bookNameElement.innerHTML = bookName;
}

function addPageCount(pageCount, mainContainer) {
  const pageCountElement = document.createElement("p");
  pageCountElement.classList.add("pagecount-container");
  mainContainer.appendChild(pageCountElement);
  pageCountElement.innerHTML = pageCount;
}

function addBookId(idNum, bookWrapper) {
  bookWrapper.id = idNum;
}

function applyBoxShadow(element, color) {
  const boxShadowValue = `inset 0px 0px 0px 3px rgb(${color.r}, ${color.g}, ${color.b}), 0px 3px 15px 3px rgb(${color.r}, ${color.g}, ${color.b})`;
  const uniqueClassName = `hover-box-shadow-${boxShadowCounter}`;
  boxShadowCounter += 1;

  const stylesheet = document.styleSheets[0];
  const rule = `.${uniqueClassName}:hover { box-shadow: ${boxShadowValue}; }`;

  if (stylesheet.insertRule) {
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
  } else if (stylesheet.addRule) {
    stylesheet.addRule(`.${uniqueClassName}:hover`, boxShadowValue, -1);
  }

  element.classList.add(uniqueClassName);
}

function manualAdding() {
  userLibrary.forEach((book) => {
    const mainContainer = wrapBooks();
    const bookWrapper = mainContainer.parentElement;

    const bookCover = document.createElement("img");
    bookCover.crossOrigin = "anonymous";
    bookWrapper.appendChild(bookCover);
    bookCover.src = book.BookCoverUrl;
    bookCover.onload = function () {
      const medianColor = getAverageRGB(bookCover);
      applyBoxShadow(mainContainer, medianColor);
    };

    addAuthorName(book.AuthorName, mainContainer);
    addBookName(book.BookName, mainContainer);
    addPageCount(book.PageCount, mainContainer);
    addBookId(book.BookID, bookWrapper);
  });
}

function removeData(elementToRemove) {
  console.log("removing data")
  const tempUserLibrary = [];
  userLibrary.forEach((e) => {
    if (Number(elementToRemove.getAttribute("id")) !== e.BookID) {
      tempUserLibrary.push(e);
    }
  });
  userLibrary = tempUserLibrary;
  console.log(userLibrary);
  localStorage.setItem("Library", JSON.stringify(userLibrary));
}

export function removeBook() {
  const removeButtons = document.querySelectorAll(".remove-button");

  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", (e) => {
      const button = e.target;
      const elementToRemove = button.parentNode.parentNode;
      elementToRemove.parentNode.removeChild(elementToRemove);
      removeData(elementToRemove);
    });
  });
}

window.onload = function () {
  manualAdding();
  console.log(userLibrary);
  removeBook();
};
