"use strict";
const KEY_ENTER = "Enter";
document.addEventListener("DOMContentLoaded", () => {
  const newTodoElement = document.querySelector(".new-todo");
  const todoListElement = document.querySelector(".todo-list");
  console.log(todoListElement);
  const footerElement = document.querySelector(".footer");
  const clearCompletedElement = document.querySelector(".clear-completed");
  const todoCountElement = document.querySelector(".todo-count strong");

  const refreshFooter = () => {
    if (todoListElement.children.length === 0) {
      footerElement.style.display = "none";
    } else {
      footerElement.style.display = "";
    }
    let completedCounter =
      todoListElement.querySelectorAll("li.completed").length;
    if (completedCounter === 0) {
      clearCompletedElement.style.display = "none";
    } else {
      clearCompletedElement.style.display = "";
    }

    let todoCounter = 0;
    for (const todoListItem of todoListElement.children) {
      if (!todoListItem.classList.contains("completed")) todoCounter++;
    }
    todoCountElement.innerText = todoCounter;
  };
  refreshFooter();

  const addCallbacksForLi = (liElement) => {
    console.log(liElement);

    const destroyButtonElement = liElement.querySelector(".destroy");
    destroyButtonElement.addEventListener("click", () => {
      liElement.remove();

      refreshFooter();
    });

    const checkboxElement = liElement.querySelector(".toggle");
    checkboxElement.addEventListener("change", () => {
      if (checkboxElement.checked) {
        liElement.classList.add("completed");
      } else {
        liElement.classList.remove("completed");
      }
      refreshFooter();
    });
  };

  newTodoElement.addEventListener("keypress", (event) => {
    if (event.key === KEY_ENTER && !(newTodoElement.value === "")) {
      const newButtonElement = document.createElement("button");
      newButtonElement.classList.add("destroy");

      const newLabelElement = document.createElement("label");
      newLabelElement.appendChild(
        document.createTextNode(newTodoElement.value)
      );

      const newInputCheckbox = document.createElement("input");
      newInputCheckbox.type = "checkbox";
      newInputCheckbox.classList.add("toggle");

      const newDivElement = document.createElement("div");
      newDivElement.classList.add("view");
      newDivElement.appendChild(newInputCheckbox);
      newDivElement.appendChild(newLabelElement);
      newDivElement.appendChild(newButtonElement);

      const newLiElement = document.createElement("li");
      newLiElement.appendChild(newDivElement);

      addCallbacksForLi(newLiElement);
      console.log(newLiElement);

      todoListElement.prepend(newLiElement);

      newTodoElement.value = "";

      refreshFooter();
    }
  });

  clearCompletedElement.addEventListener("click", (event) => {
    const completedLiElements =
      todoListElement.querySelectorAll("li.completed");
    for (const completedLiElement of completedLiElements) {
      completedLiElement.remove();
    }
    refreshFooter();
  });
});
