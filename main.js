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
async function verifyCertificate() {

    const event =
        document.getElementById("eventSelect").value;

    if(!event){

        alert("Please select an event");
        return;
    }

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