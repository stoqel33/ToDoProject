let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let todoList = null;
let todoItem = null;
let btnAdd = null;
let inputText = null;
let currentDay = null;
let currentData = null;
let toDo = null;
let head = null;
let refreshBtn = null;
let counter = 0;
let amountTask = null;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let tasksArray = [];


function addCurrnetDay() {
  const dayName = document.createElement('h2');
  dayName.classList.add('todo--head-day');
  const today = new Date();
  dayName.innerHTML = days[today.getDay()];

  const day = document.createElement('span');
  day.classList.add('todo--head-date');
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  day.innerHTML = `${dd}.${mm}.${yyyy}`;

  head.appendChild(dayName);
  head.appendChild(day)
}

function localStorageTaskAdd() {
  const str = JSON.stringify(tasksArray);
  localStorage.setItem('taskArray', str);
}

function taskObj(txt, state) {
  this.txt = txt;
  this.state = state;
}

function removeTask(task) {
  taskText = task.childNodes[1].textContent;
  let index = 0;

  tasksArray.forEach(el => {
    if (el.txt === taskText) {
      index = tasksArray.indexOf(el);
    }
  });

  tasksArray.splice(index, 1)
  localStorageTaskAdd();
}

function getLocalStorage() {
  const str = localStorage.getItem('taskArray');
  tasksArray = JSON.parse(str);
  if (!tasksArray) {
    tasksArray = [];
  }

  tasksArray.forEach(el => {
    const item = document.createElement('li');
    item.classList.add('todo--tasks--task');
    item.setAttribute('id', 'item');

    const check = document.createElement('i');
    check.classList.add('far', el.state);
    check.setAttribute('id', 'check');


    const text = document.createElement('p');
    text.classList.add('text');
    if (el.state === 'fa-check-circle') {
      text.classList.add('strike');
    }
    text.textContent = el.txt;

    const del = document.createElement('i');
    del.classList.add('far', 'fa-trash-alt');
    del.setAttribute('id', 'btnDel');

    item.appendChild(check);
    item.appendChild(text);
    item.appendChild(del);
    todoList.appendChild(item);
  });
}

function addTask(input) {
  if (input.trim().length > 0) {
    const item = document.createElement('li');
    item.classList.add('todo--tasks--task');
    item.setAttribute('id', 'item');

    const check = document.createElement('i');
    check.classList.add('far', 'fa-circle');
    check.setAttribute('id', 'check');
    const state = 'fa-circle';

    const text = document.createElement('p');
    text.classList.add('text');
    text.textContent = input;

    const del = document.createElement('i');
    del.classList.add('far', 'fa-trash-alt');
    del.setAttribute('id', 'btnDel');

    item.appendChild(check);
    item.appendChild(text);
    item.appendChild(del);
    todoList.appendChild(item);

    const t = new taskObj(input, state);
    tasksArray.push(t);

    counterTasks();
    localStorageTaskAdd();
  }
}

function refresh() {
  tasksArray = [];
  localStorage.clear();
  todoList.innerHTML = '';

  counterTasks();
}

function counterTasks() {
  amountTask.innerHTML = tasksArray.length;
}

function taskChangeState(task) {
  const taskText = task.parentNode.childNodes[1].textContent;

  let index = 0;

  tasksArray.forEach(el => {
    if (el.txt === taskText) {
      index = tasksArray.indexOf(el);
    }
  });

  if (tasksArray[index].state === 'fa-circle') {
    tasksArray[index].state = 'fa-check-circle';
  } else {
    tasksArray[index].state = 'fa-circle';
  }

  localStorageTaskAdd()
}

document.addEventListener('DOMContentLoaded', function () {
  todoList = document.querySelector('#list');
  todoItem = document.querySelector('#item');
  btnAdd = document.querySelector('#btn-add');
  inputText = document.querySelector('#input-text');
  toDo = document.querySelector('#todo');
  amountTask = document.querySelector('#counter');
  refreshBtn = document.querySelector('#refresh');
  head = document.querySelector('#head');

  btnAdd.addEventListener('click', function () {
    if (inputText.value !== '') {
      addTask(inputText.value);
      inputText.value = '';
    }
  })

  toDo.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.closest('#btnDel') !== null) {
      e.target.closest('#item').remove();

      removeTask(e.target.parentNode);
      counterTasks();
    }
  })

  toDo.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.closest('#check') !== null) {
      if (e.target.classList.contains('fa-circle')) {
        e.target.classList.remove('fa-circle');
        e.target.classList.add('fa-check-circle');
        taskChangeState(e.target);


      } else if (e.target.classList.contains('fa-check-circle')) {
        e.target.classList.remove('fa-check-circle');
        e.target.classList.add('fa-circle');
        taskChangeState(e.target);
      }
      e.target.nextSibling.classList.toggle('strike');
    }
  })

  refreshBtn.addEventListener('click', refresh);

  getLocalStorage();
  addCurrnetDay();
  counterTasks();
})

