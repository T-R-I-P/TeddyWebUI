var marginTop = 0;
var TOP = -800;
var DOWN = -2400;

$('#main .rollDown').on('click', function() {
    marginTop -= 800;
    $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);

    BorN(marginTop);
});
$('#main .rollUp').on('click', function() {
    marginTop += 800;
    BorN(marginTop);
    $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);
});

$('#main #startBtn').on('click', function() {
    $('#main #three-container').fadeOut();
    $('#rollDiv .btn-large').css('color', 'white');
});

function BorN(marginTop) {
    var rollUp = $('#rollUp');
    var rollDown = $('#rollDown');

    if(marginTop < TOP)  rollUp.fadeIn();
    else rollUp.fadeOut();

    if(marginTop > TOP || marginTop <= DOWN) rollDown.fadeOut();
    else if(DOWN < marginTop && marginTop <= TOP)  rollDown.fadeIn();
}


$("#main .wrap #drawButton").on("click", function () {
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
        $('#teddyCenter button').css("display","block");
        $('#teddyCenter img').attr('src',"Img/check_arrow_2.svg");
        ele.parent().find('.loader').css('display', 'none');
        renameObj();
        bridge();
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
        success: function(data) {}
    });
}

function bridge()
{
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'bridge'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log('bridge: ', data);
            $('#rollDown').click();
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
        }
    }).done(function() {
        $('#teddyCompile #compButton').css("display","block");
        $('#teddyCompile img').attr('src',"Img/check_arrow_2.svg");
        $('.loader').css('display', 'none');
        $('#LastDiv #runUnityBtn').css("visibility","visible");
    });

    removeButton($(this));
}

/*$("#main .wrap #compButton").on("click", function () {
    var ele = $(this);
    $.ajax({
        url: "./openTeddy.php",
        type: "GET",
        data: {option: 'unity'},
        error: function(error) {
            alert("fault");
        },
        success: function(data) {
            console.log(data);
        }
    }).done(function() {
        $('#teddyCompile #compButton').css("display","block");
        $('#teddyCompile img').attr('src',"Img/check_arrow_2.svg");
        ele.parent().find('.loader').css('display', 'none');
        $('#LastDiv #runUnityBtn').css("visibility","visible");
    });

    removeButton($(this));
});*/

$('#LastDiv #runUnityBtn').on("click", function () {
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
}).hover(function(){
    var yes = $('#Yes');
    if(yes.css("opacity") == "1")
      yes.css("opacity", "0").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', HideTheElementAfterAnimation);
    else
     yes.css("display", "block").css("opacity", "1").unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend");
});

function removeButton(ele)
{
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