class PeerClient {   

    constructor(id, h, p, pth){
        this._id = id;
        this._host = h;
        this._port = p;
        this._path = pth;
        this._peerToConnect = undefined;
 
        this._peer = new Peer(this._id, {
            host: this._host, // 'localhost',
            port: this._port, //  9000,
            path: this._path // '/peerjs'
        });

    }

    // ===========
    // Getter
    // ===========
    getId() {
        return this._id;
    }

    

    getConnectTo() {
        return this._peerToConnect;
    }

    // ===========
    // Setter
    // ===========

    setConnectTo(peerToConnect){
        this._peerToConnect = peerToConnect;
    }

    
    /**
     * Make the peer avilable for the connection 
     */
    openConnection() {
        this._peer.on('open', function(id_peer) {
        // DEBUG  console.log('My peer ID is: ' + id_peer);
        // callback(id_peer);        
        });
    }

    /**
     * Closes the data connection gracefully, cleaning up underlying DataChannels and PeerConnections.
     * https://stackoverflow.com/questions/25797345/peerjs-manually-close-the-connection-between-peers
     */
    closeConnection(conn) {
        conn.on('open', function(){            
            conn.close();
            alert("CONNESSIONE CHIUSA");
          });
    }
    

    seeError(){
        this._peer.on('error', function(err){
            alert(err.message);
        });
    }
    /**
     * Emitted when either you or the remote peer closes the data connection.     * .
     */
    listenCloseConnection(callback){
        this._peer.on('close', function(id_peer) {
            console.log('STO CHIUDENDO LA CONNESSIONE: ' + id_peer);
            callback(id_peer);        
            });
    }

    
    // ===============
    // CONNECT
    // ===============
    conn(id_another_peer) {
        return this._peer.connect(id_another_peer);
    }

    

    // ===================================================================================================
    // Sharing data among peer. The first param is the value that return from the previusly method (conn)
    // ===================================================================================================
    sendData(conn, data) {
        conn.on('open', function(){
            conn.send(data);
          });
    }
    // ===============
    // RECEIVE.
    // ===============
    enableReceptionData(callback) {
        this._peer.on('connection', function(conn) {
            conn.on('data', function(data){
                callback(data);                
            });
        });
    }

    returnConn(callback) {
        console.log("DIOOOOOOOOOOOOOOOOOOOOOO");
        this._peer.on('connection', function(conn) {
            console.log(conn);
            callback(conn);
        });
    }

}