let numberitems = document.querySelectorAll(".numbercolumn div");
let dropitems = document.querySelectorAll(".dropcolumn div");
let dragitems = document.querySelectorAll(".dragcolumn div");
let newEquations = document.querySelector(".button--3");
let container = document.querySelector(".step3");
let dragcolumn = document.querySelector(".dragcolumn");
let controlbutton = document.querySelector(".dragcontrol");
let dragtext = document.querySelector(".text-3");

const calcEquations = () => {
    let numberArray = [];
    numberitems.forEach(element => {
        let randNumberOne = Math.floor(Math.random() * 9 + 1);
        let randNumberTwo = Math.floor(Math.random() * 9 + 1);
        if(randNumberOne == 0 && randNumberTwo == 0) {
            return;
        }
        element.innerHTML = `${randNumberOne} * ${randNumberTwo}`;
        let elemHTML = element.innerHTML;
        let sum = (parseInt(elemHTML.split("*")[0]) * parseInt(elemHTML.split("*")[1]));
        numberArray.push(sum);
        // Sorting the array in random Order //
        numberArray.sort((a,b) => 0.5 - Math.random());
        dragitems.forEach((dragitem, index) => {
            dragitem.innerHTML = numberArray[index];
            
        })
       
    })
}

calcEquations();

// Generating new equations on clicking button //

newEquations.onclick = () => {
    calcEquations();
    dragitems.forEach((dragitem, index) => {
        dragitem.style.color = "white";
        dragcolumn.appendChild(dragitem);
        if(index % 2 == 0) {
            dragitem.classList.add("distance-close");
        }
        else if(index % 2 !== 0) {
            dragitem.classList.add("distance-far");
        }
        dropitems.forEach(dropitem => {
            if(dropitem.hasChildNodes() == false) {
                dropitem.classList.remove("taken");
            }
        })
    }) 
}

const dragStart = (e) => {
    dropitems.forEach(dropitem => {
        dropitem.classList.add("over");
        if(dropitem.hasChildNodes() == false) {
            dropitem.classList.remove("taken");
        }
        e.dataTransfer.setData("text/plain", e.target.id)
        setTimeout(() => {
            e.target.classList.add("hide");
        }, 0);
    })
}

const dragEnd = () => {
    dropitems.forEach(dropitem => {
        dropitem.classList.remove("over");
    }) 
}

dragitems.forEach(dragitem => {
    dragitem.addEventListener("dragstart", dragStart);
    dragitem.addEventListener("dragend", dragEnd)
})



const dragEnter = (e) => {
    // adding preventDefault because div is not a valid drop target by default //
    e.preventDefault();
    e.target.classList.add("drag-over")
}
const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over")
}
const dragLeave = (e) => {
    e.target.classList.remove("drag-over")
}
const drop = (e) => {
    e.target.classList.remove("drag-over")
    //
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    draggable.style.backgroundColor = "#F38181";
    if(e.target.classList.contains("taken") == false) {
        e.target.appendChild(draggable);
        draggable.classList.remove("distance-close");
        draggable.classList.remove("distance-far");
    } else {
        dragcolumn.appendChild(draggable);
        draggable.classList.add("distance-close");
    }
    e.target.classList.add("taken");
    draggable.classList.add("taken");
    draggable.classList.remove("hide");
}

dropitems.forEach(dropitem => {
    dropitem.addEventListener("dragenter", dragEnter);
    dropitem.addEventListener("dragover", dragOver);
    dropitem.addEventListener("dragleave", dragLeave);
    dropitem.addEventListener("drop", drop);
})

const dragEnterCon = (e) => {
    // adding preventDefault because div is not a valid drop target by default //
    e.preventDefault();
    
}
const dragOverCon = (e) => {
    e.preventDefault();
    
}
const dragLeaveCon = (e) => {
    
}

const dropCon = (e) => {
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    draggable.classList.remove("hide");
}

container.addEventListener("dragenter",dragEnterCon);
container.addEventListener("dragover",dragOverCon);
container.addEventListener("dragleave",dragLeaveCon);
container.addEventListener("drop",dropCon);

// setting winning conditions and text when clicking on the control button //


controlbutton.onclick = () => {
    let score = 0;
    let filled = 0;
    for(let i = 0; i < dropitems.length; i++) {
        let answer = numberitems[i].innerHTML;
        if(dropitems[i].hasChildNodes() == true) {
            filled++
            console.log(filled);
            let right = parseInt((answer.split("*")[0]) * parseInt(answer.split("*")[1]));
            let dropNum = parseInt(dropitems[i].firstChild.innerHTML);
            if(dropNum == right) {
                score++;
            }
            if(filled == 10) {
              
                dragtext.style.visibility = "visible";
                dragtext.innerHTML = `You got ${score} right of 10 possible!`;
            }
            
            
        }
        if(filled < 10) {
            dragtext.style.visibility = "visible";
            dragtext.innerHTML = "You have to fill in all boxes!";
        }
        }
       
    }


/* control.onclick = () => {
    let score = 0;   
    let filled = 0;
        for(let i = 0; i < inputs.length; i++) {
            let guess = inputs[i].value;
            let answer = equations[i].innerHTML;
            let real = parseInt(answer.split("+")[0]) + parseInt(answer.split("+")[1]);
            if(guess == "") {
                text.innerHTML = "You have to fill in all forms!"
                text.style.visibility = "visible";
                
            } 
            else if(guess == real) {
                inputs[i].style.color = "green";
                score++;
            }
            // need to check if all inputs are filled
            if(guess !== "") {
                filled++;
            }
            if(filled == 10) {
                text.innerHTML = `You got ${score} right of 10 possible!`
                text.style.visibility = "visible"
            }
        }
        console.log(filled);
    
}

*/
