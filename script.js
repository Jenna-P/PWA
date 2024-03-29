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
  
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
  
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

//   drag and drop
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
const wrapper = document.querySelector('.todo-container');
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.opacity = "0.2";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
    this.style.opacity = "1";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

//touchable
if (window.screen.width <= 750 && window.screen.height <= 420) {
  todos.forEach((todo) => {
    todo.addEventListener('touchmove', touchMove);
    todo.addEventListener('touchend', touchEnd);

  let itemAppend = null;
// ------------------------ touchMove
  function touchMove(event) {
      event.preventDefault();
      let touch = event.targetTouches[0];
      todo.style.top = `${touch.pageY - (wrapper.offsetTop) - (todo.offsetWidth / 2)}px`;
      todo.style.left = `${touch.pageX - (wrapper.offsetLeft) - (todo.offsetHeight / 2)}px`;   
  }

  function touchEnd() {
      this.style.top = `${itemAppend.offsetTop}px`;
      this.style.left = `${itemAppend.offsetLeft}px`;     
  }
});
}
