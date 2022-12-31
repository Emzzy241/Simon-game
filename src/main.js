
import jsBadgeImage from "./assets/images/js-badge.svg";

// importing all audio files now

import audio1 from "./assets/audio/simonSound1.mp3";
import audio2 from "./assets/audio/simonSound2.mp3";
import audio3 from "./assets/audio/simonSound3.mp3";
import audio4 from "./assets/audio/simonSound4.mp3";

// storing up my applogo and the id's for each sound of the game
let myAppLogo = document.getElementById("myLogo");
let myAudioOne = document.getElementById("aud1");
let myAudioTwo = document.getElementById("aud2");
let myAudioThree = document.getElementById("aud3");
let myAudioFour = document.getElementById("aud4");

// workng with the stored Id's
myAppLogo.href = jsBadgeImage;
myAudioOne.src = audio1;
myAudioTwo.src = audio2;
myAudioThree.src = audio3;
myAudioFour.src = audio4;

// working with the 

import "./css/styles.css";








/* GAME RULES:

    THIS game basically start with the computer flashing lights and then the player has to match those lights


    1. At the beginning the strict mode is false.... The strict mode will 
ensure the players count starts from 0 again after they click on the wrong color

2. The game has 4 different lights and colors that will light up in a certain order
3. The player has to remember the order each round an additional light is added
4. The player has to remember all the lights so far in the game until you get to 
20 rounds for the player to win
5. For every round the count goes up by 1, for every wrong tap on any 4 colours
the game count flashes "NO". This is not under strict mode, but for strict mode once a 
player selects the wrong tap of colour, the score count starts from 0 again
6. As soon as you press start the count goes to one to show you that we're in the first round of the game

7. if the Power button is not on and you press start, only 1 quadrant will play for you


NOTE: IF STRICT MODE IS TO COMPLEX, YOU CAN TURN IT OFF AT THE 
BEGINNING OF THE GAME

 */


// typing out the variables we will be using

// a variable to keep track of the lights i.e how the lights are going to flash

// the order variable is for the computer while the playerOrder variable is for the player
let order = [];

// playerOrder variable is the order the player is pressing the lights
let playerOrder = [];

// the next variable is the number of flashes that have appeared in the game

let flash;

// let us also have a turn variable to keep track of what turn we're on.... It will be storing integers

let turn;

// the good variable will be storing booleans... and it checks if the player is doing well in the game or not
// the good vriable will also check if the player has hit all the right colors or if the player has hit all the wrong colors

let good;


// the compTurn variable is also a boolean and it will keep track on whether 
// it is the computer's turn or if it is the player's turn 

let compTurn;

// TODO: intervalId COME BACK HERE AND EXPLAIN THIS VARIABLE EMMANUEL


let intervalId;

// the strict variable is to check if the checkbox for strict mode has been clicked
// we set it to false at the beginning because we want the player to choose whether to turn it on or not

let strict = false;

// TODO: if we are playing noise COME BACK HERE AND EXPLAIN THIS VARIABLE EMMANUEL

let noise = true;

// this is if the power button checkbox has been checked for power on... It starts turned off

let on = false;

// this says if the player has won the game or not

let win;


// NOW LET US GET SOME OF OUR HTML ELEMENTS USING VANILLA JAVASCRIPT

// first the turnCounter to save in the id(turn)

const turnCounter = document.querySelector("#turn");



// then saving the topLeft, topRight, bottomLeft, bottomRight div with their id's so we can easily access them

const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");


// storing other game div's too

const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


// TIME TO WRITE CODE IN THE ORDER WHICH USER INTERACTS WITH GAME
// first thing you see as a user is the start button, power button and whether you want a strict mode

// starting with the code for strictButton..... i.e strict mode
// adding an eventListener when the checkbox of strict mode is changed or checked
// don't forget we set strict to false in this eventListener function we will be changing it to true and adding more functionalities
// to execute the strict mode 

strictButton.addEventListener("click", (strictModeEvent) => {
    console.log("checked... strict mode activated"); /* confirming if our checkbox is clicked */
    // NOTE: EMMANUEL when writing this application in jQuery for webpack, this event listener could also be "click"

    if (strictButton.checked == true) {
        // WE CAN ONLY USE .checked for input type: checkbox
        // here we ran a branch that will make the strict variable we declared at the top to be false to equal to true now only if the checkbox is clicked or changed, but if its not, then we return it back to false in the else branch
        strict = true;
    } else {
        strict = false;
    }

});

// DONE with the branch behind to determine if strict mode is activated
// let's now move on to the on button

onButton.addEventListener("click", (powerOnEvent) => {
    // in this eventListener function we first set the on to equal true and to turn on a little bit of light in the turn div
    // the little bit of light is just a "-"

    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "---"
    }
    else {
        turnCounter.innerHTML = ""
        // turning all the lights off is what the clearColour() function holds... it basically just turns the lighter colours to the darker colours

        clearColor();


        // also we want to clear the interval withh its id... we already defined the intervalId in the play() function

        clearInterval(intervalId);
        // so this is saying: if you turn the power off, clearInterval and you should stop SIMON from flashing the colors because it will stop running the gameTurn function every 800 milliseconds

    }
});

// when startButton is clicked and the game light is on, user should be able to play

startButton.addEventListener("click", (event) => {
    // we want to do something when the game is on

    if (on || win) {
        play();
        // TODO: a function that will play  our game if on = true or if win = true then we want to play the game by calling the play() function



    }

});



// dont worry we didn't use the event or the powerOnEvent parameters we created



function play() {
    // we want to reset variables if its the first time we're playing the game
    // but if you are playing again we have to make sure that the variables have been reset

    win = false;
    // you just started the game and you cannot win like that

    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true; /* this means player hasn't tapped on any color that's incorrect yet */

    // using a for loop to fill up the order array
    // we need to randomly fill up this order array with a random series of numbers to indicate the order that the 4 quadrants will light up in the game
    // so now lets use our for loop to loop while i < 0 and at the end of the loop we increment i with(i++;)
    // we did i < 20 because in the game user only wins when he/she gets to the 20th turn


    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1); /* pushing a random number into our order array */

        // this is an order that shows how the lights will flash in the game
    }
    // setting compTurn variable equal true after we have generated our 20 random numbers from 1 - 4

    compTurn = true;
    // this game basically start with the computer flashing lights and then the player has to match those lights

    console.log(order); /* now 20 random numbers from 1 to 4 gets generated for us */

    // after this we start the first turn

    intervalId = setInterval(gameTurn, 800);
    // setInterval here means its going to run a function after every amount of second you specify
    // in this case its 800.... the setInterval() function runs the gameTurn function every 800 milliseconds
    // that setInterval() function makes sure the computer flashes a light every 800 seconds(so far our flashing light is also a function, it runs the flashing light function every 800 seconds)
    // this will keep repeating every 800 seconds until the intervalId variable is cleared
    // the gameTurn() function is what flashes the colors 
}


// defining the game function

function gameTurn() {
    on = false;
    // what we said in changing the on function to false is 
    // we don't want the players to play the game i.e we dont want players to be able to click any quadrant... THAT'S CHEATING

    // running a branch now to determine if the number of flash equals turn, that means the computer's turn is over and its now time for the user

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;

        // if on = true then that means the player can now start pressing any of the quadrants i.e player starts playing the game

    }

    // in this branch if it is the computer's turn then we run this branch

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            // setTimeout helps us run a function once after 200milliseconds.... so it will wait for 200 milliseconds and then run our function

            // running a branch to know which color we will flash 
            // we are saying that after we've generated numbers and pushed them into our array
            // if the first number stored in that array is 1, we run the one(); function, if its 2 we run the two(); function

            // THE ES6 WAY OF WRITING IF STATEMENTS
            if (order[flash] == 1) one(); /*the one(); function flashes the first quadrant from the top left which is the green quadrant */
            if (order[flash] == 2) two(); /*the two(); function flashes the first quadrant from the top right which is the red quadrant */
            if (order[flash] == 3) three(); /*the three(); function flashes the first quadrant from the bottom left which is the yellow quadrant */
            if (order[flash] == 4) four(); /*the four(); function flashes the fourth quadrant from the bottom right which is the blue quadrant */

            // incrementing the flash now after any one of the conditions is true
            flash++;

        }, 200);
        // don't forget all of this happens only after 200 milliseconds
        // UNDERSTANDING HOW BOTH THE setInterval() function and the setTimeOut() function both work hand in hand
        //  the 200 milliseconds we specified here it means it will stop flashing for 200 milliseconds and its going to flash again till the end of 800 milliseconds
    }


}

// the one function

function one() {
    
    if (noise) {
        let audio = document.getElementById("clip1");
        // if noise = true, then we store in the clip1 audio file for usage and we play it

        audio.play();
    }
    noise = true; /* doing this just in case it was set to false before */
    topLeft.style.backgroundColor = "lightgreen";
    // we have already stored topLeft quadrant in the topLeft variable and then we styled the backgroundcolor to light green
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        // if noise = true, then we store in the clip2 audio file for usage and we play it

        audio.play();
    }
    noise = true; /* doing this just in case it was set to false before */
    topRight.style.backgroundColor = "tomato";
    // we have already stored topLeft quadrant in the topLeft variable and then we styled the backgroundcolor to light green
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        // if noise = true, then we store in the clip1 audio file for usage and we play it

        audio.play();
    }
    noise = true; /* doing this just in case it was set to false before */
    bottomLeft.style.backgroundColor = "yellow";
    // we have already stored topLeft quadrant in the topLeft variable and then we styled the backgroundcolor to light green
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        // if noise = true, then we store in the clip1 audio file for usage and we play it

        audio.play();
    }
    noise = true; /* doing this just in case it was set to false before */
    bottomRight.style.backgroundColor = "lightskyblue";
    // we have already stored topLeft quadrant in the topLeft variable and then we styled the backgroundcolor to light green
}

// the clearColor function

function clearColor() {
    // turning all 4 quadrant colors back to their normal colors when I call the clearColor() function

    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

// the flashColor() function is really similar to the checkColor() function


function flashColor() {
    // turning all 4 quadrant colors to the flashing colors

    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}




// adding some more event listeners to make the player able to click on any 4 quadrants 

topLeft.addEventListener("click", (event) => {
    // a branch to say: when the game is on push 1 for topLeft

    if (on) {
        playerOrder.push(1);
        // pushing 1 for topLeft into the playerOrder array
        // next calling the check function that will check to see if player was right or wrong
        check();
        // lastly whether the player was right or wrong we want to call the one() function
        console.log(playerOrder)
        one();
        // lastly if player hasn't won we set the timeOut function to run the clearColor() function after 300 seconds

        if (!win) {
            setTimeout(() => {
                clearColor();
                // making sure that the color that user has clicked gets ceared out after 300s

            }, 300);
        }
    }
});


topRight.addEventListener("click", (event) => {
    // a branch to say: when the game is on push 1 for topLeft

    if (on) {
        playerOrder.push(2);
        // pushing 2 for topRight into the playerOrder array
        // next calling the check function that will check to see if player was right or wrong
        check();
        // lastly whether the player was right or wrong we want to call the two() function
        console.log(playerOrder)
        two();
        // lastly if player hasn't won we set the timeOut function to run the clearColor() function after 300 seconds

        if (!win) {
            setTimeout(() => {
                clearColor();
                // making sure that the color that user has clicked gets ceared out after 300s

            }, 300);
        }
    }
});


bottomLeft.addEventListener("click", (event) => {
    // a branch to say: when the game is on push 1 for topLeft

    if (on) {
        playerOrder.push(3);
        // pushing 3 for bottomLeft into the playerOrder array
        // next calling the check function that will check to see if player was right or wrong
        check();
        // lastly whether the player was right or wrong we want to call the three() function
        console.log(playerOrder)
        three();
        // lastly if player hasn't won we set the timeOut function to run the clearColor() function after 300 seconds

        if (!win) {
            setTimeout(() => {
                clearColor();
                // making sure that the color that user has clicked gets ceared out after 300s

            }, 300);
        }
    }
});


bottomRight.addEventListener("click", (event) => {
    // a branch to say: when the game is on push 1 for topLeft

    if (on) {
        playerOrder.push(4);
        // pushing 4 for bottomRight into the playerOrder array
        // next calling the check function that will check to see if player was right or wrong
        check();
        // lastly whether the player was right or wrong we want to call the four() function
        console.log(playerOrder)
        four();
        // lastly if player hasn't won we set the timeOut function to run the clearColor() function after 300 seconds

        if (!win) {
            setTimeout(() => {
                clearColor();
                // making sure that the color that user has clicked gets ceared out after 300s

            }, 300);
        }
    }
});

// the check function to check if user clicked on the right quadrant

function check() {
    // the first if statement is just to check for the last number added to our playerOrder array
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        // REMEMBER the variable good is true if the player is getting everything correct and it is false if the player gets everything wrong
        // we said if the computer's last number(i.e the last numberin the order array is not equal to the last number in the playerOrder array)
        // then return the variable good as false

        good = false;
    }
    // now to check if player got every single one right
    if (playerOrder.length == 20 && good) {
        // we're saying that if player is on the 20th round and good(andhasn't missed anything) we call the winGame() function

        winGame();
    }

    // now another branch for if player did not get anyone right

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!"
        // all of this branch just means in the turnCounter(the place where we count our score) put in a string "NO!"

        // and again we set timeOut to turn the turnCounter to the normal turn number(turn) so it can continue counting 
        // again after some specific amount of milliseconds of showing the "NO" message to user

        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            // we first flash the color above with our function(flashColor()) and then we clear colour again inside the setTimeOut function


            // also if we're in strict mode we want to do something special
            // running a branch to do something if user turned on the strict mode from scratch

            if (strict) {
                play(); /* this is just for starting the whole game again if its under strct mode and user fails */
            } else {
                // so if we're not in strictmode we want to repeat the round
                // don't forget I said in strict mode when you click the wrong quadrant you start again from scratch

                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true; /* good = true back because we are now back to having nothing wrong because the round has just started */
                intervalId = setInterval(gameTurn, 800); /* we are calling the gameTurn function again after every 800 milliseconds  */
            }


        }, 800);

        // we are still in the good == false branch if player got something wrong now we dont want to play any noise
        // we only want to play the noise if the player got the right thing

        noise = false;

    }

    // we have done the condition if player wins the game, we have also done a condition for if the player gets it wrong
    // now its time for if the condition got it correct and still hasn't won the game yet

    if (turn == playerOrder.length && good && !win) {
        // all I said in this branch is if the turn number(turn... the red box in html) is equal to the length of the playerOrder
        // and that player has been playing really well, and that play has not won we want to turn++(we have now gotten to the next turn)
        turn++; /* going to the next turn */
        playerOrder = [];        /* clearing playerOrder for the next turn to begin */
        compTurn = true;  /* computer's turn = true, we're telling the computer to play again by flashing any randomly generated light out of the 4 quadrant light */
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);

    }

}

// we defined the flashColor() function above, the other function our check() function needs is the winGame() function

function winGame() {
    // first thing we do when someone wins the game is to flash the colors with the flashColor(); function
    flashColor();
    turnCounter.innerHTML = "WIN!" /* turnig the turnCounter screen to a win message */
    on = false; /* user can't click anything again because on is now false */
    win = true; // player has just won the game

}

// if(!onButton && startButton)