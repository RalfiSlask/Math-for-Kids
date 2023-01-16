// operator variables //

const addition = document.querySelector(".add");
const subtract = document.querySelector(".subtract");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");

const equation = document.querySelector(".equation");
const operations = document.querySelectorAll(".operations div");
const operator = document.querySelector(".operator");
const guesses = document.querySelectorAll(".guesses div");
const question = document.querySelector(".question");
const button = document.querySelector(".button");

const colorArray = ["#F38181","#FCE38A", "#95E1D3"];

// Number Variables //

const firstNumber = document.querySelector(".red-number");
const secondNumber = document.querySelector(".yellow-number");

// Answer variables //

const answerOne = document.querySelector(".answer-1");
const answerTwo = document.querySelector(".answer-2");
const answerThree = document.querySelector(".answer-3");

// Function when clicking the button and generating new equation and guesses //

const generateEquation = () => {
    // Replacing answer with a gray question mark when a new equation is generated //
    question.style.color = "gray";
    question.innerHTML = "?";
    // Generating random numbers for the equation //
    let randNumber = Math.floor(Math.random() * 20);
    let randNumber2 = Math.floor(Math.random() * 20);
    firstNumber.innerHTML = randNumber;
    secondNumber.innerHTML = randNumber2;
    // Creating a random Index and randomNumber for the guesses //
    let randIndex = Math.floor(Math.random() * 3);
    let randI = Math.floor(Math.random() * 3)
    let randGuessNumber = Math.floor(Math.random() * 10 + 1);
    // Creating numbers for the different answers depending on what operator is in play //
    if(operator.innerHTML == "+") {
        let number = parseInt(firstNumber.innerHTML) + parseInt(secondNumber.innerHTML);
        guesses[randIndex].innerHTML = number;
        let DummyAnswer1 = number - randGuessNumber;
        let DummyAnswer2 = number + randGuessNumber;
        if(randIndex == 0) {
            guesses[1].innerHTML = DummyAnswer1;    
            guesses[2].innerHTML = DummyAnswer2;
        } else if(randIndex == 1) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[2].innerHTML = DummyAnswer2;
        } else if(randIndex == 2) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[1].innerHTML = DummyAnswer2
        }
    } else if(operator.innerHTML == "-") {
        let number = parseInt(firstNumber.innerHTML) - parseInt(secondNumber.innerHTML);
        guesses[randIndex].innerHTML = number;
        let DummyAnswer1 = number - randGuessNumber;
        let DummyAnswer2 = number + randGuessNumber;
        if(randIndex == 0) {
            guesses[1].innerHTML = DummyAnswer1; 
            guesses[2].innerHTML = DummyAnswer2;
        } else if(randIndex == 1) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[2].innerHTML = DummyAnswer2
        } else if(randIndex == 2) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[1].innerHTML = DummyAnswer2;
        }
    } else if(operator.innerHTML == "*") {
        let number;
        // Does not want to have the zero number in equation when dealing with multiplication //
        if(number == 0) {
            number = 1;
        } else {
            number = parseInt(firstNumber.innerHTML) * parseInt(secondNumber.innerHTML);
        }
        guesses[randIndex].innerHTML = number;
        let DummyAnswer1 = number - randGuessNumber;
        let DummyAnswer2 = number + randGuessNumber;
        if(randIndex == 0) {
            guesses[1].innerHTML = DummyAnswer1; 
            guesses[2].innerHTML = DummyAnswer2;
        } else if(randIndex == 1) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[2].innerHTML = DummyAnswer2;
        } else if(randIndex == 2) {
            guesses[0].innerHTML = DummyAnswer1; 
            guesses[1].innerHTML = DummyAnswer2;
        }
    } else if(operator.innerHTML == "/") {
        let randNumberDiv = Math.floor(Math.random() * 200);
        let randNumberDiv2 = Math.floor(Math.random() * 200);
        firstNumber.innerHTML = randNumberDiv;
        secondNumber.innerHTML = randNumberDiv2;
        if(parseInt(secondNumber.innerHTML) == 0) {
            generateEquation();
        }
        if(parseInt(firstNumber.innerHTML) < parseInt(secondNumber.innerHTML)) {
            generateEquation();
        } 
        if(parseInt(firstNumber.innerHTML) % parseInt(secondNumber.innerHTML) == 0) { 
            let number = parseInt(firstNumber.innerHTML) / parseInt(secondNumber.innerHTML);
            guesses[randIndex].innerHTML = number;
            let DummyAnswer1 = number - randGuessNumber;
            let DummyAnswer2 = number + randGuessNumber;
            if(randIndex == 0) {
                guesses[1].innerHTML = DummyAnswer1; 
                guesses[2].innerHTML = DummyAnswer2;
            } else if(randIndex == 1) {
                guesses[0].innerHTML = DummyAnswer1; 
                guesses[2].innerHTML = DummyAnswer2;
            } else if(randIndex == 2) {
                guesses[0].innerHTML = DummyAnswer1; 
                guesses[1].innerHTML = DummyAnswer2;
            }
        } else {
            generateEquation();
        }
        }
     
} 

// Generating new equations when clicking button //

button.onclick = () => {
    generateEquation();
}

// Changing operator in equation when clicking on different operators //

operations.forEach(element => {
    element.onclick = () => {
        if(element.classList.contains("add")) {
            operator.innerHTML = "+";
            generateEquation();
        } else if(element.classList.contains("subtract")) {
            operator.innerHTML = "-";
            generateEquation();
        } else if(element.classList.contains("multiply")) {
            operator.innerHTML = "*";
            generateEquation();
        } else if(element.classList.contains("divide")) {
            operator.innerHTML = "/";
            generateEquation();
        }    
    }
})

// Shaking animations and audio for wrong answer //

let wrongAudio = new Audio("/Sounds/wrong.mp3");
wrongAudio.volume = 0.2;

let rightAudio = new Audio("/Sounds/correct.mp3");
rightAudio.volume = 0.2;

const Shake = () => {
    equation.classList.add("shaking")
}

const ShakeEnd = () => {
    equation.classList.remove("shaking")
}

// Styling answer depending on if it is right or wrong //

guesses.forEach(element => {
    element.onclick = () => {
        if(operator.innerHTML == "+") {
            let number = parseInt(firstNumber.innerHTML) + parseInt(secondNumber.innerHTML);
            question.innerHTML = element.innerHTML;
            if(question.innerHTML == number) {
                generateEquation();
                rightAudio.play();
            } else {
                question.style.color = "red";
                wrongAudio.play();
                setTimeout(Shake, 0);
                setTimeout(ShakeEnd, 500);
            }
        } else if(operator.innerHTML == "-") {
            let number = parseInt(firstNumber.innerHTML) - parseInt(secondNumber.innerHTML);
            question.innerHTML = element.innerHTML;
            if(question.innerHTML == number) {
                generateEquation();
                rightAudio.play();
            } else {
                question.style.color = "red";
                wrongAudio.play();
                setTimeout(Shake, 0);
                setTimeout(ShakeEnd, 500);
            }
        } else if(operator.innerHTML == "*") {
            let number = parseInt(firstNumber.innerHTML) * parseInt(secondNumber.innerHTML);
            question.innerHTML = element.innerHTML;
            if(question.innerHTML == number) {
                generateEquation();
                rightAudio.play();
            } else {
                question.style.color = "red";
                wrongAudio.play();
                setTimeout(Shake, 0);
                setTimeout(ShakeEnd, 500);
            }
        } else if(operator.innerHTML == "/") {
            let number = parseInt(firstNumber.innerHTML) / parseInt(secondNumber.innerHTML);
            question.innerHTML = element.innerHTML;
            if(question.innerHTML == number) {
                generateEquation();
                rightAudio.play();
            } else {
                question.style.color = "red";
                wrongAudio.play();
                setTimeout(Shake, 0);
                setTimeout(ShakeEnd, 500);
            }
        }    
    }
})

