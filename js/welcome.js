function welcome(){
    let welcome_text = '欢迎光顾本蒟蒻的小窝~'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        welcome_text="欢迎你，来自"+referrer.toUpperCase()+"的用户！";//获取用户来源域名
    }
    swal({
        title: " 欢迎！",
        text: welcome_text+'\n打开页面下方音乐以获得更佳体验！',//欢迎文本，可自行修改
        imageUrl: "/images/avatar.jpg",//图片，自行修改位置
        timer: 3000,//弹出时间
        showConfirmButton: false
    });
}
$(document).ready(()=>{//若未引用JQuery，请引用
    welcome()
})