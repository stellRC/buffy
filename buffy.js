const form = document.querySelector("form");
const pathList = document.getElementById("pathList");
const batList = document.getElementById("bat");
const path = form.elements.path;
const buffyImg = document.getElementById("buffyImg");

const shows = ["buffy", "angel", "true blood", "vampire diaries", "originals"];
const quote = ["kicking", "ass", "is", "comfort", "food"];
const cheese = [
  "i",
  "wear",
  "the",
  "cheese",
  "it",
  "does",
  "not",
  "wear",
  "me",
];

const vamp = [
  "Vampire bats do not suck blood. They make a small incision and lap up the blood of their hosts. ",
  "Vampire bats have fewer teeth than any other bat because they do not have to chew their food. ",
  "Recording bat sonar is something soothingly akin to having one's teeth drilled. ",
  "He can transform himself to wolf...he can be as bat. ",
  "Goodnight, gentlemen. Don't let the vampires get you. ",
];

const buffyQuote = [
  "I may be dead, but I'm still pretty.",
  "If the apocalypse comes, beep me",
  "Okay. I'm cookie dough... I'm not done baking. I'm not finished becoming whoever the hell it is I'm gonna turn out to be.",
  "It looks dead. It smells dead. Yet it's moving around. That's interesting.",
  "The hardest thing in this world is to live in it.",
  "You were myth-taken!",
  "Excuse me, I have to call everyone I have ever met",
  "Well I’m not exactly quaking in my stylish yet affordable boots",
  "Don't speak Latin in front of the books.",
  "I was being patient, but it took too long!",
  "If nothing we do matters, then all that matters is what we do.",
  "I'd call that a radical interpretation of the text.",
  "You’re logic doesn’t resemble our Earth logic",
  "You’re not the brightest god in the heavens, are you?",
  "I swear one of these days you're gonna wake up in a coma...",
  "They got the mustard out",
  "I swear that hydrant wasn’t there!",
  "A doodle. I do doodle. You too. You do doodle, too.",
  "There’s a party in my eye socket and everyone’s invited",
  "See? Now we're communicating.",
  "I'm afraid you and your buddies are going to have to come back and be killed by Buffy later.",
  "Bag of knives!",
  "I've got it covered from A to Z - from 'axe' to... 'zee other axe'",
  "I'm nice to meet!",
];

let thisVal = "~";

let currentIndex = 0;
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
        "cd, cd .., ls, help, clear, bat, wow, and buffy"
      );
      break;
    case Command.LS:
      processLS();
      break;
    case Command.CD:
      processCD(newPath);
      break;
    case Command.BUFFY:
      let buffyRand = getRandomInt(buffyQuote.length);
      addInvalidText("", buffyQuote[buffyRand]);
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
      let rand = getRandomInt(vamp.length);
      addInvalidText("Bat count: " + batList.childElementCount, vamp[rand]);
      break;
    default:
      addInvalidText(" not recognized", pathVal);
      resetPath();
      break;
  }
}

function processCD(newPath) {
  if (newPath == Command.BACK) {
    if (currentIndex >= 2) {
      newPath = processBack();
    } else {
      resetPath();
      newPath = "";
    }
    validPath = true;
  } else if (
    newPath == shows[currentIndex] &&
    (chosenPath == 0 || chosenPath == 1)
  ) {
    chosenPath = 1;

    currentIndex++;
    validPath = true;
  } else if (
    newPath == quote[currentIndex] &&
    (chosenPath == 0 || chosenPath == 2)
  ) {
    chosenPath = 2;
    currentIndex++;
    validPath = true;
  } else if (
    newPath == cheese[currentIndex] &&
    (chosenPath == 0 || chosenPath == 3)
  ) {
    chosenPath = 3;
    currentIndex++;
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
  currentIndex--;
  if (chosenPath == 1) {
    for (let i = 0; i < currentIndex; i++) {
      thisVal = "/" + shows[i];
    }
  } else if (chosenPath == 2) {
    for (let i = 0; i < currentIndex; i++) {
      thisVal = "/" + quote[i];
    }
  } else if (chosenPath == 3) {
    for (let i = 0; i < currentIndex; i++) {
      thisVal = "/" + cheese[i];
    }
  }

  return newPath;
}

function processLS() {
  if (
    (chosenPath == 1 && currentIndex >= shows.length) ||
    (chosenPath == 2 && currentIndex >= quote.length) ||
    (chosenPath == 3 && currentIndex >= cheese.length)
  ) {
    addInvalidText("", "THE WHO WHATTING HOW WITH HUH?!");
    resetPath();
  } else if (chosenPath == 0) {
    addInvalidText("/", shows[currentIndex]);
    addInvalidText("/", quote[currentIndex]);
    addInvalidText("/", cheese[currentIndex]);
  } else if (chosenPath == 1) {
    addInvalidText("/", shows[currentIndex]);
  } else if (chosenPath == 2) {
    addInvalidText("/", quote[currentIndex]);
  } else if (chosenPath == 3) {
    addInvalidText("/", cheese[currentIndex]);
  }
}

function resetPath() {
  thisVal = "~";
  chosenPath = 0;
  currentIndex = 0;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
