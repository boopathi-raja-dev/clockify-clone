let tasks = [{ "from": "15:23", "to": "15:26", "title": "Boopathi", "elapsed": "00:00:12" }];
let elapsedTimeForEachDates = "00:00:00";
let newTaskPlaceholder = { "from": "", "to": "", "title": "", "elapsed": "" }
let week_total_time = "00:00:00";
let timeElased = 0;
let timeElasedInDiv = "00:00:00";
function click_dropdown() {
    document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function (e) {
    if (!e.target.matches(".profile_workspace")) {
        var myDropdown = document.getElementById('myDropdown');
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

// sidebar functions-->

window.addEventListener('load', function () {
    let sidebarVisible = true;
    const toggleButton = document.getElementById('nav-btn');
    toggleButton.addEventListener('click', toggle_sidebar);
    toggleSidebar(sidebarVisible);
    function toggle_sidebar() {
        const sidebar = document.getElementsByClassName('sidebar')[0];
        const content = document.getElementsByClassName("vanish");
        const project_adder = document.querySelector('.project-adder');
        const main_content = document.querySelector('.main-content');
        const project_adder_storer = document.querySelector('.project-adder-storer');
        const task_adder = document.querySelector('.task-adder');
        sidebarVisible = !sidebarVisible;
        toggleSidebar(sidebarVisible);
        if (!sidebar || !content) {
            console.error("Sidebar or content element not found. Check your HTML and JavaScript code.");
            return;
        }
        if (sidebarVisible) {

            sidebar.style.width = '200px';
            for (let i = 0; i < content.length; i++) {
                content[i].style.display = 'block';
            }
            project_adder.style.width = '83.5%';
            main_content.style.marginLeft = '200px';

        } else {
            sidebar.style.width = '70px';
            sidebar.style.borderRight = '2px solid rgb(214, 222, 220)';
            for (let i = 0; i < content.length; i++) {
                content[i].style.display = 'none';
            }
            project_adder.style.width = '93%';
            main_content.style.marginLeft = '74px';

        }


    }

});

// main menu toggle-button functions-->
function toggleSidebar(sidebarVisible) {
    const tooltip = document.querySelectorAll(".tooltip");
    if (sidebarVisible) tooltip.forEach(tooltip => { tooltip.style.display = 'none' });
    else {
        tooltip.forEach(tooltip => { tooltip.style.display = 'flex' });
    }
}


let flag = false;
const tooltip = document.querySelectorAll(".tooltip");
const parent = document.querySelector('.sidebar');
const show = document.querySelector('.show_more');
const show_img = document.querySelectorAll('.show-less-img');
const deg_rot = document.querySelector('.deg_rot');
const img_shade = document.querySelectorAll('.img_shade');
show.addEventListener('click', () => {
    const content = document.querySelectorAll('.show-less');
    flag = !flag;
    if (flag) {
        content.forEach(content => { content.style.display = 'block' });
        parent.style.position = 'absolute';
        show_img.forEach(show_img => { show_img.style.display = 'block' });
        img_shade.forEach(img_shade => { img_shade.style.display = 'block' });
        show.innerHTML = 'SHOW LESS';
        deg_rot.style.transform = 'rotate(180deg)';
    }
    else {
        content.forEach(content => { content.style.display = 'none' });
        parent.style.position = 'fixed';
        show_img.forEach(show_img => { show_img.style.display = 'none' });
        img_shade.forEach(img_shade => { img_shade.style.display = 'none' });
        show.innerHTML = 'SHOW MORE';
        deg_rot.style.transform = 'rotate(360deg)';
    }

});

// calender functions-->
function onclick_calender(event, i, j) {
    let date_input = document.querySelector('.today_size');
    const selectedDate = event.target.value;
    const eng_date = formatDate(selectedDate);
    date_input.textContent = eng_date;
    let isAlreadyThere = false;

    let movableTask = week_changer[i]["tasks"][j];

    // Adding the task to new date
    let updatedTaskList = week_changer.map((datedTask) => {
        if (datedTask["date"] === eng_date) {
            isAlreadyThere = true;
            return {
                ...datedTask,
                "tasks": [...datedTask["tasks"], movableTask]
            }
        }
        return datedTask
    })
    week_changer = updatedTaskList;

    if (!isAlreadyThere) {
        let newDatedTask = {
            "date": eng_date,
            "tasks": [movableTask]
        }
        week_changer = [...week_changer, newDatedTask]
    }

    // remove the selected task from old date
    removeTask(i, j);
    initialBuildTask();
    newTaskPlaceholder = { "from": "", "to": "", "title": "", "elapsed": "" }
}

const removeTask = (i, j) => {
    if (week_changer[i]["tasks"].length === 1) {
        week_changer.splice(i, 1);
    }
    else {
        week_changer[i]["tasks"].splice(j, 1);
    }
    initialBuildTask();
}

function duplicateTask(i, j) {
    var clonedTask = { ...week_changer[i]["tasks"][j] };
    week_changer[i]["tasks"].push(clonedTask);
    initialBuildTask();
   
}

const totalTask = document.querySelector('.total_task');
function buildTaskTile(week_changer, j, header, i) {
    let taskTile;
    if (header !== "")
        taskTile = `
      ${header}
    <div class="main-content-storer">
        <div class="project-adder-storer">
        <input class="project-text-input-box" type="text" placeholder="Add description" value="${week_changer["title"]}" onchange="onInputChange(event, ${i}, ${j})" />            <div class="add-project-button-new">
                <img src="https://app.clockify.me/assets/ui-icons/plus-blue.svg" />
                <span class="hover_project">Project</span>
            </div>
       
            <img src="https://app.clockify.me/assets/ui-icons/tag-gray.svg" class="img_tag-total" />
        
            <p class="currency-total">$</p>
            
            <div class="timer-box-left"><input type="text" name="" value="${week_changer["from"]}" class="time_left"></div>
            <div class="time-center">-</div>
            <div class="timer-box-right"><input type="text" name="" value="${week_changer["to"]}" class="time_right"></div>
            <div> <img src="https://app.clockify.me/assets/ui-icons/calendar-gray.svg" alt="" class="calender-img" > </div>
            <input type="date" id="dateInput" value=" " onchange="onclick_calender(event, ${i}, ${j})"/> 
            <div class="timer-changes">${week_changer["elapsed"]}</div>
            <div><img src="https://app.clockify.me/assets/ui-icons/play.svg" alt="" class="play-btn"></div>
            <div class="drop_shown">
            <button class="dropdown_functions" onclick="show_buttons(${i}, ${j})">
            <img src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg" alt="">
        </button>

        <div class="dropdown_content" id="dropdown_${i}_${j}">
            <li class="duplicate-btn" onclick="duplicateTask(${i},${j})">Duplicate</li>
            <li class="delete-btn" onclick="removeTask(${i},${j})">Delete</li>
        </div>
    </div>
</div>`


    else
        taskTile = `
    <div class="main-content-storer">
        <div class="project-adder-storer">
        <input class="project-text-input-box" type="text" placeholder="Add description" value="${week_changer["title"]}" onchange="onInputChange(event, ${i}, ${j})" />            <div class="add-project-button-new">
                <img src="https://app.clockify.me/assets/ui-icons/plus-blue.svg" />
                <span class="hover_project">Project</span>
            </div>
       
            <img src="https://app.clockify.me/assets/ui-icons/tag-gray.svg" class="img_tag-total" />
        
            <p class="currency-total">$</p>
            
            <div class="timer-box-left"><input type="text" name="" value="${week_changer["from"]}" class="time_left"></div>
            <div class="time-center">-</div>
            <div class="timer-box-right"><input type="text" name="" value="${week_changer["to"]}" class="time_right"></div>
            <div> <img for="dateInput" src="https://app.clockify.me/assets/ui-icons/calendar-gray.svg" alt="" class="calender-img" > </div>
            <input  type="date" id="dateInput" value=" " onchange="onclick_calender(event, ${i}, ${j})"> 
            <div class="timer-changes">${week_changer["elapsed"]}</div>
            <div><img src="https://app.clockify.me/assets/ui-icons/play.svg" alt="" class="play-btn"></div>
            <div class="drop_shown">
            <button class="dropdown_functions" onclick="show_buttons(${i}, ${j})">
            <img src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg" alt="">
        </button>

        <div class="dropdown_content" id="dropdown_${i}_${j}">
            <li class="duplicate-btn" onclick="duplicateTask(${i},${j})">Duplicate</li>
            <li class="delete-btn" onclick="removeTask(${i},${j})">Delete</li>
        </div>
    </div>
</div>`

    var parser = new DOMParser();
    var doc = parser.parseFromString(taskTile, 'text/html');


    for (var k = 0; k < doc.body.childNodes.length; k++) {
        totalTask.appendChild(doc.body.childNodes[k].cloneNode(true));
    }


}

function timeElapsed(timestamp) {
    const [startHours, startMinutes, startSeconds] = timestamp.split(':').map(Number);
    let time = startHours * 3600 + startMinutes * 60 + startSeconds;
    return time;
}


function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


function initialBuildTask() {
    totalTask.innerHTML = "";
    week_total_time = "00:00:00"; // Reset week total time

    for (i = 0; i < week_changer.length; i++) {
        timeElased = 0;
        let header = `
            <div class="task-adder">
                <div class="today_size">${week_changer[i]["date"]}</div>
                <div class="total_timer">
                    <div class="flex_end">Total : <span class="flex_end_te">${timeElasedInDiv}</span></div>
                    <img src="https://app.clockify.me/assets/ui-icons/bulk-edit.svg" alt="">
                </div>
            </div>
        `;

        for (j = 0; j < week_changer[i]["tasks"].length; j++) {
            timeElased += timeElapsed(week_changer[i]["tasks"][j]["elapsed"])

            if (j > 0) header = "";
            buildTaskTile(week_changer[i]["tasks"][j], j, header, i);
        }

        flex_end_te = document.querySelectorAll('.flex_end_te');
        flex_end_te[i].textContent = secondsToHMS(timeElased);
        week_total_time = addTimes(week_total_time, secondsToHMS(timeElased));
    }

    updateWeekTotalTime();
}


function updateWeekTotalTime() {
    const timer_week = document.querySelector('.timer_week span');
    timer_week.textContent = week_total_time;
}


document.addEventListener('DOMContentLoaded', () => {
    initialBuildTask();
});


let week_changer = [];

//start-btn click : stop-btn click

var time_start, time_val, time_zero, start_cur_time, stop_cur_time, send_start_time, send_end_time, cur_date;
const timer_box_left = document.querySelector('.time_left');
const timer_changes = document.querySelector('.timer-changes');
const timer_box_right = document.querySelector('.time_right');
const timer = document.querySelector('.timer');
const start_btn = document.querySelector('.start-button');
const stop_btn = document.querySelector('.stop-button');
const total_timer = document.querySelector('.total_timer span');
const visible_task = document.querySelector('.visible-task');
let inputElement = document.querySelector('.project-text-input');
const timer_week = document.querySelector('.timer_week span');

// start-button functions-->
start_btn.addEventListener('click', function onclick() {
    let fromTime = current_time();
    var seconds = 0;
    start_btn.style.display = 'none';
    stop_btn.style.display = 'block';
    newTaskPlaceholder["from"] = fromTime;
    newTaskPlaceholder["title"] = inputElement.value;
    time_start = setInterval(() => {
        seconds++;
        time_val = formatTime(seconds);
        timer.textContent = time_val;
    }, 1000);
    send_start_time = current_time_diff();

});
// stop-button functions-->
stop_btn.addEventListener('click', function onclick() {
    start_btn.style.display = 'block';
    stop_btn.style.display = 'none';
    let toTime = current_time();

    time_zero = formatTime(0);
    timer.textContent = time_zero;
    let timerElement = document.querySelector(".timer");
    timerElement.textContent = time_zero;
    send_end_time = current_time_diff();
    let store_timer = timeDifference(send_start_time, send_end_time);
    newTaskPlaceholder["to"] = toTime;
    newTaskPlaceholder["elapsed"] = store_timer;
    cur_date = current_date();
    let isAlreadyThere = false;
    var jsonString = JSON.stringify(newTaskPlaceholder);
    var deepCopyObject = JSON.parse(jsonString);
    const updatedTaskList = week_changer.map((datedTask) => {
        if (datedTask["date"] === cur_date) {
            isAlreadyThere = true;
            return {
                ...datedTask,
                "tasks": [...datedTask["tasks"], deepCopyObject]
            }
        }
        return datedTask
    })
    week_changer = updatedTaskList;

    if (!isAlreadyThere) {
        let newDatedTask = {
            "date": cur_date,
            "tasks": [deepCopyObject]
        }
        week_changer = [...week_changer, newDatedTask]
    }
    initialBuildTask();
    clearInterval(time_start);
    week_total_time = addTimes(week_total_time, store_timer);
    timer_week.textContent = week_total_time;
});


function check_date_same(cur_date, date2) {
    if (date2 == cur_date) {
        return 'Today';
    } else {
        return date2;
    }
}

//format the time

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function current_time() {
    const current_date = new Date();
    const current_hours = current_date.getHours().toString().padStart(2, '0');
    const current_minutes = current_date.getMinutes().toString().padStart(2, '0');
    const current_seconds = current_date.getSeconds().toString().padStart(2, '0');
    const timestamp = `${current_hours}:${current_minutes}`;
    return timestamp;
}
//get current time difference
function current_time_diff() {
    const current_date = new Date();
    const current_hours = current_date.getHours().toString().padStart(2, '0');
    const current_minutes = current_date.getMinutes().toString().padStart(2, '0');
    const current_seconds = current_date.getSeconds().toString().padStart(2, '0');
    const timestamp = `${current_hours}:${current_minutes}:${current_seconds}`;
    return timestamp;
}

function timeDifference(time1, time2) {
    // Parse the input times (assuming HH:mm:ss format)
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

    // Convert both times to seconds
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

    // Calculate the difference in seconds
    let differenceInSeconds = totalSeconds2 - totalSeconds1;

    // Handle cases where the second time is earlier than the first (crossing midnight)
    if (differenceInSeconds < 0) {
        differenceInSeconds += 24 * 3600;
    }

    // Convert the difference back to hours, minutes, and seconds
    const hoursDifference = Math.floor(differenceInSeconds / 3600);
    const remainingSeconds = differenceInSeconds % 3600;
    const minutesDifference = Math.floor(remainingSeconds / 60);
    const secondsDifference = remainingSeconds % 60;

    // Format the result as HH:mm:ss
    const result = `${hoursDifference.toString().padStart(2, '0')}:${minutesDifference.toString().padStart(2, '0')}:${secondsDifference.toString().padStart(2, '0')}`;
    return result;
}

function reverseFormatTime(formattedTime) {
    const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalTimeInSeconds;
}

//get input values-->

const input_values_storer = document.querySelector(".project-text-input");
const input_values_receiver = document.querySelector(".project-text-input-box");
document.addEventListener('DOMContentLoaded', initialBuildTask);


function addTimes(startTime, endTime) {
    
    var times = [0, 0, 0]
    var max = times.length
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
    for (var i = 0; i < max; i++) {
        a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
        b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
    for (var i = 0; i < max; i++) {
        times[i] = a[i] + b[i]
    }
    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]
    if (seconds >= 60) {
        var m = (seconds / 60) << 0
        minutes += m
        seconds -= 60 * m
    }
    if (minutes >= 60) {
        var h = (minutes / 60) << 0
        hours += h
        minutes -= 60 * h
    }
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
}

function add_remove() {
    document.getElementById('myDropdown_add').classList.toggle('show');
}

//format date
let count = 0;
function formatDate(inputDate) {
    const dateParts = inputDate.split('-'); // Split the input date string
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const day = parseInt(dateParts[2], 10);

    const formattedDate = new Date(year, month, day);

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedString = formattedDate.toLocaleDateString('en-US', options);
    count++;
    return formattedString;
}
// current date to english format
function current_date() {
    const currentDate = new Date().toDateString();
    return date_format_to_words(currentDate);

}

function date_format_to_words(inputDateString) {
    var inputDates = new Date(inputDateString);
    var formattedDate = inputDates.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return formattedDate;
}

function show_buttons(i, j) {

    let dropdown_content_add = document.getElementById(`dropdown_${i}_${j}`);
    let dropdowns = document.querySelectorAll('.dropdown_content');
    dropdowns.forEach((dropdown) => {
        if (dropdown === dropdown_content_add) {
            dropdown.classList.toggle('showing');
        } else {
            dropdown.classList.remove('showing');
        }
    });
}

function onInputChange(event, i, j) {
    week_changer[i]["tasks"][j]["title"] = event.target.value;
    updateTitleDisplay(i, j, event.target.value);
}

function updateTitleDisplay(i, j, newValue) {
    var titleDisplay = document.getElementById(`titleDisplay_${i}_${j}`);
    if (titleDisplay) {
        titleDisplay.innerText = newValue;
    }
}



