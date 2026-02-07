$(document).ready(function(){
    function updateNavbarAndScrollBtn(){
        var scrollY = window.scrollY || window.pageYOffset;
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

    $(window).scroll(updateNavbarAndScrollBtn);
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

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
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

    // typing text animation script (only if Typed is loaded and targets exist)
    if (window.Typed) {
        if ($(".typing").length) {
            new Typed(".typing", {
                strings: ["YouTuber", "Data Engineer", "Traveler", "Blogger", "Finance Learner", "Math Enthusiast"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }
        if ($(".typing-2").length) {
            new Typed(".typing-2", {
                strings: ["YouTuber", "Data Engineer", "Traveler", "Blogger", "Finance Learner", "Math Enthusiast"],
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
        
        var name = $('.fullname').val().trim();
        var email = $('.email-input').val().trim();
        var subject = $('.subject').val().trim();
        var message = $('.message').val().trim();
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return false;
        }
        
        // Create mailto link as fallback (since no backend)
        var mailtoLink = 'mailto:mahamudu786@gmail.com?subject=' + 
                        encodeURIComponent(subject) + 
                        '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
        
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        alert('Opening your email client to send the message...');
        
        // Reset form
        this.reset();
        
        return false;
    });
});