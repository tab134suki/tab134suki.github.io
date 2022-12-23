if (document.body.clientWidth > 992) {
    function getBasicInfo() {
        /* 窗口高度 */
        var ViewH = $(window).height();
        /* document高度 */
        var DocH = $("body")[0].scrollHeight;
        /* 滚动的高度 */
        var ScrollTop = $(window).scrollTop();
        /* 可滚动的高度 */
        var S_V = DocH - ViewH;
        var Band_H = ScrollTop / (DocH - ViewH) * 80;
        return {
            ViewH: ViewH,
            DocH: DocH,
            ScrollTop: ScrollTop,
            Band_H: Band_H,
            S_V: S_V
        }
    };
    function show(basicInfo) {
        if (basicInfo.ScrollTop > 0.001) {
            $(".neko").css('display', 'block');
        } else {
            $(".neko").css('display', 'none');
        }
    }
    (function ($) {
        $.fn.nekoScroll = function (option) {
            var defaultSetting = {
                top: '0',
                scroWidth: 6 + 'px',
                z_index: 9999,
                zoom: 0.9,
                borderRadius: 5 + 'px',
                right: 60 + 'px',
                nekoImg: "https://www.z4a.net/images/2022/12/19/369704cabfde30abb.png",
                hoverMsg: "你干嘛~",
                color: "#07cb7c",
                during: 500,
                blog_body: "body",
            };
            var setting = $.extend(defaultSetting, option);
            var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
                this.prop("id") : this.prop("nodeName");
            if ($(".neko").length == 0) {
                this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
            }
            let basicInfo = getBasicInfo();
            $(getThis)
                .css({
                    'position': 'fixed',
                    'width': setting.scroWidth,
                    'top': setting.top,
                    'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                    'z-index': setting.z_index,
                    'background-color': setting.bgcolor,
                    "border-radius": setting.borderRadius,
                    'right': setting.right,
                    'background-image': 'url(' + setting.scImg + ')',
                    'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                    'background-size': 'contain'
                });
            $("#" + setting.nekoname)
                .css({
                    'position': 'fixed',
                    'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                    'z-index': setting.z_index * 10,
                    'right': setting.right,
                    'background-image': 'url(' + setting.nekoImg + ')',
                });
            show(getBasicInfo());
            $(window)
                .scroll(function () {
                    let basicInfo = getBasicInfo();
                    show(basicInfo);
                    $(getThis)
                        .css({
                            'position': 'fixed',
                            'width': setting.scroWidth,
                            'top': setting.top,
                            'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                            'z-index': setting.z_index,
                            'background-color': setting.bgcolor,
                            "border-radius": setting.borderRadius,
                            'right': setting.right,
                            'background-image': 'url(' + setting.scImg + ')',
                            'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                            'background-size': 'contain'
                        });
                    $("#" + setting.nekoname)
                        .css({
                            'position': 'fixed',
                            'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                            'z-index': setting.z_index * 10,
                            'right': setting.right,
                            'background-image': 'url(' + setting.nekoImg + ')',
                        });
                    if (basicInfo.ScrollTop == basicInfo.S_V) {
                        $("#" + setting.nekoname)
                            .addClass("showMsg")
                    } else {
                        $("#" + setting.nekoname)
                            .removeClass("showMsg");
                        $("#" + setting.nekoname)
                            .attr("data-msg", setting.hoverMsg);
                    }
                });
            this.click(function (e) {
                btf.scrollToDest(0, 500)
            });
            $("#" + setting.nekoname)
                .click(function () {
                    btf.scrollToDest(0, 500)
                });
            return this;
        }
    })(jQuery);

    $(document).ready(function () {
        //部分自定义
        $("#myscoll").nekoScroll({
            bgcolor: 'rgb(7 255 124 / .5)', //背景颜色，没有绳子背景图片时有效
            borderRadius: '2em',
            zoom: 0.9
        }
        );
        //自定义（去掉以下注释，并注释掉其他的查看效果）
        /*
        $("#myscoll").nekoScroll({
            nekoname:'neko1', //nekoname，相当于id
            nekoImg:'img/猫咪.png', //neko的背景图片
            scImg:"img/绳1.png", //绳子的背景图片
            bgcolor:'#1e90ff', //背景颜色，没有绳子背景图片时有效
            zoom:0.9, //绳子长度的缩放值
            hoverMsg:'你好~喵', //鼠标浮动到neko上方的对话框信息
            right:'100px', //距离页面右边的距离
            fontFamily:'楷体', //对话框字体
            fontSize:'14px', //对话框字体的大小
            color:'#1e90ff', //对话框字体颜色
            scroWidth:'8px', //绳子的宽度
            z_index:100, //不用解释了吧
            during:1200, //从顶部到底部滑动的时长
        });
        */
    })
}

function doStuff() {
    var flag=0;
    try{
        ap=aplayers[0]; //aplayer对象的存放位置挺离谱的
        ap.list;
        flag=1;
    }catch{
        setTimeout(doStuff, 50);//等待aplayer对象被创建（没找到初始化实例的地方只能这样了，这个判断代码是StackOverflow上面扒的（因为自己是个蒟蒻
        return;
    }
    if(flag){
        ap.lrc.hide();//自带播放暂停时显隐歌词，可以删
        document.getElementsByClassName("aplayer-icon-menu")[0].click()
        if(localStorage.getItem("musicIndex")!=null){
            musicIndex = localStorage.getItem("musicIndex");
            ap.list.switch(musicIndex);
            //歌曲可以本地储存下次访问体验更好
        }
        if(sessionStorage.getItem("musicTime") != null){
            window.musict = sessionStorage.getItem("musicTime");
            ap.setMode(sessionStorage.getItem("musicMode"));
            if(sessionStorage.getItem("musicPaused")!='1'){
                ap.play();
            }
            // setTimeout(function(){
            //     ap.seek(window.musict); //seek炸了我很久，最后决定加个延时（本来要用canplay但是莫名鬼畜了）
            // },500);
            var g=true; //加个变量以防鬼畜但是不知道怎么节流qwq
            ap.on("canplay",function(){
                if(g){
                    ap.seek(window.musict);
                    g=false;//如果不加oncanplay的话会seek失败就这原因炸很久
                }
            });
        }else{
            sessionStorage.setItem("musicPaused",1);
            ap.setMode("mini"); //新版添加了保存展开状态功能
        }
        if(sessionStorage.getItem("musicVolume") != null){
            ap.audio.volume=Number(sessionStorage.getItem("musicVolume"));
        }
        ap.on("pause",function(){sessionStorage.setItem("musicPaused",1);ap.lrc.hide()});//原基础上加了个检测暂停免得切换页面后爆零(bushi)（指社死）
        ap.on("play",function(){sessionStorage.setItem("musicPaused",0);ap.lrc.show()});//自带播放暂停时显隐歌词，后面那句可以删，上同
        ap.audio.onvolumechange=function(){sessionStorage.setItem("musicVolume",ap.audio.volume);};//新版增加保存音量免得切换页面爆零（doge
        setInterval(function(){
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex",musicIndex);
            //保存播放进度
            sessionStorage.setItem("musicTime",musicTime);
            sessionStorage.setItem("musicMode",ap.mode);
            //保存展开状态
        },200);//节流，200ms精度感知不大qwq
    }
}
doStuff();




作者: Ariasaka
链接: https://yisous.xyz/posts/614f1131/
来源: Ariasakaの小窝
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "((٩(//̀Д/́/)۶))你干嘛|";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "o(>ω<)o欢迎回来|" + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

if(window.location.href == 'http://localhost:4000/'||window.location.href == 'https://tab134suki.github.io/'){
    Snackbar.show({ actionText: '关闭本弹窗',text: '欢迎来到丨咬一口激动的鱼丨的官方网站！',backgroundColor: '#01f0ef',actionTextColor: '#0df016',pos: 'top-center',duration: '7000' });
  }

if(window.location.href == 'http://localhost:4000/about/'||window.location.href == 'https://tab134suki.github.io/about'){
    Snackbar.show({ actionText: '关闭本弹窗',text: '可以动一动你们的小手给我一键三连吗？',backgroundColor: '#01f0ef',actionTextColor: '#0df016',pos: 'top-center',duration: '3000' });
  }

if(window.location.href == 'http://localhost:4000/zzq/'||window.location.href == 'https://tab134suki.github.io/zzq'){
    Snackbar.show({ actionText: '关闭本弹窗',text: '合理消费享受健康人生',backgroundColor: '#01f0ef',actionTextColor: '#0df016',pos: 'top-center',duration: '7000' });
  }