console.log("MHWB file loaded");
const API_URL =
"https://script.google.com/macros/s/AKfycbyrW3osIqsC_Snfw3L2BIuN-jPi44NahAQlTiFd52pfJTOU3vIa_cb32Pbyhxq3RCFR/exec";

async function verifyMHWB() {

  const certNo =
    document.getElementById("certNo").value.trim();

  if (!certNo) {
    alert("Please enter Certificate Number");
    return;
  }

  document.getElementById("result").innerHTML = `
<div class="verify-card">
    <div class="spinner"></div>
    <h3>Verifying Certificate</h3>
    <p>Please wait while we verify your certificate details...</p>
</div>
`;

  try {

    const responsemhwb= await fetch(
      `${API_URL}?certNo=${encodeURIComponent(certNo)}`
    );

    const datamhwb = await responsemhwb.json();

    showResultmhwb(datamhwb);

  } catch (error) {

    document.getElementById("result").innerHTML = `
      <div class="card">
        <div class="notfound">
          ❌ Unable to connect to verification server
        </div>
      </div>
    `;

    console.error(error);
  }
}


function showResultmhwb(datamhwb){

let html='';

if(datamhwb.found){

html=`

<div class="card">

<div class="status">
✓ CERTIFICATE VERIFIED
</div>

<table>

<tr>
<td>Name</td>
<td>${datamhwb.name}</td>
</tr>

<tr>
<td>Institute</td>
<td>${datamhwb.institute}</td>
</tr>

<tr>
<td>Certificate Number</td>
<td>${datamhwb.certificateNo}</td>
</tr>

<tr>
<td>Email</td>
<td>${datamhwb.email}</td>
</tr>


<tr>
<td>Document ID</td>
<td>${datamhwb.mergedDocId}</td>
</tr>

<tr>
<td>Document Name</td>
<td>${datamhwb.mergedDocLink}</td>
</tr>

<tr>
<td>Document Created </td>
<td>Document successfully created on ${datamhwb.mergeStatus .split("Timestamp:")[1] ?.trim() || ""}</td>
</tr>

<tr>
<td>Seminar Attended As</td>
<td>${datamhwb.role}</td>
</tr>
</table>

<div class="actions">
<a class="btn"
href="https://drive.google.com/uc?export=download&id=${datamhwb.mergedDocId}"
target="_blank">
📥 Download Certificate
</a>

</div>

</div>

`;

}else{

html=`

<div class="card">
<div class="notfound">
❌ Certificate Number Not Found
</div>
</div>

`;

}

document.getElementById("result").innerHTML=html;

}