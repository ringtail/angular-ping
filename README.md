angular-ping
============

a implement of ping in javascript and angularjs


##Info
this is a very funny module , you can use command <i>ping</i> in angularjs

##Install
```javascript
    bower install angular-ping
```

##How to use
you can use it like the code below:
```javascript
   //first you should inject the dependencies
   myApp.module('app',['angular.ping']).controller('testController',['netTesting',function(netTesting){
        netTesting.ping('www.aliyun.com',function(){
           console.log(arguments);
        });

        netTesting.ping('192.168.0.1',function(){
            console.log(arguments);
        });
   }])

   //got the result
   ["www.aliyun.com","connected"]

   //get the result;
   ["192.168.0.1","disconnected"]
```

##Have fun
Any question <a href="mailto:zhongwei.lzw@alibaba-inc.com">mail me</a>.