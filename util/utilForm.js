/**
 * ===========================================================================
 * File: utiljoinPeerButton.js 
 * Author: Antonio Faienza
 * This file is create for create all html fields and recall inside index.js
 * TODO: 
 * ===========================================================================
 */


/**
 * This function create the button and return the callback of click choice
 * @param {*} cls is class of button
 * @param {*} name is the name assign to button
 * @param {*} value is the value of button
 * @param {*} callbackChoice is the callback ??
 */
function createButton(cls, name, value, data, callback) {
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("class", cls);
    button.setAttribute("class", "btn btn-outline-pink");
    button.setAttribute("name", name);
    button.setAttribute("value", value);
    button.onclick = function () {
        callback(data);
    };

    return button;
}




/**
 * Define the element taken
 * @param {*} pathImg - path of image
 * @param {*} itemKey - the item key DECOMMENTARE
 */
// P2PMaze.itemTaken = function (pathImg, itemKey) {
//     /* <div align="center"><img src="assets/images/estintore_grande.png"/><br><span>Estintore</span></div> */
//     // create div
//     var div = document.createElement("div");
//     div.setAttribute("align", "center");

//     // create image
//     var img = document.createElement("img");
//     img.setAttribute("src", pathImg);

//     // create br
//     var br = document.createElement("br")

//     // create span
//     var span = document.createElement("span");
//     span.setAttribute("style", "color: white");
//     span.innerHTML = itemKey;


//     div.appendChild(img);
//     div.appendChild(br);
//     div.appendChild(span);
//     document.getElementsByClassName("item")[0].appendChild(div);
// }

/**
 * Remove all element inside a specific div when the game ended
 * TODO: TEST DECOMMENTARE
 */
// P2PMaze.clearItemDiv = function () {
//     var myNode = document.getElementsByClassName("item")[0]; 

//     while (myNode.firstChild) {
//         myNode.removeChild(myNode.firstChild);
//     }
// }

/**
 * Function that create a joinPeerButton
 * @param {*} form is the name of the joinPeerButton
 * @param {*} array is the array that contains all item 
 * @param {*} attributeNameItem is the name of all item of joinPeerButton
 * @param {*} callbackChoice is the callback
 */
function formPeerAvailable(form, array, attributeNameItem, value, callbackChoice) {
    var choice = undefined;

    // Clear Item if exist
    deleteCheckboxItem(attributeNameItem);


    for (i = 0; i < array.length; i++) {
        addCheckBoxItem(form, array[i].key, attributeNameItem, choice, (value) => choice = value);
    }


    // add button to checkbox
    var buttonChoice = document.createElement("input");
    buttonChoice.setAttribute("class", "button");
    buttonChoice.setAttribute("class", "btn btn-outline-pink");
    buttonChoice.setAttribute("name", attributeNameItem);
    buttonChoice.setAttribute("type", "button");
    buttonChoice.setAttribute("value", value);
    buttonChoice.onclick = function () {
        callbackChoice(choice);
    };

    form.appendChild(buttonChoice);
}

/**
 * Check if elem checkbox already exist passing the attribute "name". 
 * In this case you clear at the first and then recreate checkbox
 * @param {*} attributeNameItem is attribute name
 */
function deleteCheckboxItem(attributeNameItem) {
    if (document.getElementsByName(attributeNameItem).length > 0) {
        var element = document.getElementsByName(attributeNameItem), index;

        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
    }
}
/**
* Add checkbox specifing the sequent param: 
* @param {*} joinPeerButton 
* @param {*} value 
* @param {*} nameItemCheckbox 
* @param {*} returnChoice 
* @param {*} callback 
*/
function addCheckBoxItem(joinPeerButton, value, nameItemCheckbox, returnChoice, callback) {

    // https://stackoverflow.com/questions/17758773/trouble-adding-checkboxes-to-html-div-using-js

    // add checkbox
    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.setAttribute("value", value);
    newCheckbox.setAttribute("id", value);
    newCheckbox.setAttribute("name", nameItemCheckbox);

    // IMPORTANT: https://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron
    // mutually exclusive choice - https://stackoverflow.com/questions/19362284/uncheck-a-checkbox-if-another-checked-with-javascript
    newCheckbox.onchange = function () {
        var cbs = document.getElementsByName(nameItemCheckbox);
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
        }
        this.checked = true;

        // define the peer selected as choice            
        callback(this.value);
    };

    joinPeerButton.appendChild(newCheckbox);


    // add label to checkbox
    var label = document.createElement('label');
    label.setAttribute("name", nameItemCheckbox);
    label.htmlFor = value;
    label.appendChild(document.createTextNode(value));

    joinPeerButton.appendChild(label);

    // add br tag to checkbox 
    var br = document.createElement("br")
    br.setAttribute("name", nameItemCheckbox);
    joinPeerButton.appendChild(br);

}

/**
 * Remove the existing div if exist
 * @param {*} div - the div to remove
 */
function clearDiv(div) {

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

/**
 * Return the label of username
 * @param {*} user 
 */
function formUsername(user) {
    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var h4 = document.createElement("h4");
    h4.setAttribute("class", "font-bold mb-2");
    h4.innerHTML = "USERNAME: " + user; // TODO da cambiare

    div.appendChild(h4);
    return div;
}

/**
 * Return the form of peer available
 */
function joinPeerButton(callback) {

    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var h3 = document.createElement("h3");
    h3.setAttribute("class", "font-bold mb-3");
    h3.innerHTML = "Join to a peer";

    var a = document.createElement("a");
    a.setAttribute("class", "btn btn-danger");
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "join");
    a.innerHTML = "See Peer Available";
    a.onclick = function () {
        callback();
    };

    div.appendChild(h3);
    div.appendChild(a);

    return div;
}


/**
 * function that create the form that create the checkbox item
 */
function choicePeerForm() {
    var div = document.createElement("div");
    div.setAttribute("id", "div-choice-peer");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var form = document.createElement("form");
    form.setAttribute("id", "choice-peer");
    form.setAttribute("action", "");

    div.appendChild(form);

    return div;

}

/**
 * Return the request connection forms
 */
function requestConnectionForm() {
    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");
    div.setAttribute("id", "request_connection");

    return div;

}

/**
 * Return the div that contains the choice to establish connection from the peer requester
 */
function connectionChoiceForm() {

    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var form = document.createElement("form");
    form.setAttribute("id", "connection_choice_form");
    form.setAttribute("action", "");

    div.appendChild(form);

    return div;
}

function chatFormmm() {
    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");
    div.setAttribute("id", "chat");

    return div;
}


/**
 * this method create a label. It used for explain of the user that the message is sent to other peer
 * @param {*} message 
 */
function messageInvite(message) {
    var div = document.createElement("div");
    div.setAttribute("id", "invitation");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var h4 = document.createElement("h4");
    h4.setAttribute("class", "font-bold mb-3");
    h4.innerHTML = message;

   

    div.appendChild(h4);

    return div;
}