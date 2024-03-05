document.getElementById("mainTitle").innerText = "Point and Click Adventure Game";
document.getElementById("objective").innerText = "Objective: Get back home.";


//Game window reference
const gameWindow = document.getElementById("gameWindow");
const sec = 1000;

//Game  state
gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false

}

// how to restart the game, comment it out if you want to restart it.
//localStorage.removeItem("gameState");

if (Storage) {
    if (localStorage.gameState) {
        // uses localStorage gameState string and convert it to an object. Then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    } else {
        // convert local object variable to a string, then store it into local storage.
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }
}


const inventoryList = document.getElementById("inventoryList");

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

// Speech Bubble
const heroSpeach = document.getElementById("heroSpeach");
const counterSpeach = document.getElementById("counterSpeach");  // speech written wrong, but else wouldn't work.

//Audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");


// Avatar
const counterAvatar = document.getElementById("counterAvatar");


//Decor/interactables
const tree1 = document.getElementById("squareTree");
const door1 = document.getElementById("door");

//GameState
if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

// Update the inventory, show the stuff u found before refreshing
updateInventory(gameState.inventory, inventoryList);



gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    //TODO: calc offsat  based on character size



    if (counterSpeach.style.opacity == 0 && heroSpeach.style.opacity == 0) {
        if (e.target.id !== "heroimg") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }





        switch (e.target.id) { // basically same as if statements but easier/less messy
            //case "squareTree":
            //  tree1.style.opacity = 0.5;


            case "key":
                if (gameState.keyPickedUp == false) {
                    changeInventory('key', "add");
                    gameState.keyPickedUp = true;
                    showMessage(heroSpeach, "I found the key!", counterAudio);
                    console.log("got the key")
                    saveGamestate(gameState);
                } else {
                    console.log("I've already found the key.");
                }
                break;
            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add");
                    showMessage(heroSpeach, "Oo shiny coin, don't mind if i do. There's also a note it says: 'Inkt writes my face, yet i'm made from wood'", counterAudio);
                    gameState.coinPickedUp = true;
                    saveGamestate(gameState);
                } else {
                    showMessage(heroSpeach, "The note says: 'Inkt writes my face, yet i'm made from wood'.", counterAudio);
                    console.log("There are no more coins");
                }
                //document.getElementById("coin").remove();
                break;
            case "doorWizardHut": // at the door wizard hut | For my own map, the house
                if (checkItem("key")) { // check if you have the key
                    showMessage(heroSpeach, "i opened the door! Time for a nap, those puzzles tired me out.", counterAudio);
                    console.log("I opened the door, i'm safely home again!");
                    console.log(gameState.inventory);
                    changeInventory('key', "remove");
                    saveGamestate(gameState);

                } else if (checkItem("coin")) {
                    changeInventory("coin", "remove");
                    showMessage(heroSpeach, "I tried to peek through the keyhole while holding the coin, and it slipped through it.", counterAudio);
                    saveGamestate(gameState);
                } else { //else 
                    showMessage(heroSpeach, "The door's locked, i need a key. i remember we used riddles.. first i need to find the chest.", counterAudio);
                    /* console.log("Darn, this door's locked. I need to find a key.");*/
                }
                break;
            case "statue":
                showMessage(heroSpeach, "Ofcourse the sign! i don't see any riddle on it..", counterAudio);   // i switched up the counter and hero audio since my hero is a female character.
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4.1 * sec, counterSpeach, "That's because i have to tell you.", heroAudio);
                setTimeout(showMessage, 8.1 * sec, heroSpeach, "HUH what the hell, i don't remember u talking.", counterAudio);
                setTimeout(showMessage, 12.1 * sec, counterSpeach, "Moving on, Here's the riddle: Berries decorate my bushy hair, i lie above a white floret.", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                break;
            default:
                break;
        }
    }

}

/**
     * Add or remove item in inventory
     * @param {string} itemName 
     * @param {string} action 
     */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * Returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}



function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
        console.log(inventory);

    })
}
/**
 *  Will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}

/**
 * Hides message and pauses the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}

/**
 * saves gameState into localStorage
 * @param {Object} gameState 
 */
function saveGamestate(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}