const DomContent = (function DomContent(){
    const body = document.querySelector("body");
    const mainPage = document.createElement("div")
    const overlay = document.createElement("div")
    const library = document.createElement("div")

    overlay.classList.add("overlay")
    library.classList.add("library")

    body.appendChild(mainPage)
    body.appendChild(overlay)
    mainPage.appendChild(library)
    return {body,mainPage,overlay,library}
})()

export default DomContent