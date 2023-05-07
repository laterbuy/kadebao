// 百度统计
import $ from "jquery";
import "jquery-lazy";
// import top_icon2 from "../static/img/top_icon2.png";
window.$ = $;

var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?bec1f7f05353afa915a32a97eb195fdd";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

$(function () {
  // nav li
  var header = `<div class="view view_center header">
                    <img data-src="static/img/logo.png" alt="" class="logo lazy">
                    <div class="header_right">
                        <ul class="nav ">
                            <li><a href="./index.html">首页</a></li>
                            <li><a href="./about.html">关于</a></li>
                            <li><a href="./gradable.html">评级标准</a></li>
                            <li><a href="./label.html">评级标签</a></li>
                            <li><a href="./series.html">卡片系列</a></li>
                            <li class="nav_select"></li>
                        </ul>
                        <div class="comments marginLeft20px gradable_comments_menu">
                          <p>一键送评</p>
                          <div class="gradable_qrcode v9_qrcode" style="bottom: -120px">
                              <img class="" src="static/img/qrcode_1.png" alt="">
                          </div>
                        </div>
                    </div>
                </div>`;
  $(".container").prepend(header);
  /**
   * nav hover
   */
  function getHref() {
    switch (window.location.pathname.replace("/", "")) {
      case "index.html":
        return 0;
      case "about.html":
        return 1;
      case "gradable.html":
        return 2;
      case "label.html":
        return 3;
      case "series.html":
        return 4;
      default:
        return 0;
    }
  }
  function tralTrans(key) {
    switch (key) {
      case 0:
        return 16;
      case 1:
        return 88;
      case 2:
        return 192 - 30;
      case 3:
        return 296 - 30;
      case 4:
        return 400 - 30;
    }
  }

  $(".nav li").eq(getHref()).find("a").css("color", "#D51E21");

  var defaultLineWidth = parseInt($(".nav li").eq(getHref()).css("width")) - 36;

  $(".nav_select").css({
    width: defaultLineWidth + "px",
    transform: "translateX(" + tralTrans(getHref()) + "px)",
  });

  $(".nav li").hover(
    function () {
      $(".nav .nav_select").css("transition", "all .2s linear");
      if ($(this).index() == 5) {
        return;
      }
      $(this).siblings().find("a").css("color", "#485157");
      $(this).find("a").css("color", "#D51E21");
      var lineWidth = parseInt($(this).css("width")) - 36;
      // $(".nav_select").css({
      //   width: lineWidth + "px",
      //   transform: "translateX(" + tralTrans($(this).index()) + "px)",
      // });
      $(".nav li").eq(getHref()).find("a").css("color", "#D51E21");
    },
    function () {
      $(".nav li a").each((i, v) => {
        $(v).css({ color: "rgb(72, 81, 87)" });
      });
      $(".nav li").eq(getHref()).find("a").css("color", "#D51E21");

      var defaultLineWidth =
        parseInt($(".nav li").eq(getHref()).css("width")) - 36;

      // $(".nav_select").css({
      //   width: defaultLineWidth + "px",
      //   transform: "translateX(" + tralTrans(getHref()) + "px)",
      // });
    }
  );
  /**
   * 暂定第一个菜单下标
   * 后期改版按照所在页面标记下边红线
   * switch方法
   */
  // footer
  var footer = `<div class="view v9">
    <div class="v9_content">
        <div class="v9_">
            <div class="v9_head">
                <div class="v9_title">卡得宝</div>
                <ul class="v9_list">
                    <li><a href="./index.html">首页</a></li>
                    <li><a href="./about.html">关于</a></li>
                    <li><a href="./gradable.html">评级标准</a></li>
                    <li><a href="./label.html">评级标签</a></li>
                    <li><a href="./series.html">卡片系列</a></li>
                </ul>
            </div>
            <div class="v9_">
                <div class="v9_title">联系我们</div>
                <ul class="v9_list ">
                    <li class="v9_list_right">商务邮箱：BD@kadebao.com</li>
                    <li>
                        <span class="v9_service">企微客服
                            <div class="service_qrcode">
                                <img class="lazy" data-src="static/img/qiwei-qrcode.png" alt="">
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="v9_right_qrcode">
            <div class="v9_marginRight16">
                <div class="v9_qrcode">
                    <img class="lazy" data-src="static/img/qrcode_2.png" alt="">
                </div>
                <div class="v9_qrcode_text">扫码了解资讯</div>
            </div>
            <div>
                <div class="v9_qrcode">
                    <img class="lazy" data-src="static/img/qrcode_1.png" alt="">
                </div>
                <div class="v9_qrcode_text">扫码，一键送评</div>
            </div>
        </div>
    </div>
</div>
<div class="view">
    <div class="v10">
        <div class="v10-1">
          <div>CoptRight</div>
          <img data-src="static/img/©.png" class="lazy" alt="">
          <div>版权所有2022卡得宝版权所有，未经许可不许转载</div>
        </div>
        <div style="display: flex"><img src="static/img/beian.png" />京公网安备 11010502041074 京ICP备2021014848号</div>
    </div>
</div>`;
  $(".container").append(footer);
  /**
   * v9 hover
   */
  $(".v9_service").hover(
    function () {
      $(".service_qrcode").show(300);
    },
    function () {
      $(".service_qrcode").hide();
    }
  );

  // float
  var float = `<div class="float">
                    <div class="float_box float_1 line1">
                        <img class="float_icon lazy" data-src="static/img/official_icon2.png" alt="">
                        <div>公众号</div>
                        <div class="float_qrcode">
                            <img class="lazy" data-src="static/img/qrcode_2.png" alt="">
                            <p class="">扫码了解更多信息</p>
                        </div>
                    </div>
                    <div class="float_box float_2">
                        <img class="float_icon lazy" data-src="static/img/applets_icon2.png" alt="">
                        <div>小程序</div>
                        <div class="float_qrcode">
                            <img data-src="static/img/qrcode_1.png" class="lazy" alt="">
                            <p class="">扫码，一键送评</p>
                        </div>
                    </div>
                    <div class="float_box float_3 line2">
                        <img class="float_icon lazy" src="static/img/top_icon2.png" alt="">
                        <div>顶部</div>
                    </div>
                </div>`;
  $(".container").append(float);
  /**
   * float hover
   */
  $(".float_box").hover(
    function () {
      $(this).css({ color: "#fff", background: "#D51E21" });
      var imgName =
        "static/img/" +
        $(this).find(".float_icon").attr("src").split("/")[2].split("2")[0] +
        ".png";
      $(this).find(".float_icon").attr("src", imgName);
      if ($(this).index() == 0) {
        $(this).removeClass("line1");
        $(this).find(".float_qrcode").show(300);
      }
      if ($(this).index() == 1) {
        $(this).find(".float_qrcode").show(300);
      }
      if ($(this).index() == 2) {
        $(this).removeClass("line2");
      }
    },
    function () {
      $(this).css({ color: "#3D4756", background: "#fff" });
      var imgName =
        "static/img/" +
        $(this).find(".float_icon").attr("src").split("/")[2].split(".")[0] +
        "2.png";
      $(this).find(".float_icon").attr("src", imgName);
      if ($(this).index() == 0) {
        $(this).addClass("line1");
        $(this).find(".float_qrcode").hide(300);
      }
      if ($(this).index() == 1) {
        $(this).find(".float_qrcode").hide(300);
      }
      if ($(this).index() == 2) {
        $(this).addClass("line2");
      }
    }
  );
  $(".float_3").on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 200);
  });
  /**
   * 评级标准
   */
  $(".gradable_comments").hover(
    function () {
      $(".gradable_qrcode").css("display", "flex");
      $(".gradable_qrcode").show(300);
    },
    function () {
      $(".gradable_qrcode").hide();
    }
  );
  $(".gradable_comments_menu").on("mouseenter mouseleave", function (ev) {
    if (ev.type === "mouseenter") {
      $(".gradable_qrcode").fadeIn().css("display", "flex");
    } else {
      $(".gradable_qrcode").fadeOut();
    }
  });

  $("img.lazy").Lazy();
});
