document.getElementById("mainTitle").innerText = "Point and Click Adventure Game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//inventory
const inventoryList = document.getElementById("inventoryList");

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;


const tree1 = document.getElementById("squareTree");
const door1 = document.getElementById("door");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    //TODO: calc offsat  based on character size
    //FIX: character doesn't animate right on the first click.
    //FIX: character can go out of bounnds when clicking on itself (i don't have that issue)
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) { // basically same as if statements but easier/less messy
        case "squareTree":
            tree1.style.opacity = 0.5;

        //case "door":
        // console.log("Clicked door");
        // break;
        case "key":
            console.log('You\'ve found a key!');

            document.getElementById("key").remove();
            const keyElement = document.createElement("li");
            keyElement.id = "inv-key";
            keyElement.innerText = "key";
            inventoryList.appendChild(keyElement);
            break;
        default:
            tree1.style.opacity = 1;
    }
    // ^ does basically what's below 
    // if (e.target.id == "squareTree") {
    //     tree1.style.opacity = 0.5;
    // } else {
    //     tree1.style.opacity = 1;
    // } 


}
