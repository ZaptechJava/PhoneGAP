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
        document.addEventListener('backbutton', onBackKeyDown, false); //Listen to the User clicking on the back button
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"790882189927","ecb":"app.onNotificationGCM"});
    },
    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },*/
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }

};
//=========================================HANDLING BACK KEY EVENT=======================================
function onBackKeyDown() {
    //e.preventDefault();
    $('input').blur();
    $("#exitDailog").click();
    $("#password").blur();
    /*navigator.notification.confirm(
    "Are you sure you want to exit ?",  // message
    onConfirm,                          // callback to invoke with index of button pressed
    "Confirmation",                     // title
    ["Yes","No"]);                      // buttons label
    // Prompt the user with the choice*/
}

/*function onConfirm(buttonIndex) {
    if(buttonIndex==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}*/

function onExit(){
    navigator.app.exitApp();
}

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

      //  registerAdEvents();
        
    }
    else {
            alert( 'admob plugin not ready' );
    }
}
    
// optional, in case respond to events
/*function registerAdEvents() {
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
}*/

function destroyBannerView(){    
        window.plugins.AdMob.destroyBannerView();
}
//==========================================================================    
