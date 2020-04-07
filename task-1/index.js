var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

var changeItemCounter = 0;


// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);

document.addEventListener("keydown", changeItem);
// Add item

for(var i = 0; i < localStorage.length; i++){
  var storageValue = localStorage.key(i);
  var liItem = document.createElement("li");
  liItem.classList.add("list-group-item");
  var text = document.createTextNode(storageValue);
  liItem.appendChild(text);
  itemList.appendChild(liItem);
  var delButton = document.createElement("button")
  delButton.setAttribute("class", "btn btn-danger btn-sm float-right delete")
  delButton.innerText = "X";  
  liItem.appendChild(delButton)
}

function addItem(e) {
  e.preventDefault();
  //Get input value
  var inputValue = document.getElementById("item").value;
  // Create new li element
  var liItem = document.createElement("li");
  // Add class
  liItem.classList.add("list-group-item");
  // Add text node with input value
  var text = document.createTextNode(inputValue);
  liItem.appendChild(text);
  itemList.appendChild(liItem);
  // Create del button element
  var delButton = document.createElement("button")
  // Add classes to del button
  delButton.setAttribute("class", "btn btn-danger btn-sm float-right delete")
  // Append text node
  delButton.innerText = "X";
  // Append button to li
  liItem.appendChild(delButton)
  // Append li to list

  localStorage.setItem(inputValue, inputValue);
}
// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {

      var removeFromStorage = e.target.parentNode.textContent;

      localStorage.removeItem(removeFromStorage.slice(0, removeFromStorage.length - 1))

      itemList.removeChild(e.target.parentNode);
    }
  }
}

// Filter items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get list items
  var items = itemList.getElementsByTagName("li");
  // Convert HTMLCollection to an array
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  itemList.addEventListener("click", select);

  function select(e){
    if(e.target.classList.contains("list-group-item")){
      var content = e.target.innerText;
      filter.value = content.slice(0, content.length - 2); // I "used slice" to remove the "X" from the end of the string

      var text = content.slice(0, content.length - 2).toLowerCase();
      var items = itemList.getElementsByTagName("li");

      Array.from(items).forEach(function(item) {
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  }
}

var functionControlDown = 0;
var functionControlUp = 0;
var enterControll = 0;

function changeItem(e){

  var tasks = itemList.getElementsByTagName("li");

  if(e.keyCode == 40){

    if(functionControlUp == 1){
      changeItemCounter +=2;
    }

    if(changeItemCounter === Array.from(tasks).length){
      itemList.children[changeItemCounter - 1].style.color = "black";
      changeItemCounter = 0;
    }

    while(itemList.children[changeItemCounter].style.display == "none"){
      itemList.children[changeItemCounter - 1].style.color = "black";
      changeItemCounter++;
      if(changeItemCounter === Array.from(tasks).length){
        itemList.children[changeItemCounter - 1].style.color = "black";
        changeItemCounter = 0;
      }
    }
  
    itemList.children[changeItemCounter].style.color = "red";
  
    if(changeItemCounter !== 0){
      itemList.children[changeItemCounter - 1].style.color = "black";
    }
  
    changeItemCounter++;
    functionControlDown = 1;
    functionControlUp = 0;
  }

  if(e.keyCode == 38 && functionControlDown == 1){
    if(changeItemCounter !== 1){
      changeItemCounter -= 2;

      while(itemList.children[changeItemCounter].style.display == "none"){
        itemList.children[changeItemCounter + 1].style.color = "black";
        changeItemCounter--;
        if(changeItemCounter === Array.from(tasks).length){
          itemList.children[changeItemCounter + 1].style.color = "black";
          changeItemCounter = 0;
        }
      }

      itemList.children[changeItemCounter].style.color = "red";
      itemList.children[changeItemCounter + 1].style.color = "black";
      functionControlDown = 0;
      functionControlUp = 1;
      changeItemCounter--;
    }
  } else if (e.keyCode == 38 && functionControlDown !== 1){
      
      if(changeItemCounter < 0){
        itemList.children[changeItemCounter + 1].style.color = "black";
        changeItemCounter = Array.from(tasks).length - 1;
      }

      while(itemList.children[changeItemCounter].style.display == "none"){

        if(changeItemCounter !== Array.from(tasks).length - 1){
          itemList.children[changeItemCounter + 1].style.color = "black";
        }

        changeItemCounter--;
        if(changeItemCounter === Array.from(tasks).length){
          itemList.children[changeItemCounter + 1].style.color = "black";
          changeItemCounter = 0;
        }
      }

      itemList.children[changeItemCounter].style.color = "red";
      if(changeItemCounter !== Array.from(tasks).length - 1){
        itemList.children[changeItemCounter + 1].style.color = "black";
      }
      
      functionControlUp = 1;
      changeItemCounter--;
  }

  if(e.keyCode == 13){
    var tasks = itemList.getElementsByTagName("li");
    if(functionControlDown == 1){
      enterControll = changeItemCounter - 1;
    } else if(functionControlUp == 1){
      enterControll = changeItemCounter + 1;
    }

    var content = Array.from(tasks)[enterControll].innerText;
    filter.value = content.slice(0, content.length - 2);

    var text = content.slice(0, content.length - 2).toLowerCase();
    var items = itemList.getElementsByTagName("li");

    Array.from(items).forEach(function(item) {
      var itemName = item.firstChild.textContent;
      if (itemName.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}