var subData;
var search_name,search_password;
var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
var nebpay = new NebPay();
var dappAddress = "n1yjJxgPEDkFR1Yw1P5Sjnq8TVLu4whnDfV";
var txHash = "c39ee636d618386ebf5cde5fe9493f9643a9a50b57e3450428ddb6ac6a01b46f";
var to = dappAddress;
var value = "0";
var time={
    _obj:{name:'',content:'',date:'',password:''},
    init:function () { 
        this.conInit();
    },
    conInit:function () { 
        $(".topcn div").remove();
         let _text="<div class='topcn-top text-center'>"+
            "人生最精彩的不是成功的那一瞬间<br/>而是回头看，那段漆黑的看似没有尽头、苦苦摸索的过程。<br/>当我们处于成功的喜悦<br/>是否已经忘记艰苦时期的誓言。<br/>现在让我们给未来成功的自己写份留言<br/>待到查看之时必将泪流满面。"+
                "</div>"+
                "<div class='topcn-bottom'>"+
                    "<div class='type-js headline'>"+
                        "<h2 class='text-js subBtn' onclick='time.transmitTime(time._obj)'>点击我，发送美好的瞬间...</h2>"+
                    "</div>"+
                "</div>";
          $(".topcn").append(_text);
          time.autoType(".type-js",200);
    },
    autoType:function (elementClass, typingSpeed){
        var thhis = $(elementClass);
        thhis.css({
          "position": "relative",
          "display": "inline-block"
        });
        thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
        thhis = thhis.find(".text-js");
        var text = thhis.text().trim().split('');
        var amntOfChars = text.length;
        var newString = "";
        thhis.text("|");
        setTimeout(function(){
          thhis.css("opacity",1);
          thhis.prev().removeAttr("style");
          thhis.text("");
          for(var i = 0; i < amntOfChars; i++){
            (function(i,char){
              setTimeout(function() {        
                newString += char;
                thhis.text(newString);
              },i*typingSpeed);
            })(i+1,text[i]);
          }
        },1500);
    },
    transmitTime:function (obj) { 
      console.log(obj);
        $(".topcn div").remove();
        let _text='<div class="content-header">'+
            '<h3>时光隧道</h3>'+
          '</div>'+
          '<div class="content-body">'+
            '<form class="form-horizontal" id="timeTunnelForm">'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2">昵称：</label>'+
                '<div class="col-sm-8">'+ 
                  '<input type="text" name="name" class="form-control" value="'+obj.name+'">'+
                '</div>'+
              '</div>'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2">秘钥：</label>'+
                '<div class="col-sm-8">'+ 
                  '<input type="text" name="password" class="form-control" value="'+obj.password+'">'+
                '</div>'+
              '</div>'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2">内容：</label>'+
                '<div class="col-sm-8">'+ 
                  '<textarea class="form-control" name="content" rows="5">'+obj.content+'</textarea>'+
                '</div>'+
              '</div>'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2">时间：</label>'+
                '<div class="col-sm-8">'+ 
                  '<input type="text" name="date" value="'+obj.date+'" class="form-control" id="datepicker" data-date-format="yyyy-mm-dd">'+ 
                '</div>'+
              '</div>'+    
            '</form>'+
          '</div>'+
          '<div class="content-footer">'+
            '<div class="text-center">'+
              '<button type="button" class="btn btn-primary" id="preview" onclick="time.preview()">预览</button>'+
            '</div>'+
          '</div>';
        $(".topcn").append(_text);
        $("#datepicker").datetimepicker({
          autoclose:true,
          language:"zh-CN",
          //startView: 2, //开始视图层，为月视图层
          minView:2//最小视图层，为月视图层
        });
    },
    preview:function(){
      //数据写入数据库中
      subData={name:$("input[name=name]").val(),password:$("input[name=password]").val(),content:$("textarea[name=content]").val(),date:$("input[name=date]").val()};
      if(subData.name=="" || subData.content=="" || subData.date == ""){
        alert("请输入完整的信息，在进行操作！");
        return false;
      }else{
        $(".topcn div").remove();
      
        let _text='<div class="content-header">'+
              '<h3>未来，你好吗？</h3>'+
            '</div>'+
            '<div class="content-body">'+
              '<div class="row text-left">'+
                '<div class="col-sm-12" style="text-indent:8px;font-size:12px;font-weight:normal;margin-bottom:20px;">'+subData.content+'</div>'+
              '</div>'+
              '<div class="row">'+
                '<div class="col-sm-3 text-center col-sm-push-9" style="margin-bottom:8px;font-size:14px">'+subData.name+'</div>'+
              '</div>'+
              '<div class="row">'+
                '<div class="col-sm-3 text-center col-sm-push-9" style="font-size:14px">'+subData.date+'</div>'+
              '</div>'+
            '</div>'+
            '<div class="content-footer">'+
              '<div class="text-center">'+
                '<button type="button" class="btn btn-primary" id="submit" onclick="time.end()" style="margin-right:20px">确定</button>'+
                '<button type="button" class="btn btn-primary" id="back" onclick="time.transmitTime(subData)">返回修改</button>'+
              '</div>'+
            '</div>';
        $(".topcn").append(_text);
      }
    },
    end:function(){
      var callFunction = "save";
      var callArgs = "[\""+subData.name+"\",\""+subData.date+"\",\""+subData.content+"\",\""+subData.password+"\"]";
      nebpay.call(to, value, callFunction, callArgs, {
          listener: function(resp){
          console.log(JSON.stringify(resp));
          }
      });
      $(".topcn div").remove();
      let _text='<div class="content-header">'+
          '<h3>邮件已经传入时光机，请记得自己的初心哦。。。。</h3>'+
        '</div>'
      $(".topcn").append(_text);

      setTimeout(time.conInit(),1000);
    },
    searchText:function(){
      $(".topcn div").remove();
      let _text='<div class="content-header">'+
            '<h3>留言查询</h3>'+
          '</div>'+
          '<div class="content-body">'+
            '<form class="form-horizontal" id="timeTunnelForm">'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2 col-sm-push-2">昵称：</label>'+
                '<div class="col-sm-4 col-sm-push-2">'+ 
                  '<input type="text" name="search_name" class="form-control">'+
                '</div>'+
              '</div>'+
              '<div class="form-group">'+
                '<label class="control-label col-sm-2 col-sm-push-2">秘钥：</label>'+
                '<div class="col-sm-4 col-sm-push-2">'+ 
                  '<input type="text" name="search_password" class="form-control">'+
                '</div>'+
              '</div>'+   
            '</form>'+
          '</div>'+
          '<div class="content-footer">'+
            '<div class="text-center">'+
              '<button type="button" class="btn btn-primary" id="preview" onclick="time.searchSubmit()">确定</button>'+
              '<button type="button" class="btn btn-primary" style="margin-left:20px;" onclick="time.conInit()">返回</button>'+
            '</div>'+
          '</div>';
      $(".topcn").append(_text);
    },
    searchSubmit:function(){
      if($("input[name=search_name]").val() == "" || $("input[name=search_password]").val() == ""){
        alert("请填写完整的信息！");
        return false;
      }else{
        // 上传搜索框内容
        search_name=$("input[name=search_name]").val();
        search_password=$("input[name=search_password]").val();
        console.log(search_name+","+search_password);
        $(".topcn div").remove();
        let _text="<div style='line-height:200px;color:#AD5F5D'>您的时光机正在跨越千山万水飞奔而来</div><div style='font-size:40px'><i class='fa fa-spin fa-spinner'></i></div>";
        $(".topcn").append(_text);
        var callFunction = "get";
        var callArgs = "[\""+search_name+"\",\""+search_password+"\"]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp){
                console.log(resp);
                time.searchResult(resp.result);
            }
        });
        //time.conInit();
      }
    },
    searchResult:function(obj){
      var _data=JSON.parse(obj);
      //console.log(obj);
      //console.log(_data);
      $(".topcn div").remove();
      if(_data.length == 0){
        var _text="<div style='line-height:200px;color:#7ECEC6'>抱歉，没有检索到您的留言，请先传送您的留言！</div>"
      }else{
        var _text='<div class="htmleaf-container"><div class="slide-container">';
        $.each(_data,function(index,elem){
          //console.log(elem);
          _text+='<div class="wrapper">'+
          '<div class="clash-card barbarian">'+
            '<div class="clash-card__level clash-card__level--barbarian">亲爱的 '+search_name+' 你好：</div>'+  
            '<div class="clash-card__unit-description">'+ elem.content +'</div>'+ 
            '<div class="clash-card__level clash-card__level--barbarian text-right">留言到达日期：'+elem.acceptdate+'</div>'+ 
          '</div>'+ 
        '</div>'; 
        })
  
        _text+='</div></div>';
      }
      
      $(".topcn").append(_text);

      /*var slideContainer = $('.slide-container');
      
      slideContainer.slick();
      
      $('.clash-card__image img').hide();
      $('.slick-active').find('.clash-card img').fadeIn(200);
      
      // On before slide change
      slideContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slick-active').find('.clash-card img').fadeOut(1000);
      });
      
      // On after slide change
      slideContainer.on('afterChange', function(event, slick, currentSlide) {
        $('.slick-active').find('.clash-card img').fadeIn(200);
      });*/
    
    }
}

$(function () { 
    time.init();
 })