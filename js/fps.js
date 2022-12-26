
var rAF = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
 
    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;
 
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        if(fps<=6){
            var kd=`<span style="color:#bd0000">卡成ppt</span>`
        }
        else if(fps<=10){
            var kd=`<span style="color:red">电竞级帧率</span>`
        }
        else if(fps<=14){
            var kd=`<span style="color:yellow">难受</span>`
        }
        else if(fps<24){
            var kd=`<span style="color:orange">卡</span>`
        }
        else if(fps<=40){
            var kd=`<span style="color:green">...</span>`
        }
        else{
            var kd=`<span style="color:#425aef">正常</span>`
        }
        document.getElementById("fps").innerHTML=`FPS:${fps} ${kd}`;
        frame = 0;
        lastTime = now;
    };
 
    rAF(loop);
}

loop();


if(localStorage.getItem("blur")=="false"){
    var blur=0;
    }else{
        var blur=1;
    
    }
    if(localStorage.getItem("yjjs")=="true"){
        var yjjs=1;
    }else{
        var yjjs=0;
        
    }

if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
function setBlur(){
    blur=!blur;
    localStorage.setItem("blur",blur);
    if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
}
// if(yjjs){
//     document.getElementById("yjjs").innerText=`
//     *:not(#web_bg){
//         transform:translateZ(0);
//         backface-visibility: hidden
//     }`}
//     else{
//         document.getElementById("yjjs").innerText=``
//     }
function yjjs1(){
    yjjs=!yjjs;
    localStorage.setItem("yjjs",yjjs)
    // if(yjjs){
    // document.getElementById("yjjs").innerText=`
    // *:not(#web_bg){
    //     transform:translateZ(0);
    //     backface-visibility: hidden
    // }`}
    // else{
    //     document.getElementById("yjjs").innerText=``
    // }
}
if(localStorage.getItem("theme")=="acrylic"){
    document.getElementById("css").href=""
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        localStorage.setItem("theme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        localStorage.setItem("theme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    localStorage.setItem("themeColor",c);

}

if(localStorage.getItem("themeColor")==undefined){
    localStorage.setItem("themeColor","pink");
}

setColor(localStorage.getItem("themeColor"));



if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
}
function toggleRightside(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}












if(localStorage.getItem("font")==undefined){
    localStorage.setItem("font","HYTMR")
}
setFont(localStorage.getItem("font"))
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}
function setFont(n){
    localStorage.setItem("font",n)
    if(n=="main"){
        document.body.style.fontFamily="-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
    }
    else{
        document.body.style.fontFamily="var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
        document.documentElement.style.setProperty('--global-font', n)
    }
}
// 以下为2.0新增内容

// 创建窗口
var winbox = ''

var isMax=false;
function createWinbox() {
    
    div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "博客设置",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => {
            isMax=true;
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`
        },
        onrestore: () => {
            isMax=false;
            div.innerHTML = ''
        },
    });
    document.getElementsByClassName("wb-close")[0].onclick=function(){
        sessionStorage.setItem("settingWindow","close");
    }
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div class="settings" style="display: block;"><a class="reSettings content-button">恢复默认设置</a>
    <p></p>
    <h2 class="content-head">性能设置</h2>
    <p></p>
    <div class="content" style="display:flex"><input type="checkbox" id="blur" onclick="setBlur()">
        <div class="content-text">禁用模糊效果</div>
    </div>
    <div class="content" style="display:flex"><input type="checkbox" id="yjjs" onclick="yjjs1()"
            value="onrightMenurightMenu">
        <div class="content-text">硬件加速</div>
    </div>
    <p></p>
    <h2 class="content-head">主题设置</h2>
    <p></p>
    <div class="content" style="display:flex">
        <button class="content-button" onclick="switchTheme()">切换主题</button><br><input type="checkbox" id="hideAside" onclick="toggleRightside()">
        <div class="content-text">隐藏侧边栏</div>
    </div>
    <h3 class="content-head">&nbsp;&nbsp;主题色</h3>
    <p></p>
    <div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
            onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
            onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
            onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
            onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
            onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
            onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
            onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
            onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
            onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
            onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
            onclick="setColor('blackgray')"></div>
    <p></p>
    <p></p>
    <p></p>
    <h2 class="content-head">字体设置</h2>
    <p id="swfs">
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a><br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXJLJ'!important;color:black" onclick="setFont('FZXJLJ')">方正金陵体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXS'!important;color:black" onclick="setFont('FZXS')">方正像素体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZODZK'!important;color:black" onclick="setFont('FZODZK')">方正欧蝶正楷</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('main')">系统默认</a> <br>
    </p>
</div>
    <h2 style="margin-left:10px">背景设置</h2>
    <div>
    </br>&nbsp&nbsp注意:切换背景功能仅在Acrylic主题中生效，在Simple主题中无效
    <button onclick="localStorage.removeItem('blogbg');location.reload();" class="content-button"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button>
    </div>
    <div id="article-container" style="padding:20px;">
    <h3 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)')"></a>   
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)')"></a>   

    </div>
    <h3 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)')"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aea549be6.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aea549be6.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aec701a68.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aec701a68.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aef4a5543.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aef4a5543.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324af3622884.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324af3622884.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/5.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/5.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/6.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/6.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/7.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/7.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/12/08/6391b77ed767c.png)')"><img src="https://bu.dusays.com/2022/12/08/6391b77ed767c.png"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/9.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/9.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/10.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/10.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/11.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/11.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/12.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/12.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/13.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/13.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/14.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/14.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/15.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/15.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/16.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/16.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/17.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/17.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/18.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/18.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/19.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/19.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/20.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/20.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/21.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/21.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/22.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/22.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/23.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/23.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/24.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/24.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/25.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/25.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/26.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/26.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/27.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/27.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/28.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/28.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/29.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/29.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/30.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/30.webp"></a>
    </div>
    <h3 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)" onclick="changeBg('linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)" onclick="changeBg('linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)')"></a>

    </div>
    
    <h3 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h3>
    <div class="bgbox">
    <input type="color" id="colors" autocomplete="on" value="#FF0000"></input>
    </div>

`;
$("#"+localStorage.getItem("themeColor")).attr("checked", true);
if(localStorage.getItem("blur")=="false"){
    document.getElementById("blur").checked=true;
}
if(localStorage.getItem("yjjs")=="true"){
    document.getElementById("yjjs").checked=true;
}
if(localStorage.getItem("hideRightside")=="1"){
    document.getElementById("hideAside").checked=true;
}
document.getElementsByClassName("reSettings")[0].onclick=function(){
    localStorage.clear()
    window.location.reload()
}
}

function winResize() {
    if(!isMax){
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }}
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) {winbox.toggleClass('hide');sessionStorage.setItem("settingWindow","close");}
    else {createWinbox();sessionStorage.setItem("settingWindow","open");}
}
if(sessionStorage.getItem("settingWindow")=="open"){
    createWinbox();
    
}


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
if(m==12&&dd==26){//搞来玩的，鬼子投降
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
l=["震惊！微软让Minecraft Java免费了！","Minecraft竟然违背Mojang的原则发布2.0！","非常抱歉，因为不可控原因，博客将于明天停止运营，再见","好消息，日本没了！","美国垮了，背后原因竟是时刻心心念念想着祖国的川普！","微软垮了！"]
console.log(m,dd);
if(m==4&&dd==1){//愚人节，随机谎话
    console.log(l[randomNum(0,l.length-1)]);
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire(l[randomNum(0,l.length-1)]);
        sessionStorage.setItem("isPopupWindow","1");
    }
}
if(m==7&&dd==5){//sr
    console.log("激鱼已经过去了+(y-2007).toString()+"个生日了！");
    if(sessionStorage.getItem("isPopupWindow")!="1"){
        Swal.fire("激鱼已经过去了"+(y-2007.toString()+"个生日了！");
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

