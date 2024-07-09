// Opisany w dokumentacji
import flatpickr from "flatpickr";
import iziToast from "izitoast";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";
//import "izitoast/dist/css/izitoast.min.css";
let ms;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}
  
const checkDate = (selectedDates)=>{
    let date = new Date();
    return selectedDates[0].getTime()-date.getTime()
}

const options = {
    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) { 
        ms = checkDate(selectedDates)
        if (ms<=0) {
            btn.disabled = true; 
            iziToast.error({
                close: false,
                position:'topCenter',
                progressBar: false,
                backgroundColor: 'red',
                messageColor: 'white',
                timeout: 5000,
                message: 'Please choose a date in the future',
                transitionOut:'fadeOutUp',
            });
            return 
        }
        iziToast.destroy();
        btn.disabled = false;   
        return selectedDates[0]
    },
};


const btn = document.querySelector("#start")
const days = document.querySelector("#days")
const hours = document.querySelector("#hours")
const minutes= document.querySelector("#minutes")
const seconds = document.querySelector("#seconds")

const fp = document.querySelector("#dateSelector").flatpickr(options)

btn.disabled = true; 

btn.addEventListener("click", event=>{

    const setDownTime = () =>{
        if (fp.selectedDates[0].getTime()-new Date().getTime()<0) {
            days.textContent = "00"
            hours.textContent = "00"
            minutes.textContent = "00"
            seconds.textContent = "00"
            return clearInterval(interval)
        }
    
        let timeDown = convertMs(fp.selectedDates[0].getTime()-new Date().getTime())
        days.textContent = timeDown.days.toString().padStart(2, "0")
        hours.textContent = timeDown.hours.toString().padStart(2, "0")
        minutes.textContent = timeDown.minutes.toString().padStart(2, "0")
        seconds.textContent = timeDown.seconds.toString().padStart(2, "0")
    }

    const interval = setInterval(setDownTime,500);   
})




