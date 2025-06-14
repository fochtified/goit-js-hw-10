console.log(`01-timer.js was succesfully loaded`);

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerBtn = document.querySelector(".timer-btn");
const inputField = document.querySelector("#datetime-picker");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

let userSelectedDate;
let countdownInterval;
let isRunning = false;

timerBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: "Y-m-d H:i",
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        console.log({ userSelectedDate });
        const actualDate = new Date();
        if (userSelectedDate <= actualDate) {
            iziToast.error({
                message: "Please choose a date in the future",
                backgroundColor: "#e32222",
                messageColor: "white",
                position: "bottomRight",
                timeout: 3500,
            });
            timerBtn.disabled = true;
            timerBtn.classList.remove("btn-active");
            resetDisplay();
        } else {
            timerBtn.disabled = false;
            timerBtn.classList.add("btn-active");
        }
    },
};

flatpickr(inputField, options);

function resetDisplay() {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
}

function formatTime(time) {
    return String(time).padStart(2, "0");
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const actualDate = new Date();
        const deltaTimeMilis = userSelectedDate - actualDate;
        if (deltaTimeMilis <= 0) {
            clearInterval(countdownInterval);
            resetDisplay();
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTimeMilis);

        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
    }, 1000);
}

timerBtn.addEventListener("click", () => {
    startTimer();
    timerBtn.disabled = true;
    inputField.disabled = true;
});
