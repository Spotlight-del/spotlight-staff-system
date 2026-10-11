// =====================================
// SPOTLIGHT STAFF SYSTEM
// =====================================


// STAFF DATABASE
// These are temporary test codes.
// We will move these to a proper database later.

const staff = [
    {
        name: "Max",
        code: "MAX123",
        loggedIn: false,
        loginTime: null,
        logoutTime: null
    },

    {
        name: "Sam",
        code: "SAM456",
        loggedIn: false,
        loginTime: null,
        logoutTime: null
    }
];


// GET HTML ELEMENTS

const staffCodeInput = document.getElementById("staffCode");
const loginButton = document.getElementById("loginButton");
const message = document.getElementById("message");
const staffList = document.getElementById("staffList");
const currentTime = document.getElementById("currentTime");


// =====================================
// LOAD SAVED STAFF DATA
// =====================================

const savedStaff = localStorage.getItem("spotlightStaff");

if (savedStaff) {

    const savedData = JSON.parse(savedStaff);

    savedData.forEach(savedPerson => {

        const person = staff.find(
            staffMember => staffMember.name === savedPerson.name
        );

        if (person) {
            person.loggedIn = savedPerson.loggedIn;
            person.loginTime = savedPerson.loginTime;
            person.logoutTime = savedPerson.logoutTime;
        }

    });
}


// =====================================
// SAVE STAFF DATA
// =====================================

function saveStaffData() {

    localStorage.setItem(
        "spotlightStaff",
        JSON.stringify(staff)
    );

}


// =====================================
// GET CURRENT TIME
// =====================================

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

}


// =====================================
// GET DATE + TIME
// =====================================

function getDateTime() {

    const now = new Date();

    return now.toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short"
    });

}


// =====================================
// LOGIN / LOGOUT
// =====================================

loginButton.addEventListener("click", function () {

    const enteredCode = staffCodeInput.value.trim();

    if (enteredCode === "") {

        showMessage("Please enter your staff code.", "red");

        return;
    }


    // FIND STAFF MEMBER

    const person = staff.find(
        staffMember => staffMember.code === enteredCode
    );


    // INVALID CODE

    if (!person) {

        showMessage("Invalid staff code.", "red");

        return;
    }


    // =================================
    // IF THEY ARE LOGGED OUT → LOG IN
    // =================================

    if (!person.loggedIn) {

        person.loggedIn = true;

        person.loginTime = getDateTime();

        person.logoutTime = null;

        saveStaffData();

        showMessage(
            person.name + " logged in successfully.",
            "green"
        );

    }


    // =================================
    // IF THEY ARE LOGGED IN → LOG OUT
    // =================================

    else {

        person.loggedIn = false;

        person.logoutTime = getDateTime();

        saveStaffData();

        showMessage(
            person.name + " logged out successfully.",
            "green"
        );

    }


    staffCodeInput.value = "";

    displayStaff();

});


// =====================================
// DISPLAY STAFF
// =====================================

function displayStaff() {

    staffList.innerHTML = "";


    staff.forEach(person => {

        const staffBox = document.createElement("div");

        staffBox.className = "staff-member";


        const statusClass =
            person.loggedIn
                ? "logged-in"
                : "logged-out";


        const statusText =
            person.loggedIn
                ? "● LOGGED IN"
                : "● LOGGED OUT";


        const loginTime =
            person.loginTime
                ? person.loginTime
                : "—";


        const logoutTime =
            person.logoutTime
                ? person.logoutTime
                : "—";


        staffBox.innerHTML = `

            <div class="staff-top">

                <span class="staff-name">
                    ${person.name}
                </span>

                <span class="status ${statusClass}">
                    ${statusText}
                </span>

            </div>

            <div class="times">

                <div>
                    Login: ${loginTime}
                </div>

                <div>
                    Logout: ${logoutTime}
                </div>

            </div>

        `;


        staffList.appendChild(staffBox);

    });

}


// =====================================
// MESSAGE
// =====================================

function showMessage(text, colour) {

    message.textContent = text;

    message.style.color = colour;

}


// =====================================
// LIVE CLOCK
// =====================================

function updateClock() {

    currentTime.textContent = getTime();

}


setInterval(updateClock, 1000);

updateClock();


// =====================================
// INITIAL DISPLAY
// =====================================

displayStaff();