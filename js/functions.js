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
      if ($(this).val() === "de") {
        location.href = "https://www.feiler.de/";
      }
      // $("#language_form").submit();
    });

    form_val();

    var lastFormitem = $(
      ".form-accordion.id_produkt .toggle-form-accordion",
    ).text();
    $(".form-accordion.id_produkt .toggle-form-accordion").click(function (
      event,
    ) {
      event.preventDefault();
      $(".toggle-form-accordion")
        .next(".form-accordion-content")
        .slideUp()
        .prev()
        .parent()
        .addClass("hidden");
      if ($(this).text() != "") {
        $(this)
          .next(".form-accordion-content")
          .slideDown()
          .prev()
          .parent()
          .removeClass("hidden");
        lastFormitem = $(this).text();
      } else {
        lastFormitem = "";
      }
    });

    $(".form-accordion.id_produkt .select-image a").click(function (event) {
      event.preventDefault();
      $("#id_produkt").val($(this).attr("data-id"));
      $(".form-accordion.id_produkt .choosen").html($(this).attr("data-label"));
      $(".form-accordion.id_produkt li").removeClass("selected");
      $(this).parent("li").addClass("selected");
      $.ajax({
        type: "GET",
        url:
          "/ajax.php?id_produkt=" +
          $(this).attr("data-id") +
          "&lang=" +
          $("#lang").val(),
        async: true,
        cache: false,
        success: function (data) {
          $("#ajax").html(data);
          form_val();
          $(".form-accordion.id_produkt .toggle-form-accordion")
            .next(".form-accordion-content")
            .slideUp()
            .prev()
            .parent()
            .addClass("hidden");
        },
      });
    });
  });
})(jQuery, window, document);

function form_val() {
  var $dateFormat = "dd.mm.yy";

  $.datepicker.setDefaults($.datepicker.regional["de"]);

  if ($("#datum_datepicker").length != 0) {
    $("#datum_datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      minDate: 28,
      dateFormat: $dateFormat,
    });
  }

  $("#c_text").on("change", function (event) {
    if ($(this).prop("checked") === true) {
      $(".form_c_text").removeClass("hidden");
      $("#beschriftung").prop("required", true);
      $("#schriftgroesse").prop("required", true);
      $("#schriftfarbe").prop("required", true);
      $("#schriftart").prop("required", true);
      $("#position_schrift").prop("required", true);
      $(".form-accordion.schriftart .toggle-form-accordion")
        .next(".form-accordion-content")
        .slideDown()
        .prev()
        .parent()
        .removeClass("hidden");
    } else {
      $(".form_c_text").addClass("hidden");
      $("#beschriftung").prop("required", false);
      $("#schriftgroesse").prop("required", false);
      $("#schriftfarbe").prop("required", false);
      $("#schriftart").prop("required", false);
      $("#position_schrift").prop("required", false);
    }
  });

  $("#c_motiv").on("change", function (event) {
    if ($(this).prop("checked") === true) {
      $(".form_c_motiv").removeClass("hidden");
      $("#upload").prop("required", true);
      $("#motivgroesse").prop("required", true);
      $("#position_motiv").prop("required", true);
      $(".form-accordion.position_motiv .toggle-form-accordion")
        .next(".form-accordion-content")
        .slideDown()
        .prev()
        .parent()
        .removeClass("hidden");
    } else {
      $(".form_c_motiv").addClass("hidden");
      $("#upload").prop("required", false);
      $("#motivgroesse").prop("required", false);
      $("#position_motiv").prop("required", false);
    }
  });

  var allFormToggle = $(".toggle-form-accordion");
  var lastFormitem = $(
    ".form-accordion.id_produkt .toggle-form-accordion",
  ).text();

  $(".form-accordion:not(.id_produkt) .toggle-form-accordion").click(function (
    event,
  ) {
    event.preventDefault();
    allFormToggle
      .next(".form-accordion-content")
      .slideUp()
      .prev()
      .parent()
      .addClass("hidden");
    if ($(this).text() != lastFormitem) {
      $(this)
        .next(".form-accordion-content")
        .slideDown()
        .prev()
        .parent()
        .removeClass("hidden");
      lastFormitem = $(this).text();
    } else {
      lastFormitem = "";
    }
  });

  $(".form-accordion.masse .select-bar a").click(function (event) {
    event.preventDefault();
    $(".form-accordion.masse li").removeClass("selected");
    $("#masse").val($(this).attr("data-id"));
    $(".form-accordion.masse .choosen").html($(this).attr("data-label"));
    $(this).parent("li").addClass("selected");
    $(".form-accordion.farbe .toggle-form-accordion").click();
  });

  $(".form-accordion.farbe .select-bar a").click(function (event) {
    event.preventDefault();
    $(".form-accordion.farbe li").removeClass("selected");
    $("#farbe").val($(this).attr("data-id"));
    $(".form-accordion.farbe .choosen").html($(this).attr("data-label"));
    $(this).parent("li").addClass("selected");
    $(".form-accordion.farbe .form-accordion-content")
      .slideUp()
      .prev()
      .parent()
      .addClass("hidden");
  });

  $(".label-upload a, #upload_name").click(function (event) {
    event.preventDefault();
    $("#upload").click();
  });

  $(".picture_upload").change(function () {
    event.preventDefault();
    if (this.files && this.files[0]) {
      $("#upload_name").val(this.files[0].name);
    }
  });

  $(".form-accordion.schriftart .select-image a").click(function (event) {
    event.preventDefault();
    $(".form-accordion.schriftart li").removeClass("selected");
    $("#schriftart").val($(this).attr("data-id"));
    $(".form-accordion.schriftart .choosen").html($(this).attr("data-label"));
    $(this).parent("li").addClass("selected");
    $(".form-accordion.position_schrift .toggle-form-accordion").click();
  });

  $(".form-accordion.position_schrift .select-image a").click(function (event) {
    event.preventDefault();
    $(".form-accordion.position_schrift li").removeClass("selected");
    $("#position_schrift").val($(this).attr("data-id"));
    $(".form-accordion.position_schrift .choosen").html(
      $(this).attr("data-label"),
    );
    $(this).parent("li").addClass("selected");
    $(".form-accordion.position_schrift .form-accordion-content")
      .slideUp()
      .prev()
      .parent()
      .addClass("hidden");
  });

  $(".form-accordion.position_motiv .select-image a").click(function (event) {
    event.preventDefault();
    $(".form-accordion.position_motiv li").removeClass("selected");
    $("#position_motiv").val($(this).attr("data-id"));
    $(".form-accordion.position_motiv .choosen").html(
      $(this).attr("data-label"),
    );
    $(this).parent("li").addClass("selected");
    $(".form-accordion.position_motiv .form-accordion-content")
      .slideUp()
      .prev()
      .parent()
      .addClass("hidden");
  });

  //	$('.form-accordion.motivsize .select-image a').click(function(event){
  //		event.preventDefault();
  //		$('.form-accordion.motivsize li').removeClass('selected');
  //		$('#motivsize').val($(this).attr('data-id'));
  //		$('.form-accordion.motivsize .choosen').html($(this).attr('data-label'));
  //		$(this).parent('li').addClass('selected');
  //		$('.form-accordion.position .toggle-form-accordion').click();
  //	});
  //
  //	$('.form-accordion.position .select-image a').click(function(event){
  //		event.preventDefault();
  //		$('.form-accordion.position li').removeClass('selected');
  //		$('#position').val($(this).attr('data-id'));
  //		$('.form-accordion.position .choosen').html($(this).attr('data-label'));
  //		$(this).parent('li').addClass('selected');
  //		$('.form-accordion.fontsize .toggle-form-accordion').click();
  //	});
  //
  //	$('.form-accordion.fontsize .select-image a').click(function(event){
  //		event.preventDefault();
  //		$('.form-accordion.fontsize li').removeClass('selected');
  //		$('#fontsize').val($(this).attr('data-id'));
  //		$('.form-accordion.fontsize .choosen').html($(this).attr('data-label'));
  //		$(this).parent('li').addClass('selected');
  //		$('.form-accordion.fonttype .toggle-form-accordion').click();
  //	});
  //
  //	$('.form-accordion.fonttype .select-image a').click(function(event){
  //		event.preventDefault();
  //		$('.form-accordion.fonttype li').removeClass('selected');
  //		$('#fonttype').val($(this).attr('data-id'));
  //		$('.form-accordion.fonttype .choosen').html($(this).attr('data-label'));
  //		$(this).parent('li').addClass('selected');
  //		$('.form-accordion.fonttype .form-accordion-content').slideUp().prev().parent().addClass('hidden');
  //	});
}
