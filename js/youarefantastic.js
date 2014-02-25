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
    var img;
    var ta;
	var formWrap;

	var WIDTH = 640;
	var HEIGHT = 1136;
	var text = "You are Fantastic.";
	var fontSize = 28;
	var fontPx = "px ";



	var fonts = ["Courier", "Questrial", 'Dancing Script'];

    //font-family: 'Open Sans', sans-serif;

	var aligns = ["left", "center", "right"];

	var selectedAlign = 1;
    var selectedFont = 0;

    var inputVisible = false;

    _.init = function() {
    	c = $("#canvas")[0];
        ta = $("#entry_text");
        img = $("#canvasImg");
        formWrap = $("#formWrap");
        ctx = c.getContext("2d");
            ta.val(text);

    	ta.change(onTextEnter);

        buildInputs();

    	render();

        img.click(imgClick);
        showForm(false);


    }
    var imgClick = function (){
        if(inputVisible = !inputVisible ){
            showForm(true);
        }else{
            showForm(false);
        }
    }

    var showForm = function (show){
        inputVisible = show;
        if(show){
            ta.val(text);
            formWrap.show();
        }else{
            formWrap.hide();

        }


    }
    var alignX = function(){
		return [10, WIDTH/2, WIDTH-10];

    }
    var onTextEnter = function(e){
    	text = ta.val();
    	console.log(text);
    	render();

    }
    var buildInputs = function(){
        $("#inputForm").append("<br />");

        $("#inputForm").append("<div class='label'> Text Align: </div>");

        var d = $("<div class='selector' />");
        var s = $("<select id=\"alignSelect\" name=\"alignSelect\" />");
        for(var val in aligns) {
            $("<option />", {value: val, selected:selectedAlign==val, text: aligns[val].toUpperCase()}).appendTo(s);
        }
        s.appendTo(d);
        d.appendTo("#inputForm");



        $("#inputForm").append("<div class='clearFloat'></div>");


        $("#inputForm").append("<div class='label'> Font: </div>");

        var d = $("<div class='selector' />");

        var s = $("<select id=\"fontSelect\" name=\"fontSelect\" />");

        for(var val in fonts) {
            $("<option />", {value: val, selected:selectedFont==val, text: fonts[val].toUpperCase()}).appendTo(s);
        }

        s.appendTo(d);
        d.appendTo("#inputForm");

        $("#inputForm").append("<div class='clearFloat'></div>");

        $("#inputForm").append("<br />");

        var d = $("<div id='formSubmitHolder' />");
        var s = $("<input type=\"submit\" id=\"formSubmit\" name=\"formSubmit\" value=\"OK\" />");

        s.appendTo(d);

        d.appendTo("#inputForm");

        $("#inputForm").submit(checkForm);

    }
    var checkForm = function(e){
        e.preventDefault();
        text = ta.val();
        selectedAlign = $("#alignSelect").val();
        selectedFont = $("#fontSelect").val();
        showForm(false);
        render();

    }
    var render = function(){
    	ctx.fillStyle = "#000000";
    	ctx.fillRect(0, 0, WIDTH, HEIGHT );
    	ctx.fillStyle = "#FFFFFF";


        var fontStr = "" + fontSize + fontPx + fonts[selectedFont];
    	ctx.font = fontStr;

        ctx.textAlign = aligns[selectedAlign]

    	var x = alignX()[selectedAlign];

    	var lines = text.split("\n");
    	for(var i=0;i<lines.length; i++){
			ctx.fillText(lines[i], x, 400 + (fontSize+2)*i);
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
