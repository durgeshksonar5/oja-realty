(function($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    $window.on('load', function() {
        $(".preloader").fadeOut(600);
    });

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function() {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.active-sticky-header").css("height", $('header.active-sticky-header .header-sticky').outerHeight());
        }

        $window.on("scroll", function() {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header.active-sticky-header .header-sticky').outerHeight()
            $("header.active-sticky-header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header.active-sticky-header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Activities Slider JS */
    if ($('.activities-slider').length) {
        const activities_slider = new Swiper('.activities-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.activities-pagination',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
                1025: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider-metal').length) {
        const company_supports_slider_metal = new Swiper('.company-supports-slider-metal .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Our Departments Slider Metal JS */
    if ($('.our-departments-slider-metal').length) {
        const our_departments_slider_metal = new Swiper('.our-departments-slider-metal .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.our-departments-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
                1300: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Testimonial Slider Metal JS */
    if ($('.testimonial-slider-metal').length) {
        const testimonial_slider_metal = new Swiper('.testimonial-slider-metal .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-prime').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Company Support Slider Prime JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider_prime = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function() {
            $('.skillbar').each(function() {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            time: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Text Effect Animation */
    function initHeadingAnimation() {

        if ($('.text-effect').length) {
            var textheading = $(".text-effect");

            if (textheading.length === 0) return;
            gsap.registerPlugin(SplitText);
            textheading.each(function(index, el) {

                el.split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });

                if ($(el).hasClass('text-effect')) {
                    gsap.set(el.split.chars, {
                        opacity: .3,
                        x: "-7",
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        markers: false,
                        scrub: 1,
                    },

                    x: "0",
                    y: "0",
                    opacity: 1,
                    duration: .7,
                    stagger: 0.2,
                });

            });
        }

        if ($('.text-anime-style-1').length) {
            let staggerAmount = 0.05,
                translateXValue = 0,
                delayValue = 0.5,
                animatedTextElements = document.querySelectorAll('.text-anime-style-1');

            animatedTextElements.forEach((element) => {
                let animationSplitText = new SplitText(element, {
                    type: "chars, words"
                });
                gsap.from(animationSplitText.words, {
                    duration: 1,
                    delay: delayValue,
                    x: 20,
                    autoAlpha: 0,
                    stagger: staggerAmount,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%"
                    },
                });
            });
        }

        if ($('.text-anime-style-2').length) {
            let staggerAmount = 0.03,
                translateXValue = 20,
                delayValue = 0.1,
                easeType = "power2.out",
                animatedTextElements = document.querySelectorAll('.text-anime-style-2');

            animatedTextElements.forEach((element) => {
                let animationSplitText = new SplitText(element, {
                    type: "chars, words"
                });
                gsap.from(animationSplitText.chars, {
                    duration: 1,
                    delay: delayValue,
                    x: translateXValue,
                    autoAlpha: 0,
                    stagger: staggerAmount,
                    ease: easeType,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%"
                    },
                });
            });
        }

        if ($('.text-anime-style-3').length) {
            let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

            animatedTextElements.forEach((element) => {
                //Reset if needed
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, {
                    type: "lines,words,chars",
                    linesClass: "split-line",
                });
                gsap.set(element, {
                    perspective: 400
                });

                gsap.set(element.split.chars, {
                    opacity: 0,
                    x: "50",
                });

                element.animation = gsap.to(element.split.chars, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%"
                    },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    opacity: 1,
                    duration: 1,
                    ease: Back.easeOut,
                    stagger: 0.02,
                });
            });
        }
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeadingAnimation();
        });
    } else {
        window.addEventListener("load", initHeadingAnimation);
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 1024)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var $btn = $contactform.find('button[type="submit"]');
        var originalBtnHtml = $btn.html();
        $btn.prop("disabled", true).html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting...');

        var fname = ($("#fname").val() || "").trim();
        var lname = ($("#lname").val() || "").trim();
        var fullName = (fname + " " + lname).trim();
        var email = ($("#email").val() || "").trim();
        var phone = ($("#phone").val() || "").trim();
        var cleanPhone = phone.replace(/\D/g, "");
        if (cleanPhone.length === 12 && cleanPhone.indexOf("91") === 0) cleanPhone = cleanPhone.substring(2);
        if (cleanPhone.length === 11 && cleanPhone.indexOf("0") === 0) cleanPhone = cleanPhone.substring(1);
        var message = ($("#message").val() || "").trim();

        var payload = {
            name: fullName,
            fullName: fullName,
            fname: fname,
            lname: lname,
            email: email,
            phone: cleanPhone || phone,
            number: cleanPhone || phone,
            contact: cleanPhone || phone,
            mobile: cleanPhone || phone,
            msg: message,
            message: message,
            comments: message,
            subject: "Website Contact Form Enquiry",
            buttonType: "form",
            type: "form",
            source: "contact_page_form"
        };

        $.ajax({
            type: "POST",
            url: "https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/8ae35fb5-dca9-40e4-b207-d63a36d800de",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(payload),
            timeout: 12000,
            success: function(response) {
                $btn.prop("disabled", false).html(originalBtnHtml);
                formSuccess();
            },
            error: function(xhr, status, error) {
                $btn.prop("disabled", false).html(originalBtnHtml);
                var errMessage = "Unable to submit your enquiry right now. Please call us at +91 78755 11119.";
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errMessage = xhr.responseJSON.error;
                }
                submitMSG(false, errMessage);
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Thank you! Your enquiry has been received. Our team will contact you shortly.");
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */


    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Program Item List Start */
    var $why_we_stand_item_list_metal = $('.why-we-stand-item-list-metal');
    if ($why_we_stand_item_list_metal.length) {
        var $why_we_stand_item_metal = $why_we_stand_item_list_metal.find('.why-we-stand-item-metal');

        if ($why_we_stand_item_metal.length) {
            $why_we_stand_item_metal.on({
                mouseenter: function() {
                    if (!$(this).hasClass('active')) {
                        $why_we_stand_item_metal.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function() {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Program Item List End */

})(jQuery);