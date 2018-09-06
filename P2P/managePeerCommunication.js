/**
 * ===========================================================================
 * File: managePeerCommunication.js 
 * Author: Antonio Faienza
 * This file handle the comunication between two peer
 * ===========================================================================
 */
window.onload = function () {



    var peerClient = undefined;
    var connectionChoice = undefined;
    var peerRequestor = undefined;
    var chat;

    // name tag for all element of checkbox
    var form_peer_available_class = "peer";

    // form that decide if woy want connect or not with peer
    var classItemForm = "accept-connection";

    // global variable
    P2PMaze.playerDisconnected = undefined;   

    // initial call, or just call refresh directly
    setTimeout(refresh, 4000);

    // create the form
    var jointoapeer = mainForm();

    // this is the first button to play for start the game
    if (this.document.getElementById("connect") != undefined) {
        document.getElementById("connect").onclick = function () { clickConnect() };
    }


    /**
     * Server get-request for generate the random String. When finish it call a callbackFormPeerAvailableck
     * that create a new Peer 
     * 
     * @method clickConnect
     */
    function clickConnect() {
        httpGetAsync(PEER_SERVER.ENROLLMENT, createPeerClient);
    }

    /**
     * when click on the button i request all peer subscribed. When finisch it call a callbackFormPeerAvailableck that display 
     * in a form all peer end exclude my personal peer 
     * 
     *  @method seeAvailablePeer
     */
    function seeAvailablePeer() {
        httpGetAsync(PEER_SERVER.PEER_AVAILABLES, returnPeerAvailable);
    }

    /**
     * callbackFormPeerAvailableck after creation string by Server
     * 
     * @method createPeerClient
     * @param {Object} data - this is the callback data received
     */
    function createPeerClient(data) {

        var input = document.getElementById("inputid");

        if (input.checkValidity()) {

            document.getElementById("connect").disabled = true;
            input.disabled = true;

            // delete white space
            input = input.value.replace(/\s/g, '');

            peerClient = new PeerClient(input + "-" + data, PEER_CLIENT.HOST, PEER_CLIENT.PORT, PEER_CLIENT.PATH);

            // enable reception of data
            peerClient.enableReceptionData(dataReceived);

            // wee see the error of the server
            peerClient.seeError(handleServerError);

            // remove div if already exist
            // clearChildDiv(jointoapeer);
            clearDiv(jointoapeer);


            // add label of username choice
            var divuser = formUsername(peerClient.getId());
            jointoapeer.appendChild(divuser);

            // form see peer available
            var formpeer = joinPeerButton(seeAvailablePeer);
            jointoapeer.appendChild(formpeer);

        } else {
            P2PMaze.alertMessage(FORM.FILL, "warning");
        }
    }




    /**
     * callbackFormPeerAvailableck when receive data. In this method
     * we handle the data received.
     * 
     * @method dataReceived
     * @param {*} data are the data received
     */
    function dataReceived(data) {

        // For the first time, the connection is undefined. For this reason,
        // it's created a form for send the request of connection
        if (peerClient.getConnection() == undefined) {

            var choiceForm = divChoiceForm();

            if (peerRequestor == undefined || peerRequestor != data) {


                var label = document.createElement('label');
                label.setAttribute("name", "request_connection_label");
                label.appendChild(document.createTextNode("Il peer " + data + " want to connect with you"));
                peerRequestor = data;

                var d = requestConnectionForm();
                d.appendChild(label);
                choiceForm.appendChild(d);

                // Creation form
                // add item of peer available
                var dc;
                var decideToConnect = ["YES", "NO"];
                for (var i = 0; i < decideToConnect.length; i++) {
                    dc = itemChoiceForm();
                    choiceForm.appendChild(dc);
                    addCheckBoxItem(dc, decideToConnect[i], classItemForm, connectionChoice, (value) => connectionChoice = value);
                }

                // add button to checkbox
                var buttonChoice = createButton("button", classItemForm, FORM.CHOICE_PEER, data, callbackConnectionChoicePeer)
                dc.appendChild(buttonChoice);

                jointoapeer.appendChild(choiceForm);
            }

        // in other cases, when the connection is establish, then:
        // - can be accepted
        // - can be refused
        // - it's a normal data. In this case:
        //      - can be the data of the multiplayer game
        //      - can be a chat message
        } else {

            if (data == PEER.CONNECTION_ACCEPTED) {
                enableGame();
            } else if (data == PEER.CONNECTION_REFUSED) {
                refuseConnection();
            }
            else {                
                if (data[0].key == "CHAT_MESSAGE") {
                    var m = data[1].message;
                    chat.receiveMessage(peerClient.getId(), m);
                } 
                else {
                    P2PMaze.dataReceived = data;
                }

                


            }
        }

    }

    /**
     * callbackConnectionChoicePeer of click button
     * 
     * @method callbackConnectionChoicePeer
     * @param {String} data - is the response of choice to accept or refiused the connection
     */
    function callbackConnectionChoicePeer(retChoice) {

        if (connectionChoice == undefined) {
            P2PMaze.alertMessage(COMMUNICATION.PEER_SELECTED + retChoice, "info");
        } else if (connectionChoice == "YES") {

            peerRequestor = undefined;

            respondConnection(retChoice, PEER.CONNECTION_ACCEPTED);

            deleteCheckboxItem(classItemForm);

            clearDiv("div-choice-form");

            // the player accept the connection and then it can see the canvas with multiplayer
            enableGame();

        } else if (connectionChoice == "NO") {

            peerRequestor = undefined;

            // clear the div            
            clearDiv("div-choice-form");

            // establish connection for comunicate that the connection is refused
            respondConnection(retChoice, PEER.CONNECTION_REFUSED);

            refuseConnection();
        }
    }

    /**
     * This is the firt point that you can establish one connection.
     * 
     * @method requestConnection
     * @param {string} peerSelected is the peer selected 
     */
    function requestConnection(peerSelected) {
        peerClient.conn(peerSelected);
        peerClient.openConnection(peerClient.getId());
    }

    /**
     * This is the second point to open a connection. Who accept the connection is considered 
     * the opponent player
     * 
     * @method respondConnection
     * @param {string} peerR is the which you want establish the connection
     * @param {string} respondMessage is the message to send
     */
    function respondConnection(peerR, respondMessage) {
        peerClient.conn(peerR);
        peerClient.openConnection(respondMessage);

    }

    /**
     * Establish the connection for comunicate the clousure
     * 
     * @method refuseConnection
     */
    function refuseConnection() {
        peerClient.closeConnection(callbackClosing);
    }

    /**
     * Callback that appear when the connection is closed
     * 
     * @method callbackClosing
     * @param {string} p 
     */
    function callbackClosing(p) {
        P2PMaze.alertMessage(PEER.CONNECTION_CLOSED + " " + p, "warning");
    }

    /**
     * callbackFormPeerAvailableck from onclick button message
     * 
     * @method sendChatMessage
     * @param {*} message message to send
     */
    function sendChatMessage(message) {
        if (message != "") {
            
            var id = peerClient.getConnection().peer;
            console.log("mexage chat [" + message + "] to peer " + id);

            var chat_mex = [];
            var keyupdating = { "key": "CHAT_MESSAGE" };
            var mex = { "message": message };
            chat_mex.push(keyupdating);
            chat_mex.push(mex);
            P2PMaze.send(chat_mex);
        }

    }

    /**
     * Function that assign the peer to player.
     * The player has accepted the comuniation and for this the div is again visible.
     * 
     * @method enableGame
     */
    function enableGame() {

        var id_connected_peer = peerClient.getConnection().peer;

        // Assignment
        P2PMaze.peer = peerClient;

        // create Chat 
        chat = new Chat();
        chat.createChat(id_connected_peer);
        chat.onclickSendChatButton(sendChatMessage);
        chat.onclicKeyboard(sendChatMessage);

        // start the multiplayer game
        P2PMaze.game.state.start("GameMultiplayer");
        var divGame = document.getElementById("P2PMaze");
        divGame.style.display = "block";

        // hidden the div form
        var multiplayerForm = document.getElementById("multiplayer-form");
        multiplayerForm.style.display = "none";

    }



    /**
     * Function that display peer available.
     * 
     * @method returnPeerAvailable
     * @param {*} peer_a peer available 
     */
    function returnPeerAvailable(peer_a) {

        var peer_available = JSON.parse(peer_a);

        var ownPeer = peer_available.find(o => o.key === peerClient.getId());
        console.log("RITORNO PEER DISPONIBILI");
        console.log(ownPeer);
        console.log(peer_available);
        // remove from ARRAY the element selected
        for (var i = 0; i < peer_available.length; i++) {
            if (peer_available[i].key == ownPeer.key) {
                peer_available.splice(i, 1);
            }
        }

        if (peer_available.length > 0) {
            var d = choicePeerForm();
            jointoapeer.appendChild(d);
            formPeerAvailable(d, peer_available, form_peer_available_class, FORM.CHOICE_PEER, peerSelected);
        } else {

            clearDiv("div-choice-peer");

            P2PMaze.alertMessage(COMMUNICATION.PEER_AVAILABILITY, "warning");

        }

    }

    /**
     * This callbackFormPeerAvailableck return the choise by user when select the peer to connect.
     * 
     * @method peerSelected
     * @param {*} peerSelected 
     */
    function peerSelected(peerSelected) {
        if (peerSelected === undefined) {
            P2PMaze.alertMessage(COMMUNICATION.PEER_SELECTION, "info");
        } else {

            clearDiv("div-choice-peer");

            P2PMaze.alertMessage(FORM.MESSAGE_SEND + " " + peerSelected, "primary");

            // open connection and ask to opponent peer to establish the connection
            requestConnection(peerSelected);

        }
    }

    /**
     * This function handle the error message
     * 
     * @method handleServerError
     * @param {obj} error 
     */
    function handleServerError(error) {
        P2PMaze.alertMessage(error, "danger");
    }

    /**
     * Searches the Group for the first instance of a child with the `key`
     * property matching the given argument. Should more than one child have
     * the same name only the first instance is returned.
     * 
     * @method Phaser.Group#getByKey
     * @param {string} key - The key to search for.
     * @return {any} The first child with a matching name, or null if none were found.
     */
    P2PMaze.getBykey = function (items, key) {
        for (var i = 0; i < items.children.length; i++) {
            if (items.children[i].key === key) {
                return items.children[i];
            }
        }

        return null;
    }

    /**
     * GET REQUEST SERVER
     * 
     * 
     * @method httpGetAsync
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


    /**
     * POLLING
     * 
     * REF - https://hpbn.co/xmlhttprequest/
     * This function make a server request for the peer disconnected.
     * When the result is available, send message and interrupt the game
     * 
     * @param pollingLostId 
     * @param {string} url - the url of server
     */
    function pollingLostId(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url);
        xmlHttp.onload = function () {
            // console.log(xmlHttp.responseText)
            P2PMaze.playerDisconnected = xmlHttp.responseText;

        };
        xmlHttp.send(null);
    }


    /**
     * Set the timer of callback.
     * 
     * @method refresh
     */
    function refresh() {
        setTimeout(refresh, 4000);
        pollingLostId(PEER_SERVER.POLLING);
    }  

};

