document.getElementById("mainTitle").innerText = "Point and Click Adventure Game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");
const sec = 1000;

//Game  state
gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false

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
                    showMessage(heroSpeach, "I found the key.", heroAudio);
                    console.log("got the key")
                } else {
                    console.log("I've already found the key.");
                }
                break;
            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add");
                    showMessage(heroSpeach, "i found a coin.", heroAudio);
                    gameState.coinPickedUp = true;
                } else {
                    console.log("There are no more coins in the well");
                }
                //document.getElementById("coin").remove();
                break;
            case "doorWizardHut": // at the door wizard hut
                if (checkItem("key")) { // check if you have the rusty key
                    showMessage(heroSpeach, "i opened the door!", heroAudio);
                    console.log("I opened the door. Yeah!");
                    console.log(gameState.inventory);
                    changeInventory('key', "remove");

                } else if (checkItem("coin")) {
                    changeInventory("coin", "remove");
                    showMessage(heroSpeach, "I tried to open the door with the coin, it didn't work. And it slipped through the keyhole.", heroAudio);
                } else { //else 
                    showMessage(heroSpeach, "Darn, this door's locked. I need to find a key.", heroAudio);
                    console.log("Darn, this door's locked. I need to find a key.");
                }
                break;
            case "statue":
                showMessage(heroSpeach, "Hey, a statue.. looks okay", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4.1 * sec, counterSpeach, "I can talk you know.", counterAudio);
                setTimeout(showMessage, 8.1 * sec, heroSpeach, "What the hell, that's not normal.", heroAudio);
                setTimeout(showMessage, 12.1 * sec, counterSpeach, "Shut up, aren't you looking for the key? Check the graves..", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                break;
            default:
                break;
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


}