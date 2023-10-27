
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
  document.getElementById("LAKE").onclick = (event) => {
    window.open('resources.html')
  }
  document.getElementById("bottomText").onclick = (event) => {
    document.getElementById("indianaMap").scrollIntoView();
  };

  
}




main();