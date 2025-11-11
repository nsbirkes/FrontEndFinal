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
