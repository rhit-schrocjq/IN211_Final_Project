
function myFunction() {
  document.getElementById("mapAll").scrollIntoView();
}




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




main();