//22.12.8 update：add mask
//22.12.9 update: add search in this page
function setMask(){//设置遮罩层
    if(document.getElementsByClassName("rmMask")[0]!=undefined){
        return document.getElementsByClassName("rmMask")[0];
    }
    mask = document.createElement('div');
    mask.className = "rmMask";
    mask.style.width = window.innerWidth + 'px';
    mask.style.height = window.innerHeight + 'px';
    mask.style.background = '#1ffb97';
    mask.style.opacity = '.0';
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.zIndex = 998;
    document.body.appendChild(mask);
    document.getElementById("rightMenu").style.zIndex=19198;
    return mask;
}

function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.yinyong=function(){
    var e = document.getElementsByClassName("el-textarea__inner")[0],
        t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0), e.value = d.value = "> "+getSelection().toString()+"\n\n", e.dispatchEvent(t);
    console.log(getSelection().toString());
    document.getElementsByClassName("el-textarea__inner")[0].value="> "+getSelection().toString()+"\n\n";
    Snackbar.show({
        text: '为保证最佳评论阅读体验，建议不要删除空行',
        pos: 'top-center',
        showAction: false,
    })
}
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Snackbar.show({
        text: '链接复制成功！快去分享吧！',
        pos: 'top-center',
        showAction: false
    });
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    Snackbar.show({
        text: '已复制，请注明原作者哦！',
        pos: 'top-center',
        showAction: false
	});
}

//回到顶部
rmf.scrollToTop = function () {
    document.getElementsByClassName("menus_items")[1].setAttribute("style","");
    document.getElementById("name-container").setAttribute("style","display:none");
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}
rmf.searchinThisPage=()=>{
    document.body.removeChild(mask);
    document.getElementsByClassName("local-search-box--input")[0].value=window.getSelection().toString()
    document.getElementsByClassName("search")[0].click()
    var evt = document.createEvent("HTMLEvents");evt.initEvent("input", false, false);document.getElementsByClassName("local-search-box--input")[0].dispatchEvent(evt);
}
document.body.addEventListener('touchmove', function(e){
    
}, { passive: false });
function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey)return true;
        
        $('.rightMenu-group.hide').hide();
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())&&el.tagName!="A"){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                if(el.href.indexOf("http://")==-1&&el.href.indexOf("https://")==-1||el.href.indexOf("yisous.xyz")!=-1){
                    pjax.loadUrl(el.href)
                }
                else{
                    location.href = el.href
                }
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
                // window.location.reload();
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
                // window.location.reload();
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
            rmf.saveAs=function(){
                var a = document.createElement('a');
                var url = el.src;
                var filename = url.split("/")[-1];
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            // rmf.paste=function(){
            //     input.addEventListener('paste', async event => {
            //         event.preventDefault();
            //         const text = await navigator.clipboard.readText();
            //         el.value+=text;
            //       });
            // }
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            Snackbar.show({
                                text: '请允许读取剪贴板！',
                                pos: 'top-center',
                                showAction: false,
                            })
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }
        mask=setMask();
        window.onscroll=()=>{
            rmf.showRightMenu(false);
            window.onscroll=()=>{}
            document.body.removeChild(mask);
        }
        $(".rightMenu-item").click(()=>{
            document.body.removeChild(mask);
        })
        $(window).resize(()=>{
            rmf.showRightMenu(false);
            document.body.removeChild(mask);
        })
        mask.onclick=()=>{
            document.body.removeChild(mask);
        }
        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)

var d = new Date();
m=d.getMonth()+1;
dd=d.getDate();
y=d.getFullYear();

//cookie函数


function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
//纪念日

if(m==9&&dd==18){
    console.log("勿忘国耻，振兴中华！\n\n今天是1931年9月18日九一八事变"+(y-1931).toString()+"周年纪念日！\n=================================================================")
    document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("今天是1931年9月18日九一八事变"+(y-1931).toString()+"周年纪念日。\n勿忘国耻，振兴中华！");
        sessionStorage.setItem("isPopupWindow","1");
    }    
}
if(m==7&&dd==7){
    console.log("勿忘国耻，振兴中华！\n\n今天是1937年7月7日卢沟桥事变"+(y-1937).toString()+"周年纪念日！\n=================================================================")
    document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("今天是1937年7月7日卢沟桥事变"+(y-1937).toString()+"周年纪念日。\n勿忘国耻，振兴中华！");
        sessionStorage.setItem("isPopupWindow","1");
    }    
}
if(m==12&&dd==13){
    console.log("勿忘国耻，振兴中华！\n\n今天是1937年12月13日南京大屠杀"+(y-1931).toString()+"周年纪念日！为遇难的无辜同胞们缅怀！\n=================================================================")
    document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("今天是1937年12月13日南京大屠杀"+(y-1937).toString()+"周年纪念日，希望你能停下来缅怀遇难的无辜同胞们。\n勿忘国耻，振兴中华！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==8&&dd==14){
    console.log("勿忘国耻，振兴中华！\n\n今天是8月14日世界慰安妇纪念日！\n=================================================================")
    document.getElementsByTagName("html")[0].setAttribute("style","filter: grayscale(100%);");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("今天是8月14日世界慰安妇纪念日，希望你能停下来了解一下来为历史作证，为曾经的无辜妇女发声。\n勿忘国耻，振兴中华！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}

//节假日

if(m==10&&dd<=5){//国庆节
    console.log("祖国"+(y-1949).toString()+"岁生日快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("祖国"+(y-1949).toString()+"岁生日快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==8&&dd==15){//搞来玩的，鬼子投降
    console.log("鬼子投降"+(y-1945).toString()+"年了！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("鬼子投降"+(y-1945).toString()+"年了！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==1&&dd==1){//元旦节
    console.log(y.toString()+"年元旦快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire(y.toString()+"年元旦快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==3&&dd==8){//妇女节
    console.log("各位女神们，妇女节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("各位女神们，妇女节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
l=["震惊！微软让Minecraft Java免费了！","Minecraft竟然违背Mojang的原则发布2.0！","非常抱歉，因为不可控原因，博客将于明天停止运营，再见","好消息，日本没了！","美国垮了，背后原因竟是时刻心心念念想着祖国的川普！","地球将于30s后爆炸"]
console.log(m,dd);
if(m==4&&dd==1){//愚人节，随机谎话
    console.log(l[randomNum(0,l.length-1)]);
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire(l[randomNum(0,l.length-1)]);
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==5&&dd==1){//劳动节
    console.log("劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==7&&dd==5){//生日
    console.log("激鱼"+(y-2007).toString()+"岁生日快乐");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("激鱼"+(y-2007).toString()+"岁生日快乐");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==2&&dd==12){//生日
    console.log("激鱼B站"+(y-2020).toString()+"岁生日快乐");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("激鱼B站"+(y-2020).toString()+"岁生日快乐");
        sessionStorage.setItem("isPopupWindow","1");
    }
}

if(m==5&&dd==4){//青年节
    console.log("为有思想政治觉悟，拥护中国共产党，追求无产阶级、共产主义、马克思主义的青年们致敬！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("为有思想政治觉悟，拥护中国共产党，追求无产阶级、共产主义、马克思主义的青年们致敬");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==6&&dd==1){//儿童节
    console.log("各位小朋友们，儿童节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("各位小朋友们，儿童节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==7&&dd==1){//建党节
    console.log("中国共产党"+(y-1921).toString()+"岁生日快乐");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("中国共产党"+(y-1921).toString()+"岁生日快乐");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==11&&dd==21){//网站生日
    console.log("网站"+(y-2022).toString()+"周岁生日快乐");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("网站"+(y-2022).toString()+"周岁生日快乐");
        sessionStorage.setItem("isPopupWindow","1");
    }
}


//传统节日部分

if(m==4&&dd==4||(m==4&&dd==5)){//清明节
    console.log("清明安康");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("清明安康");
        sessionStorage.setItem("isPopupWindow","1");
    }
}

var lunar=calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if((lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初六")||(lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初五")||(lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初四")||(lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初三")||(lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初二")||(lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="初一")||(lunar["IMonthCn"]=="腊月"&&lunar["IDayCn"]=="三十")||(lunar["IMonthCn"]=="腊月"&&lunar["IDayCn"]=="廿九")){
    //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
    console.log(y.toString()+"年新年快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire(y.toString()+"年新年快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="十五")){
    //元宵节
    console.log("元宵节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("元宵节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="正月"&&lunar["IDayCn"]=="十五")){
    //元宵节
    console.log("元宵节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("元宵节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="五月"&&lunar["IDayCn"]=="初五")){
    //端午节
    console.log("端午节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("端午节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="七月"&&lunar["IDayCn"]=="初七")){
    //七夕节
    console.log("七夕节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("七夕节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="八月"&&lunar["IDayCn"]=="十五")){
    //中秋节
    console.log("中秋节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("中秋节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if((lunar["IMonthCn"]=="九月"&&lunar["IDayCn"]=="初九")){
    //重阳节
    console.log("重阳节快乐！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("重阳节快乐！");
        sessionStorage.setItem("isPopupWindow","1");
    }
}


