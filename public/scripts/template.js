let id="";

async function loadData() {
  try {
    const host = window.location.host;
    const response = await fetch(`http://${host}/resources/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    document.getElementById('Status').innerHTML = data.status;
    if (data.status == 'Active') {
      document.getElementById('Status').style.color = "#00C000";
    } else {
      document.getElementById('Status').style.color = "#C00000";
    }
    document.getElementById('Resource').innerHTML = data.agency_name;
    document.getElementById('County').innerHTML = data.county;
    document.getElementById('ResourceType').innerHTML = data.taxonomy_name;
    document.getElementById('DateUpdated').innerHTML = data.lastupdated ? data.lastupdated : data.createdon;
    document.getElementById('Website').innerHTML = data.service_website ? data.service_website : "Not Provided";
    document.getElementById('Website').href = data.service_website ? data.service_website : "";
    document.getElementById('Website').classList = data.service_website ? ["normal-font underline"] : ["disabled color-secondary normal-font"];
    document.getElementById('Description').innerHTML = data.service_description;
    document.getElementById('Eligibility').innerHTML = data.site_eligibility;
    document.getElementById('ApplicationProcess').innerHTML = data.site_details;
    document.getElementById('ContactInfo').innerHTML = "Phone: " + data.site_number + "<br>" + "Email: " + data.service_email;
    document.getElementById('Schedule').innerHTML = data.site_schedule;
    document.getElementById('Address').src = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAnCzeGnuCVofrTrSSVKSbm1VLKXPuSJRQ&origin=City+Hall,Indiana,IN&destination=" + data.latitude + "," + data.longitude + "&avoid=tolls|highways";

  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

main = function () {
  document.querySelector("#first").onclick = (event) => {
    window.open('index.html')
  }
  document.querySelector("#second").onclick = (event) => {
    window.open('resources.html');
  }
  document.querySelector("#third").onclick = (event) => {
    window.open('template.html');
  }
  param = window.location.search.split("=")
  if (param[0] == "?id") {
    id = param[1];
  }
  loadData();
}



main();
