console.log(`02-snackbar.js was succesfully loaded`);
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delayForm = form.elements.delay.value;
    const stateForm = form.elements.state.value;
    console.log("Form submitted!", { delayForm }, { stateForm });

    createPromise(delayForm, stateForm)
        .then((message) => {
            console.log(message);
        })
        .catch((message) => {
            console.error(message);
        });
});

function createPromise(delayForm, stateForm) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const message = `Promise ${stateForm} in ${delayForm}ms`;
            if (stateForm === "fulfilled") {
                iziToast.success({
                    message,
                    backgroundColor: "#59a10d",
                    messageColor: `#fff`,
                });
                resolve(message);
            } else {
                iziToast.warning({
                    message,
                    backgroundColor: "#ef4040",
                    messageColor: `#fff`,
                });
                reject(message);
            }
        }, parseInt(delayForm));
    });
}
