/* eslint-disable consistent-return */
/* eslint-disable no-console */

import DomContent from "../domContent";
import { createFormPanel, loadingStateStart, loadingStateOver } from "../registryPanel/bookForm";
import getAverageRGB from "../medianColorPicker/medianColorFinder";
import {wrapBooks}  from "../ManulAdd/manulBooks";

let boxShadowCounter = 0;

const userLibrary = JSON.parse(localStorage.getItem("Library")) || [];
let GlobalPageCount;
let GlobalAuthorName;
let GlobalBookName;
let GlobalBookCoverUrl;
let MedianColor;

function Book(AuthorName, BookName, PageCount, BookCoverUrl) {
  this.AuthorName = AuthorName;
  this.BookName = BookName;
  this.PageCount = PageCount;
  this.BookCoverUrl = BookCoverUrl;
}

function addBookToLibrary(...args) {
  userLibrary.push(...args);
}

function notifyError(message) {
  DomContent.errorInfo.innerHTML = message;

  DomContent.errorMessage.appendChild(DomContent.errorInfo);
  DomContent.errorMessage.classList.add("active");
  return DomContent.errorInfo;
}

function closeNotify() {
  DomContent.errorMessage.classList.remove("active");
  DomContent.errorInfo.innerHTML = "";
}

DomContent.errorMessageClose.addEventListener("click", () => {
  closeNotify();
});

function capitalizeWords(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

    let apostropheIndex = splitStr[i].indexOf("'");
    while (apostropheIndex !== -1) {
      if (apostropheIndex < splitStr[i].length - 1) {
        splitStr[i] =
          splitStr[i].substring(0, apostropheIndex + 1) +
          splitStr[i].charAt(apostropheIndex + 1).toUpperCase() +
          splitStr[i].substring(apostropheIndex + 2);
      }
      apostropheIndex = splitStr[i].indexOf("'", apostropheIndex + 1);
    }
  }
  return splitStr.join(" ");
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

async function addBookCover(filteredArray, bookWrapper, mainContainer) {
  const bookCover = document.createElement("img");
  bookCover.crossOrigin = "anonymous";
  bookWrapper.appendChild(bookCover);
  const BookCoverUrl = `https://covers.openlibrary.org/b/id/${filteredArray[0].cover_i}-L.jpg`;
  bookCover.src = BookCoverUrl;
  GlobalBookCoverUrl = BookCoverUrl;
  bookCover.onload = function () {
    MedianColor = getAverageRGB(bookCover);
    applyBoxShadow(mainContainer, MedianColor);
  };

  console.log("Cover Added");
}

function addPageCount(filteredArray, mainContainer) {
  const pageCount = document.createElement("p");
  pageCount.classList.add("pagecount-container");
  mainContainer.appendChild(pageCount);
  GlobalPageCount = filteredArray[0].number_of_pages_median;
  pageCount.innerHTML = GlobalPageCount;
  console.log(`Page Count Added: ${GlobalPageCount}`);
}

function addAuthorName(filteredArray, mainContainer) {
  const authorName = document.createElement("p");
  authorName.classList.add("author-container");
  mainContainer.appendChild(authorName);
  GlobalAuthorName = filteredArray[0].author_name;
  authorName.innerHTML = GlobalAuthorName;
  console.log(`Author name Added ${GlobalAuthorName}`);
}

function addBookName(filteredArray, mainContainer) {
  const bookName = document.createElement("p");
  bookName.classList.add("book-name-container");
  mainContainer.appendChild(bookName);
  GlobalBookName = filteredArray[0].title;
  bookName.innerHTML = GlobalBookName;
  console.log(`Author name Added ${GlobalBookName}`);
}

function clearForms() {
  createFormPanel.authorInput.value = "";
  createFormPanel.bookNameInput.value = "";
}

function checkValidity() {
  createFormPanel.authorInput.required = true;
  createFormPanel.bookNameInput.required = true;

  if (createFormPanel.authorInput.checkValidity() === false) {
    createFormPanel.formErrorAuthor.style.opacity = "1";
  } else if (createFormPanel.authorInput.checkValidity() === true) {
    createFormPanel.formErrorAuthor.style.opacity = "0";
  }

  if (createFormPanel.bookNameInput.checkValidity() === false) {
    createFormPanel.formErrorBookName.style.opacity = "1";
  } else if (createFormPanel.authorInput.checkValidity() === true) {
    createFormPanel.formErrorBookName.style.opacity = "0";
  }
}

function filterData(books) {
  const filteredArray = [];
  const authorInputCapital = capitalizeWords(createFormPanel.authorInput.value);

  const maxElements = Math.min(30, books.docs.length);
  for (let i = 0; i < maxElements; i += 1) {
    const element = books.docs[i];

    try {
      const isAuthorMatch = element.author_name.includes(authorInputCapital);

      const isAlternativeMatch = element.author_alternative_name
        ? element.author_alternative_name.some(
            (altName) => altName === authorInputCapital
          )
        : false;

      const isBookCoverExist = element.cover_i;

      const isPageCountExist = element.number_of_pages_median;

      if (
        (isAuthorMatch || isAlternativeMatch) &&
        isBookCoverExist != null &&
        isPageCountExist != null
      ) {
        filteredArray.push(element);
      }
    } catch (innerError) {
      console.error("Error processing element:", element, innerError);
      loadingStateOver()
    }
  }

  console.log("Final filtered array:", filteredArray);
  return filteredArray;
}

async function getBook() {
  try {
    console.log("Making fetch call");
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${createFormPanel.bookNameInput.value} + ${createFormPanel.authorInput.value}`
    );
    console.log("Fetch call successful");
    const books = await response.json();
    console.log("Books parsed");
    return books;
  } catch (error) {
    console.error("Error caught:", error);
    loadingStateOver()
  }
}

async function setBookData() {
  loadingStateStart()
  const bookData = await getBook().catch((error) => {
    console.error("Failed to load book data:", error);
    notifyError("Failed to load book data");
    loadingStateOver()
  });
  const filteredArray = filterData(bookData);
  if (filteredArray[0] === undefined) {
    clearForms();
    notifyError("No matches found. Please refine your search and try again.");
    loadingStateOver()
    return 0;
  }
  const mainContainer = wrapBooks();
  const bookWrapper = mainContainer.parentElement;
  addAuthorName(filteredArray, mainContainer);
  addPageCount(filteredArray, mainContainer);
  addBookName(filteredArray, mainContainer);
  addBookCover(filteredArray, bookWrapper, mainContainer);

  const newBook = new Book(
    GlobalAuthorName,
    GlobalBookName,
    GlobalPageCount,
    GlobalBookCoverUrl
  );

  addBookToLibrary(newBook);
  localStorage.setItem("Library", JSON.stringify(userLibrary));
  clearForms();
  loadingStateOver()
}

createFormPanel.submitButton.addEventListener("click", () => {
  closeNotify();
  checkValidity();
  if (
    createFormPanel.authorInput.checkValidity() === false ||
    createFormPanel.bookNameInput.checkValidity() === false
  ) {
    return 0;
  }
  createFormPanel.authorInput.required = false;
  createFormPanel.bookNameInput.required = false;
  setBookData();
  DomContent.overlay.classList.remove("active");
  createFormPanel.formPanel.classList.remove("active");
});

export default userLibrary;
