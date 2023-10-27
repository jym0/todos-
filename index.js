const listTask = document.getElementById("listTask");
const inputTask = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");

btnAdd.addEventListener("click", () => {
  if (inputTask.value === "") {
    alert("You must write something");
  } else {
    const listItem = document.createElement("li");
    const icon = document.createElement("i");
    icon.classList.add("bi", "bi-circle", "checked");
    const span = document.createElement("span");
    span.textContent = inputTask.value;
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash", "deleteBtn");

    icon.addEventListener("click", () => {
      toggleTaskCompletion(listItem, icon, span, { completed: false });
    });

    deleteIcon.addEventListener("click", () => {
      deleteTask(listItem);
    });

    listItem.appendChild(icon);
    listItem.appendChild(span);
    listItem.appendChild(deleteIcon);

    listTask.appendChild(listItem);

    saveTasks();
  }

  inputTask.value = "";
});



function toggleTaskCompletion(listItem, icon, span, task) {
  if (icon.classList.contains("bi-circle")) {
    icon.classList.remove("bi-circle");
    icon.classList.add("bi-check-circle-fill");
    span.style.textDecoration = "line-through";
    task.completed = true;
    span.style.color = "#ffd791bb";
    saveTasks();
  } else {
    icon.classList.remove("bi-check-circle-fill");
    icon.classList.add("bi-circle");
    span.style.textDecoration = "none";
    task.completed = false;
    span.style.color = "#ffd691";
    saveTasks();
  }
 
}


function deleteTask(listItem) {
  listTask.removeChild(listItem);
  saveTasks();
}


document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    const listItem = document.createElement("li");

    const icon = document.createElement("i");
    icon.classList.add(
      "bi",
      "checked",
      task.completed ? "bi-check-circle-fill" : "bi-circle"
    );

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "#ffd791bb";
      
    }

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash", "deleteBtn");

    icon.addEventListener("click", () => {
      toggleTaskCompletion(listItem, icon, span, task);
    });

    deleteIcon.addEventListener("click", () => {
      deleteTask(listItem);
    });

    listItem.appendChild(icon);
    listItem.appendChild(span);
    listItem.appendChild(deleteIcon);

    listTask.appendChild(listItem);
  });
});


function saveTasks() {
  const tasks = [...listTask.children].map((item) => {
    const icon = item.querySelector("i.bi");
    const span = item.querySelector("span");
    return {
      text: span.textContent,
      completed: icon.classList.contains("bi-check-circle-fill"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
