

class Chat {

    
    constructor(){
        
    }

    sendMessage(div) {

        // It has at least one
        if (!(div.hasChildNodes())) 
        {
            this._div = div;

            this._input = document.createElement("input");
            this._input.setAttribute("type", "text");
            this._input.setAttribute("id", "sendMessageInput");
            this._input.setAttribute("placeholder", "Send message");
            

            this._buttonSend = document.createElement("input");
            this._buttonSend.setAttribute("type", "button");
            this._buttonSend.setAttribute("class", "button");
            this._buttonSend.setAttribute("id", "send");
            // sendMessage.setAttribute("name", connection_choice_form_class);       
            this._buttonSend.setAttribute("value", "Send");
            

            this._br = document.createElement("br")
            // br.setAttribute("name", name_checkbox);
            

            this._br2 = document.createElement("br")
            // br.setAttribute("name", name_checkbox);
            
            this._div.appendChild(this._input);
            this._div.appendChild(this._buttonSend);
            this._div.appendChild(this._br);
            this._div.appendChild(this._br2);
        }
        
    }

    receiveMessage(div, data){
        this._div_req = div;
        this.received_label = document.createElement('label');
        this.received_label.setAttribute("name", "see-message");
        this.received_label.htmlFor = data;
        this.received_label.appendChild(document.createTextNode(data));

        this._div_req.appendChild(label);
    }

    // onclickButton(callback, id_peer) {
    //     this._buttonSend.onclick = function (data) {
    //         var input = document.getElementById("sendMessageInput").value;     
    //         callback(input, id_peer);
    //     };
    // }

    onclickButton(callback) {
        this._buttonSend.onclick = function () {
            var input = document.getElementById("sendMessageInput").value;     
            callback(input);
        };
    }

    
    
}