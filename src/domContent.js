const DomContent = (function DomContent(){
    const body = document.querySelector("body");
    const mainPage = document.createElement("div")
    const library = document.createElement("div")
    const overlay = document.createElement("div")
    const errorMessage = document.createElement("div")
    const errorMessageClose = document.createElement("button")
    const errorMessageIcon = document.createElement("div")
    const errorInfo = document.createElement("p");

    mainPage.classList.add("main-page")
    overlay.classList.add("overlay")
    library.classList.add("library")
    errorMessage.classList.add("error-pop-up")
    errorMessageClose.classList.add("error-message-close")
    errorMessageIcon.classList.add("error-message-icon")

    errorMessageClose.innerHTML = "&times";
    errorMessageIcon.innerHTML = "!"

    body.appendChild(mainPage)
    body.appendChild(overlay)
    mainPage.appendChild(library)
    body.appendChild(errorMessage)
    errorMessage.appendChild(errorMessageClose)
    errorMessage.appendChild(errorMessageIcon)

    return {body,mainPage,overlay,library,errorMessage, errorMessageClose, errorInfo}
})()

export default DomContent