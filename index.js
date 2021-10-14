 const taskContainer = document.querySelector(".task__container");
 var globalStore = []; //array of object  
 console.log(taskContainer);

 const generateNewCard = (taskData) =>
 ` <div class="col-sm-12 col-md-6 col-lg-4" >
 <div class="card">
     <div class="card-header d-flex  justify-content-end gap-2">
         <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil"></i></button>
         <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"> <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
     </div>
     <img class="card-image-top" src=${taskData.imageUrl} alt="image">
         
     <div class="card-body">
         
       <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
       <p class="card-text">${taskData.taskType}</p>
       <p >${taskData.taskDescription}</p>
     </div>  
   </div>
</div>`;    

 const saveChanges = () => {
  const taskData = {
      id:`${Date.now()}`,
      imageUrl: document.getElementById("imageurl").value,
      taskTitle: document.getElementById("tasktitle").value,
      taskType: document.getElementById("tasktype").value,
      taskDescription: document.getElementById("taskdescription").value
  };

   taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));  

   globalStore.push(taskData);
   localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));  
   //we are here providing a id for local storage to uniquely identify the local storage because there are so many peoples using local storage.

  

};

const loadInitialCardData = () => {
     //local storage to get tasky card data 

     const getCardData = localStorage.getItem("tasky");


     //convert to normal object
       const {cards} = JSON.parse(getCardData);

     //loop over those array of task object to create HTML card , inject it to DOM 
       cards.map((cardObject)=>{
         taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
     
      //update our globalStore 
       globalStore.push(cardObject); 
  
       });
 };

 //Delete function 
 const deleteCard =(event)=>{
   event = window.event;
   const targetID = event.target.id;   
   const tagname = event.target.tagName;

   globalStore = globalStore.filter((cardObject)=> cardObject.id !== targetID ) ;
    // whenever u have condition use filter .
    // whenever u have an modification and want to return use map .
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore})); 

    if(tagname==="BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else {
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
       
};  
      
    




       
 //issues
 //Whenever we refresh the page the cards will delete so to solve this we will be 
 //doing some things they are:-
      // API :- Application programming interface 
      //local storage :- Accessing application via local storage to store the card data.
      // Interface :- Middle man

 //${xyz} = we use it because if the value will change in future dynamically, whenever the data and value
 //         is not constant , and it is changing dynamically then we use $.
 // `` = we use ` because if it generate different kind of text that will hamper our code , to prevent from it we use `` . 
