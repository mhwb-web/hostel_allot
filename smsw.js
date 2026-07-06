const API_URL_SMSW=
"https://script.google.com/macros/s/AKfycbweq4u8vmEf2qFJYlc2V-xiThsYqe_t9-EP4QKYfJtiqP-j-Ax7wf0nbBTA70FflZDH/exec";

async function verifysmsw(){

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

   
      const responsesmsw = await fetch( 
      `${API_URL_SMSW}?certNo=${encodeURIComponent(certNo)}` );
    

    const datasmsw = await responsesmsw.json();
    showResultreccb(datasmsw);

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

function showResultsmsw(datasmsw){

let html='';

if(datasmsw.found){

html=`

<div class="card">

<div class="status">
✓ CERTIFICATE VERIFIED
</div>

<table>

<tr>
<td>Name</td>
<td>${datasmsw.name}</td>
</tr>

<tr>
<td>Institute</td>
<td>${datasmsw.institute}</td>
</tr>

<tr>
<td>Certificate Number</td>
<td>${datasmsw.certificateNo}</td>
</tr>

<tr>
<td>Email</td>
<td>${datasmsw.email}</td>
</tr>

<tr>
<td>Department</td>
<td>${datasmsw.department}</td>
</tr>

<tr>
<td>Designation</td>
<td>${datasmsw.designation}</td>
</tr>

<tr>
  <td>Employee ID</td>
  <td>${datasmsw.employeeId}</td>
</tr>

<tr>
<td>Document ID</td>
<td>${datasmsw.mergedDocId}</td>
</tr>

<tr>
<td>Document Name</td>
<td>${datasmsw.mergedDocLink}</td>
</tr>

<tr>
<td>Document Created </td>
<td>Document successfully created on ${datasmsw.mergeStatus .split("Timestamp:")[1] ?.trim() || ""}</td>
</tr>
<tr>
<td>Program Attended As</td>
<td>${datasmsw.role}</td>
</tr>
</table>

<div class="actions">
<a class="btn"
href="https://drive.google.com/uc?export=download&id=${datasmsw.mergedDocId}"
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



