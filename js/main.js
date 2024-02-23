document.getElementById("mainTitle").innerText = "Point and Click Adventure Game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

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

//Decor/interactables
const tree1 = document.getElementById("squareTree");
const door1 = document.getElementById("door");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    //TODO: calc offsat  based on character size

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
                console.log("got the key")
            } else {
                console.log("I've already found the key.");
            }
            break;
        case "well":
            if (gameState.coinPickedUp == false) {
                changeInventory("coin", "add");
                gameState.coinPickedUp = true;
            } else {
                console.log("There are no more coins in the well");
            }
            //document.getElementById("coin").remove();
            break;
        case "doorWizardHut": // at the door wizard hut
            if (checkItem("key")) { // check if you have the rusty key
                console.log("I opened the door. Yeah!");
                console.log(gameState.inventory);
                changeInventory('key', "remove");

            } else if (checkItem("coin")) {
                changeInventory("coin", "remove");
                console.log("I tried to open the door with the coin, it didn't work. And it slipped through the keyhole.");
            } else { //else 
                console.log("Darn, this door's locked. I need to find a key.");
            }
            break;
        case "statue":
            console.log("Hey, pst over here. You seem to be looking for the key, i'll tell you.");
            console.log("It's hidden by the graves.");
            break;
        default:
            break;
        // tree1.style.opacity = 1;
    }
    // ^ does basically what's below 
    // if (e.target.id == "squareTree") {
    //     tree1.style.opacity = 0.5;
    // } else {
    //     tree1.style.opacity = 1;
    // } 

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
}