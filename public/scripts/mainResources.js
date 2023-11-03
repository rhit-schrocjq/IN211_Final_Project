main = function () {
  document.getElementById("first").onclick = (event) => {
    window.open('index.html')
  }
  document.getElementById("second").onclick = (event) => {
    window.open('resources.html');
  }
  document.getElementById("third").onclick = (event) => {
    window.open('template.html');
  }
  param = window.location.search.split("=")
  if (param[0] == "?county") {
    countyName = param[1].replace(/%20/g, ' ').toLowerCase();
    spaceIndex = countyName.indexOf(' ')
    if (spaceIndex != -1) {
      countyName = countyName.slice(0, spaceIndex + 1) + countyName[spaceIndex + 1].toUpperCase() + countyName.slice(spaceIndex + 2);
    }
    countyName = countyName.slice(0,1).toUpperCase() + countyName.slice(1);
    document.getElementById("changingTitle").innerHTML = countyName + " County"
  }
}

$('.carousel').carousel()

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});