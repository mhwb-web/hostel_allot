const EVENT_DETAILS = {

    mhwb: {

        title: "Mental Health & Well-Being (MHWB 2026)",

        logo: "https://lh3.googleusercontent.com/d/1Gb3BDjHimwaItoYwc5Z4aCVxQCUBVAHS",

        color: "#2E7D32",
        headerColor: "#2E7D32"
    },

    pewp: {

        title:
            "Pedagogical Excellence & Wellness Program (PEWP 2026)",

        logo:
            "https://lh3.googleusercontent.com/d/1txoD86Nb06-_fiA0Kwf_nc7WZifo0rUg",

        color: "#1565C0",
        headerColor: "#1565C0"
    },

    reccb: {

        title:
            "Research Excellence & Campus Culture Building (RECCB 2026)",

        logo:
            "https://lh3.googleusercontent.com/d/1t701aaqGVYeFNbf2qrF_U0f-S1OqgARd",

        color:
            "#606060",
        headerColor: "#606060"

    }
};

function enableCertificateInput() {

    const event =
        document.getElementById("eventSelect").value;

    document.getElementById("certNo").disabled =
        !event;
}

function handleEventChange() {
    console.log("Event Changed");

    const event =
        document.getElementById("eventSelect").value;

    const eventTitle =
        document.getElementById("eventTitle");

    const eventSubTitle =
        document.getElementById("eventSubTitle");

    const eventLogo =
        document.getElementById("eventLogo");

    const header =
        document.getElementById("header");
    header.classList.remove(
        "header-mhwb",
        "header-pewp",
        "header-reccb")

    const certInput =
        document.getElementById("certNo");

    // Enable/Disable certificate field
    certInput.disabled = !event;

    // Clear previous data
    certInput.value = "";
    document.getElementById("result").innerHTML = "";

    if (event) {

        const details =
            EVENT_DETAILS[event];
        
       
        if (event === "mhwb") {
            header.classList.add("header-mhwb");
        }

        if (event === "pewp") {
            header.classList.add("header-pewp");
        }

        if (event === "reccb") {
            header.classList.add("header-reccb");
        }

        eventTitle.textContent =
            details.title;

        eventSubTitle.textContent =
            "Motilal Nehru National Institute of Technology Allahabad";
        eventTitle.style.color = "white";
        eventSubTitle.style.color = "white";
        eventLogo.src =
            details.logo;

        eventLogo.style.display =
            "block";


        header.style.borderBottom =
            `20px solid ${details.color}`;


    } else {

        eventTitle.textContent =
            "Event Organized By";

        eventSubTitle.textContent =
            "Dean (Student & Faculty) Welfare";

        eventLogo.style.display =
            "none";

        header.style.borderBottom =
            "20px solid #8B4513";
        eventTitle.style.color = "white";
        eventSubTitle.style.color = "white";
    }
}
// Initialize page
window.onload = function () {

    handleEventChange();

    document
        .getElementById("eventSelect")
        .addEventListener("change", handleEventChange);
};
async function verifyCertificate() {

    const event =
        document.getElementById("eventSelect").value;

    if (!event) {

        alert("Please select an event");
        return;
    }

    switch (event) {

        case "mhwb":
            verifyMHWB();
            break;

        case "pewp":
            verifyPEWP();
            break;

        case "reccb":
            verifyRECCB();
            break;
    }
}










/*


function enableCertificateInput() {

    const event =
        document.getElementById("eventSelect").value;

    document.getElementById("certNo").disabled =
        !event;
}

document.getElementById("eventSelect")
.addEventListener("change", enableCertificateInput);
document.getElementById("eventSelect") .addEventListener("change", function () {

    const event = this.value;

    const certInput = document.getElementById("certNo");

    certInput.disabled = !event;

    // Clear previous certificate number
    certInput.value = "";

    // Clear previous verification result
    document.getElementById("result").innerHTML = "";

  });

function handleEventChange() {

    const event =
        document.getElementById("eventSelect").value;

    const eventTitle =
        document.getElementById("eventTitle");

    const eventSubTitle =
        document.getElementById("eventSubTitle");

    const eventLogo =
        document.getElementById("eventLogo");

    const header =
        document.getElementById("header");

    // Clear old data
    document.getElementById("certNo").value = "";
    document.getElementById("result").innerHTML = "";

    if(event){

        const details =
            EVENT_DETAILS[event];

        eventTitle.textContent =
            details.title;

        eventSubTitle.textContent =
            "Motilal Nehru National Institute of Technology Allahabad";

        eventLogo.src =
            details.logo;

        eventLogo.style.display =
            "block";

        header.style.borderBottom =
            `5px solid ${details.color}`;

    } else {

        eventTitle.textContent =
            "Event Organized By";

        eventSubTitle.textContent =
            "Dean (Student & Faculty) Welfare";

        eventLogo.style.display =
            "none";

        header.style.borderBottom =
            "5px solid #8B4513";
    }

    document.getElementById("certNo").disabled =
        !event;
}

async function verifyCertificate() {

    const event =
        document.getElementById("eventSelect").value;

    if(!event){

        alert("Please select an event");
        return;
    }


const EVENT_DETAILS = {

    mhwb: {

        title:
        "Mental Health & Well-Being (MHWB 2026)",

        logo:
        "https://your-mhwb-logo-link.png",

        color:
        "#2E7D32"
    },

    pewp: {

        title:
        "Pedagogical Excellence & Wellness Program (PEWP 2026)",

        logo:
        "https://drive.google.com/file/d/1txoD86Nb06-_fiA0Kwf_nc7WZifo0rUg/view?usp=drive_link",

        color:
        "#1565C0"
    },

    reccb: {

        title:
        "Research Excellence & Campus Culture Building (RECCB 2026)",

        logo:
        "https://drive.google.com/file/d/11udDEFrrTaCF-R2qWL-GbL_cRBJPTDFr/view?usp=drive_link",

        color:
        "#606060"
    }
};



    switch(event){

        case "mhwb":
            verifyMHWB();
            break;

        case "pewp":
            verifyPEWP();
            break;

        case "reccb":
            verifyRECCB();
            break;
    }
}  
*/