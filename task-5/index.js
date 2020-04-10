var pomodoro = document.getElementById("pomodoro");
var short = document.getElementById("short");
var long = document.getElementById("long");

var start = document.getElementById("start");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");

var timeDisplay = document.getElementById("time");
var title = document.getElementById("title");
var options = document.getElementsByClassName("option")
var pomodoroTimer;
var stopped = false;
var alarm = new Audio();
alarm.src = "bell.mp3"
var pomodoroPressed = false;
var shortPressed = false;
var longPressed = false;
var startPressed = false;

pomodoro.addEventListener("click", pomodoroHandler);
start.addEventListener("click", startHandler);
stop.addEventListener("click", stopHandler);
reset.addEventListener("click", resetHandler);
short.addEventListener("click", shortHandler);
long.addEventListener("click", longHandler);

function pomodoroHandler(){
    stopped = true;

    pomodoroPressed = true;
    shortPressed = false;
    longPressed = false;

    timeDisplay.innerText = "25:00";
    startPressed = false;

    Array.from(options).forEach(function(option){
        option.style.display = "inline"
    })

    setTimeout(function(){
        timeDisplay.innerText = "25:00";
    }, 900);
}

var sec;
var min;

function startHandler(){
    if(pomodoroPressed){
        pomodoroTimer = 1500;
    } else if(shortPressed){
        pomodoroTimer = 300;
    } else {
        pomodoroTimer = 600;
    }
    stopped = false;
    
    var interval = setInterval(function(){
        if(stopped){
            clearInterval(interval)
        }

        min = Math.floor(pomodoroTimer / 60)
        sec = pomodoroTimer % 60;

        if(sec < 10){
            timeDisplay.innerText = min + ":0" + sec;
        } else {
            timeDisplay.innerText = min + ":" + sec;
        }

        title.innerText = timeDisplay.innerText + " Pomodore Clock";

        if(pomodoroTimer > 0){
            pomodoroTimer--;
        } else {
            alarm.play();
        }
    },1000)
    if(startPressed){
        clearInterval(interval);
    }
    startPressed = true;
}

function stopHandler(){
    stopped = true;
    startPressed = false;
}

function resetHandler(){
    if(pomodoroPressed){
        pomodoroTimer = 1500;
        timeDisplay.innerText = "25:00";
    } else if(shortPressed){
        pomodoroTimer = 300;
        timeDisplay.innerText = "5:00";
    } else {
        pomodoroTimer = 600
        timeDisplay.innerText = "10:00";
    }
    stopped = true;
    startPressed = false;
}

function shortHandler(){
    stopped = true;

    pomodoroPressed = false;
    shortPressed = true;
    longPressed = false;

    timeDisplay.innerText = "5:00";
    startPressed = false;

    Array.from(options).forEach(function(option){
        option.style.display = "inline"
    })

    setTimeout(function(){
        timeDisplay.innerText = "5:00";
    }, 900);
}

function longHandler(){
    stopped = true;

    pomodoroPressed = false;
    shortPressed = false;
    longPressed = true;

    timeDisplay.innerText = "10:00";
    startPressed = false;

    Array.from(options).forEach(function(option){
        option.style.display = "inline"
    })

    setTimeout(function(){
        timeDisplay.innerText = "10:00";
    }, 900);
}