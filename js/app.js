// CODE EXPLAINED channel
//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST = [];
    id = 0;

// get item from local storage
let data = localStorage.getItem("TODO", );

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);

}else{
  LIST = [];
  id = 0;
}

//load items to teh user's interface
function loadList(array) {
    array.forEach(function(item){
      addToDo(item.name, item.id, item.done, item.trash);
    });
}

// add item to local storage
localStorage.setItem("TODO", JSON.stringify(LIST));

// show today's date
let options = {
    weekday:"long",
    year:"numeric",
    month:"short",
    day:"numeric"
  };

let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// todo function
function addToDo(toDo, id , done, trash) {

    if(trash) {return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                  <li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <P class="text ${LINE}">${toDo}</P>
                  <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
                  </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


// add an item when the user hits the enter key
document.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
    const toDo = input.value;

    //if the input is not empty
    if(toDo){
      addToDo(toDo, id, false, false);

      LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});



//complete todo

function completeTodo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove todo

function removeToDo(element) {
      element.parentNode.parentNode.removeChild(element.parentNode);

      LIST[element.id].trash = true;

}



// target items created dynamicly

list.addEventListener("click", function(event){
      let element = event.target;  // returns clicked  inside LIST
      let elementJob = element.attributes.job.value; // returns complete or delete

      if(elementJob == "complete"){
        completeTodo(element);
      } else if (elementJob == "remove") {
          removeToDo(element);
      }

      localStorage.setItem("TODO", JSON.stringify(LIST));
});

// clear the local localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
