console.log("PEWP file loaded");
const API_URL_PEWP=
"https://script.google.com/macros/s/AKfycbwsOY1OUDXxhGqtT4DLoMaEn7ONMq_Y1kWtsVa1m2IDebtfb5NDRUNzD38QmyJjimh3/exec";

async function verifyPEWP(){

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

   
      const responsepewp = await fetch( 
      `${API_URL_PEWP}?certNo=${encodeURIComponent(certNo)}` );
    

    const datapewp = await responsepewp.json();
    showResultpewp(datapewp);

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

function showResultpewp(datapewp){

let html='';

if(datapewp.found){

html=`

<div class="card">

<div class="status">
✓ CERTIFICATE VERIFIED
</div>

<table>

<tr>
<td>Name</td>
<td>${datapewp.name}</td>
</tr>

<tr>
<td>Institute</td>
<td>${datapewp.institute}</td>
</tr>

<tr>
<td>Certificate Number</td>
<td>${datapewp.certificateNo}</td>
</tr>

<tr>
<td>Email</td>
<td>${datapewp.email}</td>
</tr>

<tr>
<td>Department</td>
<td>${datapewp.department}</td>
</tr>

<tr>
<td>Designation</td>
<td>${datapewp.designation}</td>
</tr>

<tr>
  <td>Employee ID</td>
  <td>${datapewp.employeeId}</td>
</tr>

<tr>
<td>Document ID</td>
<td>${datapewp.mergedDocId}</td>
</tr>

<tr>
<td>Document Name</td>
<td>${datapewp.mergedDocLink}</td>
</tr>

<tr>
<td>Document Created </td>
<td>Document successfully created on ${datapewp.mergeStatus .split("Timestamp:")[1] ?.trim() || ""}</td>
</tr>
<tr>
<td>Program Attended As</td>
<td>${datapewp.role}</td>
</tr>
</table>

<div class="actions">
<a class="btn"
href="https://drive.google.com/uc?export=download&id=${datapewp.mergedDocId}"
target="_blank">
📥 Download Certificate
</a>

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




