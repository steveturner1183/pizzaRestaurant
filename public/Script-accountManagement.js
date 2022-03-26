console.log("connected to Script-accountManagement.js");


baseURL = "https://beaver-kits-promise-tes-b4wron."

window.addEventListener('load', function(event){
    console.log("my page loaded.");
  
     // set up request
      let req = new XMLHttpRequest();
      req.open("GET", baseURL + "herokuapp.com/accountManagement/table", true);
  
      req.addEventListener('load', function(){
        console.log("window async listener working");
        drawTable(req);
     });
  
     // send the request
     req.send(null);
     // prevent page reload
     event.preventDefault();
  });


function drawTable(req){
    console.log("called drawTable");
    let answer = req.responseText;
    console.log(answer);

    if(answer.results == ""){
        console.log("Can I get to answer.results is empty?");
        return;
    }else{
        console.log("I'm about to update the table");
        let dataFromDatabase = JSON.parse(answer);
        console.log(dataFromDatabase);
    
        let tableBody = document.getElementById('tableBody');
        tableBody.textContent = "";
        console.log("I am wiping the table clean");

        for(let rowIndex = 0; rowIndex<dataFromDatabase.rows.length; rowIndex++){

            let tempRow = document.createElement('tr');
            tempRow.id = dataFromDatabase.rows[rowIndex]["customer_id"];
            tableBody.appendChild(tempRow);
            for(let index = 0; index < 4; index++){
                let newCell = document.createElement('td');

                if(index === 0){
                    newCell.textContent = dataFromDatabase.rows[rowIndex]["customer_id"];
                }
                if(index === 1){
                    newCell.textContent = dataFromDatabase.rows[rowIndex]["first_name"];
                }
                if(index === 2){
                    newCell.textContent = dataFromDatabase.rows[rowIndex]["last_name"];
                }
                if(index === 3){
                    newCell.textContent = dataFromDatabase.rows[rowIndex]["email"];
                }
                tempRow.appendChild(newCell);
            }
        
    
            let nameButton = document.createElement('button');
            let passwordButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            let permButton = document.createElement('button');

            nameButton.textContent = "Change username";
            nameButton.id = "nameButton" + dataFromDatabase.rows[rowIndex]["customer_id"];
            nameButton.classList.add("btn", "btn-primary"); 

            passwordButton.textContent = "Change password";
            passwordButton.id = "passwordButton" + dataFromDatabase.rows[rowIndex]["customer_id"];
            passwordButton.classList.add("btn", "btn-warning"); 

            deleteButton.textContent = "Delete user";
            deleteButton.id = "deleteButton" + dataFromDatabase.rows[rowIndex]["customer_id"];
            deleteButton.classList.add("btn", "btn-danger"); 

            permButton.textContent = "Flip Permission Level";
            permButton.id = "permButton" + dataFromDatabase.rows[rowIndex]["customer_id"];
            permButton.classList.add("btn", "btn-info"); 

            newCell = document.createElement('td');
            let newDiv = document.createElement('div')
            newDiv.style.display = "flex";
            newDiv.style.justifyContent = "space-around";

            newCell.appendChild(newDiv);

            newDiv.appendChild(nameButton);
            newDiv.appendChild(passwordButton);
            newDiv.appendChild(deleteButton);
            newDiv.appendChild(permButton);

            tempRow.appendChild(newCell);

            // document.getElementById(updateCustomerButton.id).addEventListener('click', function(){updateCustomerButtonPushed(updateCustomerButton.id)});
            // document.getElementById(deleteCustomerButton.id).addEventListener('click', function(){deleteCustomerButtonPushed(deleteCustomerButton.id)});

        }
    }
}  

  
function updateCustomerButtonPushed(updateCustomerButton_id){
    console.log('you clicked ' + updateCustomerButton_id);
    let firstnameEntry = document.getElementById('firstNameInput');
    console.log(firstNameEntry.value);
    let lastnameEntry = document.getElementById('lastNameInput');
    console.log(lastNameEntry.value);
    let emailEntry = document.getElementById('emailInput');
    console.log(emailEntry.value);

     // set up request
     let req = new XMLHttpRequest();
     req.open("PATCH", baseURL + "herokuapp.com/accountManagement", true);
     req.setRequestHeader('Content-Type', 'application/json');
   
   
     req.addEventListener('load', function(){
       console.log("async patch");
       alert('customer updated');
       let myFormReset = document.getElementById('updateCustomerForm').reset();
      //  console.log("I am the responseText");
      //  console.log(req.responseText);
    //    drawTable(req);
       });
     req.send(JSON.stringify({'customer_id':updateCustomerButton_id.slice(10),'firstName':firstName.value, 'lastName':lastName.value, 'email':email.value}));
     event.preventDefault();
}

function deleteCustomerButtonPushed(deleteCustomerButton_id){
    console.log('you clicked ' + deleteCustomerButton_id);
  
    // set up request
    let req = new XMLHttpRequest();
    req.open("DELETE", baseURL + "herokuapp.com/accountManagement", true);
    req.setRequestHeader('Content-Type', 'application/json');
  
  
    req.addEventListener('load', function(){
      console.log("async delete");
      alert('user deleted');
      let myFormReset = document.getElementById('updateCustomerForm').reset();
      let tableBody = document.getElementById('tableBody');
      tableBody.textContent = "";
      // console.log("I am the responseText");
      // console.log(req);
    //   drawTable(req);
      });
    req.send(JSON.stringify({'customer_id':deleteCustomerButton_id.slice(20)}));
    event.preventDefault();
}

function createCustomerButtonPushed(createCustomerButton_id){
    console.log('you clicked ' + createCustomerButton_id);
  
    // set up request
    let req = new XMLHttpRequest();
    req.open("POST", baseURL + "herokuapp.com/accountManagement", true);
    req.setRequestHeader('Content-Type', 'application/json');
  
  
    req.addEventListener('load', function(){
      console.log("async post");
      alert('user added');
      let myFormReset = document.getElementById('updateCustomerForm').reset();
      let tableBody = document.getElementById('tableBody');
      tableBody.textContent = "";
      // console.log("I am the responseText");
      // console.log(req);
    //   drawTable(req);
      });
    req.send(JSON.stringify({'first_name':firstName.value,
                            'last_name':lastName.value,
                            'email':email.value}));
    event.preventDefault();
}
