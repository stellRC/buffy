const form = document.querySelector("form");
const pathList = document.getElementById("pathList");
const batList = document.getElementById("bat");
const path = form.elements.path;
const buffyImg = document.getElementById("buffyImg");

const shows = ["buffy", "angel", "true blood", "vampire diaries", "originals"];
const quote = ["kicking", "ass", "is", "comfort", "food"];
const tact = [
  "tact",
  "is",
  "just",
  "not",
  "saying",
  "true",
  "stuff",
  "ill",
  "pass",
];

let thisVal = "~";
let currentShow = 0;
let currentQuote = 0;
let chosenPath = 0;
let validPath = false;

const Command = {
  HELP: "he",
  LS: "ls",
  CD: "cd",
  BUFFY: "bu",
  CLEAR: "cl",
  BACK: "..",
  BAT: "ba",
  WOW: "wo",
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  buffyImg.classList.remove("background");

  checkCommand(path.value);

  removeTextElement();

  path.value = "";
});

function checkCommand(pathVal) {
  pathVal = pathVal.toLowerCase();
  let newCommand = pathVal.slice(0, 2);
  let newPath = pathVal.substring(3);

  switch (newCommand) {
    case Command.HELP:
      addInvalidText(
        " are valid commands",
        "cd, ls, help, clear, bat, wow, and buffy"
      );
      break;
    case Command.LS:
      processLS();
      break;
    case Command.CD:
      processCD(newPath);
      break;
    case Command.BUFFY:
      addInvalidText("", "If the apocalypse comes, beep me");
      break;
    case Command.WOW:
      addInvalidText("", "FROG EGGS");
      break;
    case Command.CLEAR:
      removeAllChildren();
      resetPath();
      break;
    case Command.BAT:
      processBat();
      addInvalidText(
        "",
        "Recording bat sonar is something soothingly akin to having one's teeth drilled"
      );
      break;
    default:
      addInvalidText(" not recognized", pathVal);
      resetPath();
      break;
  }
}

function processCD(newPath) {
  if (newPath == Command.BACK) {
    if (currentQuote >= 1 || currentShow >= 1) {
      newPath = processBack();
      validPath = true;
      console.log("cat");
    }
  } else if (
    newPath == shows[currentShow] &&
    (chosenPath == 0 || chosenPath == 1)
  ) {
    chosenPath = 1;
    currentShow++;
    validPath = true;
  } else if (
    newPath == quote[currentQuote] &&
    (chosenPath == 0 || chosenPath == 2)
  ) {
    chosenPath = 2;
    currentQuote++;
    validPath = true;
  }

  if (validPath == true) {
    addTextElement(newPath, thisVal);
    if (newPath != "") {
      thisVal += "/" + newPath;
    }
  } else {
    addInvalidText(" not recognized", path.value);
  }

  validPath = false;
}

function processBat() {
  let newBat = document.createElement("img");
  newBat.classList.add("flying-anim");
  newBat.src = "https://media1.giphy.com/media/0xR7MUO0hJfWtco7C6/giphy.gif";
  batList.appendChild(newBat);
}

function processBack() {
  let newPath = "";

  if (chosenPath == 1) {
    currentShow--;

    for (let i = 0; i < currentShow; i++) {
      thisVal = "/" + shows[i];
    }
  } else if (chosenPath == 2) {
    currentQuote--;

    for (let i = 0; i < currentQuote; i++) {
      thisVal = "/" + quote[i];
    }
  }

  return newPath;
}

function processLS() {
  if (currentQuote >= 5 || currentShow >= 5) {
    addInvalidText("", "THE WHO WHATTING HOW WITH HUH?!");
    resetPath();
  } else if (chosenPath == 0) {
    addInvalidText("/", shows[currentShow]);
    addInvalidText("/", quote[currentQuote]);
  } else if (chosenPath == 1) {
    addInvalidText("/", shows[currentShow]);
  } else {
    addInvalidText("/", quote[currentQuote]);
  }
}

function resetPath() {
  thisVal = "~";
  chosenPath = 0;
  currentQuote = 0;
  currentShow = 0;
}

function addTextElement(pathVal, prevValue) {
  let textRow = document.createElement("li");
  textRow.classList.add("flex-row");

  let blueText = document.createElement("span");
  blueText.innerHTML = "fire06@buffy:";
  blueText.classList.add("blue-text");

  let greenText = document.createElement("span");
  let newPath = prevValue;
  if (pathVal != "") {
    newPath += "/" + pathVal;
  }

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
