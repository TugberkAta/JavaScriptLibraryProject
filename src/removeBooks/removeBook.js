import userLibrary from "../API/libraryApi";
import manualAdding from "../ManulAdd/manulBooks";
import DomContent from "../domContent";

export default function detectBookOnClick() {
  const bookWrapper = document.querySelectorAll(".book-wrapper");
  console.log("Found bookWrapper elements:", bookWrapper.length);

  bookWrapper.forEach((e, index) => {
    e.addEventListener("click", () => {
      console.log(`bookWrapper ${index} clicked`);
      userLibrary.splice(index, 1);
      localStorage.setItem("Library", JSON.stringify(userLibrary));
      DomContent.library.innerHTML = "";
      manualAdding();
    });
  });
}