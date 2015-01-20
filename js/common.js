$(document).ready(function () {
    var moveId=0;
    var aa=true;
    var pageY,pageY1,pageY2=0;
    var startY;
    var move;
    page = $(".body").find("section");
    lia = $("#bth li").find("a")
    liNum = $("#bth").find("li")
    for (var i=0; i<lia.length; i++) {
        lia[i].id = i;
        page[i].id = "page"+i;
    };
    switchCheck(moveId);
    function switchCheck(moveId){
        lia.css("background-color","#fff")
        $("#down-bth").css("display","block");
        liNum.animate({height:"10px"},"fast");
        lia.animate({height:"10px"},"fast");
        switch (moveId)
            {
            case 0:
                $(lia[0]).css("background-color","#2296e8");
                $(liNum[0]).animate({height:"20px"},"slow");
                $(lia[0]).animate({height:"20px"},"slow",function(){
                    $(".page-two-left").find("p").css("display","none")
                });
                break;
            case 1:
                $(lia[1]).css("background-color","#24313d");
                $(liNum[1]).animate({height:"20px"},"slow");
                $(lia[1]).animate({height:"20px"},"slow");
                twop = $(".page-two-left").find("p");
                //alert(twop.length)
                $(twop[0]).fadeIn();
                $(twop[1]).fadeIn(1000);
                $(twop[2]).fadeIn(1800);
                $(twop[3]).fadeIn(2500);
                $(twop[4]).fadeIn(3000);
                $(".page-three-body").find("li").fadeOut();
                break;
            case 2:
                $(lia[2]).css("background-color","#062B4D");
                $(liNum[2]).animate({height:"20px"},"slow");
                $(lia[2]).animate({height:"20px"},"slow");
                threeLi = $(".page-three-body").find("li");
                $(threeLi[0]).fadeIn();
                $(threeLi[1]).fadeIn(1000);
                $(threeLi[2]).fadeIn(1800);
                $(threeLi[3]).fadeIn(2500);
                $(threeLi[4]).fadeIn(1800);
                $(threeLi[5]).fadeIn(1000);
                $(".page-four-top").fadeOut();
                $("hr").animate({marginLeft:"-1200px"},"50000",function(){
                    $(".page-four-bottom").animate({marginLeft:"1000px"},"slow")
                    });
                break;
            case 3:
                $(lia[3]).css("background-color","#383E47");
                $(liNum[3]).animate({height:"20px"},"slow");
                $(lia[3]).animate({height:"20px"},"slow",function(){
                    $(".page-four-top").fadeIn("slow");
                    $("hr").animate({marginLeft:"0px"},"50000",function(){
                    $(".page-four-bottom").animate({marginLeft:"0px"},"slow")
                    });
                });
                break;
            case 4:
                $(lia[4]).css("background-color","#766823");
                $(liNum[4]).animate({height:"20px"},"slow");
                $(lia[4]).animate({height:"20px"},"slow");
                $("#down-bth").css("display","none");
                break;
            }
    }

    $("#bth li").find("a").bind("click",function(){
        id = parseInt(this.id);
        clientHeight = (document.body.clientHeight)*id;
        switchCheck(id);
        $(".body").animate({top:"-"+clientHeight+"px"},"slow");
        
    })
    $(document).mousewheel(function(event) {
        console.log(event.deltaX, event.deltaY, event.deltaFactor);
        if(event.deltaY<0){
            moveUp();
        }else if(event.deltaY>0){
            moveDown();
        }
    });
    $("#down-bth").bind("click",function(){
        moveUp();
    })
    $(".welcome").bind("click",function(){
        moveUp();
    })

    $(document).mousedown(function(e){
        //$("p").text(e.pageX + ", " + e.pageY);
        pageY1 = e.pageY;
    });

    $(document).mouseup(function(e){
        //$("p").text(e.pageX + ", " + e.pageY);
        pageY2 = e.pageY;
        pageY = pageY1-pageY2;
        if(pageY==0){
            return false;
        }else if(pageY<10){
            moveDown();
        }else if(pageY>-10){
            moveUp();
        }
    });

    function moveUp () {
        if(aa==false){
            return false;
        }
    	bodyTop = parseInt($(".body").css("top"));
    	clientHeight = document.body.clientHeight;
    	Top = -clientHeight*(page.length-1);
    	console.log(bodyTop+"/"+Top)
    	if(bodyTop<=Top){
    		return false;
    	}
        aa=false;
    	$(".body").animate({top:"-="+clientHeight+"px"},"slow",function(){
            aa=true;
        })
        moveId = (-bodyTop/clientHeight)+1;
        console.log(moveId)
        switchCheck(moveId);
        return aa;
    }
    function moveDown () {
        if(aa==false){
            return false;
        }
    	bodyTop = parseInt($(".body").css("top"));
        clientHeight = document.body.clientHeight;
        Top = -clientHeight*(page.length-1);
        console.log(-bodyTop+"/"+Top)
        if(bodyTop>=0){
            return false;
        }
        aa=false;
    	$(".body").animate({top:"+="+clientHeight+"px"},"slow",function(){
            aa=true;
        })
    	moveId = (-bodyTop/clientHeight)-1;
        console.log(moveId)
        switchCheck(moveId);
        return aa;
    }

    function touchStart(event) {
            event.preventDefault();
             if (!event.touches.length) return;
             var touch = event.touches[0];
             startY = touch.pageY;
    }


    window.addEventListener("touchstart", touchStart, false);

    function touchMove(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch=event.touches[0];
        move=touch.pageY-startY;

    }

    window.addEventListener("touchmove", touchMove, false);
    function touchEnd(){
        event.preventDefault();
        if(move<0){
            moveUp();
            
        }else if(move>0){
            moveDown();
        }
    }

    window.addEventListener("touchend", touchEnd, false);

    document.onkeydown = function (e) {
            e = e || event;
            if (e.keyCode == 13 || e.keyCode == 40) {  //判断是否单击的enter按键(回车键)
                moveUp();
            }else if(e.keyCode == 38){
                moveDown();
            }
        }
})