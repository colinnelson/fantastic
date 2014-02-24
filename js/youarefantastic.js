/*!
 * youarefantastic
 *
 * MIT licensed
 * Copyright (C) 2014 Colin Nelson
 */

/*********************************************
 *
 *********************************************/

function fantastic() {
	var _ = {};
	var c;
	var ctx;
	var ta;
	var WIDTH = 640;
	var HEIGHT = 1136;
	var text = "You're\nFantastic";
	var fontSize = 28;
	var fontPx = "px ";



	var fonts = ["Arial"];

	var aligns = ["left", "center", "right"];

	var selectedAlign = 0;
	var selectedFont = 0;

    _.init = function() {
    	c = $("#canvas")[0];
    	ta = $("#entry_text");
		ctx = c.getContext("2d");
    	console.log(ta);
    	ta.change(onTextEnter);
    	ta.val(text);

        buildInput();

    	render();
    }
    var alignX = function(){
		return [10, WIDTH/2, WIDTH-10];

    }
    var onTextEnter = function(e){
    	text = ta.val();
    	console.log(text);
    	render();

    }
    var buildInput = function(){

        data = aligns;

        var s = $("<select id=\"alignSelect\" name=\"selectName\" />");
        for(var val in data) {
            $("<option />", {value: val, text: data[val].toUpperCase()}).appendTo(s);
        }
        s.appendTo("#inputForm");
    }
    var render = function(){
    	ctx.fillStyle = "#000000";
    	ctx.fillRect(0, 0, WIDTH, HEIGHT );
    	ctx.fillStyle = "#FFFFFF";

     	ctx.textAlign = aligns[selectedAlign];

    	var fontStr = "" + fontSize + fontPx + fonts[selectedFont];
    	ctx.font= fontStr;

    	var x = alignX()[selectedAlign];


    	var lines = text.split("\n");
    	for(var i=0;i<lines.length; i++){
			ctx.fillText(lines[i], x, 200 + fontSize*i);
		}

		var dataURL = c.toDataURL();

      
        document.getElementById('canvasImg').src = dataURL;

    }


    return _;
}

$.ready = function(){
	var f = fantastic();
	f.init();
}
