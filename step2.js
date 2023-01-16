let equations = document.querySelectorAll(".section label");
let control = document.querySelector(".control");
let inputs = document.querySelectorAll(".section input")
let text = document.querySelector(".text");
let button2 = document.querySelector(".button--2");

const generateNewEquations = () => {
    text.style.visibility = "hidden";
    inputs.forEach(input => {
        input.style.color = "black";
    })
    equations.forEach(element => {
        let randNumberOne = Math.floor(Math.random() * 100);
        let randNumberTwo = Math.floor(Math.random() * 100);
        if(randNumberOne == 0 && randNumberTwo == 0) {
            return;
        }
        // Making it so the largest number always is the first one //
        if(randNumberOne > randNumberTwo) {
            element.innerHTML = `${randNumberOne} + ${randNumberTwo}`
        } else {
            element.innerHTML = `${randNumberTwo} + ${randNumberOne}`
        }
        inputs.forEach(input => {
            input.value = "";
        })
        
    })
}

generateNewEquations();

button2.onclick = () => {
    generateNewEquations();
}


control.onclick = () => {
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
