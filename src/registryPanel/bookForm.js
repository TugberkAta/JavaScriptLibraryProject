import DomContent from "../domContent";

function closeNotify(){
  DomContent.errorMessage.classList.remove("active");
  DomContent.errorInfo.innerHTML = ""
}

const openButtonCreate = (function openButtonCreate() {
  const openButton = document.createElement("button");
  const openButtonIcon = document.createElement("p")

  openButton.classList.add("open-button", "normal-state");
  openButtonIcon.classList.add("open-button-icon")

  openButton.type = "button";

  DomContent.body.appendChild(openButton);
  openButton.appendChild(openButtonIcon)

  openButtonIcon.innerHTML = "+"

  return { openButton,openButtonIcon };
})();


export const createFormPanel = (function createFormPanel() {
  const bookForm = document.createElement("form");
  const formPanel = document.createElement("div");
  const closeButton = document.createElement("button");
  const formHeaderText = document.createElement("p");
  const formHeader = document.createElement("div");
  const formHeaderColor = document.createElement("div");
  const formFieldText = document.createElement("div");
  const authorLabel = document.createElement("label");
  const authorInput = document.createElement("input");
  const formErrorAuthor = document.createElement("p");
  const bookNameLabel = document.createElement("label");
  const bookNameInput = document.createElement("input");
  const formErrorBookName = document.createElement("p");
  const submitButton = document.createElement("button");

  bookForm.id = "book-form";
  bookForm.method = "post";
  formPanel.classList.add("form-panel");
  formHeader.classList.add("form-header");
  formHeaderColor.classList.add("form-header-color");
  closeButton.type = "button";
  closeButton.classList.add("close-button");
  formHeaderText.classList.add("form-header-text");
  formFieldText.classList.add("form-fields-text");
  authorLabel.htmlFor = "input-author";
  authorInput.id = "input-author";
  authorInput.name = "Author";
  authorInput.type = "text";
  formErrorAuthor.classList.add("error-message-fill-1");
  bookNameLabel.htmlFor = "input-book-name";
  bookNameInput.id = "input-book-name";
  bookNameInput.name = "Book Name";
  bookNameInput.type = "text";
  formErrorBookName.classList.add("error-message-fill-2");
  submitButton.type = "button";
  submitButton.classList.add("submit-form");

  closeButton.innerHTML = "&times";
  formHeaderText.innerText = "Book Entry";
  authorLabel.innerText = "Author";
  bookNameLabel.innerText = "Book";
  formErrorAuthor.innerText = "Please Fill This Field";
  formErrorBookName.innerText = "Please Fill This Field";
  submitButton.innerText = "Submit";

  DomContent.body.appendChild(bookForm);
  bookForm.appendChild(formPanel);
  formPanel.appendChild(formHeader);
  formHeader.appendChild(formHeaderColor);
  formHeader.appendChild(closeButton);
  formHeader.appendChild(formHeaderText);
  formPanel.appendChild(formFieldText);
  formFieldText.appendChild(authorLabel);
  formFieldText.appendChild(authorInput);
  formFieldText.appendChild(formErrorAuthor);
  formPanel.appendChild(formFieldText);
  formFieldText.appendChild(bookNameLabel);
  formFieldText.appendChild(bookNameInput);
  formFieldText.appendChild(formErrorBookName);
  formPanel.appendChild(submitButton);

  openButtonCreate.openButton.addEventListener("click", () => {
    closeNotify()
    formPanel.classList.add("active");
    DomContent.overlay.classList.add("active");
  });

  closeButton.addEventListener("click", () => {
    formPanel.classList.remove("active");
    DomContent.overlay.classList.remove("active");
  });

  return {
    submitButton,
    bookNameInput,
    authorInput,
    formPanel,
    formErrorAuthor,
    formErrorBookName,
  };
})();

export function loadingStateStart(){
  openButtonCreate.openButton.classList.add("loading-state")
  openButtonCreate.openButton.classList.remove("normal-state")
}

export function loadingStateOver(){
  openButtonCreate.openButton.classList.remove("loading-state")
  openButtonCreate.openButton.classList.add("normal-state")
}

