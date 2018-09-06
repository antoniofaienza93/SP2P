/**
 * ===========================================================================
 * File: utiljoinPeerButton.js 
 * Author: Antonio Faienza
 * This file is create for create all html fields and recall inside index.js
 * ===========================================================================
 */

/**
 * This is the main form that appear when the item "multiplayer"
 * is selected
 */
function mainForm() {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "container mt-4");

    var div2 = document.createElement("div");
    div2.setAttribute("class", "col-md-6 offset-md-3");

    var div3 = document.createElement("div");
    div3.setAttribute("class", "card");

    var div4 = document.createElement("div");
    div4.setAttribute("class", "card-body");

    var div5 = document.createElement("div");
    div5.setAttribute("class", "needs-validation");
    div5.setAttribute("id", "needs-validation-id"); 

    var br = document.createElement("br");

    var maindiv = document.createElement("div");
    maindiv.setAttribute("id", "join-to-a-peer");

    div1.appendChild(div2);
    div2.appendChild(div3);
    div3.appendChild(div4);
    div4.appendChild(div5);


    var h3 = document.createElement("h3");
    h3.setAttribute("class", "text-center pink-text font-bold py-4");
    h3.innerHTML = "<strong>Connect to a peer:</strong>";

    var div6 = document.createElement("div");
    div6.setAttribute("class", "input-group mb-3");

    var input = document.createElement("input");
    input.setAttribute("id", "inputid");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "Enter ID");
    input.setAttribute("required", true);

    var div7 = document.createElement("div");
    div7.setAttribute("class", "input-group-append");

    var button = document.createElement("button");
    button.setAttribute("id", "connect");
    button.setAttribute("class", "btn btn-outline-pink");
    button.innerHTML = "Sign up";

    var i = document.createElement("i");
    i.setAttribute("class", "fa fa-paper-plane-o ml-1");

    button.appendChild(i);

    div7.appendChild(button);

    // creation input form user
    div6.appendChild(input);
    div6.appendChild(div7);
    div5.appendChild(h3);
    div5.appendChild(div6);

    div4.appendChild(br);
    div4.appendChild(maindiv);

    document.getElementById("multiplayer-form").appendChild(div1);

    var br = document.createElement("br");
    document.body.appendChild(maindiv);
    return maindiv;
}

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
 * 
 * @method P2PMaze#itemTaken
 * @param {*} pathImg - path of image
 * @param {*} itemKey - the item key DECOMMENTARE
 */
P2PMaze.itemTaken = function (pathImg, itemKey) {
    /* <div align="center"><img src="assets/images/estintore_grande.png"/><br><span>Estintore</span></div> */
    // create div
    var div = document.createElement("div");
    div.setAttribute("align", "center");

    // create image
    var img = document.createElement("img");
    img.setAttribute("src", pathImg);

    // create br
    var br = document.createElement("br")

    // create span
    var span = document.createElement("span");
    span.setAttribute("style", "color: white");
    span.innerHTML = itemKey;


    div.appendChild(img);
    div.appendChild(br);
    div.appendChild(span);
    document.getElementsByClassName("item")[0].appendChild(div);
}

/**
 * Remove all element inside a specific div when
 * the game ended
 * 
 * @method P2PMaze#itemTaken
 */
P2PMaze.clearItemDiv = function () {
    var myNode = document.getElementsByClassName("item")[0];

    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/**
 * Function that create a joinPeerButton
 * 
 * @method formPeerAvailable
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
 * In this case you clear at the first and then recreate checkbox.
 * 
 * @method formPeerAvailable
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
*
* @method addCheckBoxItem
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
 * 
 * @method clearChildDiv
 * @param {*} div - the div to remove
 */
function clearChildDiv(div) {

    if (div != null) {

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

    }

}

/**
 * This function delete the div and his child
 * @param {class div} cl 
 */
function clearDiv(cl) {
    var d = document.getElementById(cl);
    clearChildDiv(d);
    if (d != null) { d.remove(); }
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
    a.innerHTML = FORM.SEE_PEER_AVAILABLE;
    a.onclick = function () {
        callback();
    };

    div.appendChild(h3);
    div.appendChild(a);

    return div;
}


/**
 * Function that create the form that create the checkbox item
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
function itemChoiceForm() {

    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");

    var form = document.createElement("form");
    form.setAttribute("id", "connection_choice_form");
    form.setAttribute("action", "");

    div.appendChild(form);

    return div;
}

/**
 * This function return the div that contains the choise YES or NOT for estrablish the connection
 */
function divChoiceForm() {
    var div = document.createElement("div");
    div.setAttribute("class", "text-center darken-grey-text mb-4");
    div.setAttribute("id", "div-choice-form");

    return div;
}


/**
 * This function create an Alert Bootsrap
 * 
 * @method P2PMaze#alertMessage
 * @param {*} message the message that appear
 * @param {*} type there are different type of alert:
 *                  @danger
 *                  @warning
 *                  @info
 *                  and other: https://getbootstrap.com/docs/4.0/components/alerts/
 */
P2PMaze.alertMessage = function (message, type) {
    var br = document.createElement("br");
    var div = document.createElement("div");
    div.setAttribute("class", "alert alert-" + type + " text-center");
    div.setAttribute("role", "alert");
    div.innerHTML = "<strong>" + message + "</strong>";

    document.body.appendChild(br);
    document.body.appendChild(div);

    // Auto close alert
    // REF:https://codepen.io/CSWApps/pen/XJoLmN
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 4000);

    br.remove();
}

