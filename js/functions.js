(function ($, window, document, undefined) {
  var $win = $(window);
  var $doc = $(document);

  $win.load(function () {});

  $doc.ready(function () {
    $(".slider").slick({
      infinite: true,
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 8000,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1239,
          settings: {
            arrows: false,
            dots: false,
          },
        },
      ],
    });

    $(".fancy").fancybox();

    $(".note-button").click(function (event) {
      event.preventDefault();
      $(".note").addClass("note-close");
      $(".note").delay(500).fadeOut(1);
    });

    $(".note")
      .click(function () {
        $(".note").addClass("note-close");
        $(".note").delay(500).fadeOut(1);
      })
      .children(".note-box")
      .click(function (event) {
        return false;
      });

    $(".nav-menu").click(function (event) {
      event.preventDefault();
      $(this).find("i").toggleClass("close");
      $(".wrapper").toggleClass("active");
    });

    $(".language-menu").click(function (event) {
      event.preventDefault();
      $(this).find("i").toggleClass("close");
      $(".wrapper").toggleClass("active-lang");
    });

    var allToggle = $(".toggle-accordion");
    var lastitem;

    $(".toggle-accordion").click(function (event) {
      event.preventDefault();
      allToggle.next(".list-content").slideUp().prev().addClass("hidden");
      if ($(this).text() != lastitem) {
        $(this).next(".list-content").slideDown().prev().removeClass("hidden");
        lastitem = $(this).text();
      } else {
        lastitem = "";
      }
    });

    $("#language").change(function () {
      console.log($(this).val());
      if ($(this).val() === "de") {
        // location.href = "https://www.feiler.de/";
        window.open("https://www.feiler.de/");
      }
      // $("#language_form").submit();
    });
  });

  // var elHeight = $(
  //   ".content .row:nth-child(3) > .shell > .col:nth-child(1)",
  // ).outerHeight();

  // $(".content .row:nth-child(3) > .shell > .col:nth-child(2)").outerHeight(
  //   elHeight,
  // );
})(jQuery, window, document);
