var checkTime;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    $(".text1").html('XXXXXXXXXXXXXX');
    $(".mypanel").html('XXXXXXX');
    //parseJson();
    readFile();
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
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
/*function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
    //$(".mypanel").html(data);
}

getJSONP('http://time.jsontest.com', function(data){
    console.log(data);
});  */
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

function parseDOM(text){
	const items = text.querySelectorAll("item");
    let html = '';
    items.forEach(function(el) {
    	console.log( el);
    	//console.log(el.getElementsByTagName('enclosure')[0].getAttribute("url"));
    	var enclDOM = el.getElementsByTagName('enclosure')[0];
    	var imgUrl = '';
    	if(enclDOM != null){
    		imgUrl = el.getElementsByTagName('enclosure')[0].getAttribute("url");
    	}
      html += '' +
        '<article>' +
          '<img src="' + imgUrl + '" alt="">'+
          '<h2>' +
            '<a href="' + el.getElementsByTagName('link')[0].innerHTML + '" target="_blank" rel="noopener">' +
               el.getElementsByTagName('title')[0].innerHTML +
            '</a>' +
          '</h2>' +
        '</article>' +
      '';
     
    });
    $(".text1").html(html);
    console.log( html);
}

function getDOM(text){
    var str = new window.DOMParser().parseFromString(text, "text/xml");
    return str;
    //console.log( str);
}

function readFile(){
	var textFolder = "wgt-package/data";
	var helloWorld = "helloworld.txt";
	function onsuccess(files) {
	    for (var i = 0; i < files.length; i++) {
	        if (files[i].name == helloWorld) {
	            files[i].openStream("r", function(fs) {
	                var text = fs.read(files[i].fileSize);
	                fs.close();
	                parseDOM(getDOM(text));
	            }, function(e) {
	                console.log("Error " + e.message);
	            }, "UTF-8");
	            break;
	        }
	    }
	}

	    function onerror(error) {
	    console.log("The error " + error.message
	            + " occurred when listing the files in " + textFolder);
	}

	tizen.filesystem.resolve(textFolder, function(dir) {
	        dir.listFiles(onsuccess, onerror);
	    }, function(e) {
	        console.log("Error" + e.message);
	    }, "r"); // make sure to use 'r' mode as 'wgt-package' is read-only folder
}
