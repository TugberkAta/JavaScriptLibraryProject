/* eslint-disable no-console */

import DomContent from "../domContent";
import createFormPanel from "../registryPanel/bookForm";

let GlobalPageCount;
let GlobalBookCoverUrl;

function clearForms() {
  createFormPanel.authorInput.value = "";
  createFormPanel.bookNameInput.value = "";
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

function addBookCover(filteredArray) {
  const bookCover = document.createElement("img");
  DomContent.mainPage.appendChild(bookCover);
  GlobalBookCoverUrl = `https://covers.openlibrary.org/b/id/${filteredArray[0].cover_i}-L.jpg`;
  bookCover.src = GlobalBookCoverUrl;
  console.log("Cover Added");
}

function addPageCount(filteredArray) {
  GlobalPageCount = filteredArray[0].number_of_pages_median;
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

async function setBookData() {
  const bookData = await getBook().catch((error) => {
    console.error("Failed to load book data:", error);
  });
  const filteredArray = filterAuthors(bookData);
  if (filteredArray[0] === undefined){
    return
  }
  addPageCount(filteredArray);
  addBookCover(filteredArray);
  clearForms();
}

createFormPanel.submitButton.addEventListener("click", () => {
  setBookData();
  DomContent.overlay.classList.remove("active");
  createFormPanel.formPanel.classList.remove("active");

  console.log("Loading...");
});

// export{GlobalPageCount,GlobalBookCoverUrl}
