let nameGame = "تخمين الكلمة";
document.querySelector("h1").innerHTML = nameGame;
document.querySelector(
  "footer"
).innerHTML = `${nameGame} هذه اللعبة من تصميم ابو عمرو`;
document.title = nameGame;

const inputs = document.querySelector(".inputs");

let NumberOftrains = 5;
let NumberOfLetter = 4;
let NumberOfattempts = 1;
let NumberOfHint = 1;

const wordToGuess = [
  "بشرى",
  "اريج",
  "محمد",
  "احمد",
  "رنيم",
  "محمد",
  "قيصر",
  "رفان",
  "هاشم",
  "نوال",
  "عمرو",
  "وليد",
  "عماد",
  "زياد",
  "مريم",
  "معاذ",
];
const guessWord =
  wordToGuess[Math.floor(Math.random() * wordToGuess.length)].toUpperCase();
console.log(guessWord);

const message = document.querySelector(".message");
document.querySelector(".hint > span").innerHTML = `${NumberOfHint}`;
function generateInputs() {
  for (let i = 1; i <= NumberOftrains; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `محاولة ${i}`;
    tryDiv.style.direction = "rtl";
    if (i !== 1) tryDiv.classList.add("hidden-inputs");
    for (let j = 1; j <= NumberOfLetter; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.id = `try${i}-guess${j}`;
      input.setAttribute("maxLength", "1");
      tryDiv.appendChild(input);
    }
    inputs.appendChild(tryDiv);
  }
  inputs.children[0].children[0].focus();

  const inputHidden = document.querySelectorAll(".hidden-inputs input");
  inputHidden.forEach((input) => {
    input.disabled = true;
  });
  const allInput = document.querySelectorAll("input");

  allInput.forEach((input, index) => {
    input.addEventListener("input", () => {
      // input.value = input.value.toUpperCase();
      nextIndex = allInput[index + 1];
      if (nextIndex) nextIndex.focus();
    });
    input.addEventListener("keydown", (event) => {
      const eventIndex = Array.from(allInput).indexOf(event.target);
      if (event.key === "ArrowLeft") {
        const nextEvent = allInput[eventIndex + 1];
        if (nextEvent) nextEvent.focus();
      }
      if (event.key === "ArrowRight") {
        const prevEvent = allInput[eventIndex - 1];
        if (prevEvent) prevEvent.focus();
      }
    });
  });
}

const buttonClick = document.querySelector(".check");
buttonClick.addEventListener("click", handleGuesse);
function handleGuesse() {
  let successGuess = true;
  for (let i = 1; i <= NumberOfLetter; i++) {
    let getInput = document.querySelector(`#try${NumberOfattempts}-guess${i}`);
    let letter = getInput.value;
    let getWordRandom = guessWord[i - 1];
    if (letter === getWordRandom) {
      getInput.classList.add("in-place");
      getInput.style.backgroundColor = "orangered";
      getInput.style.color = "white";
    } else if (guessWord.includes(letter) && letter !== "") {
      getInput.classList.add("not-in-place");
      getInput.style.backgroundColor = "blue";
      getInput.style.color = "white";

      successGuess = false;
    } else {
      getInput.classList.add("no");
      getInput.style.backgroundColor = "#333";
      getInput.style.color = "white";
      successGuess = false;
    }
  }
  if (successGuess) {
    buttonClick.disabled = true;
    hint.disabled = true;
    if (NumberOfHint === 1) {
      message.innerHTML = `احسنت لقد فزت بتخمين كلمة <span>${guessWord}</span> دون مساعدة`;
    } else {
      message.innerHTML = `لقد فزت بتخمين كلمة <span>${guessWord}</span>`;
    }

    let allInput = document.querySelectorAll("input");
    allInput.forEach((input) => {
      input.disabled = true;
    });
  } else {
    const currentInputs = document.querySelectorAll(
      `.try-${NumberOfattempts} input`
    );
    currentInputs.forEach((input) => {
      input.disabled = true;
    });

    NumberOfattempts++;

    if (NumberOfattempts > NumberOftrains) {
      buttonClick.disabled = true;
      hintButton.disabled = true;

      message.innerHTML = `لقد فشلت بتخمين كلمة <span>${guessWord}</span>`;
      return;
    }
    let nextCurrent = document.querySelectorAll(
      `.try-${NumberOfattempts} input`
    );

    nextCurrent.forEach((input) => {
      input.disabled = false;
    });
    nextCurrent[0].focus();
  }
}

let hint = document.querySelector(".hint");
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);
function getHint() {
  if (NumberOfHint > 0) {
    NumberOfHint--;
    document.querySelector(".hint span").innerHTML = NumberOfHint;
  }
  if (NumberOfHint === 0) {
    hintButton.disabled = true;
  }
  const inputNotDisabled = document.querySelectorAll("input:not([disabled])");
  const inputEmpty = Array.from(inputNotDisabled).filter(
    (input) => input.value === ""
  );
  if (inputEmpty.length > 0) {
    const randomEmpty = Math.floor(Math.random() * inputEmpty.length);
    const inputIndex = inputEmpty[randomEmpty];
    const indexFill = Array.from(inputNotDisabled).indexOf(inputIndex);
    if (indexFill !== -1) {
      inputIndex.value = guessWord[indexFill];
    }
  }
}

document.addEventListener("keydown", handleBackspace);

function handleBackspace(event) {
  if (event.key === "Backspace") {
    let allInput = document.querySelectorAll("input:not([disabled])");

    let fullInput = Array.from(allInput).filter((input) => input.value !== "");
    let currentInputs = Array.from(allInput).indexOf(document.activeElement);
    if (currentInputs >= 0) {
      let prevInput = allInput[currentInputs];
      if (prevInput.value === "" && currentInputs > 0) {
        let nextInput = allInput[currentInputs - 1];
        nextInput.focus();
      } else {
        prevInput.value = "";
      }
      event.preventDefault();
    }
  }
}

generateInputs();
