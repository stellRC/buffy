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

  path.value = "";
});

function checkText(pathVal) {
  let command = pathVal.slice(0, 2);

  if (command == "cd") {
    if (pathVal.length > 2) {
      let newPath = pathVal.substring(3);
      addTextElement(newPath, thisVal);
      thisVal += "/" + newPath;
    }
  } else if (command == "ls") {
    addInvalidText("Buffy may still be buffering", "Check back later...");
  } else {
    if (pathVal == "clear") {
      removeAllChildren();
    } else if (pathVal == "help") {
      addInvalidText(" are valid commands", "cd, ls, help, clear, and buffy");
    } else if (pathVal == "buffy" || pathVal == "Buffy") {
      addInvalidText("", "If the apocalypse comes, beep me");
    } else {
      addInvalidText(" not recognized", path.value);
    }
    thisVal = "~";
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
  console.log("cow");

  if (newPath.length > 12) thisVal = "~";

  greenText.innerHTML = newPath;
  greenText.classList.add("green-text");

  textRow.appendChild(blueText);
  textRow.appendChild(greenText);
  pathList.appendChild(textRow);
}

function addInvalidText(msg, pathVal) {
  let textRow = document.createElement("li");
  textRow.classList.add("flex-row");

  let errorText = document.createElement("span");
  errorText.innerHTML = "$ " + pathVal + msg;
  errorText.classList.add("red-text");
  textRow.appendChild(errorText);
  pathList.appendChild(textRow);
}

function removeTextElement() {
  if (pathList.childElementCount > 4) pathList.firstElementChild.remove();
}

function removeAllChildren() {
  while (pathList.firstElementChild) {
    pathList.lastElementChild.remove();
  }
}
