function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


function loadTasks() {
  const saved = getCookie("todo_list");
  return saved ? JSON.parse(saved) : [];
}


function saveTasks(tasks) {
  setCookie("todo_list", JSON.stringify(tasks), 7);
}

function renderTasks() {
  const ft_list = document.getElementById("ft_list");
  ft_list.innerHTML = "";
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = task;

    div.addEventListener("click", () => {
      if (confirm("Do you really want to remove this task?")) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
      }
    });

    ft_list.appendChild(div);
  });
}

let tasks = loadTasks();
renderTasks();


document.getElementById("new").addEventListener("click", () => {
  const task = prompt("Enter a new task:");
  if (task && task.trim() !== "") {
    tasks.push(task.trim());
    saveTasks(tasks);
    renderTasks();
  }
});
