const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const phone = document.querySelector("#phoneNumber");
let popup = document.getElementById("popup");

const form = document.querySelector("#submit-form");
function openPopup() {

    let thank = document.getElementById('thanks')
    let thankmsg = document.createElement('p')
    thankmsg.textContent = `Dear ${nameEl.value}, Thank you for your inquiry. One of our team members will be in touch with you shortly`;

    thank.appendChild(thankmsg)

    popup.classList.add("open-popup");
}
document.getElementById("submit-form").addEventListener("submit",function(e){
    e.preventDefault();
})

function checkValidations() {


    let status = true;
    let letters = /^[a-zA-Z\s]*$/;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();


    if (name === "") {
        document.querySelector(".name-error").classList.add("error");
        document.querySelector(".name-error").innerText =
            "Please fill out this field!";
        status = false;
    } else {
        if (!letters.test(name)) {

            document.querySelector(".name-error").classList.add("error");
            document.querySelector(".name-error").innerText =
                "Please enter only characters!";
            status = false;
        } else {
            status = true;

        }
    }
    if (email === "") {
        document.querySelector(".name-error").classList.add("error");
        document.querySelector(".name-error").innerText =
            "Please fill out this field!";
        status = false;
    } else {
        if (!letters.test(name)) {
            document.querySelector(".name-error").classList.add("error");
            document.querySelector(".name-error").innerText =
                "Please enter only characters!";
            status = false;
        } else {
            status = true;

        }
    }
  
    if (status == true) {
        let thank = document.getElementById('thanks')
        let thankmsg = document.createElement('p')
        thankmsg.textContent = `Dear ${nameEl.value}, Thank you for your inquiry. One of our team members will be in touch with you shortly`;

        thank.appendChild(thankmsg)

        popup.classList.add("open-popup");
        
    }
    
    




}

function closePopup() {
    let thank = document.getElementById('thanks')
    let thankmsg = document.createElement('p')
    thankmsg.textContent = "";

    thank.appendChild(thankmsg)
    popup.classList.remove("open-popup")
    document.location.reload(true)
}



