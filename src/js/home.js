import Swiper from "./swiper.min.js";
import "jquery-lazy";
import data from "./mock";

$(function () {
  $.ajax({
    url: "https://api.kadebao.com/openapi/common/queryCardPhotoList",
    type: "post",
    success: function (res) {
      var result = res.data.list;
      var str = "";
      result.forEach(function (item, index) {
        str +=
          '<li class="">' +
          '<div class="v7_gradable_box">' +
          '<div class="v7_gradable_title">' +
          item.cardBrand +
          "</div>" +
          '<div class="v7_gradable_desc">' +
          item.cardSys +
          "</div>" +
          '<div class="v7_gradable_years">' +
          item.cardYear +
          "</div>" +
          "</div>" +
          '<div class="v7_gradable_box2">' +
          '<img data-src="static/img/v7_item_bg.png" class="lazy" alt="">' +
          '<div class="v7_itembg_dialog">' +
          '<img class="titleUrl lazy" data-src="' +
          item.titleUrl +
          '" alt="">' +
          '<img class="photoUrl lazy" data-src="' +
          item.photoUrl +
          '" alt="">' +
          "</div>" +
          "</div>" +
          "</li>";
      });
      $(".v7_gradable").append(str);
      $("img.lazy").Lazy();
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });

  /**
   * v1 轮播
   */
  var swiper1 = new Swiper("#certify .swiper-container", {
    autoplay: {
      delay: 1000,
    },
    watchSlidesProgress: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    speed: 1000,
    loopedSlides: 5,
    on: {
      progress: function (progress) {
        for (let i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          var slideProgress = this.slides[i].progress;
          var modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - 1) * 0.2 + 1;
          }
          var translate = slideProgress * modify * 87 + "px";
          var scale = 1 - Math.abs(slideProgress) / 5;
          var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
          slide.transform("translateX(" + translate + ") scale(" + scale + ")");
          slide.css("zIndex", zIndex);
          slide.css("opacity", 1);
          if (Math.abs(slideProgress) > 3) {
            slide.css("opacity", 0);
          }
        }
      },
      setTransition: function (transition) {
        for (var i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          slide.transition(transition);
        }
      },
    },
  });
  $(".swiper-slide").on("mouseenter mouseleave", (ev) => {
    if ($(ev.target).parent().hasClass("swiper-slide-active")) {
      if (ev.type === "mouseenter") {
        // 放大
        $(ev.target).animate({ width: "257px", height: "410px" });
        $($(ev.target).parent()).animate({ width: "257px", height: "410px" });
        swiper1.autoplay.stop();
      } else {
        // 还原
        $(ev.target).animate({ width: "230px", height: "372px" });
        $($(ev.target).parent()).animate({ width: "230px", height: "372px" });
        swiper1.autoplay.start();
      }
    }
  });
  /**
   * v4 hover
   */
  $(".uniqueness_left li").eq(0).addClass("selectUniqueness");
  $(".v4_check_ani").eq(0).show();
  $(".uniqueness_left li").hover(
    function () {
      $(this).siblings().removeClass("selectUniqueness");
      $(this).addClass("selectUniqueness");

      if ($(this).index() == 1) {
        $(".u_right_cont_posi").stop().fadeIn();
        $(".u_right_cont_posi").css("display", "flex");
      } else {
        $(".u_right_cont_posi").stop().hide();
      }
      $(".v4_check_ani").stop().hide();
      $(".v4_check_ani").eq($(this).index()).stop().fadeIn(500);
    },
    function () {
      //   console.log($(this).index());
      // $('.u_right_cont_4').css('display','none');
      // $('.u_right_cont_4').hide();
    }
  );
  /**
   * v6 mock 轮播
   */
  var str = ' <div class="swiper-container"><div class="swiper-wrapper">';
  data.forEach(function (item, idx) {
    str +=
      '<div class="swiper-slide feedback_info">' +
      '<img class="v6_avatar" data-src="./static/img/avatar_' +
      (idx + 1) +
      '.png" alt="">' +
      '<div class="feedback_name">' +
      item.name +
      "</div>" +
      '<div class="feedback_age">' +
      item.cardAge +
      "卡龄</div>" +
      '<div class="feedback_common">' +
      item.common +
      "</div>" +
      "</div>";
  });
  str +=
    ' </div><div class="swiper-button-prev"><div class="v6_prev"></div></div><div class="swiper-button-next"><div class="v6_next"></div></div><div class="swiper-pagination"></div>';
  $("#feedback").append(str);
  setTimeout(() => {
    var swiper2 = new Swiper("#feedback .swiper-container", {
      loop: true,
      autoplay: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, 0);

  /**
   * 一键送评按钮hover
   */
  var btnHoverImg =
    '<div class="btn-hover-qrcode">' +
    '<div class="service_qrcode" style="display:flex;left:50%;margin-left:-50px;z-index: 999;">' +
    '<img src="./static/img/qrcode_1.png" alt="" />' +
    "</div>" +
    "</div>";
  $(".comments").hover(
    function () {
      $(this).stop(false, true).append(btnHoverImg);
      if ($(this).attr("class").indexOf("marginLeft20px") > -1) {
        $(this)
          .find(".btn-hover-qrcode")
          .find(".service_qrcode")
          .css("top", "60px");
        $(this)
          .find(".btn-hover-qrcode")
          .find(".service_qrcode")
          .addClass("beforeHidden");
        $(".beforeHidden:before").hide();
      }
      $(".btn-hover-qrcode").stop(false, true).fadeIn();
    },
    function () {
      $(".btn-hover-qrcode").fadeOut(function () {
        $(this).remove();
      });
    }
  );

  /**
   * 评级编号查询
   */
  $(".search").on("click", function () {
    console.log($(".query_input").val());
    if ($(".query_input").val()) {
      window.location.href =
        "https://web.kadebao.com/index.html?gradeNum=" +
        $(".query_input").val();
    }
  });
});
