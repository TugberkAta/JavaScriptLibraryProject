import DomContent from "../domContent";

function manualAdding(ImageUrl, PageNum, Name) {
    const bookWrapper = document.createElement("div");
    const mainContainer = document.createElement("div");
  
    mainContainer.classList.add("main-container");
    bookWrapper.classList.add("book-wrapper");
  
    bookWrapper.appendChild(mainContainer);
  
    const bookCover = document.createElement("img");
    bookWrapper.appendChild(bookCover);
    bookCover.src = ImageUrl;
  
    const pageCount = document.createElement("p");
    pageCount.classList.add("pagecount-container");
    pageCount.innerText = PageNum;
    mainContainer.appendChild(pageCount);
  
    DomContent.mainPage.appendChild(bookWrapper);
    
    const authorName = document.createElement("p") 
    authorName.classList.add("author-container")
    authorName.innerHTML = Name;
    mainContainer.appendChild(authorName)
    
  }
  
  manualAdding("https://covers.openlibrary.org/b/id/8612373-L.jpg", 340);
  manualAdding("https://covers.openlibrary.org/b/id/6576330-L.jpg", 239)

