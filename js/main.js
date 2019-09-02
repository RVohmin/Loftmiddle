document.addEventListener("DOMContentLoaded", function () {
  //карты

  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [59.94782778, 30.26796460],
      zoom: 10
    }, {
        searchControlProvider: 'yandex#search',
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
      }, {
          iconLayout: 'default#image',
          iconImageHref: './img/icons/map-marker.svg',
          iconImageSize: [48, 48],
          iconImageOffset: [-5, -38]
        }),

      myPlacemarkWithContent = new ymaps.Placemark([60.03597581, 30.35779498], {
        hintContent: 'Собственный значок метки с контентом',
        balloonContent: 'А эта — новогодняя',
        iconContent: '10'
      }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: './img/icons/map-marker.svg',
          iconImageSize: [48, 48],
          iconImageOffset: [-24, -24],
          iconContentOffset: [15, 15],
          iconContentLayout: MyIconContentLayout
        });
    myMap.behaviors.disable('scrollZoom');

    myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);

  });

  // скрипт для секции team
  var teamList = document.getElementById("teamList");
  const li = teamList.getElementsByClassName("team__list-item");

  for (var i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function (e) {
      e.preventDefault();
      let current = document.getElementsByClassName("team__list--active");
      current[0].className = current[0].className.replace(" team__list--active", "");
      this.className += " team__list--active";
    });
  }

  // скрипт для секции меню
  $('.accorderdeon-menu__elem').on("click", function (e) {
    e.preventDefault();
    $(".accorderdeon-menu__elem").removeClass("active");
    $(this).addClass('active');
  })

  //скрипт для popup
  $('.reviews .review__button-wrap .review__view').on("click", function (e) {
    e.preventDefault();
    $(".popup").addClass("active");
  });
  $('.popup__close').on("click", function (e) {
    e.preventDefault();
    $(".popup").removeClass("active");
  });

  //скрипт для гамбургер-меню
  $('.hamburger-menu-link').on("click", function (e) {
    e.preventDefault();
    $(".hamburger-menu").addClass("hamburger-menu_visible"), 300;
  });
  $('.hamburger-menu__close').on("click", function (e) {
    e.preventDefault();
    $("#hamburger-menu").removeClass("hamburger-menu_visible");
  });
  $('.nav__link').on("click", function (e) {
      // e.preventDefault();
      $("#hamburger-menu").removeClass("hamburger-menu_visible");
    });


        });
