var marginTop = 0;
var TOP = -800;
var DOWN = -2400;

var clickCount = 0;
var doneFlag = false;

$('#main .rollDown').on('click', function() {
	clickCount ++;
	if($('#rollDown').hasClass('runUnityBtn')){
		run();
		return ;
	}
	
	/*if(clickCount == 2){ // last page
		
		if(doneFlag){
			$('#rollDown').html("Run").css('display','block').addClass('runUnityBtn');
			$('.loader').css('display','none');
		}
		else{
			console.log('Not Yet');
			$('#rollDown').css('display','none').html("Next").removeClass('runUnityBtn');
			$('.loader').css('display','block');
		}
	} */
	
	
	marginTop -= 800;
    $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);
    
	BorN(marginTop);	
	
	if(clickCount == 2){
		$('#teddyCanvas').css('display','');
	} else {
		$('#teddyCanvas').css('display','none');
	}
    
});
$('#main .rollUp').on('click', function() {
    
	clickCount --;
	if(clickCount != 3){
		$('#rollDown').html("Next").css('display','block');
		if($('#rollDown').hasClass('runUnityBtn'))
			$('#rollDown').removeClass('runUnityBtn');
	}	
		
	marginTop += 800;
    BorN(marginTop);
	
	if(clickCount == 2){
		$('.loader').css('display','none');
		$('#teddyCanvas').css('display','');
	} else {		
		$('#teddyCanvas').css('display','none');
	}
	
	$('#rollDown').css('display','block');
	
    $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);
});

$('#main #startBtn').on('click', function() {
    $('#main #three-container').fadeOut();
    $('#rollDiv .btn-large').css('color', 'white');
	
	/* Add */
	$('#rollDown').css('display','none');
});

function BorN(marginTop) {
    var rollUp = $('#rollUp');
    var rollDown = $('#rollDown');

    if(marginTop < TOP)  rollUp.fadeIn();
    else rollUp.fadeOut();

    if(marginTop > TOP || marginTop < DOWN) rollDown.fadeOut();
    else if(DOWN < marginTop && marginTop <= TOP)  rollDown.fadeIn();
}


$("#main .wrap #drawButton").on("click", function () {
	
	doneFlag = false;
	
    var ele = $(this);
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'drawTeddy'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {}
    }).done(function(){
        //$('.loader').css('display','none');
        $('#teddyCenter button').css("display","block");
        $('#teddyCenter img').attr('src',"Img/check_arrow_2.svg");
		
		//$('.loader').show();
        ele.parent().find('.loader').css('display', 'none');

		renameObj();
        
    });

    removeButton($(this));
});

function renameObj()
{
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'renameObj'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log('Renamed Done');
            bridge();
        }
    });
}

function bridge()
{
    $('#main #rollDiv .loader').css('display', 'block');
    $('#rollDown').click().css('display', 'none');
    console.log('Bridge Start');
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'bridge'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log('bridge: ', data);
			drawTeddyCanvas();
            unityCompile();
        }
    });
}

function unityCompile()
{
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'unity'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log(data);
            $('.loader').css('display', 'none');
            
			doneFlag = true;
			if(clickCount == 2) {
                $('#main #rollDiv .loader').css('display', 'none');
				$('#rollDown').addClass('runUnityBtn').html("Run").css('display','block');
			}
        }
    });

    //removeButton($(this));
}

function run () {	
	console.log('hit');
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'run'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log(data);
        }
    });
}

function removeButton(ele)
{
    console.log('loader block');
    ele.removeClass("filled");
    ele.addClass("circle");
    ele.html("");
    ele.parent().find("svg").css("display", "block");
    ele.parent().find(".circle_2").attr("class", "circle_2 fill_circle");
    ele.css("display","none");
    ele.parent().find('.loader').css('display', 'block');
	
    timer = setInterval(
        function tick() {
            ele.addClass("filled");
            // self.html("b");
            ele.parent().find("img").css("display", "block");
            ele.parent().find("svg").css("display", "none");
            clearInterval(timer);
        }, 100);
}