// Variable Selections
const addNote = document.querySelector("#add-note");
const upBtn = document.querySelector("#up-btn");
const downBtn = document.querySelector("#down-btn");
const stack = document.querySelector(".stack");

// FORM CONTAINER
const formContainer = document.querySelector(".form-container");
const form = formContainer.querySelector("form");

// INPUT FIELDS
const imageUrlInput = form.querySelector("#image-url");
const nameInput = form.querySelector("#name");
const homeTownInput = form.querySelector("#home-town");
const purposeInput = form.querySelector("#purpose");

// CATEGORY (RADIO BUTTONS)
const categoryRadios = form.querySelectorAll("input[name='Category']");

// BUTTONS
const submitBtn = form.querySelector(".submit-btn");
const closeBtn = form.querySelector(".close-form");

// Functions
function saveData(obj) {
  let remainders = JSON.parse(localStorage.getItem("remainders")) || [];
  remainders.push(obj);
  localStorage.setItem("remainders", JSON.stringify(remainders));
}

function showCards() {
  stack.innerHTML = "";

  let allRemainders = JSON.parse(localStorage.getItem("remainders"));

  allRemainders.forEach(function (remainder) {
    const card = document.createElement("div");
    card.classList.add("card");

    const avatar = document.createElement("img");
    avatar.src = remainder.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    const name = document.createElement("h2");
    name.textContent = remainder.name;
    card.appendChild(name);

    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = remainder.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = remainder.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    card.appendChild(buttonsDiv);

    document.querySelector(".stack").appendChild(card);
  });
}
showCards();

function addRemainder() {
  formContainer.style.display = "initial";
}

function closeForm() {
  formContainer.style.display = "none";
}

function updateStack() {
    const cards = stack.querySelectorAll(".card");
    cards.forEach(function(card, idx) {
        Object.assign(card.style, {
            zIndex: 3-idx,
            transform: `translateY(${idx * 10}px) scale(${1 - idx * 0.02})`,
            opacity: 1 - idx * 0.02,
        })
    })
}

function cardUp() {
  let lastCard = stack.lastElementChild;
  if (lastCard) {
    stack.insertBefore(lastCard, stack.firstElementChild);
    updateStack();
  }
}

function cardDown() {
  let firstCard = stack.firstElementChild;
  if (firstCard) {
    stack.appendChild(firstCard, stack.lastElementChild);
    updateStack();
  }
}

function submitForm(evt) {
  evt.preventDefault();
  const imageUrlValue = imageUrlInput.value.trim();
  const nameValue = nameInput.value.trim();
  const homeTownValue = homeTownInput.value.trim();
  const purposeValue = purposeInput.value.trim();
  let categorySelected = false;
  categoryRadios.forEach((option) => {
    if (option.checked) {
      categorySelected = option.value;
    }
  });

  if (imageUrlValue === "") {
    alert("Please enter a valid Image URL.");
    return;
  }

  if (nameValue === "") {
    alert("Please enter a valid FUll Name.");
    return;
  }

  if (homeTownValue === "") {
    alert("Please enter a valid Home town.");
    return;
  }

  if (purposeValue === "") {
    alert("Please enter a valid Purpose.");
    return;
  }

  if (!categorySelected) {
    alert("PLease select a Category.");
    return;
  }

  saveData({
    imageUrl: imageUrlValue,
    name: nameValue,
    homeTown: homeTownValue,
    purpose: purposeValue,
    category: categorySelected,
  });

  form.reset();
  formContainer.style.display = "none";
}

// Listeners
addNote.addEventListener("click", addRemainder);
upBtn.addEventListener("click", cardUp);
downBtn.addEventListener("click", cardDown);
closeBtn.addEventListener("click", closeForm);
form.addEventListener("submit", submitForm);
