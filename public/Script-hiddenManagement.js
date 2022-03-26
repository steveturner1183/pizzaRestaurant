baseURL = "https://beaver-kits-promise-tes-b4wron."

window.addEventListener('load', function(event){
    console.log("my page loaded.");
    document.getElementById("createTablesBtn").addEventListener("click", createTableClicked, false);
});

function createTableClicked(){
     // set up request
  let req = new XMLHttpRequest();
  req.open("POST", baseURL + "herokuapp.com/hiddenManagement", false);
  req.setRequestHeader('Content-Type', 'application/json');
  document.getElementById("createTablesBtn").style.background = "red";
}