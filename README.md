PhoneGAP 3.6.3
=================
BMT App
=================

Step to run app:-

step 1 :-

Create a phonegap project by executing this command on terminal.

$ phonegap create [foldername] [package.name] [Projectname]

step 2:-

Now add the following plugin :-

$ cordova plugin add https://github.com/phonegap-build/PushPlugin.git

$ cordova plugin add com.rjfun.cordova.plugin.admob

step 3:-

Now add the platform to the project.

$ phonegap platform add android.

step 4 :-

Now run app

$ phonegap run android.
