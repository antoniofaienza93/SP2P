/**
 * ===========================================================================
 * File: managePeerCommunication.js 
 * Author: Antonio Faienza
 * This file handle the comunication between two peer
 * TODO When the page would refresh, remember to destrou the comunication
 * ===========================================================================
 */
window.onload = function () {

    if (this.document.getElementById("connect") != undefined) {
        document.getElementById("connect").onclick = function () { clickConnect() };
    }





    var peerClient = undefined;
    var connectionChoice = undefined;


    // name tag for all element of checkbox
    var form_peer_available_class = "peer";

    // form that decide if woy want connect or not with peer
    var classItemForm = "accept-connection";

    var chatForm = document.getElementById("chat");

    // var see_chat_message = document.getElementById("seeChatMessage");
    var error;

    var connectionChoice = undefined;

    var chat = new Chat();

    /**
     * Server get-request for generate the random String. When finish it call a callbackFormPeerAvailableck that create a new Peer 
     */
    function clickConnect() {
        httpGetAsync(PEER_SERVER.ENROLLMENT, createPeerClient);
    }

    /**
     * when click on the button i request all peer subscribed. When finisch it call a callbackFormPeerAvailableck that display 
     * in a form all peer end exclude my personal peer 
     */
    function seeAvailablePeer() {
        httpGetAsync(PEER_SERVER.PEER_AVAILABLES, returnPeerAvailable);
    }

    /**
     * callbackFormPeerAvailableck when receive data
     * @param {*} data are the data received
     */
    function dataReceived(data) {

        if (peerClient.getConnection() == undefined) {
            // console.log("CIAO " + peerClient.getConnection()); RIPARTIRE DA QUII
            // TODO questo mi sa lo devo cancellare 
            var label = document.createElement('label');
            label.setAttribute("name", "request_connection_label");
            // label.htmlFor = "Il peer <strong>" + data + "</strong> want to connect with you";
            label.appendChild(document.createTextNode("Il peer " + data + " want to connect with you"));

            var d = requestConnectionForm();
            jointoapeer.appendChild(d);
            d.appendChild(label);

            var dc;
            var decideToConnect = ["YES", "NO"];
            for (var i = 0; i < decideToConnect.length; i++) {
                dc = connectionChoiceForm();
                jointoapeer.appendChild(dc);
                addCheckBoxItem(dc, decideToConnect[i], classItemForm, connectionChoice, (value) => connectionChoice = value);
            }

            // add button to checkbox
            var buttonChoice = createButton("button", classItemForm, FORM.CHOICE_PEER, data, callbackFormPeerAvailableckConnectionChoice)
            dc.appendChild(buttonChoice);
        } else {

            if (data == "INVITATION_ACCEPTED") {
                // enableGame(); TODO decommentare 
                var d = chatFormmm();
                jointoapeer.appendChild(d);
                chat.sendMessage(d);
                chat.onclickButton(sendChatMessage);
            } else {
                P2PMaze.dataReceived = data;
            }

        }


    }


    /**
     * callbackFormPeerAvailableck of click button
     */
    function callbackFormPeerAvailableckConnectionChoice(data) {
        if (connectionChoice == undefined) {
            alert(COMMUNICATION.PEER_SELECTED + data);
        } else if (connectionChoice == "YES") {

            acceptConnection(data);
            // TODO questa è una chat provvisoria che deve essere messa a posto
            var d = chatFormmm();
            jointoapeer.appendChild(d);
            chat.sendMessage(d);
            chat.onclickButton(sendChatMessage);

            deleteCheckboxItem(classItemForm);

            // the player accept the connection and then it can see the canvas with multiplayer
            enableGame();

        } else if (connectionChoice == "NO") {

            refuseConnection();

            // TODO Cancellare il form               
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
     * callbackFormPeerAvailableck from onclick button message
     * @param {*} message message to send
     */
    function sendChatMessage(message) {
        var id = peerClient.getConnection().peer;
        console.log("MESSAGGIO " + message + " AL PEER " + id);
        send(message);
    }

    /**
     * callbackFormPeerAvailableck after creation string by Server
     */
    function createPeerClient(data) {

        // console.log("STRINGA GENERATA: " + data); // DEBUG
        var input = document.getElementById("inputid"); // .value()

        if (input.checkValidity()) {

            // delete white space
            input = input.value.replace(/\s/g, '');

            peerClient = new PeerClient(input + "-" + data, PEER_CLIENT.HOST, PEER_CLIENT.PORT, PEER_CLIENT.PATH);

            // enable reception of data
            peerClient.enableReceptionData(dataReceived);

            error = peerClient.seeError();
            if (error != undefined) {
                alert(error);
            }


            // remove div if already exist
            clearDiv(jointoapeer);

            // add label of username choice
            var divuser = formUsername(peerClient.getId());
            jointoapeer.appendChild(divuser);

            // form see peer available
            var formpeer = joinPeerButton(seeAvailablePeer);
            jointoapeer.appendChild(formpeer);

        } else {
            alert(FORM.FILL);
        }
    }


    /**
     * Function that assign the peer to player
     */
    function enableGame() {
        // the player has accepted the comuniation and for this the div is again visible
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
            var d = choicePeerForm();
            jointoapeer.appendChild(d);
            formPeerAvailable(d, peer_available, form_peer_available_class, FORM.CHOICE_PEER, peerSelected);
        } else {
            alert(COMMUNICATION.PEER_AVAILABILITY);
        }

    }

    /**
     * This callbackFormPeerAvailableck return the choise by user when select the peer to connect
     * @param {*} peerSelected 
     */
    function peerSelected(peerSelected) {
        if (peerSelected === undefined) {
            alert(COMMUNICATION.PEER_SELECTION);
        } else {
            var d = document.getElementById("choice-peer");
            clearDiv(d);

            var m = messageInvite(FORM.MESSAGE_SEND + " " + peerSelected);
            jointoapeer.appendChild(m);

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

    /**
     * GET REQUEST SERVER
     * @param {*} theUrl the url passed to method
     * @param {*} callbackFormPeerAvailableck the result of request
     */
    function httpGetAsync(theUrl, callbackFormPeerAvailableck) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callbackFormPeerAvailableck(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
        // console.log(xmlHttp.responseText)
    }

};

