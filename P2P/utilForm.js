// this file is create for create all html fields and recall inside index.js


/**
 * Function that create a form
 * @param {*} form is the name of the form
 * @param {*} array is the array that contains all item 
 * @param {*} attributeNameItem is the name of all item of form
 * @param {*} callbackChoice is the callback
 */
function formPeerAvailable(form, array, attributeNameItem, callbackChoice) {
    var choice = undefined;

    // Clear Item if exist
    deleteCheckboxItem(attributeNameItem);


    for (i = 0; i < array.length; i++) {
        addCheckBoxItem(form, array[i].key, attributeNameItem, choice, (value) => choice = value);
    }


    // add button to checkbox
    var buttonChoice = document.createElement("input");
    buttonChoice.setAttribute("class", "button");
    buttonChoice.setAttribute("name", attributeNameItem);
    buttonChoice.setAttribute("type", "button");
    buttonChoice.setAttribute("value", "Choice Peer to Connect");
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
* @param {*} form 
* @param {*} value 
* @param {*} nameItemCheckbox 
* @param {*} returnChoice 
* @param {*} callback 
*/
function addCheckBoxItem(form, value, nameItemCheckbox, returnChoice, callback) {

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

    form.appendChild(newCheckbox);


    // add label to checkbox
    var label = document.createElement('label');
    label.setAttribute("name", nameItemCheckbox);
    label.htmlFor = value;
    label.appendChild(document.createTextNode(value));

    form.appendChild(label);

    // add br tag to checkbox 
    var br = document.createElement("br")
    br.setAttribute("name", nameItemCheckbox);
    form.appendChild(br);

}