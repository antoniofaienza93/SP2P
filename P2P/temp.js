window.onload = function () {
    document.getElementById("connect").onclick = function () { clickConnect() };
    document.getElementById("join").onclick = function () { seeAvailablePeer() };
    

    var peerClient = undefined;
    var peer_choice = undefined;
    var connection_choice = undefined;
    

    // div info
    var info = this.document.getElementById("info");

    // name tag for all element of checkbox
    var form_peer_available_class = "peer";

    // form to append element of checkbox 
    var form_peer_available = document.getElementById("choice-peer");    

    // var response
    var res = document.getElementById("request_connection");

    // var form req res
    var connection_choice_form = document.getElementById("connection_choice_form");

    // form that decide if woy want connect or not with peer
    var connection_choice_form_class = "accept-connection";

    var chatForm = document.getElementById("chat");

    var see_chat_message = document.getElementById("seeChatMessage");


    
    /**
     * Server get-request for generate the random String. When finish it call a callback that create a new Peer 
     */
    function clickConnect() {
        httpGetAsync("http://localhost:9000", createPeerClient);
    }

    /**
     * when click on the button i request all peer subscribed. When finisch it call a callback that display 
     * in a form all peer end exclude my personal peer 
     */
    function seeAvailablePeer() {
        httpGetAsync("http://localhost:9000/available-peer/", returnPeerAvailable);
    }

    // Callback when receive data
    function requestConnectionBetweenPeer(ID_requestor_peer) {

        // DATA RECEIVED 
        var label = document.createElement('label');
        label.setAttribute("name", "request_connection_label");
        label.htmlFor = "Il peer " + ID_requestor_peer + " want to connect with you";
        label.appendChild(document.createTextNode("Il peer " + ID_requestor_peer + " want to connect with you")); 
        res.appendChild(label);

        var choice = ["YES", "NO"];
        for(var i = 0; i < choice.length; i++){
            addCheckBoxItem(connection_choice_form, choice[i], connection_choice_form_class, connection_choice, (value) => connection_choice = value);
        }

        // add button to checkbox
        var buttonChoice = document.createElement("input");
        buttonChoice.setAttribute("type", "button");
        buttonChoice.setAttribute("class", "button");
        buttonChoice.setAttribute("name", connection_choice_form_class);       
        buttonChoice.setAttribute("value", "Choice Peer to Connect");
        buttonChoice.onclick = function () {
            if (connection_choice === undefined) {
                alert("SELECT YES OR NOT");
            } else {
                if(connection_choice == "YES") {
                    // connection accepted 
                    // sendData(ID_requestor_peer);
                    // **************************************************************************
                    // TODO PULIRE IL FORM DELLA SCELTA      
                   
                    var chat = new Chat();
                    chat.sendMessage(chatForm);
                    chat.onclickButton(sendChatMessage, ID_requestor_peer);

                }else {
                    // connection refused // TODO metterlo a posto 
                    peerClient.closeConnection(close);
                }
                
            }
        };
        connection_choice_form.appendChild(buttonChoice);
        


    }

    function close(id_peer){
        alert("Il peer " + id_peer + " si è disconnesso");
    }

    /**
     * Callback after creation string by Server
     */ 
    function createPeerClient(data) {
        // console.log("STRINGA GENERATA: " + data); // DEBUG
        var input = document.getElementById("username-choice").value;

        // TODO cambiare i path 
        peerClient = new PeerClient(input + "-" + data, "localhost", 9000, "/peerjs");

        // open connection 
        peerClient.openConnection();

        // enable reception of data
        peerClient.enableReceptionData(requestConnectionBetweenPeer);

        // add username
        var user = document.createElement('label');
        user.setAttribute("name", "user");
        user.htmlFor = peerClient.getId();
        user.appendChild(document.createTextNode("USERNAME " + peerClient.getId()));
        info.appendChild(user);

        
    }

    // callback from onclick button message
    function sendChatMessage(message, id_another_peer) {
        // alert(message + " " + id_another_peer);
        exchangeChatMessage(message, id_another_peer);

    }



    

    

    // ==============================================================
    // function that create a form 
    // ==============================================================
    function createForm(peer_available) {
        // check if elem checkbox already exist. In this case you clear at the first and then recreate checkbox
        if (document.getElementsByName(form_peer_available_class).length > 0) {
            var element = document.getElementsByName(form_peer_available_class), index;

            for (index = element.length - 1; index >= 0; index--) {
                element[index].parentNode.removeChild(element[index]);
            }
        }


        for (i = 0; i < peer_available.length; i++) {
            addCheckBoxItem(form_peer_available, peer_available[i].key, form_peer_available_class, peer_choice, (value) => peer_choice = value);
        }


        // add button to checkbox
        var buttonChoice = document.createElement("input");
        buttonChoice.setAttribute("class", "button");
        buttonChoice.setAttribute("name", form_peer_available_class);
        buttonChoice.setAttribute("type", "button");
        buttonChoice.setAttribute("value", "Choice Peer to Connect");
        buttonChoice.onclick = function () {
            if (peer_choice === undefined) {
                alert("KEEP ATTENTION: NO PEER SELECTED");
            } else {
                sendData(peer_choice);
            }
        };
        form_peer_available.appendChild(buttonChoice);
    }


    // ==============================================================
    // function that require peer available 
    // ==============================================================
    function returnPeerAvailable(peer_a) {

        // set the choice when request peer as undefined 
        peer_choice = undefined;

        // console.log("I peer a disposizione sono: " + peer_a); // DEBUG 
        var peer_available = JSON.parse(peer_a);

        // Remember to Subscrive
        if (peerClient === undefined) {
            alert("WARNING: REMEMBER TO SUBSCRIVE ");
        } else {


            var ownPeer = peer_available.find(o => o.key === peerClient.getId());

            // remove from ARRAY the element selected
            for (var i = 0; i < peer_available.length; i++) {
                if (peer_available[i].key == ownPeer.key) {
                    // delete peer_available[i]
                    peer_available.splice(i, 1);
                }
            }

            if (peer_available.length > 0) {
                createForm(peer_available);
            } else {
                alert("NO PEER AVAILABLE"); // TODO metterle per bene
            }
        }

    }

    // SEND data between peer 
    function sendData(id_another_peer) {
        // console.log("Peer sceltoooooooooo " + id_peer);
        var inputMessage = peerClient.getId();
        // var inputMessage = document.getElementById("sendMessage").value;  
        var conn = peerClient.conn(id_another_peer); // TODO per adesso ci mettiamo il primo e poi cambiare simultaneamente
        peerClient.sendData(conn, inputMessage);
    }

    function provaCallback(data){
        alert(" ------------------------------------ ");
        var chat = new Chat();
        chat.sendMessage(chatForm);
        chat.receiveMessage(see_chat_message, data);
    }


    function exchangeChatMessage(inputMessage, id_another_peer){
        var conn = peerClient.conn(id_another_peer); // TODO per adesso ci mettiamo il primo e poi cambiare simultaneamente
        peerClient.sendData(conn, inputMessage);
        peerClient.enableReceptionData(provaCallback);
        

    }






    /**
     * Add checkbox specifing the sequent param: 
     * @param {*} form 
     * @param {*} value 
     * @param {*} name_checkbox 
     * @param {*} returnChoice 
     * @param {*} callback 
     */
    function addCheckBoxItem(form, value, name_checkbox, returnChoice, callback) {

        // https://stackoverflow.com/questions/17758773/trouble-adding-checkboxes-to-html-div-using-js

        // add checkbox
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.setAttribute("value", value);
        newCheckbox.setAttribute("id", value);
        newCheckbox.setAttribute("name", name_checkbox);

        // IMPORTANT: https://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron
        // mutually exclusive choice - https://stackoverflow.com/questions/19362284/uncheck-a-checkbox-if-another-checked-with-javascript
        newCheckbox.onchange = function () {
            var cbs = document.getElementsByName(name_checkbox);
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
        label.setAttribute("name", name_checkbox);
        label.htmlFor = value;
        label.appendChild(document.createTextNode(value));

        form.appendChild(label);

        // add br tag to checkbox 
        var br = document.createElement("br")
        br.setAttribute("name", name_checkbox);
        form.appendChild(br);

    }

    // ===================
    // GET REQUEST SERVER
    // ===================
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
        console.log(xmlHttp.responseText)
    }

};


