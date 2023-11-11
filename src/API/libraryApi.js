/* eslint-disable no-console */

import DomContent from "../domContent";
import createFormPanel from "../registryPanel/bookForm";

let GlobalPageCount;
let GlobalBookCoverUrl;

function wrapBooks() {
  const bookWrapper = document.createElement("div");
  const wrapperFrame = document.createElement("div")

  bookWrapper.classList.add("book-wrapper");
  wrapperFrame.classList.add("wrapper-frame")

  DomContent.mainPage.appendChild(wrapperFrame)
  wrapperFrame.appendChild(bookWrapper)
  return bookWrapper;
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
  }
  else if (createFormPanel.authorInput.checkValidity() === true) {
    createFormPanel.formErrorBookName.style.opacity = "0";
  }
}

function filterAuthors(books) {
  const filteredArray = [];

  const maxElements = 20;
  for (let i = 0; i < Math.min(books.docs.length, maxElements); i++) {
    const element = books.docs[i];
    try {
      const filter = element.author_name.find(
        (e) => e === createFormPanel.authorInput.value
      );
      if (filter !== undefined) {
        filteredArray.push(element);
        // console.log("Filtered array updated:", filteredArray);
      }
    } catch (innerError) {
      console.error("Error processing element:", element, innerError);
    }
  }
  // eslint-disable-next-line no-console
  console.log("Final filtered work:", filteredArray);
  return filteredArray;
}

function addBookCover(filteredArray, wrapperFrame) {
  const bookCover = document.createElement("img");
  wrapperFrame.appendChild(bookCover);  // appending to wrapperFrame instead of bookWrapper
  GlobalBookCoverUrl = `https://covers.openlibrary.org/b/id/${filteredArray[0].cover_i}-L.jpg`;
  bookCover.src = GlobalBookCoverUrl;
  console.log("Cover Added");
}

function addPageCount(filteredArray,bookWrapper) {
  const pageCount = document.createElement("p")
  pageCount.classList.add("pagecount-container")
  bookWrapper.appendChild(pageCount)
  GlobalPageCount = filteredArray[0].number_of_pages_median;
  pageCount.innerHTML = GlobalPageCount
  console.log(`Page Count Added: ${GlobalPageCount}`);
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

async function setBookData(bookWrapper, wrapperFrame) {
  const bookData = await getBook().catch((error) => {
    console.error("Failed to load book data:", error);
  });
  const filteredArray = filterAuthors(bookData);
  if (filteredArray[0] === undefined) {
    return;
  }
  addPageCount(filteredArray,bookWrapper);
  addBookCover(filteredArray,wrapperFrame);
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
  const bookWrapper = wrapBooks();
  const wrapperFrame = bookWrapper.parentElement;
  setBookData(bookWrapper, wrapperFrame);
  DomContent.overlay.classList.remove("active");
  createFormPanel.formPanel.classList.remove("active");

  console.log("Loading...");
});

// export{GlobalPageCount,GlobalBookCoverUrl}
