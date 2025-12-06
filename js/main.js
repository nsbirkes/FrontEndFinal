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

// 8
function createComments(comments) {
  if (!comments) return undefined;

  const fragment = document.createDocumentFragment();

  for (const comment of comments) {
  
    const article = document.createElement("article");
    const h3 = createElemWithText("h3", comment.name);
    const pBody = createElemWithText("p", comment.body);
    const pEmail = createElemWithText("p", `From: ${comment.email}`);

    article.append(h3, pBody, pEmail);
    fragment.append(article);
  }

  return fragment;
}

// 9
function populateSelectMenu(users) {
  if (!users) return undefined;

  const selectMenu = document.getElementById("selectMenu");
  const options = createSelectOptions(users);

  for (const option of options) {
    selectMenu.append(option);
  }

  return selectMenu;
}

// 10
async function getUsers() {
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  } 
  
  catch (error) {
    console.error("Error fetching users:", error);
  }
}

// 11
async function getUserPosts(userId) {
  if (!userId) return undefined;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    return await response.json();
  } 
  
  catch (error) {
    console.error("Error fetching user posts:", error);
  }
}

// 12
async function getUser(userId) {
  if (!userId) return undefined;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return await response.json();
  } 
  
  catch (error) {
    console.error("Error fetching user:", error);
  }
}

// 13
async function getPostComments(postId) {
  if (!postId) return undefined;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching post comments:", error);
  }
}

// 14
async function displayComments(postId) {
  if (!postId) return undefined;

  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");

  const comments = await getPostComments(postId);
  const fragment = createComments(comments);

  section.append(fragment);

  return section;
}

// 15
async function createPosts(posts) {
  if (!posts) return undefined;

  const fragment = document.createDocumentFragment();

  for (const post of posts) {
    const article = document.createElement("article");

    const h2 = createElemWithText("h2", post.title);
    const pBody = createElemWithText("p", post.body);
    const pId = createElemWithText("p", `Post ID: ${post.id}`);

    const author = await getUser(post.userId);
    const pAuthor = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
    const pCatch = createElemWithText("p", author.company.catchPhrase);

    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    const section = await displayComments(post.id);

    article.append(h2, pBody, pId, pAuthor, pCatch, button, section);
    fragment.append(article);
  }

  return fragment;
}

// 16
async function displayPosts(posts) {
  const main = document.querySelector("main");

  const element = posts
    ? await createPosts(posts)
    : createElemWithText("p", "Select an Employee to display their posts.", "default-text");

  main.append(element);
  return element;
}

// 17
function toggleComments(event, postId) {
  if (!event || !postId) return undefined;

  event.target.listener = true;

  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);

  return [section, button];
}

// 18
async function refreshPosts(posts) {
  if (!posts) return undefined;

  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(posts);
  const addButtons = addButtonListeners();

  return [removeButtons, main, fragment, addButtons];
}

// 19 
async function selectMenuChangeEventHandler(event) {
  if (!event || !event.target) return undefined;

  const selectMenu = event.target;

  selectMenu.disabled = true;

  try {
    const userId = Number.parseInt(selectMenu.value, 10) || 1;

    let posts = await getUserPosts(userId);
    if (!Array.isArray(posts)) posts = [];

    let refreshPostsArray = await refreshPosts(posts);
    if (!Array.isArray(refreshPostsArray)) refreshPostsArray = [];

    return [userId, posts, refreshPostsArray];
  } catch (err) {
    console.error("selectMenuChangeEventHandler error:", err);

    const userId = Number.parseInt(selectMenu.value, 10) || 1;
    return [userId, [], []];
  } finally {
    selectMenu.disabled = false;
  }
}


// 20 
async function initPage() {
  const users = await getUsers();

  const select = populateSelectMenu(users);

  return [users, select];
}

// 21
function initApp() {
  initPage();

  const selectMenu = document.getElementById("selectMenu");

  selectMenu.addEventListener("change", selectMenuChangeEventHandler);
}

// run app
document.addEventListener("DOMContentLoaded", initApp);