const clear = document.querySelector(".refresh"); // class
const dateElement = document.getElementById("date");
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const toDoList = document.getElementById("list");
const deleteAllBtn = document.getElementById("deleteBtn");
input.onkeyup = () => {
    let inputValue = input.value;
    if (inputValue.trim() != 0) {
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}
showTask();
function addToElement() {
    let inputValue = input.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New ToDo"); //getting storage
    if (getLocalStorage == null) { //if local storage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        listArr.push(inputValue); //pushing or adding user data
        localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into a json string 
        showTask();
        addBtn.classList.remove("active");
    }
}
function showTask() {
    let getLocalStorage = localStorage.getItem("New ToDo"); //getting storage
    if (getLocalStorage == null) { //if local storage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    if(listArr.length > 0){ //if list array is not empty, delete all button is active
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLi = '';
    listArr.forEach((element, index) => {
        newLi += `<li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    toDoList.innerHTML = newLi;//adding new li tag inside ul tag
    input.value = "";

}
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into a json string 
    showTask();
}
function deleteAllTasks(){
    listArr = [];
     //after delete all tasks update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into a json string 
    showTask();
}
toDoList.addEventListener('click', function(event){
    if(event.target.tagName ==='LI'){
        event.target.classList.toggle('checked');
    }
}, false);
let now = new Date();
dateElement.innerHTML = dateBuilder(now);
function dateBuilder(d){
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${date} ${month} ${year}, ${day}`;
}