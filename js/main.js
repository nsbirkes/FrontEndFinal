// TODO fix 6: The function addButtonListeners should add a click listener that 
// calls the toggleComments function to each button element found within the main element.

// TODO 8 through 21

// 1
function createElemWithText(elemType = "p", textContent = "", className) {
    const element = document.createElement(elemType);
    element.textContent = textContent;
    if (className) element.className = className;

    return element;
}

// 2
function createSelectOptions(users) {
    if (!users) return undefined;

    const options = [];

    for (const user of users) {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        options.push(option);
    }

    return options;
}

// 3
function toggleCommentSection(postId) {
    if (!postId) return undefined;

    const section = document.querySelector(`section[data-post-id="${postId}"]`);

    if (!section) return null;

    section.classList.toggle("hide");

    return section;
}

// 4
function toggleCommentButton(postId) {
    if (!postId) return undefined;

    const button = document.querySelector(`button[data-post-id="${postId}"]`);
    if (!button) return null;

    button.textContent = button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";

    return button;
}

// 5
function deleteChildElements(parentElement) {
      if (!(parentElement instanceof Element)) return undefined;

    let child = parentElement.lastElementChild;

    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }

    return parentElement;
}

// 6 
function addButtonListeners() {
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");

    if (buttons.length === 0) return buttons;

    for (const button of buttons) {
      const postId = button.dataset.postId;

      if (postId) {
        button.addEventListener("click", (event) => {
          toggleComments(event, postId);
        });
      }
    }

    return buttons;
}

// 7 
function removeButtonListeners() {
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");

    for (const button of buttons) {
      const postId = button.dataset.postId;
      
      if (postId) {
        button.removeEventListener("click", (event) => {
          toggleComments(event, postId);
        });
      }
    }

    return buttons;
}