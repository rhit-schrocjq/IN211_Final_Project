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
  console.log(param);
  if (param[0] == "?county") {
    document.getElementById("changingTitle").innerHTML = param[1].slice(0,1).toUpperCase() + param[1].slice(1).toLowerCase() + " County"
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