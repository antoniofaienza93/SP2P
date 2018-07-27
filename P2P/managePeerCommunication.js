/**
 * ===========================================================================
 * File: managePeerCommunication.js 
 * Author: Antonio Faienza
 * This file handle the comunication between two peer
 * TODO When the page would refresh, remember to destrou the comunication
 * ===========================================================================
 */
window.onload = function () {
    document.getElementById("connect").onclick = function () { clickConnect() };
    document.getElementById("join").onclick = function () { seeAvailablePeer() };



    var peerClient = undefined;
    var connectionChoice = undefined;


    // div info
    var info = this.document.getElementById("info");

    // name tag for all element of checkbox
    var form_peer_available_class = "peer";

    // form to append element of checkbox 
    var form_peer_available = document.getElementById("choice-peer");

    // var response
    var res = document.getElementById("request_connection");

    // var form req res
    var formConnectionChoice = document.getElementById("connection_choice_form");

    // form that decide if woy want connect or not with peer
    var classItemForm = "accept-connection";

    var chatForm = document.getElementById("chat");

    // var see_chat_message = document.getElementById("seeChatMessage");


    var connectionChoice = undefined;

    var chat = new Chat();

    /**
     * Server get-request for generate the random String. When finish it call a callback that create a new Peer 
     */
    function clickConnect() {
        httpGetAsync(PEER_SERVER.ENROLLMENT, createPeerClient);
    }

    /**
     * when click on the button i request all peer subscribed. When finisch it call a callback that display 
     * in a form all peer end exclude my personal peer 
     */
    function seeAvailablePeer() {
        httpGetAsync(PEER_SERVER.PEER_AVAILABLES, returnPeerAvailable);
    }

    /**
     * Callback when receive data
     * @param {*} data are the data received
     */
    function dataReceived(data) {

        if (peerClient.getConnection() == undefined) {
            // TODO questo mi sa lo devo cancellare 
            var label = document.createElement('label');
            label.setAttribute("name", "request_connection_label");
            label.htmlFor = "Il peer " + data + " want to connect with you";
            label.appendChild(document.createTextNode("Il peer " + data + " want to connect with you"));
            res.appendChild(label);

            var decideToConnect = ["YES", "NO"];
            for (var i = 0; i < decideToConnect.length; i++) {
                addCheckBoxItem(formConnectionChoice, decideToConnect[i], classItemForm, connectionChoice, (value) => connectionChoice = value);
            }


            // add button to checkbox
            var buttonChoice = document.createElement("input");
            buttonChoice.setAttribute("type", "button");
            buttonChoice.setAttribute("class", "button");
            buttonChoice.setAttribute("name", classItemForm);
            buttonChoice.setAttribute("value", "Choice Peer to Connect");
            buttonChoice.onclick = function () {
                if (connectionChoice == undefined) {
                    alert(COMMUNICATION.PEER_SELECTED + data);
                } else if (connectionChoice == "YES") {

                    acceptConnection(data);
                    // TODO questa è una chat provvisoria che deve essere messa a posto
                    chat.sendMessage(chatForm);
                    chat.onclickButton(sendChatMessage);
                    deleteCheckboxItem(classItemForm);

                    // the player accept the connection and then it can see the canvas with multiplayer
                    enableGame();

                } else if (connectionChoice == "NO") {

                    refuseConnection();

                    // TODO Cancellare il form               
                }
            };
            formConnectionChoice.appendChild(buttonChoice);
        } else {

            if (data == "INVITATION_ACCEPTED") {
                enableGame();
                chat.sendMessage(chatForm);
                chat.onclickButton(sendChatMessage);
            } else {
                P2PMaze.dataReceived = data;
            }

        }


    }


    /**
     * This is the second point to open a connection. Who accept the connection is considered 
     * the opponent player
     * @param {*} peerRequestor 
     */
    function acceptConnection(peerRequestor) {
        peerClient.conn(peerRequestor);
        peerClient.openConnection("INVITATION_ACCEPTED");

    }


    function refuseConnection() {
        // far ritornare la connessione
        peerClient.closeConnection();
    }


    /**
     * callback from onclick button message
     * @param {*} message message to send
     */
    function sendChatMessage(message) {
        var id = peerClient.getConnection().peer;
        console.log("MESSAGGIO " + message + " AL PEER " + id);
        send(message);
    }

    /**
     * Callback after creation string by Server
     */
    function createPeerClient(data) {
        // console.log("STRINGA GENERATA: " + data); // DEBUG
        var input = document.getElementById("username-choice").value;

        peerClient = new PeerClient(input + "-" + data, PEER_CLIENT.HOST, PEER_CLIENT.PORT, PEER_CLIENT.PATH);


        // enable reception of data
        peerClient.enableReceptionData(dataReceived);

        console.log(peerClient.seeError());

        // add username
        var user = document.createElement('label');
        user.setAttribute("name", "user");
        user.htmlFor = peerClient.getId();
        user.appendChild(document.createTextNode("USERNAME " + peerClient.getId()));
        info.appendChild(user);
    }


    function enableGame() {
        // the player has accepted the comuniation and for this the div is again visible
        // console.log(P2PMaze.game.state); // DEBUG
        // console.log(P2PMaze);
        P2PMaze.peer = peerClient;
        P2PMaze.game.state.start("GameMultiplayer");
        var divGame = document.getElementById("P2PMaze");
        divGame.style.display = "block";

    }


    /**
     * Function that require peer available 
     * @param {*} peer_a peer available 
     */
    function returnPeerAvailable(peer_a) {

        // console.log("I peer a disposizione sono: " + peer_a); // DEBUG 
        var peer_available = JSON.parse(peer_a);


        var ownPeer = peer_available.find(o => o.key === peerClient.getId());

        // remove from ARRAY the element selected
        for (var i = 0; i < peer_available.length; i++) {
            if (peer_available[i].key == ownPeer.key) {
                // delete peer_available[i]
                peer_available.splice(i, 1);
            }
        }

        if (peer_available.length > 0) {
            formPeerAvailable(form_peer_available, peer_available, form_peer_available_class, peerSelected);
        } else {
            alert(COMMUNICATION.PEER_AVAILABILITY);
        }

    }

    /**
     * This callback return the choise by user when select the peer to connect
     * @param {*} peerSelected 
     */
    function peerSelected(peerSelected) {
        if (peerSelected === undefined) {
            alert(COMMUNICATION.PEER_SELECTION);
        } else {
            requestConnection(peerSelected)
            // send(peerClient.getId()); 
        }
    }

    /**
     * this is the firt point that you can establish one connection.
     * @param {*} peerSelected 
     */
    function requestConnection(peerSelected) {
        peerClient.conn(peerSelected);
        peerClient.openConnection(peerClient.getId());
    }

    /**
     * Send data between peer 
     * @param {data} message the message that will be exchange
     */
    function send(message) {
        peerClient.send(message);
        console.log("Il peer " + peerClient.getId() + " sta inviando al peer " + peerClient.getConnection().peer);
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

