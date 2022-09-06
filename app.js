const interactive = document.getElementById("interactive");
const failed = document.getElementById("failed");
const correct = document.getElementById("correct");
let attempts = 0;
let currentDate = null;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random()*(end.getTime() - start.getTime()));
}

function generateNewDate() {
    const startDateStr = document.getElementById("start").value;
    const endDateStr = document.getElementById("end").value;
    // console.log(`Start date: ${startDateStr} End date: ${endDateStr}`);
    correct.innerHTML = "";
    if (!startDateStr || !endDateStr) {
        interactive.innerHTML = "";
        failed.innerHTML = "Please set both a start and an end date for the range.";
        return;
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (startDate > endDate) {
        interactive.innerHTML = "";
        failed.innerHTML = "Please ensure the start date is before the end date.";
        return;
    }

    failed.innerHTML = "";
    attempts = 0;

    currentDate = randomDate(startDate, endDate);

    const title = `<h1 class="date">${currentDate.getDate()} - ${currentDate.getMonth() + 1} - ${currentDate.getFullYear()}</h1>\n`;
    const text = "<p style=\"text-align: center;\"> On what day of the week does this date fall? </p>";
    let buttons = '<div class="weekdays">';
    for (let i = 1; i < 8; i++) {
        buttons += `<div class='weekday'><button name="${i%7}" onclick="check(this.name)">${weekday[i%7]}</button></div>`;
    }
    buttons += "</div>"

    const mistakeDiv = "<div class='failed' id='weekdayMistake'></div>"

    interactive.className = "";
    interactive.innerHTML = title + text + buttons + mistakeDiv;
}

function check(button_name) {
    const dayNumber = Number(button_name);
    console.log(currentDate.getDay());
    if (dayNumber != currentDate.getDay()) {
        attempts++;
        failed.innerHTML = `That is not the correct date. This was attempt ${attempts}. Please try again.`;
        return;
    }
    failed.innerHTML = "";
    interactive.innerHTML = "";
    correct.innerHTML = "That was correct!  ";
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

document.getElementById("generate").addEventListener("click", generateNewDate );