/* eslint-disable no-console */

import DomContent from "../domContent";
import createFormPanel from "../registryPanel/bookForm";

let GlobalPageCount;
let GlobalBookCoverUrl;
let GlobalAuthorName;
let GlobalBookName;

function capitalizeWords(str){
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

function wrapBooks() {
  const mainContainer = document.createElement("div");
  const bookWrapper = document.createElement("div");

  mainContainer.classList.add("main-container");
  bookWrapper.classList.add("book-wrapper");

  DomContent.mainPage.appendChild(bookWrapper);
  bookWrapper.appendChild(mainContainer);
  return mainContainer;
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

function addBookCover(filteredArray, bookWrapper) {
  const bookCover = document.createElement("img");
  bookWrapper.appendChild(bookCover);
  GlobalBookCoverUrl = `https://covers.openlibrary.org/b/id/${filteredArray[0].cover_i}-L.jpg`;
  bookCover.src = GlobalBookCoverUrl;
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

function addBookName(filteredArray, mainContainer){
  const bookName = document.createElement("p");
  bookName.classList.add("book-name-container")
  mainContainer.appendChild(bookName)
  GlobalBookName = filteredArray[0].title;
  bookName.innerHTML = GlobalBookName
  console.log(`Author name Added ${GlobalBookName}`);
}

function filterAuthors(books) {
  const filteredArray = [];
  const authorInputCapital = capitalizeWords(createFormPanel.authorInput.value);

  const maxElements = Math.min(30, books.docs.length); 
  for (let i = 0; i < maxElements; i += 1) {
    const element = books.docs[i];

    try {
      const isAuthorMatch = element.author_name.includes(authorInputCapital);

      const isAlternativeMatch = element.author_alternative_name.some(
        (altName) => altName === authorInputCapital
      );

      const isBookCoverExist = element.cover_i

      if (isAuthorMatch || isAlternativeMatch && isBookCoverExist != null) {
        filteredArray.push(element);
      }
    } catch (innerError) {
      console.error("Error processing element:", element, innerError);
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
  }
}

async function setBookData() {
  const bookData = await getBook().catch((error) => {
    console.error("Failed to load book data:", error);
  });
  const filteredArray = filterAuthors(bookData);
  if (filteredArray[0] === undefined) {
    clearForms();
    return 0;
  }
  const mainContainer = wrapBooks();
  const bookWrapper = mainContainer.parentElement;
  addAuthorName(filteredArray, mainContainer);
  addPageCount(filteredArray, mainContainer);
  addBookName(filteredArray, mainContainer);
  addBookCover(filteredArray, bookWrapper);
  clearForms();
}

createFormPanel.submitButton.addEventListener("click", () => {
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

  console.log("Loading...");
});

// export{GlobalPageCount,GlobalBookCoverUrl}
