"use strict";
var $body = $("body"),
  $bodyHtml = $("body,html"),
  $win = $(window),
  $bodyWrapper = $("#body-wrapper"),
  $header = $("header"),
  $content = $("#content"),
  $footer = $("footer"),
  $navToggle = $("#nav-toggle"),
  $navMain = $("#nav-main"),
  $bodyOverlay = $("#body-overlay"),
  $pageLoader = $("#page-loader"),
  trueMobile,
  Core = {
    init: function () {
      this.Basic.init(), this.Component.init();
    },
    Basic: {
      init: function () {
        this.systemDetector(),
          this.edgeDetector(),
          this.interactions(),
          this.backgrounds(),
          this.animations(),
          this.pageTransition(),
          this.navigation();
      },
      systemDetector: function () {
        var e = {
          Android: function () {
            return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
          },
          any: function () {
            return (
              e.Android() ||
              e.BlackBerry() ||
              e.iOS() ||
              e.Opera() ||
              e.Windows()
            );
          },
        };
        window.trueMobile = e.any();
      },
      edgeDetector: function () {
        var e;
        $(".header-horizontal .main-menu li.menu-item-has-children").on(
          "mouseenter mouseleave",
          function (e) {
            if ($("ul", this).length) {
              var t = $("ul:first", this),
                a,
                i = t.offset().left,
                o = t.width(),
                n = $header.height(),
                s,
                l;
              if (i + o <= $header.width()) {
                function r() {
                  $(this).removeClass("edge");
                }
                setTimeout(r, 1e3);
              } else $(this).addClass("edge");
            }
          }
        );
      },
      interactions: function () {
        var e;
        $(".search-trigger,.search-close-trigger").on("click", function (e) {
          e.preventDefault(),
            $body.toggleClass("search-form-open"),
            $(".search-form .form-control").val("");
        });
      },
      backgrounds: function () {
        var e = $(".bg-image-holder"),
          t = $(".bg-slideshow");
        e.each(function () {
          var e = $(this).children("img").attr("src");
          $(this)
            .css("background-image", "url(" + e + ")")
            .children("img")
            .hide();
        }),
          t.length > 0 &&
            $(".bg-slideshow").slick({
              dots: !1,
              arrows: !1,
              fade: !0,
              speed: 3e3,
              autoplay: !0,
              autoplaySpeed: 3e3,
              pauseOnHover: !1,
            });
      },
      animations: function () {
        var e;
        $(".animated").appear(function () {
          $(this).each(function () {
            var e = $(this),
              t = $(this).data("animation-delay");
            setTimeout(function () {
              e.addClass(e.data("animation")).addClass("show");
            }, t);
          });
        });
      },
      pageTransition: function () {
        $bodyWrapper.hasClass("animsition")
          ? ($bodyWrapper.animsition({
              inClass: "overlay-slide-in-right",
              outClass: "overlay-slide-out-left",
              inDuration: 1500,
              outDuration: 800,
              linkElement:
                'a:not([target="_blank"]):not([href^="#"]):not(figure a)',
              loading: !0,
              loadingParentElement: "body",
              loadingClass: "loader",
              loadingInner:
                '<svg class="loader" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><circle fill="none" stroke="#007ACC" stroke-width="4" cx="50" cy="50" r="25" style="opacity:0.5;"><animate attributeName="r" attributeType="XML" values="25; 20; 25" begin="0s" dur="1s" repeatCount="indefinite" /></circle><circle fill="#007ACC" stroke="#007ACC" stroke-width="4" cx="50" cy="50" r="6"><animate attributeName="r" attributeType="XML" values="6; 10; 6" begin="0s" dur="1s" repeatCount="indefinite" /></circle><circle fill="none" stroke="#007ACC" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.2;"/><circle fill="#DB4534" stroke="#DB4534" stroke-width="3" cx="8" cy="54" r="6" ><animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" /></circle></svg>',
              timeout: !1,
              timeoutCountdown: 5e3,
              onLoadEvent: !0,
              browser: ["animation-duration", "-webkit-animation-duration"],
              overlay: !0,
              overlayClass: "animsition-overlay-slide",
              overlayParentElement: "body",
              transition: function (e) {
                window.location.href = e;
              },
            }),
            $bodyWrapper.on("animsition.inStart", function () {
              setTimeout(function () {
                Core.Basic.animations();
              }, 600);
            }))
          : Core.Basic.animations();
      },
      navigation: function () {
        var e = $(".header-vertical"),
          t = $(".header-horizontal"),
          a = $(".nav-toggle"),
          i = $(".close-menu"),
          o = $(".home #content"),
          n = $(".page #content"),
          s = $("#section-top-bar"),
          l = $(".menu-item-has-children");
        ($body = $("body")),
          l.length > 0 &&
            $win.width() <= 768 &&
            l.children("a").on("click", function (e) {
              e.preventDefault(),
                $(this)
                  .toggleClass("submenu-open")
                  .next(".sub-menu")
                  .slideToggle(200)
                  .end()
                  .parent(".menu-item-has-children")
                  .siblings(".menu-item-has-children")
                  .children("a")
                  .removeClass("submenu-open")
                  .next(".sub-menu")
                  .slideUp(200);
            });
        var r = 0,
          u = $("[data-local-scroll]");
        u.find("a").on("click", function () {
          $(this).blur();
        }),
          u.localScroll({ offset: 0, duration: 700 }),
          o.waypoint({
            handler: function (t) {
              "down" === t && e.addClass("scrolling");
            },
            offset: -100,
          }),
          o.waypoint({
            handler: function (t) {
              "up" === t && e.removeClass("scrolling");
            },
            offset: -100,
          }),
          n.waypoint({
            handler: function (t) {
              "down" === t &&
                n.appear(function () {
                  e.addClass("scrolling");
                });
            },
            offset: -100,
          }),
          n.waypoint({
            handler: function (t) {
              "up" === t &&
                s.appear(function () {
                  e.removeClass("scrolling");
                });
            },
            offset: -100,
          }),
          a.on("click", function (a) {
            a.preventDefault(),
              $body.toggleClass("mobile-menu-open"),
              e.toggleClass("open"),
              t.toggleClass("open");
          }),
          i.on("click", function (t) {
            $body.toggleClass("mobile-menu-open"), e.toggleClass("open");
          });
        var p = $("#page-submenu"),
          d = $("#page-submenu li > a"),
          f = $(".onepagesection"),
          c = null,
          y = function (e) {
            d.each(function () {
              var t = $(this).attr("href");
              e == t
                ? $(this).parent().addClass("active")
                : $(this).parent().removeClass("active");
            });
          };
        f.waypoint({
          handler: function (e) {
            if ("up" == e) {
              var t = "#" + this.element.id;
              y(t);
            }
          },
          offset: "-8%",
        }),
          f.waypoint({
            handler: function (e) {
              if ("down" == e) {
                var t = "#" + this.element.id;
                y(t);
              }
            },
            offset: "7%",
          }),
          t.waypoint({
            handler: function (e) {
              "down" == e &&
                (t.addClass("goingdown"),
                $win.width() > 768 && s.addClass("hide"));
            },
            offset: -15,
          }),
          t.waypoint({
            handler: function (e) {
              "up" == e &&
                (t.removeClass("goingdown"),
                $win.width() > 768 && s.removeClass("hide"));
            },
            offset: -15,
          });
      },
    },
    Component: {
      init: function () {
        this.autoHideHeader(),
          this.backToTop(),
          this.carousels(),
          this.forms(),
          this.gallery(),
          this.map(),
          this.modal(),
          this.tooltip();
      },
      autoHideHeader: function () {
        function e() {
          var e = $(document).scrollTop();
          Math.abs(a - e) <= i ||
            (e > a && e > n
              ? o.addClass("nav-up")
              : e + $win.height() < $(document).height() &&
                o.removeClass("nav-up"),
            (a = e));
        }
        var t,
          a = 0,
          i = 5,
          o = $("header.header-horizontal,.header-vertical .logo-mobile"),
          n = o.outerHeight();
        $win.scroll(function (e) {
          t = !0;
        }),
          setInterval(function () {
            t && (e(), (t = !1));
          }, 250);
      },
      backToTop: function () {
        var e = 700,
          t = 1200,
          a = 700,
          i = $(".back-to-top");
        $win.scroll(function () {
          $(this).scrollTop() > 700
            ? i.addClass("is-visible")
            : i.removeClass("is-visible fade-out"),
            $(this).scrollTop() > 1200 && i.addClass("fade-out");
        }),
          i.on("click", function (e) {
            e.preventDefault(), $bodyHtml.animate({ scrollTop: 0 }, 700);
          });
      },
      carousels: function () {
        var e = $(".slider-main"),
          t = $(".carousel-treatments"),
          a = $(".team-carousel");
        if (
          (t.length > 0 && t.slick(),
          a.length > 0 &&
            a.slick({
              infinite: !0,
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: !0,
              speed: 500,
              responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: !0,
                    dots: !0,
                  },
                },
                {
                  breakpoint: 601,
                  settings: { slidesToShow: 2, slidesToScroll: 2 },
                },
                {
                  breakpoint: 480,
                  settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
              ],
            }),
          e.length > 0)
        ) {
          function i(e) {
            var t =
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            e.each(function () {
              var e = $(this),
                a = e.data("animation-delay"),
                i = "animated " + e.data("animation");
              e.css({
                "animation-delay": a,
                "-webkit-animation-delay": a,
                "-moz-animation-delay": a,
                "-o-animation-delay": a,
              }),
                e.addClass(i).one(t, function () {
                  e.removeClass(i);
                });
            });
          }
          e.on("init swipe", function (e, t) {
            var a;
            i($("div.slick-active").find("[data-animation]"));
          }),
            e.on("beforeChange", function (e, t, a, o) {
              var n;
              i(
                $('div.slider-item[data-slick-index="' + o + '"]').find(
                  "[data-animation]"
                )
              );
            }),
            e.slick();
        }
      },
      forms: function () {
        var e = $("#contact-form"),
          t = $("#appointment-form");
        e.length > 0 &&
          e.submit(function (e) {
            function t(e) {
              var t;
              return new RegExp(
                /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
              ).test(e);
            }
            e.preventDefault();
            var a = $("#name").val(),
              i = $("#phone").val(),
              o = $("#email").val(),
              n = $("#message").val(),
              s = "name=" + a + "&phone=" + i + "&email=" + o + "&message=" + n;
            return (
              t(o) && n.length > 1 && a.length > 1
                ? $.ajax({
                    type: "POST",
                    url: "assets/php/contact-form.php",
                    data: s,
                    success: function () {
                      $(".success").fadeIn(1e3), $(".error").fadeOut(500);
                    },
                  })
                : ($(".error").fadeIn(1e3), $(".success").fadeOut(500)),
              !1
            );
          }),
          t.length > 0 &&
            t.submit(function (e) {
              function t(e) {
                var t;
                return new RegExp(
                  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
                ).test(e);
              }
              e.preventDefault();
              var a = $("#namesurname").val(),
                i = $("#phone").val(),
                o = $("#email").val(),
                n = $("#ourcenter").val(),
                s = $("#treatment").val(),
                l = $("#dentist").val(),
                r = $("#datetime").val(),
                u = $("#message").val(),
                p =
                  "namesurname=" +
                  a +
                  "&phone=" +
                  i +
                  "&email=" +
                  o +
                  "&ourcenter=" +
                  n +
                  "&treatment=" +
                  s +
                  "&dentist=" +
                  l +
                  "&datetime=" +
                  r +
                  "&message=" +
                  u;
              return (
                t(o) && u.length > 1 && a.length > 1
                  ? $.ajax({
                      type: "POST",
                      url: "assets/php/appointment-form.php",
                      data: p,
                      success: function () {
                        $(".success").fadeIn(1e3), $(".error").fadeOut(500);
                      },
                    })
                  : (console.log("test"),
                    $(".error").fadeIn(1e3),
                    $(".success").fadeOut(500)),
                !1
              );
            });
      },
      gallery: function () {
        var e = "",
          t;
        (e +=
          "\x3c!-- Root element of PhotoSwipe. Must have class pswp. --\x3e"),
          (e +=
            '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'),
          (e += '    <div class="pswp__bg"></div>'),
          (e += '    <div class="pswp__scroll-wrap">'),
          (e += '        <div class="pswp__container">'),
          (e += '            <div class="pswp__item"></div>'),
          (e += '            <div class="pswp__item"></div>'),
          (e += '            <div class="pswp__item"></div>'),
          (e += "        </div>"),
          (e += '        <div class="pswp__ui pswp__ui--hidden">'),
          (e += '            <div class="pswp__top-bar">'),
          (e += '                <div class="pswp__counter"></div>'),
          (e +=
            '                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'),
          (e +=
            '                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'),
          (e +=
            '                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'),
          (e += '                <div class="pswp__preloader">'),
          (e += '                    <div class="pswp__preloader__icn">'),
          (e += '                      <div class="pswp__preloader__cut">'),
          (e +=
            '                        <div class="pswp__preloader__donut"></div>'),
          (e += "                      </div>"),
          (e += "                    </div>"),
          (e += "                </div>"),
          (e += "            </div>"),
          (e +=
            '            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'),
          (e += '                <div class="pswp__share-tooltip"></div> '),
          (e += "            </div>"),
          (e +=
            '            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">'),
          (e += "            </button>"),
          (e +=
            '            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">'),
          (e += "            </button>"),
          (e += '            <div class="pswp__caption">'),
          (e += '                <div class="pswp__caption__center"></div>'),
          (e += "            </div>"),
          (e += "        </div>"),
          (e += "    </div>"),
          (e += "</div>"),
          $body.append(e),
          $(".image-gallery").each(function () {
            var e = $(this),
              t,
              a = (function () {
                var t = [];
                return (
                  e.find("a").each(function () {
                    var e = $(this).attr("href"),
                      a = $(this).data("size").split("x"),
                      i,
                      o,
                      n = { src: e, w: a[0], h: a[1] };
                    t.push(n);
                  }),
                  t
                );
              })(),
              i = $(".pswp")[0];
            e.on("click", "figure", function (e) {
              e.preventDefault();
              var t = $(this).children("a").data("index"),
                o,
                n;
              new PhotoSwipe(i, PhotoSwipeUI_Default, a, { index: t }).init();
            });
          });
      },
      map: function () {
        var $googleMap = $("#google-map");
        if ($googleMap.length)
          var yourLatitude = 40.758895,
            yourLongitude = -73.985131,
            pickedStyle = $googleMap.data("style"),
            wy = [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ weight: "2.00" }],
              },
              {
                featureType: "all",
                elementType: "geometry.stroke",
                stylers: [{ color: "#9c9c9c" }],
              },
              {
                featureType: "all",
                elementType: "labels.text",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: "#eeeeee" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7b7b7b" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#46bcec" }, { visibility: "on" }],
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#c8d7d4" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#070707" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }],
              },
            ],
            apple = [
              {
                featureType: "landscape.man_made",
                elementType: "all",
                stylers: [
                  { color: "#faf5ed" },
                  { lightness: "0" },
                  { gamma: "1" },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#bae5a6" }],
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [
                  { weight: "1.00" },
                  { gamma: "1.8" },
                  { saturation: "0" },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ hue: "#ffb200" }],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{ lightness: "0" }, { gamma: "1" }],
              },
              {
                featureType: "transit.station.airport",
                elementType: "all",
                stylers: [
                  { hue: "#b000ff" },
                  { saturation: "23" },
                  { lightness: "-4" },
                  { gamma: "0.80" },
                ],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#a0daf2" }],
              },
            ],
            dark = [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                  { saturation: 36 },
                  { color: "#000000" },
                  { lightness: 40 },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                  { visibility: "on" },
                  { color: "#000000" },
                  { lightness: 16 },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#000000" }, { lightness: 20 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                  { color: "#000000" },
                  { lightness: 17 },
                  { weight: 1.2 },
                ],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 20 }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 21 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#000000" }, { lightness: 17 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  { color: "#000000" },
                  { lightness: 29 },
                  { weight: 0.2 },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 18 }],
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 16 }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 19 }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#000000" }, { lightness: 17 }],
              },
            ],
            light = [
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }, { lightness: 17 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  { color: "#ffffff" },
                  { lightness: 29 },
                  { weight: 0.2 },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }, { lightness: 18 }],
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }, { lightness: 16 }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#dedede" }, { lightness: 21 }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [
                  { visibility: "on" },
                  { color: "#ffffff" },
                  { lightness: 16 },
                ],
              },
              {
                elementType: "labels.text.fill",
                stylers: [
                  { saturation: 36 },
                  { color: "#333333" },
                  { lightness: 40 },
                ],
              },
              { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#fefefe" }, { lightness: 20 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                  { color: "#fefefe" },
                  { lightness: 17 },
                  { weight: 1.2 },
                ],
              },
            ],
            dream = [
              {
                featureType: "landscape",
                stylers: [
                  { hue: "#FFBB00" },
                  { saturation: 43.400000000000006 },
                  { lightness: 37.599999999999994 },
                  { gamma: 1 },
                ],
              },
              {
                featureType: "road.highway",
                stylers: [
                  { hue: "#FFC200" },
                  { saturation: -61.8 },
                  { lightness: 45.599999999999994 },
                  { gamma: 1 },
                ],
              },
              {
                featureType: "road.arterial",
                stylers: [
                  { hue: "#FF0300" },
                  { saturation: -100 },
                  { lightness: 51.19999999999999 },
                  { gamma: 1 },
                ],
              },
              {
                featureType: "road.local",
                stylers: [
                  { hue: "#FF0300" },
                  { saturation: -100 },
                  { lightness: 52 },
                  { gamma: 1 },
                ],
              },
              {
                featureType: "water",
                stylers: [
                  { hue: "#0078FF" },
                  { saturation: -13.200000000000003 },
                  { lightness: 2.4000000000000057 },
                  { gamma: 1 },
                ],
              },
              {
                featureType: "poi",
                stylers: [
                  { hue: "#00FF6A" },
                  { saturation: -1.0989010989011234 },
                  { lightness: 11.200000000000017 },
                  { gamma: 1 },
                ],
              },
            ],
            paper = [
              {
                featureType: "administrative",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                  { visibility: "simplified" },
                  { hue: "#0066ff" },
                  { saturation: 74 },
                  { lightness: 100 },
                ],
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [
                  { visibility: "off" },
                  { weight: 0.6 },
                  { saturation: -85 },
                  { lightness: 61 },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "road.local",
                elementType: "all",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [
                  { visibility: "simplified" },
                  { color: "#5f94ff" },
                  { lightness: 26 },
                  { gamma: 5.86 },
                ],
              },
            ],
            mapOptions = {
              zoom: 15,
              center: { lat: yourLatitude, lng: yourLongitude },
              mapTypeControl: !1,
              panControl: !1,
              zoomControl: !0,
              scaleControl: !1,
              streetViewControl: !1,
              scrollwheel: !1,
              styles: eval(pickedStyle),
            },
            map = new google.maps.Map(
              document.getElementById("google-map"),
              mapOptions
            ),
            myLatLng = new google.maps.LatLng(yourLatitude, yourLongitude),
            image = {
              url: "assets/img/location-pin.png",
              anchor: new google.maps.Point(79, 115),
            },
            myLocation = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: image,
            });
      },
      modal: function () {
        $(".modal[data-timeout]").each(function () {
          var e = $(this).data("timeout"),
            t = $(this);
          setTimeout(function () {
            t.modal("show");
          }, e);
        }),
          $('[data-toggle="video-modal"]').on("click", function () {
            var e = $(this).data("target"),
              t = $(this).data("video");
            return (
              $(e + " iframe").attr("src", t + "?autoplay=1"),
              $(e).modal("show"),
              $(e).on("hidden.bs.modal", function () {
                var t = $(e + " .modal-content");
                $(e + " iframe").remove(),
                  t.html('<iframe height="500"></iframe>');
              }),
              !1
            );
          });
      },
      tooltip: function () {
        $("[data-toggle='tooltip']").tooltip();
      },
    },
  };
Core.Basic.pageTransition(),
  $(document).ready(function () {
    Core.init();
  }),
  $win.on("load", function () {
    var e;
    $body.addClass("loaded"),
      0 != $pageLoader.length
        ? $("#page-loader").fadeOut(600, function () {
            Core.Basic.animations();
          })
        : Core.Basic.animations(),
      $("[data-beforeafter]").each(function (e, t) {
        $(this).twentytwenty();
      });
  }),
  $(window).on("resize", function () {
    setTimeout(function () {
      Waypoint.refreshAll();
    }, 600);
  });

// Method 1: Simple click handler (works for single-page navigation)
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("#main-navigation .menu-item a");

  menuItems.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all menu items
      menuItems.forEach((item) => {
        item.parentElement.classList.remove("active");
      });

      // Add active class to clicked item
      this.parentElement.classList.add("active");
    });
  });
});

// Method 2: Based on current page URL (for multi-page websites)
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("#main-navigation .menu-item a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  menuItems.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // Remove active from all first
    link.parentElement.classList.remove("active");

    // Add active to current page
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.parentElement.classList.add("active");
    }
  });
});

// Method 3: Combination approach (recommended)
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("#main-navigation .menu-item a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Set initial active state based on current page
  menuItems.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.parentElement.classList.add("active");
    }
  });

  // Handle clicks for immediate visual feedback
  menuItems.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all menu items
      menuItems.forEach((item) => {
        item.parentElement.classList.remove("active");
      });

      // Add active class to clicked item
      this.parentElement.classList.add("active");
    });
  });
});

function animateCounter(element, target, duration = 2000, formatNumber = true) {
  const startValue = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);

    const currentValue = startValue + (target - startValue) * easeOut;

    // Format the number based on its size
    let displayValue;
    if (formatNumber && target >= 1000) {
      if (target >= 1000000) {
        displayValue = (currentValue / 1000000).toFixed(1) + "M";
      } else if (target >= 1000) {
        displayValue = (currentValue / 1000).toFixed(1) + "K";
      } else {
        displayValue = Math.floor(currentValue);
      }
    } else {
      displayValue = Math.floor(currentValue);
    }

    element.textContent = displayValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure final value is exactly the target
      if (formatNumber && target >= 1000) {
        if (target >= 1000000) {
          element.textContent = (target / 1000000).toFixed(1) + "M";
        } else {
          element.textContent = (target / 1000).toFixed(1) + "K";
        }
      } else {
        element.textContent = target;
      }
    }
  }

  requestAnimationFrame(updateCounter);
}

// Function to start all counters
function animateCounter(element, target, duration = 2000, formatNumber = true) {
  const startValue = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);

    const currentValue = startValue + (target - startValue) * easeOut;

    // Format the number based on its size
    let displayValue;
    if (formatNumber && target >= 1000) {
      if (target >= 1000000) {
        displayValue = (currentValue / 1000000).toFixed(1) + "M";
      } else if (target >= 1000) {
        displayValue = (currentValue / 1000).toFixed(1) + "K";
      } else {
        displayValue = Math.floor(currentValue);
      }
    } else {
      displayValue = Math.floor(currentValue);
    }

    element.textContent = displayValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure final value is exactly the target
      if (formatNumber && target >= 1000) {
        if (target >= 1000000) {
          element.textContent = (target / 1000000).toFixed(1) + "M";
        } else {
          element.textContent = (target / 1000).toFixed(1) + "K";
        }
      } else {
        element.textContent = target;
      }
    }
  }

  requestAnimationFrame(updateCounter);
}

// Start counters when they come into view (Intersection Observer)
function initCountersOnScroll() {
  const counters = document.querySelectorAll(".counter-value");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          const delay = Array.from(counters).indexOf(counter) * 200; // Staggered animation

          setTimeout(() => {
            animateCounter(counter, target, 2000);
          }, delay);

          observer.unobserve(counter); // Stop observing after animation starts
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the element is visible
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Utility function to add new counters dynamically
function addCounter(title, target, suffix = "") {
  const container = document.querySelector(".counters-container");

  const counterBox = document.createElement("div");
  counterBox.className = "counter-box";

  counterBox.innerHTML = `
                <div class="counter-title">${title}</div>
                <div class="counter-number">
                    <span class="counter-value" data-target="${target}">0</span>
                    <span class="counter-suffix">${suffix}</span>
                </div>
            `;

  container.appendChild(counterBox);

  // Re-initialize observer for new counter
  initCountersOnScroll();
}

// Start counters when page loads and user scrolls to them
window.addEventListener("load", initCountersOnScroll);

// Alternative: Start immediately when DOM is ready
document.addEventListener("DOMContentLoaded", initCountersOnScroll);

document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('.copyright-year');
    yearSpan.textContent = new Date().getFullYear();
});