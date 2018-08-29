/*
 * ===========================================================================
 * File: chat.js 
 * Author: Antonio Faienza
 * Desc: This file create a simple chat to append at the right bottom 
 * corner of the screen
 * REF: https://bootsnipp.com/snippets/Vg1EP. 
 * ALERNATIVE CHAT: http://magma.cs.uiuc.edu/wenpu1/chatbox.html
 * ===========================================================================
 */


class Chat {


    constructor() {

    }

    createChat() {

        var div = document.createElement("div");
        div.setAttribute("class", "container pull-right");
        div.setAttribute("id", "chatbox");

        var div2 = document.createElement("div");
        div2.setAttribute("class", "row chat-window col-xs-5 col-md-3 pull-right");
        div2.setAttribute("id", "chat_window_1");

        var div3 = document.createElement("div");
        div3.setAttribute("class", "col-xs-12 col-md-12");

        var div4 = document.createElement("div");
        div4.setAttribute("class", "panel panel-default");

        var div5 = document.createElement("div");
        div5.setAttribute("class", "panel-heading top-bar");

        var div5_1 = document.createElement("div");
        div5_1.setAttribute("class", "col-md-8 col-xs-8");

        
        var h6 = document.createElement("h6");
        h6.setAttribute("class", "panel-title");
      

        var span = document.createElement("span");
        span.setAttribute("class", "oi oi-comment-square"); 
        span.setAttribute("title", "comment square");
        span.setAttribute("aria-hidden", "true");

        var span_text_h6 = document.createElement("span");
        span_text_h6.innerHTML = " Chat - Rajesh M";
        

        h6.appendChild(span);
        h6.appendChild(span_text_h6);

        var div5_2 = document.createElement("div");
        div5_2.setAttribute("id", "div-icon");
        div5_2.setAttribute("class", "col-md-4 col-xs-4");
        div5_2.setAttribute("style", "text-align: right;");

        // ====== MINIM CHAT WINDOW ======
        var a_1 = document.createElement("a");
        a_1.setAttribute("href", "#");

      
        var span_1 = document.createElement("span");
        span_1.setAttribute("class", "oi oi-minus icon_minim"); // glyphicon glyphicon-minus icon_minim
        span_1.setAttribute("title", "minus");
        span_1.setAttribute("aria-hidden", "true");
        span_1.setAttribute("id", "minim_chat_window");

        a_1.appendChild(span_1);
        // ==============================

       
        // ====== CLOSE CHAT WINDOW ======
        // var a_2 = document.createElement("a");
        // a_2.setAttribute("href", "#");

        // var span_2 = document.createElement("span");
        // span_2.setAttribute("class", "oi oi-envelope-closed"); 
        // span_2.setAttribute("title", "envelope closed");
        // span_2.setAttribute("aria-hidden", "true");
        // span_2.setAttribute("id", "chat_window_1");

        // a_2.appendChild(span_2);
        // ==============================

        // ============= BODY =============
        var divBody = document.createElement("div");
        divBody.setAttribute("id", "messagebody");
        divBody.setAttribute("class", "panel-body msg_container_base");

        // var divReceive = document.createElement("div");
        // divReceive.setAttribute("class", "row msg_container base_receive");

        // var divReceive_1 = document.createElement("div");
        // divReceive_1.setAttribute("class", "col-md-10 col-xs-10");

        // var divReceive_2 = document.createElement("div");
        // divReceive_2.setAttribute("class", "messages msg_receive");

        // var p = document.createElement("p");
        // p.innerHTML = "Hi sir";

        // var time = document.createElement("time");
        // time.setAttribute("datatime", "2009-11-13T20:00");
        // time.innerHTML = "Rajesh M • Yesterday 10:05:28";

        // divBody.appendChild(divReceive);
        // divReceive.appendChild(divReceive_1);
        // divReceive_1.appendChild(divReceive_2);
        // divReceive_2.appendChild(p);
        // divReceive_2.appendChild(time);
        // ================================

        // ============= FOOTER =============
        var divFooter = document.createElement("div");
        divFooter.setAttribute("class", "panel-footer");

        var divFooter_1 = document.createElement("div");
        divFooter_1.setAttribute("class", "input-group");

        var inputFooter = document.createElement("input");
        inputFooter.setAttribute("id", "btn-input");
        inputFooter.setAttribute("type", "text");
        inputFooter.setAttribute("placeholder", "Write your message here...");
        inputFooter.setAttribute("class", "form-control input-sm chat_input");
        inputFooter.setAttribute("required", "required");

        var spanFooter = document.createElement("span");
        spanFooter.setAttribute("class", "input-group-btn");

        var buttonFooter = document.createElement("button");
        buttonFooter.setAttribute("id", "btn-chat");
        buttonFooter.setAttribute("class", "btn btn-primary btn-sm");
        buttonFooter.innerText = "Send";

        divFooter.appendChild(divFooter_1);
        divFooter_1.appendChild(inputFooter);
        divFooter_1.appendChild(spanFooter);
        spanFooter.appendChild(buttonFooter);
        // ==================================

        div5_2.appendChild(a_1);
        // div5_2.appendChild(a_2);

        div.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);
        div4.appendChild(div5);

        div5.appendChild(div5_1);
        div5_1.appendChild(h6);
        div5.appendChild(div5_2);

        div4.appendChild(divBody);
        div3.appendChild(divFooter);

        document.body.appendChild(div);
    }
    

    receiveMessage() {

        var dt = new Date();
        var t = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      
        var divR = document.createElement("div");
        divR.setAttribute("class", "row msg_container base_receive");

        var divR_1 = document.createElement("div");
        divR_1.setAttribute("class", "col-md-10 col-xs-10");

        var divR_2 = document.createElement("div");
        divR_2.setAttribute("class", "messages msg_receive");

        var p = document.createElement("p");
        p.innerHTML = "Hi sir";

        var time = document.createElement("time");
        time.setAttribute("datatime", "2009-11-13T20:00");
        time.innerHTML = "Rajesh M • " + t;

       
       
        divR.appendChild(divR_1);
        divR_1.appendChild(divR_2);
        divR_2.appendChild(p);
        divR_2.appendChild(time);
        document.getElementById("messagebody").appendChild(divR);

        
    }


    // onclickButton(callback) {
    //     this._buttonSend.onclick = function () {
    //         var input = document.getElementById("sendMessageInput").value;
    //         callback(input);
    //     };
    // }



}