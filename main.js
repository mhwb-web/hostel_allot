/*=====================================================
 MNNIT Hostel Allotment Portal
 main.js
======================================================*/

/*--------------- API URLs ----------------*/

const API_MAP = {

    boys: {

        second_year: "https://script.google.com/macros/s/AKfycbxjd2ugXBPlkHK5Ds3lwdJB5xT-8uktxroiwfxm_8HFX91H3QAWrtTS46rXreKg1Rjj5g/exec",

        third_year: "https://script.google.com/macros/s/AKfycbxcMMTGujrkNFaSWYptV4XepVX5_C-xseksq9TOk-kLm_93oXW0LgB7HV6O3hndZsUd/exec",

        final_year: "https://script.google.com/macros/s/AKfycbxazduf2jww5wwW6I_MkgxSWOKxN95ZmfaxskKs3bwSi0S5pGKLwj8GXJP79zwjxoFflA/exec",

        pg: "https://script.google.com/macros/s/AKfycby-CuKn9rQ8P69NUVNDgHI5M8WHT_OyZhTnDWWxWlvHuOgNB-h6AwlTSY92V6WF8mXm/exec"

    },

    girls: {

        second_year: "https://script.google.com/macros/s/AKfycbxhPk281tK7xLuh2v6Kdta-DkIWgwIeARAkImQDZXQspd-IaFChP65Swfa5EWF9uR0v/exec",

        pg: "https://script.google.com/macros/s/AKfycbxeULur9LmBTqpIDf5IAXqo_eaPpe_r1VdaISHcRjOczmtdX8Ni7iD8Nv4Ut4Jz3vqL/exec"

    }

};


/*--------------- HTML Elements ----------------*/

const gender = document.getElementById("gender");
const year = document.getElementById("year");
const regNo = document.getElementById("regNo");
const result = document.getElementById("result");
const button = document.querySelector("button");

/*--------------- Enable / Disable Registration Box ----------------*/

function updateInputState() {

    result.innerHTML = "";

    // Third Year Girls
    if (gender.value === "girls" && year.value === "third_year") {

        regNo.disabled = true;
        regNo.value = "";

        button.innerHTML = "View Notice";

        return;
    }

    // Final Year Girls
    if (gender.value === "girls" && year.value === "final_year") {

        regNo.disabled = true;
        regNo.value = "";

        button.innerHTML = "View Notice";

        return;
    }

    if (gender.value && year.value) {

        regNo.disabled = false;

        button.innerHTML = "Check Allotment";

    }

    else {

        regNo.disabled = true;

        regNo.value = "";

        button.innerHTML = "Check Allotment";

    }

}

gender.addEventListener("change", updateInputState);

year.addEventListener("change", updateInputState);


/*--------------- Enter Key ----------------*/

regNo.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        verifyCertificate();

    }

});
/*=====================================================
    Main Function
======================================================*/

async function verifyCertificate() {

    const selectedGender = gender.value;
    const selectedYear = year.value;
    const registration = regNo.value.trim();

    result.innerHTML = "";

    /* ---------- Special Case : Girls Third Year ---------- */

    if (selectedGender === "girls" && selectedYear === "third_year") {

        result.innerHTML = `
            <div class="result-card">

                <h2>Important Notice</h2>

                <p>
                    <strong>
                    All Third Year Girl students are required to report to
                    Kamla Nehru Girls Hostel (KNGH).
                    </strong>
                </p>

                <p>
                    Hostel allotment will be completed during reporting
                    at KNGH.
                </p>

            </div>
        `;

        return;

    }

    /* ---------- Special Case : Girls Final Year ---------- */

    if (selectedGender === "girls" && selectedYear === "final_year") {

        result.innerHTML = `
            <div class="result-card">

                <h2>Important Notice</h2>

                <p>
                    <strong>
                    All Final Year Girl students are required to report to
                    Kamla Nehru Girls Hostel (KNGH).
                    </strong>
                </p>

                <p>
                    Hostel allotment will be completed during reporting
                    at KNGH.
                </p>

            </div>
        `;

        return;

    }

    /* ---------- Validation ---------- */

    if (!selectedGender) {

        alert("Please select Gender.");

        return;

    }

    if (!selectedYear) {

        alert("Please select Year.");

        return;

    }

    if (registration === "") {

        alert("Please enter Registration Number.");

        regNo.focus();

        return;

    }

    const api = API_MAP[selectedGender][selectedYear];

    if (!api) {

        result.innerHTML = `
            <div class="error-card">
                API Not Configured
            </div>
        `;

        return;

    }

    /* ---------- Loading ---------- */

    result.innerHTML = `
        <div class="loading">

            <h3>Searching Hostel Allotment...</h3>

        </div>
    `;

    try {

        const response = await fetch(
            `${api}?regNo=${encodeURIComponent(registration)}`
        );

        if (!response.ok) {

            throw new Error("Network Error");

        }

        const data = await response.json();

        displayResult(data);

    }

    catch(error){

        console.error(error);

        result.innerHTML = `

            <div class="error-card">

                <h2>Connection Failed</h2>

                <p>

                    Unable to connect to the server.

                </p>

            </div>

        `;

    }

}


/*=====================================================
    Display Result
======================================================*/

function displayResult(data) {

    // Student not found
    if (data.status !== "success") {

        result.innerHTML = `
            <div class="error-card">

                <h2>Registration Number Not Found</h2>

                <p>
                    Please check your Registration Number and try again.
                </p>

            </div>
        `;

        return;
    }

    /* Optional Row (Roommate / Single Seater / Double Seater etc.) */

    let roommateRow = "";

    if (data.roommate && data.roommate.trim() !== "") {

        roommateRow = `
            <tr>

                <th>Roommate/Name/Detail</th>

                <td>${data.roommate}</td>

            </tr>
        `;

    }

    result.innerHTML = `

        <div class="result-card">

            <h2>Hostel Allotment Details</h2>

            <table class="result-table">

                <tr>

                    <th>Registration No.</th>

                    <td>${data.registration}</td>

                </tr>

                <tr>

                    <th>Hostel Allotted</th>

                    <td>${data.hostel}</td>

                </tr>

                ${roommateRow}

            </table>

        </div>

    `;

}
