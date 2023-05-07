import Swiper from "./swiper.min.js";
import "jquery-lazy";
import ZoomPic from "./focusBox.js";
import data from "./mock";
import { $modal } from "./modal";

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
          '<img class="photoUrl sci-bottom-img lazy"  data-src="' +
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
  new ZoomPic("focus_Box");
  $(".swiper-slide").on("mouseenter mouseleave", (ev) => {
    if ($(ev.target).parent().hasClass("swiper-slide-active")) {
      if (ev.type === "mouseenter") {
        // 放大
        $("#certify").animate({ width: "639px" });
        $(ev.target).animate({ width: "238px", height: "377px" });
        $($(ev.target).parent()).animate({ width: "238px", height: "377px" });
        swiper1.autoplay.stop();
      } else {
        // 还原
        $("#certify").animate({ width: "631px" });
        $(ev.target).animate({ width: "230px", height: "372px" });
        $($(ev.target).parent()).animate({ width: "230px", height: "372px" });
        swiper1.autoplay.start();
      }
    }
  });

  $('.lookMore').on('click', () => {
    location.href = '/series.html'
  })
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
      $(".v4_check_ani").eq($(this).index()).stop().fadeIn(100);
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
      '<img class="v6_avatar" src="./static/img/avatar_' +
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
    let value = $(".query_input").val();
    // value = "086021071";
    if (value) {
      $.get(
        `https://api.kadebao.com/openapi/common/getCardDetail?gradeNum=${value}`,
        (data) => {
          // 弹框
          if (data.data && data.data.cardSys) {
            const { list } = data.data;
            const map = {
              10: 0,
              9.9: 0,
              9.8: 0,
              9.5: 0,
              9: 0,
              8.5: 0,
              7.5: 0,
              6.5: 0,
              6: 0,
              5.5: 0,
              5: 0,
              4.5: 0,
            };
            (list||[]).map(i => {
              map[i.totalScore] = i.num;
            })
            let totalHtml = `<div class="score-total">
              <div class="score-title">卡得宝总分</div>
              <div  class="score-value">${data.data.totalScore}</div>
            </div>
            <div class="score-other">
              <div class="score-title">正面</div>
              <div  class="score-value">${data.data.frontScore}</div>
            </div>
            <div class="score-other">
              <div class="score-title">背面</div>
              <div  class="score-value">${data.data.backScore}</div>
            </div>
            <div class="score-other">
              <div class="score-title">四角</div>
              <div class="score-value">${data.data.fourScore}</div>
            </div>
            <div class="score-other">
              <div class="score-title">四边</div>
              <div class="score-value">${data.data.printScore}</div>
            </div>`
            if (data.data.totalScore === '本卡为真且无人为修饰') {
              totalHtml =  `<div class="score-text">本卡为真且无人为修饰</div>`;
            }
            const content = `
              <div class="body">
              <div class="title">
                <img src="/static/img/sLogo.png" />
                |
                <span>${data.data.cardSys}</span>
              </div>
              <div class="score">
              
                <div class="score-id">
                  <div class="score-title">评分编号</div>
                  <div class="score-value">${data.data.gradeNum}</div>
                </div>
                <div class="score-line"></div>
                
                ${totalHtml}
              </div>

              <div class="base-info">
                  <div class="base-info-title">基本信息</div>
                  <div  class="base-info-item">
                    <div>
                      <div class="base-info-key">卡片系列</div>
                      <div class="base-info-value">${data.data.cardSys}</div>
                    </div>
                    <div>
                      <div class="base-info-key">卡片名称</div>
                      <div class="base-info-value border-right">${data.data.cardName}</div>
                    </div>
                  </div>
                  <div class="base-info-item">
                    <div>
                      <div class="base-info-key">卡片材质</div>
                      <div class="base-info-value">${data.data.cardQuality}</div>
                    </div>
                    <div>
                      <div class="base-info-key">发行年份</div>
                      <div class="base-info-value border-right">${data.data.cardYear}</div>
                    </div>
                  </div>
                  <div class="base-info-item border-bottom">
                    <div>
                      <div class="base-info-key">卡片尺寸</div>
                      <div class="base-info-value">${data.data.cardSize}</div>
                    </div>
                    <div>
                      <div class="base-info-key">生产商</div>
                      <div class="base-info-value border-right">${data.data.cardProducer}</div>
                    </div>
                  </div>
                </div>


                
                <div class="other-info">
                  <div class="other-info-title">评级卡评级概况</div>
                  <div class="other-info-item">
                    <div>
                      <div class="other-info-key0 other-info-key border-bottom">评分</div>
                      <div class="other-info-value0 other-info-value border-bottom">数量</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key1">10</div>
                      <div class="other-info-value border-bottom">${map['10']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key1">9.9</div>
                      <div class="other-info-value border-bottom">${map['9.9']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key1">9.8</div>
                      <div class="other-info-value border-bottom">${map['9.8']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key1">9.5</div>
                      <div class="other-info-value border-bottom">${map['9.5']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key2">9</div>
                      <div class="other-info-value border-bottom">${map['9']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom other-info-key2">8.5</div>
                      <div class="other-info-value border-bottom">${map['8.5']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom">7.5</div>
                      <div class="other-info-value border-bottom">${map['7.5']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom">6.5</div>
                      <div class="other-info-value border-bottom">${map['6.5']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom">6</div>
                      <div class="other-info-value border-bottom">${map['6']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom">5.5</div>
                      <div class="other-info-value border-bottom">${map['5.5']}</div>
                    </div>
                    <div>
                      <div class="other-info-key border-bottom">5</div>
                      <div class="other-info-value border-bottom">${map['5']}</div>
                    </div>
                    <div class="border-right">
                      <div class="other-info-key border-bottom">4.5</div>
                      <div class="other-info-value border-bottom">${map['4.5']}</div>
                    </div>
                  </div>
                </div>
              
              </div>
            `;
            $modal({
              type: "confirm", //弹框类型  'alert' or  'confirm' or 'message'   message提示(开启之前如果之前含有弹框则清除)
              title: "评级卡结果", // 提示文字
              content: content, // 提示文字
              transition: 300, //过渡动画 默认 200   单位ms
              closable: true, // 是否显示可关闭按钮  默认为 false
              mask: true, // 是否显示遮罩层   默认为 false
              pageScroll: false, // 是否禁止页面滚动
              width: 800, // 单位 px 默认显示宽度 最下默认为300
              maskClose: true, // 是否点击遮罩层可以关闭提示框 默认为false
              cancelText: "取消", // 取消按钮 默认为 取消
              confirmText: "确认", // 确认按钮 默认未 确认
              cancel: function (close) {
                close(); // 调用返回的 关闭弹框函数 才能关闭
              },
              confirm: function (close) {
                close(); // 调用返回的 关闭弹框函数 才能关闭
              },
            });
          } else {
            // 给提示
            $modal({
              type: "message", //弹框类型  'alert' or  'confirm' or 'message'   message提示(开启之前如果之前含有弹框则清除)
              icon: "error", // 提示图标显示 'info' or 'success' or 'warning' or 'error'  or 'question'
              content: "未查询到相关评级信息", // 提示文字
            });
          }
        }
      );
    }
  });
});
