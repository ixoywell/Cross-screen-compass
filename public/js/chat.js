var msg = 0;
//var times = 0;
$(function () {
    var title = $('.title');
    var needle = $('.needle');
    var status = $('.status');

    window.addEventListener('deviceorientation', update, false);

    function update(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        angle = parseInt(event.alpha);
        //$('status').html(angle+" °");
        //$('.needle').css("webkitTransform", "rotate("+angle+"deg)");
    }

    //建立websocket连接
    socket = io.connect('http://192.168.1.180:3000');

    //收到server的连接确认
    socket.on('open',function(){
        status.text('连接成功！');
        if(checkMobile()){
            msg = 'Mobile';
            //socket.send(angle);
        }else {
            msg = 'PC';
        }
        socket.send(msg);
        //status.html(msg);
        //alert(msg)
    });

    //监听system事件，判断welcome或者disconnect，打印系统消息信息
    socket.on('system',function(json){
        if (json.type === 'welcome'){
            status.html('welcome!'+ json.author);
        }else if(json.type == 'disconnect'){
            status.html('BYE!'+ json.author);
        }
        msg = 0;
        socket.send(msg);
        //status.css('color',getColor(json.angle)).html(json.angle+' °');
    });

    //监听message事件，打印消息信息
    socket.on('message',function(json){
        //console.log(json.angle);
        if(checkMobile()){
            //json.name = 'Mobile';
            //$('status').css('color',getColor(json.angle)).html(angle+" °");
            //$('.needle').css("webkitTransform", "rotate("+angle+"deg)");
            setTimeout('socket.send(angle);',100);
        }else{
            //json.name = 'PC';
            angle = json.angle;
        }
        //console.log(getColor(angle));
        status.css('color',getColor(angle)).html(angle+" °");
        needle.css("webkitTransform", "rotate("+angle+"deg)");
    });
});


//判断是否是手机端
var checkMobile = function (){
    var flag = false;
    var agent = navigator.userAgent.toLowerCase();
    var keywords = [ "android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser" ];

    //排除 Windows 桌面系统
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
        //排除苹果桌面系统
        if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1 ) {
            for (var item in keywords) {
                if (agent.indexOf(item) > -1 ) {
                    flag = true;
                    break;
                }
            }
        }
    }
    return flag;
 }
//font color
function getColor(num){
    var ang=[0,90,180,270,360];
    var colors = ['red','green','blue','yellow','pink'];
    //console.log(ang.length);
    for(var i=0; i<ang.length; i++){
        if(num<=ang[i]){
            console.log(colors[i]);
            return colors[i];
        }
    }
}