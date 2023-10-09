const myLibrary = [];
var count = 0;
var bookCount = "book-" + count 

function Book(Author, bookName, pageCount,bookCover) {
    this.Author = Author
    this.bookName = bookName
    this.pageCount = pageCount
    this.bookCover = bookCover
}


function addBookToLibrary(...theArgs){
    myLibrary.push(...theArgs)
}



function addBookCover(){
    const book = myLibrary[myLibrary.length - 1]; 
    const bookCover = document.createElement("img")
    bookCover.classList = "book-cover"
    const bookWrapper = document.createElement("div")
    bookWrapper.classList = "book-wrapper"
    const mainContainer = document.createElement("div")
    const mainBackground = document.createElement("div")
    const authorContainer = document.createElement("div") 
    const pageCountContainer = document.createElement("div")
    const bookNameParagraph = document.createElement("p")

    authorContainer.classList = "author-container"
    pageCountContainer.classList = "pagecount-container"
    mainBackground.classList = "main-background"
    mainContainer.classList = "main-container"
    
    mainContainer.appendChild(mainBackground)
    mainContainer.appendChild(authorContainer)
    mainContainer.appendChild(pageCountContainer)

    count += 1
    bookCount = "book#" + count 
    bookWrapper.setAttribute("id",bookCount)
    bookCover.src = book.bookCover

    authorContainer.textContent = book.Author
    bookNameParagraph.textContent = book.bookName
    pageCountContainer.textContent = book.pageCount + " pages"
    
    mainBackground.appendChild(bookNameParagraph)

    bookShelf.appendChild(bookWrapper)
    bookWrapper.appendChild(mainContainer)
    bookWrapper.appendChild(bookCover)
}

const body = document.body
const closeButton = document.querySelector(".close-button")
const bookForm = document.querySelector("#bookForm")
const bookPanel = document.querySelector(".form-panel")
const overlay = document.querySelector("#overlay")
const bookShelf = document.querySelector(".Book-shelf") 
const openButton = document.querySelector(".open-button")
const submitButton = document.querySelector(".submit-form")


openButton.addEventListener("click",()=>{
    bookPanel.classList.add("active");
    overlay.classList.add("active")
})

closeButton.addEventListener("click",()=>{
    bookPanel.classList.remove("active")
    overlay.classList.remove("active")
})

submitButton.addEventListener("click",()=>{
    if(Author.value === "" || bookName.value === "" || pageCount.value === "" || bookCover.value === "" || bookCover.checkValidity() === false){
         return 0
    }
    newBook = new Book(Author.value, bookName.value, pageCount.value, bookCover.value)
    addBookToLibrary(newBook)
    addBookCover()
    clearForms()
    bookPanel.classList.remove("active")
})

addBookToLibrary(new Book("Kobo Abe", "Woman In The Dunes", "256", "https://m.media-amazon.com/images/I/91Whl6nPuTL._SY522_.jpg"))
addBookCover()

addBookToLibrary(new Book("Tim O'Brien", "The Things They Carried", "233", "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1424663847i/133518.jpg"))
addBookCover()

function clearForms(){
    Author.value = ""
    bookName.value = ""
    pageCount.value = ""
    bookCover.value = ""
    overlay.classList.remove("active")
}

