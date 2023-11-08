/* eslint-disable no-undef */
const myLibrary = [];
let count = 0;
let bookCount = "book-" + count;

function Book(Author, bookName, pageCount, bookCover) {
  this.Author = Author;
  this.bookName = bookName;
  this.pageCount = pageCount;
  this.bookCover = bookCover;
}

function addBookToLibrary(...theArgs) {
  myLibrary.push(...theArgs);
}

function addBookCover() {
  const book = myLibrary[myLibrary.length - 1];
  const bookCover = document.createElement("img");
  bookCover.classList = "book-cover";
  const bookWrapper = document.createElement("div");
  bookWrapper.classList = "book-wrapper";
  const mainContainer = document.createElement("div");
  const mainBackground = document.createElement("div");
  const authorContainer = document.createElement("div");
  const pageCountContainer = document.createElement("div");
  const bookNameParagraph = document.createElement("p");

  authorContainer.classList = "author-container";
  pageCountContainer.classList = "pagecount-container";
  mainBackground.classList = "main-background";
  mainContainer.classList = "main-container";

  mainContainer.appendChild(mainBackground);
  mainContainer.appendChild(authorContainer);
  mainContainer.appendChild(pageCountContainer);

  count += 1;
  bookCount = "book" + count;
  bookWrapper.setAttribute("id", bookCount);
  bookCover.src = book.bookCover;

  authorContainer.textContent = book.Author;
  bookNameParagraph.textContent = book.bookName;
  pageCountContainer.textContent = book.pageCount + " pages";

  mainBackground.appendChild(bookNameParagraph);

  bookShelf.appendChild(bookWrapper);
  bookWrapper.appendChild(mainContainer);
  bookWrapper.appendChild(bookCover);
}

const closeButton = document.querySelector(".close-button");
const bookPanel = document.querySelector(".form-panel");
const overlay = document.querySelector("#overlay");
const bookShelf = document.querySelector(".Book-shelf");
const openButton = document.querySelector(".open-button");
const submitButton = document.querySelector(".submit-form");
const errorMessageUrl = document.querySelector(".error-message-url");
const errorMessageFill1 = document.querySelector(".error-message-fill-1");
const errorMessageFill2 = document.querySelector(".error-message-fill-2");
const errorMessageFill3 = document.querySelector(".error-message-fill-3");

openButton.addEventListener("click", () => {
  bookPanel.classList.add("active");
  overlay.classList.add("active");
});

closeButton.addEventListener("click", () => {
  bookPanel.classList.remove("active");
  overlay.classList.remove("active");
});

submitButton.addEventListener("click", () => {
  if (Author.checkValidity() === false) {
    errorMessageFill1.style.opacity = "1";
    return 0;
  } else errorMessageFill1.style.opacity = "0";
  if (bookName.checkValidity() === false) {
    errorMessageFill2.style.opacity = "1";
    return 0;
  }
  errorMessageFill2.style.opacity = "0";
  if (pageCount.checkValidity() === false) {
    errorMessageFill3.style.opacity = "1";
    return 0;
  }
  errorMessageFill3.style.opacity = "0";
  if (bookCover.checkValidity() === false) {
    errorMessageUrl.style.opacity = "1";
    return 0;
  }
  newBook = new Book(
    Author.value,
    bookName.value,
    pageCount.value,
    bookCover.value
  );
  addBookToLibrary(newBook);
  addBookCover();
  clearForms();
  bookPanel.classList.remove("active");
});

addBookToLibrary(
  new Book(
    "Kobo Abe",
    "Woman In The Dunes",
    "256",
    "https://m.media-amazon.com/images/I/91Whl6nPuTL._SY522_.jpg"
  )
);
addBookCover();

addBookToLibrary(
  new Book(
    "Tim O'Brien",
    "The Things They Carried",
    "233",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1424663847i/133518.jpg"
  )
);
addBookCover();

function clearForms() {
  Author.value = "";
  bookName.value = "";
  pageCount.value = "";
  bookCover.value = "";
  overlay.classList.remove("active");
}

const exampleBook1 = document.getElementById("book1");
const exampleBook2 = document.getElementById("book2");
const secondField = document.querySelector(".second-field-rightside");

secondField.appendChild(exampleBook1);
secondField.appendChild(exampleBook2);
