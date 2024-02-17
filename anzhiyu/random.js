var posts=["posts/card/","posts/2023xue/","posts/huodong/","posts/cc7e52cb/","posts/degr/","posts/nali/","posts/waxx/","posts/2024da/","posts/43r6/","posts/f88j/","posts/fj2f/","posts/dr7h/","posts/ckm4/","posts/dyh7/","posts/g6be/","posts/f3sg/","posts/fy4s/","posts/h8b4/","posts/j8d9/","posts/dr7h/","posts/csjk/","posts/6cb5/","posts/c9b7/","posts/3561/","posts/c5a1/","posts/3873/","posts/b07b/","posts/6693/","posts/c3c4/","posts/187e/","posts/3dfd/","posts/d574/","posts/a815/","posts/b56c/","posts/gekuc/","posts/c0b6/","posts/ddd0/","posts/7149/","posts/ee6a/","posts/71bf/","posts/6613/","posts/9a7a/","posts/b15/","posts/bd73/","posts/99c4/","posts/bf1b/","posts/9c19/","posts/93c2/","posts/114514ai/","posts/hexo3/","posts/286c/","posts/YJBG1/","posts/YJBG2/","posts/23KS1/","posts/BK02/","posts/BK01/","posts/18233bf1/","posts/2023/","posts/1p5/","posts/hexo2/","posts/hexo1/","posts/d7c0/","posts/9036/","posts/acb8/","posts/6858/","posts/1145/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};var friend_link_list=[];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };