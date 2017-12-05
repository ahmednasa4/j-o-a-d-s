/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        startApp();
        //////////////////////////////////////////////
        // navigator.splashscreen.show();
        // setTimeout(function() {
        //     navigator.splashscreen.hide();

        // }, 3000); 

        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);

        function onOnline() {
            myApp.hideIndicator();
            mainView.router.back();
        }



        function onOffline() {
            mainView.router.loadPage("./noConn.html");
        }
        /////////////////////////////////////////////

    }
};

app.initialize();



// /////////////////////////////////////////////////////////////////////////////////////

// My Code - Start

// /////////////////////////////////////////////////////////////////////////////////////

function startApp(argument) {
    // Initialize app
    myApp = new Framework7({
        swipeBackPage: false,
        imagesLazyLoadThreshold: 50,
        material: true,
        modalTitle: 'JoADS'
    });

    // If we need to use custom DOM library, let's save it to $$ variable:
    $$ = Dom7;

    // Add view
    mainView = myApp.addView('.view-main', {
        // Because we want to use dynamic navbar, we need to enable it for this view:
        dynamicNavbar: true,
        domCache: true

    });

    ///////////////////////////////

    //Back Button

    /////////////////////////////

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        if (myApp.getCurrentView().activePage.name == "index") {
            window.plugins.appMinimize.minimize();
        } else if (myApp.getCurrentView().activePage.name == "noConn") {

        } else {
            myApp.hideIndicator();
            mainView.router.back();
        }
    }



    // var scriptUrl = "http://104.236.231.108/joads/app.js";
    // var head = document.getElementsByTagName("head")[0];
    // script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = scriptUrl;
    // script.onload = function() { alert("Success"); };
    // script.onerror = function(e) { alert("failed: " + JSON.stringify(e)); };
    // head.appendChild(script);

    myApp.showIndicator();
    $.getScript("http://104.236.231.108/joads/app.js",function(data, textStatus, jqxhr ) {
        myApp.hideIndicator();
    });


    // $.getScript("http://104.236.231.108/joads/app.js")
    //     .done(function(script, textStatus) {
    //         myApp.hideIndicator();
    //     })
    //     .fail(function(jqxhr, settings, exception) {
    //         myApp.hideIndicator();
    //         myApp.alert("شبكة الإنترنت الحالية تمنع التطبيق من العمل يرجى تغيير الشبكة الحالية والإتصال بشبكة آخرى وإعادة تشغيل التطبيق");
    //     });


}