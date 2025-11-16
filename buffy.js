const form = document.querySelector("form");
const pathList = document.getElementById("pathList");
const path = form.elements.path;
const buffyImg = document.getElementById("buffyImg");
let thisVal = "~";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  buffyImg.classList.remove("background");

  checkText(path.value);
  removeTextElement();

  thisVal += "/" + path.value;
  path.value = "";
});

function checkText(pathVal) {
  let command = pathVal.slice(0, 2);

  if (command == "cd") {
    if (pathVal.length > 2) {
      let newPath = pathVal.substring(3);
      addTextElement(newPath, thisVal);
    }
  } else if (command == "ls") {
    addTextElement("Frog Eggs", thisVal);
  } else {
    addInvalidText("not recognized", thisVal);
  }
}

function addTextElement(pathVal, prevValue) {
  let textRow = document.createElement("li");
  textRow.classList.add("flex-row");

  let blueText = document.createElement("span");
  blueText.innerHTML = "fire06@buffy:";
  blueText.classList.add("blue-text");

  let greenText = document.createElement("span");
  let newPath = prevValue + "/" + pathVal;

  if (newPath.length > 12) thisVal = "~";

  greenText.innerHTML = newPath;
  greenText.classList.add("green-text");

  textRow.appendChild(blueText);
  textRow.appendChild(greenText);
}

function addInvalidText(pathVal) {
  let textRow = document.createElement("li");
  textRow.classList.add("flex-row");

  let errorText = document.createElement("span");
  errorText.innerHTML = pathVal;
  errorText.classList.add("red-text");
  textRow.appendChild(errorText);
  pathList.appendChild(textRow);
}

function removeTextElement() {
  if (pathList.childElementCount > 4) pathList.firstElementChild.remove();
}
