"use strict";

let showDone = false;
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
let taskArrayDone = JSON.parse(localStorage.getItem("completedTasks")) || [];


function showTasks(){
            const todoList = document.getElementById('list-container');
            todoList.innerHTML = '';

            const currentTasks = showDone ? taskArrayDone : taskArray;


            currentTasks.forEach((task, index)=> {
                const li = document.createElement('li');
                li.textContent = `${task.taskName}`;

                if(task.done){
                    li.classList.add('checked');
                    
                }
                li.setAttribute('onclick', `toggleTask('${task.id}')`);

                const span = document.createElement('span');
                span.textContent = 'x';
                span.setAttribute('onclick', `deleteTask('${task.id}')`);
                li.appendChild(span);
                todoList.appendChild(li);
            });
        }

// Add task to task array
function addTask(){
            const taskInput =document.getElementById('input-box').value;
            const id = crypto.randomUUID();
            if(taskInput){
                const newTask = {
                    id: id, 
                    taskName: taskInput, 
                    done: false
                };
                taskArray.push(newTask);
                document.getElementById('input-box').value = '';
                saveTasks();
                showTasks();
            } else{
                alert('You must enter a task!');
            }
}

function toggleTask(id) {
            let task;

            // Om showDone är aktiv, leta i taskArrayDone, annars i taskArray
            if (showDone) {
                task = taskArrayDone.find(task => task.id === id);
                if (task) {
                    task.done = !task.done;
                    // opgaven flyttas tillbaka til To Do-listen om den avmarkeras
                    taskArray.push(task);
                    taskArrayDone = taskArrayDone.filter(t => t.id !== id);
                }
            } else {
                task = taskArray.find(task => task.id === id);
                if (task) {
                    task.done = !task.done;
                    // Opgaven flyttas till completed om den markeras
                    taskArrayDone.push(task);
                    taskArray = taskArray.filter(t => t.id !== id);
                }
            }

            saveTasks();
            showTasks();
}


// Filter and sort task array 

function filterList(){
            showDone = !showDone;
            showTasks();

            const doneButton = document.getElementById('done');
            if (showDone) {
                doneButton.textContent = "To Do";
            } else {
                doneButton.textContent = "Completed tasks"
            }
}


// Delete task

function deleteTask(id){
            if(showDone){
                taskArrayDone = taskArrayDone.filter(task => task.id !== id); 
            } else {
                taskArray = taskArray.filter(task => task.id !== id);
            }

            saveTasks();
            showTasks();
}


function saveTasks(){
            localStorage.setItem('tasks', JSON.stringify(taskArray));
            localStorage.setItem('completedTasks', JSON.stringify(taskArrayDone));
}

showTasks();