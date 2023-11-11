const DomContent = (function DomContent(){
    const body = document.querySelector("body");
    const mainPage = document.createElement("div")
    const overlay = document.createElement("div")

    mainPage.classList.add("main-page")
    overlay.classList.add("overlay")

    body.appendChild(mainPage)
    body.appendChild(overlay)
    return {body,mainPage,overlay}
})()

export default DomContent