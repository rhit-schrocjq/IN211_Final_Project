
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





main();