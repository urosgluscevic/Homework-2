var container = document.getElementById("container");
var numberInput = document.getElementById("number");
var submit = document.getElementById("confirm-number");
var addSquare = document.getElementById("add-new");
var palindromeDiv = document.getElementById("palindrome")

submit.addEventListener("click", submitHandler)
container.addEventListener("keyup", inputHandler)
addSquare.addEventListener("click", addHandler)
container.addEventListener("click", deleteItem)

var inputFields;
var inputFieldsSum = "";

function submitHandler(e){
    var inputValue = numberInput.value;
    var numberInputValue = parseInt(inputValue);

    container.innerHTML = "";

    for(var i = 0; i < numberInputValue; i++){
        var square = document.createElement("div");
        var change = document.createElement("input");
        var delBtn = document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.innerText = "X"
        change.classList.add("square-input")
        change.setAttribute("placeholder", "Add")
        square.appendChild(change)
        square.appendChild(delBtn)
        square.classList.add("inserted");
        container.appendChild(square);
    }

    inputFields = document.getElementsByClassName("square-input")
    // console.log(inputFields)
}

function inputHandler(e){
    var squareInput = e.key;
    if(parseInt(squareInput) || squareInput.length > 1){
        e.target.value = "";
    } else {
        e.target.value = squareInput;
    }

    inputFieldsSum = "";

    Array.from(inputFields).forEach(function(item){
        inputFieldsSum += item.value;
    })

    var k = 0;
    var j = inputFieldsSum.length - 1;

    var counter = 0;

    while(k <= j){
        if(inputFieldsSum[j] == inputFieldsSum[k]){
            counter++;
        }
        k++;
        j--;
    }

    if(counter == (inputFieldsSum.length / 2).toFixed(0)){
        palindromeDiv.innerText = "It's a palindrome!"
    } else {
        palindromeDiv.innerText = ""
    }

}

function addHandler(e){
    var square = document.createElement("div");
    var change = document.createElement("input");
    var delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerText = "X"
    change.classList.add("square-input")
    change.setAttribute("placeholder", "Add")
    square.appendChild(change)
    square.appendChild(delBtn)
    square.classList.add("inserted");
    container.appendChild(square);

    inputFields = document.getElementsByClassName("square-input")

    inputFieldsSum = "";

    Array.from(inputFields).forEach(function(item){
        inputFieldsSum += item.value;
    })

    var k = 0;
    var j = inputFieldsSum.length - 1;

    var counter = 0;

    while(k <= j){
        if(inputFieldsSum[j] == inputFieldsSum[k]){
            counter++;
        }
        k++;
        j--;
    }

    if(inputFieldsSum){
        if(counter == (inputFieldsSum.length / 2).toFixed(0)){
            palindromeDiv.innerText = "It's a palindrome!"
        } else {
            palindromeDiv.innerText = ""
        }
    }
}

function deleteItem(e){
    if(e.target.classList.contains("delete")){
        container.removeChild(e.target.parentNode)
    }

    inputFieldsSum = "";

    Array.from(inputFields).forEach(function(item){
        inputFieldsSum += item.value;
    })

    var k = 0;
    var j = inputFieldsSum.length - 1;

    var counter = 0;

    while(k <= j){
        if(inputFieldsSum[j] == inputFieldsSum[k]){
            counter++;
        }
        k++;
        j--;
    }

    if(inputFieldsSum){
        if(counter == (inputFieldsSum.length / 2).toFixed(0)){
            palindromeDiv.innerText = "It's a palindrome!"
        } else {
            palindromeDiv.innerText = ""
        }
    }
}