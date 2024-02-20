document.getElementById("mainTitle").innerText = "Point and Click Adventure Game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory
let inventory = [];
console.log(inventory);
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
            getItem("Rusty key", "rustyKey");
            break;
        case "well":
            getItem("Coin", "coin");
            break;
        case "doorWizardHut": // at the door wizard hut
            if (checkItem("Rusty key")) { // check if you have the rusty key
                console.log("I opened the door. Yeah!");
            } else if (checkItem("Coin")) {
                removeItem("Coin", "coin");
                console.log("I tried to open the door with the coin, it didn't work. And it slipped through the keyhole.");
            } else { //else 
                console.log("Fuck, this door's locked. I need to find a key.");
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
     * Checks if the  value exists within the array
     * If not then it adds value to the array and use showItem function
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(inventory);

    }
    /**
     * Returns string value if it exist within the array
     * @param {string} itemName 
     * @returns 
     */
    function checkItem(itemName) {
        return inventory.includes(itemName);
    }
    /**
     * Needs a name for displaying item and a htmml id name
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function showItem(itemName, itemId) {
        console.log('You\'ve found a ' + itemName + '!');
        const keyElement = document.createElement("li");
        keyElement.id = itemId;
        keyElement.innerText = itemName;
        inventoryList.appendChild(keyElement);
    }

    /**
     * removes items within the array
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function removeItem(itemName, itemId) {
        // remove item in array
        inventory == inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        });
        document.getElementById(itemId).remove();
    }
}
