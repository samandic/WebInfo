var checkTime;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    $(".text1").html('XXXXXXXXXXXXXX');
    $(".mypanel").html('XXXXXXX');
    parseJson2();
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
};
// window.onload can work without <body onload="">
window.onload = init;

function parseJson2() {
	var reviver;
    var hr = new XMLHttpRequest();
    var url = "http://time.jsontest.com";
    $(".mypanel").html("processing...1");
    hr.open("GET", url, true);
    
    $(".mypanel").html("processing...2");
    hr.setRequestHeader("Content-type", "script/json");
    
    $(".mypanel").html("processing...3");

    hr.onreadystatechange = function() {
        $(".mypanel").html(hr.status);
        if(hr.status == 200) {

        	$(".mypanel").html("processing...4");
            var return_data = JSON.parse(  hr.responseText, reviver);
            $(".text1").html('${data.date}');
            //document.getElementById("status").innerHTML = return_data.citation[0].id;
        }
    }
    //$(".mypanel").html("processing...5");
    hr.send(null);
    //$(".mypanel").html("processing...6");
}

function parseJson() {
	var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
	document.getElementById('text1').innerHTML=obj.name + ", " + obj.age;
	$(".text1").html('new text');
	 $.getJSON('http://time.jsontest.com', function(data) {
		 var text = 'Date: ${data.date}';
	       
		$(".mypanel").html(text);
		 $(".text1").html('text2');
	    });
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
    setTimeout(startTime, 10);
}

function checkTime(i) {
    if (i < 10) {
        i='0' + i;
    }
    return i;
}
