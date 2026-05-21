$(document).ready(function(){
    // Throttle helper using requestAnimationFrame
    function rafThrottle(fn){
        var ticking = false;
        return function(){
            if(!ticking){
                window.requestAnimationFrame(function(){
                    fn();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    var $progressBar = $('#scrollProgress');

    function updateNavbarAndScrollBtn(){
        var scrollY = window.scrollY || window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

        if($progressBar.length){
            $progressBar.css('width', progress + '%');
        }

        if(scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    }

    var throttledUpdate = rafThrottle(updateNavbarAndScrollBtn);
    $(window).on('scroll resize', throttledUpdate);
    // Set correct state on initial load
    updateNavbarAndScrollBtn();

    // Re-apply navbar/scroll state when page is restored from back-forward cache (back button)
    window.addEventListener('pageshow', function(event){
        if(event.persisted){
            updateNavbarAndScrollBtn();
            // Ensure mobile menu isn't stuck open after returning
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
        }
    });

    // slide-up script (supports click and keyboard activation)
    function scrollToTop(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    }
    $('.scroll-up-btn').on('click', scrollToTop);
    $('.scroll-up-btn').on('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            scrollToTop();
        }
    });

    // toggle menu/navbar script (hamburger button only - not menu items)
    $('.navbar > .max-width > .menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $(this).find('i').toggleClass("active");
    });

    // Close mobile menu when clicking on a menu item
    $('.navbar .menu li a').click(function(){
        if ($(window).width() < 947) {
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
        }
    });

    // Close mobile menu on Escape key
    $(document).on('keydown', function(e){
        if(e.key === 'Escape' && $('.navbar .menu').hasClass('active')){
            $('.navbar .menu').removeClass('active');
            $('.menu-btn i').removeClass('active');
        }
    });

    // Reveal-on-scroll is handled by the inline bootstrap script in <head>
    // (kept there so sections stay visible even if jQuery / this file fails to load).

    // Highlight current section in navbar via IntersectionObserver
    var navLinks = document.querySelectorAll('.navbar .menu li a[href^="#"]');
    var sectionMap = {};
    navLinks.forEach(function(link){
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if(section){ sectionMap[id] = link; }
    });
    if('IntersectionObserver' in window && Object.keys(sectionMap).length){
        var sectionObserver = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                var link = sectionMap[entry.target.id];
                if(!link) return;
                if(entry.isIntersecting){
                    navLinks.forEach(function(l){ l.classList.remove('active'); });
                    link.classList.add('active');
                }
            });
        }, { threshold: 0.35, rootMargin: '-80px 0px -45% 0px' });
        Object.keys(sectionMap).forEach(function(id){
            var s = document.getElementById(id);
            if(s) sectionObserver.observe(s);
        });
    }

    // typing text animation script (only if Typed is loaded and targets exist)
    if (window.Typed) {
        if ($(".typing").length) {
            new Typed(".typing", {
                strings: ["Data Engineer", "Pipeline Engineer", "Migration Lead", "Cloud Data Engineer", "YouTuber", "Traveler"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }
        if ($(".typing-2").length) {
            new Typed(".typing-2", {
                strings: ["Data Engineer", "Pipeline Engineer", "Migration Lead", "Cloud Data Engineer", "YouTuber", "Traveler"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }
    }

    // Smooth scroll for in-page anchor links.
    // Guard against href="#" (invalid selector: $('#') throws in jQuery 3.x).
    $('a[href^="#"]').on('click', function(e) {
        var href = this.getAttribute('href');

        // Allow no-op anchors / placeholders to behave normally and avoid invalid selectors.
        if (!href || href === '#' || href === '#0') {
            return;
        }

        // Use getElementById instead of $(href) to avoid selector parsing edge cases.
        var targetEl = document.getElementById(href.slice(1));
        if (!targetEl) {
            return;
        }

        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(targetEl).offset().top - 80
        }, 800);
    });

    // Contact form submission handler
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var originalText = $btn.text();

        var name = $('.fullname').val().trim();
        var email = $('.email-input').val().trim();
        var subject = $('.subject').val().trim();
        var message = $('.message').val().trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return false;
        }

        // Simple email format check
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!emailOk){
            alert('Please enter a valid email address.');
            return false;
        }

        $btn.prop('disabled', true).text('Opening email...');

        var mailtoLink = 'mailto:mahamudu786@gmail.com?subject=' +
                        encodeURIComponent(subject) +
                        '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

        window.location.href = mailtoLink;

        setTimeout(function(){
            $btn.prop('disabled', false).text(originalText);
            $form[0].reset();
        }, 1200);

        return false;
    });
});