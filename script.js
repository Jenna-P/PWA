// modals
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.targetModal).classList.add("active");
      overlay.classList.add("active");
      console.log("click");
    });
  });

  close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
  
  window.onclick = (event) => {
    if (event.target == overlay) {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => modal.classList.remove("active"));
      overlay.classList.remove("active");
    }
  };
  
  /* create todo  */
  const task_submit = document.getElementById("task_submit");
  
  task_submit.addEventListener("click", createTodo);
  
  function createTodo() {
    // create div
    const todo_div = document.createElement("div");
    const input_val = document.getElementById("task_input").value;
    const txt = document.createTextNode(input_val);
  
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
  
    /* create span */
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);
  
    todo_div.appendChild(span);
    task_status.appendChild(todo_div);
  
    span.addEventListener("click", () => {
      span.parentElement.style.display = "none";
    });
 // console.log(todo_div);
  
    // todo_div.addEventListener("dragstart", dragStart);
    // todo_div.addEventListener("dragend", dragEnd);
  
    document.getElementById("task_input").value = "";
    task_form.classList.remove("active");
    overlay.classList.remove("active");
  }
  
  const close_btns = document.querySelectorAll(".close");
  
  close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.style.display = "none";
    });
  });