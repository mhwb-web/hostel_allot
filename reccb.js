const API_URL_RECCB =
"https://script.google.com/macros/s/AKfycbw1_P0uGBM-qEbuEyi8zLN9Vwrqn3EacMXeLm5LEdcP4l7nNcgCV-1nI0hVlnwEdiyr/exec";

async function verifyRECCB(){

  const certNo =
    document.getElementById("certNo").value.trim();

  if (!certNo) {
    alert("Please enter Certificate Number");
    return;
  }

  document.getElementById("result").innerHTML =
    '<div class="card">Verifying...</div>';

  try {

   
      const response = await fetch( 
      `${API_URL}?certNo=${encodeURIComponent(certNo)}` );
    

    const data = await response.json();
    showResult(data);

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

function showResult(data){

let html='';

if(data.found){

html=`

<div class="card">

<div class="status">
✓ CERTIFICATE VERIFIED
</div>

<table>

<tr>
<td>Name</td>
<td>${data.name}</td>
</tr>

<tr>
<td>Institute</td>
<td>${data.institute}</td>
</tr>

<tr>
<td>Certificate Number</td>
<td>${data.certificateNo}</td>
</tr>

<tr>
<td>Email</td>
<td>${data.email}</td>
</tr>

<tr>
<td>Department</td>
<td>${data.department}</td>
</tr>

<tr>
<td>Designation</td>
<td>${data.designation}</td>
</tr>

<tr>
  <td>Employee ID</td>
  <td>${data.employeeId}</td>
</tr>

<tr>
<td>Document ID</td>
<td>${data.mergedDocId}</td>
</tr>

<tr>
<td>Document Name</td>
<td>${data.mergedDocLink}</td>
</tr>

<tr>
<td>Document Created </td>
<td>Document successfully created on ${data.mergeStatus .split("Timestamp:")[1] ?.trim() || ""}</td>
</tr>
<tr>
<td>Program Attended As</td>
<td>${data.role}</td>
</tr>
</table>

<div class="actions">

<a class="btn"
href="mailto:mhwb@mnnit.ac.in?subject=Certificate Access Request - ${data.certificateNo}&body=Dear MHWB Team,%0D%0A%0D%0AI would like to request access to view my certificate.%0D%0A%0D%0ACertificate Number: ${data.certificateNo}%0D%0AName: ${data.name}%0D%0AInstitute: ${data.institute}%0D%0AEmail: ${data.email}%0D%0A%0D%0ARegards,"
>
Request Certificate Access
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



