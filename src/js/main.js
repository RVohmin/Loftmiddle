(() => {
    document.addEventListener("DOMContentLoaded", function() {
        //карты

        ymaps.ready(function() {
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
        // слайдер

        const left = document.querySelector("#left");
        const right = document.querySelector("#right");
        const items = document.querySelector("#items");

        right.addEventListener("click", function() {
            loop("right");
        });

        left.addEventListener("click", function() {
            loop("left");
        });

        function loop(direction) {
            if (direction === "right") {
                items.appendChild(items.firstElementChild);
            } else {
                items.insertBefore(items.lastElementChild, items.firstElementChild);
            }
        }


        // скрипт для секции team
        var teamList = document.getElementById("teamList");
        const li = teamList.getElementsByClassName("team__list-item");
        // $(".team__list-item").click(function (e) {
        // e.preventDefault();
        // $(".team__list-item").not(this).removeClass('team__list--active');
        // $(this).toggleClass('team__list--active');
        for (var i = 0; i < li.length; i++) {

            li[i].addEventListener("click", function(e) {
                e.preventDefault();
                let current = document.getElementsByClassName("team__list--active");
                current[0].className = current[0].className.replace(" team__list--active", "");
                this.className += " team__list--active";
            });
        }
        //аккордеон
        $(".accorderdeon-menu__elem").click(function(e) {
            e.preventDefault();
            $(".accorderdeon-menu__elem").not(this).removeClass('active');
            $(this).toggleClass('active');
        })


        //скрипт для гамбургер-меню
        $('.hamburger-menu-link').on("click", function(e) {
            e.preventDefault();
            $(".hamburger-menu").addClass("hamburger-menu_visible"), 300;
        });
        $('.hamburger-menu__close').on("click", function(e) {
            e.preventDefault();
            $("#hamburger-menu").removeClass("hamburger-menu_visible");
        });
        $('.nav__link').on("click", function(e) {
            // e.preventDefault();
            $("#hamburger-menu").removeClass("hamburger-menu_visible");
        });

        // скрипт для секции order (form)

        //валидация формы
        var myForm = document.querySelector("#form");
        var send = document.querySelector("#send");

        send.addEventListener('click', event => {
            event.preventDefault();

            if (validateForm(myForm)) {
                let data = new FormData(myForm);
                data.append('name', myForm.elements.name.value);
                data.append('phone', myForm.elements.phone.value);
                data.append("comment", myForm.elements.desc.value);
                data.append("to", "frodo@gmail.com");
                // проверка содержимого data
                //         for (var pair of data.entries()) {
                //     console.log(pair[0]+ ', ' + pair[1]);
                // }
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    if (xhr.response.status === 1) {
                        console.log('Получилось!!!');
                        console.log(xhr.response);
                        //popup-message
                        $(".status-popup").addClass("active");
                        fullpage_api.destroy('all');
                        $("body").css('overflow', 'hidden');

                        $('.status-popup__close').on("click", function(e) {
                            e.preventDefault();
                            $(".status-popup").removeClass("active");
                            $("body").css('overflow', 'visible');
                            $('#fullpage').fullpage({ menu: '#myMenu' });
                        });
                    } else {
                        console.log('Не получилось...');
                        console.log(xhr.response);
                        $(".status-popup-err").addClass("active");
                        fullpage_api.destroy('all');
                        $("body").css('overflow', 'hidden');
                        $('.status-popup__close').on("click", function(e) {
                            e.preventDefault();
                            $(".status-popup-err").removeClass("active");
                            $("body").css('overflow', 'visible');
                            $('#fullpage').fullpage({ menu: '#myMenu' });
                        });
                    }
                })
            }

            function validateForm(form) {
                let valide = true;
                if (!validateField(form.elements.name)) {
                    valide = false;
                }
                if (!validateField(form.elements.phone)) {
                    valide = false;
                }
                return valide;
            }

            function validateField(field) {
                field.nextElementSibling.textContent = field.validationMessage;
                if (document.getElementById('desc').value == '') {
                    form.elements.desc.nextElementSibling.textContent = 'Заполните это поле Please fill in this field.';
                    valide = false;
                } else {
                    form.elements.desc.nextElementSibling.textContent = '';
                }
                return field.checkValidity();
            }
        })

        $('#fullpage').fullpage({
            menu: '#myMenu'
        });

        //скрипт для popup
        $('.reviews .review__button-wrap .review__view').on("click", function(e) {
            e.preventDefault();
            fullpage_api.destroy('all');
            $("body").css('overflow', 'hidden');
            $(".popup").addClass("active");
        });
        $('.popup__close').on("click", function(e) {
            e.preventDefault();
            $(".popup").removeClass("active");
            $("body").css('overflow', 'visible');
            $('#fullpage').fullpage({
                menu: '#myMenu'
            });

        });
        // видео плеер
        // document.querySelector(".player__start").onclick = play;

        let video = document.querySelector("#video-pleer");


        $('.player__start, #video-pleer').on('click', e => {
            e.preventDefault();

            const formattedTime = timeSec => {
                const roundTime = Math.round(timeSec);
                const minutes = Math.floor(roundTime / 60);
                const seconds = roundTime - minutes * 60;
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

                return `${minutes}:${formattedSeconds}`;
            }


            let durationSec = video.duration;
            $('.player__duration-estimate').text(formattedTime(durationSec));

            const interval = setInterval(() => {
                let completedSec = video.currentTime;
                const comletedPercent = (completedSec / durationSec) * 100;
                $('.player__playback-button').css({
                    left: `${comletedPercent}%`
                })
                $('.player__duration-completed').text(formattedTime(completedSec));

            }, 1000);

            // const btn = $(e.currentTarget);
            const btn = $('.player__start');

            if (btn.hasClass('paused')) {
                video.pause();
                btn.removeClass('paused');
            } else {
                video.play();
                btn.addClass('paused');
            }

            $('.player__playback').on('click', e => {
                const bar = $(e.currentTarget);
                const newButtonPosition = e.pageX - bar.offset().left;
                const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
                const newPlayerTimeSec = (durationSec / 100) * buttonPosPercent;

                $(".player__playback-button").css({
                    left: `${buttonPosPercent}%`
                });
                video.currentTime = newPlayerTimeSec;
            })



            const volumeControl = document.getElementById('volume');
            const volumePic = $('.volume__icon');
            const volumeMute = $('.silent');
            volumeControl.addEventListener('input', function() {
                video.volume = volumeControl.value;
                if (video.volume == 0) {
                    volumePic.css({
                        display: 'none'
                    })
                    volumeMute.css({
                        display: 'block'
                    });
                } else {
                    volumePic.css({
                        display: 'block'
                    })
                    volumeMute.css({
                        display: 'none'
                    });
                }
            }, true);



        })


    })
})();
