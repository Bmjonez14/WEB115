
taskTable = document.getElementById("tasktable");
taskForm = document.getElementById("taskform");
taskForm.elements.addtask.addEventListener('click', (event) => {event.preventDefault();})

let taskList = [];

//The following are functions that will be nested within functions for adding, deleting, and completing tasks.
function priorityConf(hml) {
    //Check priority to be properly styled
    if (hml == "High"){
        return("highpri'>High")
    }
    else if (hml== "Medium"){
        return("medpri'>Medium")
    }
    else if (hml == "Low"){
        return("lowpri'>Low")
    }
}
function crossTask(identifier) {
    if (taskList[identifier].isComplete.checked){
        workingRow.setAttribute('class', 'complete');
    }
    else {
        workingRow.classList.remove('complete');
    }
    
    

}
function updateTable (){
    // Rebuild table to account for changes made. 
    taskTable.innerHTML = 
    "<tr><th>Task</th> <th>Priority</th> <th>Date</th> <th>Done</th></tr>";
    for (let i=0; i < taskList.length; i++){
        if (taskList[i].isComplete == true){
            //Highlight the row in red if the task was checked as important
            if (taskList[i].isImportant == true) {
                taskTable.innerHTML+= "<tr><td class='imptask complete'>" + taskList[i].name + "</td> <td class='imptask complete " + priorityConf(taskList[i].priority) + "</td><td class='imptask complete'>" + taskList[i].date + "</td><td> <input type='checkbox' class='donebox' id='dbx" + i + "'></td><td><input type='submit' value='Delete' class='delbtn id='del" + i +"'></td></tr>";
                taskList[i].id = i;
            }
            else {
                taskTable.innerHTML+= "<tr><td class='complete'>" + taskList[i].name + "</td> <td class='complete " + priorityConf(taskList[i].priority) + "</td><td class='complete'>" + taskList[i].date + "</td> <td> <input type='checkbox' class='donebox' id='dbx" + i + "'></td><td><input type='submit' value='Delete' class='delbtn id='del" + i +"'></td></tr>";
                taskList[i].id = i;
            }
            }
        else {
        //Highlight the row in red if the task was checked as important
        if (taskList[i].isImportant == true) {
            taskTable.innerHTML+= "<tr><td class='imptask'>" + taskList[i].name + "</td> <td class='imptask " + priorityConf(taskList[i].priority) + "</td><td class='imptask'>" + taskList[i].date + "</td><td> <input type='checkbox' class='donebox' id='dbx" + i + "'></td><td><input type='submit' value='Delete' class='delbtn id='del" + i +"'></td></tr>";
            taskList[i].id = i;
        }
        else {
            taskTable.innerHTML+= "<tr><td>" + taskList[i].name + "</td> <td class='" + priorityConf(taskList[i].priority) + "</td><td>" + taskList[i].date + "</td> <td> <input type='checkbox' class='donebox' id='dbx" + i + "'></td><td><input type='submit' value='Delete' class='delbtn id='del" + i +"'></td></tr>";
            taskList[i].id = i;
        }
    }
}
}






function taskLog(){
    for (i=0; i < taskList.length; i++){
        console.log(JSON.stringify(taskList[i]));
    }


    
}
// User adds new task to list
function newTask(){
    //Construct date
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const currentDate = `${month}/${day}/${year}`;

    //Construct new task object from user input and options.
    const taskName = taskForm.elements.tasknm.value;
    const taskPriority = taskForm.elements.priority.value;
    const taskImportance = taskForm.elements.importance.checked;
    //Validate form, checking that there is both a name and a priority set.
    let regex = /^[a-zA-Z0-9 ]+$/;
    if (!regex.test(taskName)){
        alert('Task name cannot be blank');}
    else if(taskPriority == 'none'){
        alert('Please select priority.')
    }
    else {
        let workingTask = {
            name: taskName,
            priority: taskPriority,
            isImportant: taskImportance,
            date: currentDate,
            isComplete: false,
            id: undefined
        };
        taskList.push(workingTask);
    };
    //Clear field selections and inputs
    taskForm.reset();

    updateTable();
    taskLog();
}

//Toggle task completion
function completeTask(identifier){
    if(taskList[identifier].isComplete == false){
        taskList[identifier].isComplete = true
    }
    else if(taskList[identifier].isComplete == true){
    taskList[identifier].isComplete = false
    }

    taskLog();
    updateTable();
    
}

//Task deletion function
function deleteTask(identifier){
    taskList.splice(identifier, 1);
    taskLog();
    updateTable(); 
}

//User completes task.
taskTable.addEventListener('click', (event) => {
    // Check if what was clicked is a checkbox with the 'donebox' class.
    if (event.target.classList.contains('donebox')) {
        // Extract the index from the id.
        const id = event.target.id.replace('dbx', '');
        completeTask(parseInt(id));
    }
});
//User deletes task.
taskTable.addEventListener('click', (event) => {
    // Check if what was clicked is a checkbox with the 'delbtn' class.
    if (event.target.classList.contains('delbtn')) {
        // Extract the index from the id.
        const id = event.target.id.replace('del', '');
        deleteTask(parseInt(id));
    }
});
    
taskForm.elements.addtask.addEventListener('click', newTask);
