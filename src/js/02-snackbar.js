// Opisany w dokumentacji
import iziToast from "izitoast";
// Dodatkowy import stylów
import "izitoast/dist/css/iziToast.min.css";

let fulfilled
let rejected

const form = document.querySelector("form")

form.addEventListener("change", event => {
    fulfilled = false
    rejected = false
    if (event.target.id==="fulfilled") fulfilled=true
    if (event.target.id==="rejected") rejected=true 
})

const createPromise = (delay = 1_000, willFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willFail) reject();
            resolve();
        }, delay);
    });
};


form.addEventListener("submit", event => {
    
    event.preventDefault();
    const delay = Math.abs(parseFloat(document.querySelector("#delay").value.trim()))

    const promise = createPromise(delay, rejected)
    promise.then(
        value => {
            console.log(`Fulfilled promise in ${delay}ms`); // "Success! Value passed to resolve function"
            iziToast.success({
                close: false,
                position:'topCenter',
                progressBar: false,
                backgroundColor: 'green',
                messageColor: 'white',
                timeout: 5000,
                message: `Fulfilled promise in ${delay}ms`,
                transitionOut:'fadeOutUp',
                })
        },
        error => {
            console.log(`Rejected promise in ${delay}ms`); // "Error! Error passed to reject function"
            iziToast.error({
                close: false,
                position:'topCenter',
                progressBar: false,
                backgroundColor: 'red',
                messageColor: 'white',
                timeout: 5000,
                message:`Rejected promise in ${delay}ms`,
                transitionOut:'fadeOutUp',
                })
        }
        );

    form.reset();
})

