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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

//============================================LOGIN FUNCTION HERE========================================
function login(){
    var name=$("#UserName").val();
    var password=$("#password").val();
    $('#UserName').val('');
    $('#password').val('');

     if( name != "" || password != "")
     {
         if( name == "admin"){
            if(password == "admin"){
            window.location = "Home.html";
            }
            else{
            alert("Invalid Password");
            password="";
            }     
         }
         else{
            alert("Invalid Username");
            name="";
         }
    }
    else{
        alert("Username/Password can't be empty.")
    }
    //alert(name +" "+password);
};

//===========================To handle submit other than submit button.=================================
$('#userform').submit(function(){
    //$('#userform')[0].reset();
    //$('#UserName').val(null);
    //$('#password').val(null);
    //alert("resetform");
    return false;
});

//=====================================Ad Mob code here.=================================================
function onDocLoad() {
    if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', initApp, false);
    }
    else{
        initApp();
    }
}
    
function initApp(){
    initAd();
    // display the banner at startup
    window.plugins.AdMob.createBannerView();
}
    
function initAd(){
    if ( window.plugins && window.plugins.AdMob ) {
        var ad_units = {
            ios : {
                banner: 'ca-app-pub-6869992474017983/4806197152',
                interstitial: 'ca-app-pub-6869992474017983/7563979554'
            },
            android : {
                banner: 'ca-app-pub-6869992474017983/9375997553',
                interstitial: 'ca-app-pub-6869992474017983/1657046752'
            },
            wp8 : {
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956'
            }
        };
        var admobid = "";
        if( /(android)/i.test(navigator.userAgent) ) {
            admobid = ad_units.android;
        }
        else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = ad_units.ios;
        }
        else {
            admobid = ad_units.wp8;
        }

        window.plugins.AdMob.setOptions( {
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            bannerAtTop: false, // set to true, to put banner at top
            overlap: false, // set to true, to allow banner overlap webview
            offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            isTesting: false, // receiving test ad
            autoShow: true // auto show interstitial ad when loaded
        });

        registerAdEvents();
        
    }
    else {
            alert( 'admob plugin not ready' );
    }
}
    
// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener('onReceiveAd', function(){});
    document.addEventListener('onFailedToReceiveAd', function(data){});
    document.addEventListener('onPresentAd', function(){});
    document.addEventListener('onDismissAd', function(){ });
    document.addEventListener('onLeaveToAd', function(){ });
    document.addEventListener('onReceiveInterstitialAd', function(){ });
    document.addEventListener('onPresentInterstitialAd', function(){ });
    document.addEventListener('onDismissInterstitialAd', function(){ });
}
    
function onResize() {
    var msg = 'web view: ' + window.innerWidth + ' x ' + window.innerHeight;
    document.getElementById('sizeinfo').innerHTML = msg;
}
//==========================================================================    