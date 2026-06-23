const API_URL_RECCB=
"https://script.google.com/macros/s/AKfycbw1_P0uGBM-qEbuEyi8zLN9Vwrqn3EacMXeLm5LEdcP4l7nNcgCV-1nI0hVlnwEdiyr/exec";

async function verifyRECCB(){

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

   
      const responsereccb = await fetch( 
      `${API_URL_RECCB}?certNo=${encodeURIComponent(certNo)}` );
    

    const datareccb = await responsereccb.json();
    showResultreccb(datareccb);

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

function showResultreccb(datareccb){

let html='';

if(datareccb.found){

html=`

<div class="card">

<div class="status">
✓ CERTIFICATE VERIFIED
</div>

<table>

<tr>
<td>Name</td>
<td>${datareccb.name}</td>
</tr>

<tr>
<td>Institute</td>
<td>${datareccb.institute}</td>
</tr>

<tr>
<td>Certificate Number</td>
<td>${datareccb.certificateNo}</td>
</tr>

<tr>
<td>Email</td>
<td>${datareccb.email}</td>
</tr>

<tr>
<td>Department</td>
<td>${datareccb.department}</td>
</tr>

<tr>
<td>Designation</td>
<td>${datareccb.designation}</td>
</tr>

<tr>
  <td>Employee ID</td>
  <td>${datareccb.employeeId}</td>
</tr>

<tr>
<td>Document ID</td>
<td>${datareccb.mergedDocId}</td>
</tr>

<tr>
<td>Document Name</td>
<td>${datareccb.mergedDocLink}</td>
</tr>

<tr>
<td>Document Created </td>
<td>Document successfully created on ${datareccb.mergeStatus .split("Timestamp:")[1] ?.trim() || ""}</td>
</tr>
<tr>
<td>Program Attended As</td>
<td>${datareccb.role}</td>
</tr>
</table>

<div class="actions">
<a class="btn"
href="https://drive.google.com/uc?export=download&id=${datareccb.mergedDocId}"
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


{/* <tr>
  <td>Employee ID</td>
  <td>${((id) => {
    const s = String(id);
    return "*".repeat(s.length - 2) + s.slice(-2);
})(data.employeeId)}</td>
</tr> */}



