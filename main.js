$(document).ready(function ($) {
    "use strict";

    // ===== Shopping Cart Management =====
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartDisplay() {
        const cartNumber = document.querySelector('.cart-number');
        const cartItems = document.getElementById('cartItems');
        const totalAmount = document.querySelector('.total-amount');
        
        cartNumber.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            totalAmount.textContent = '₹0';
            return;
        }
        
        let total = 0;
        let html = '';
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            html += `
                <div class="cart-item">
                    <img src="${item.image || 'assets/images/dish/1.png'}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <i class="uil uil-trash cart-item-remove" onclick="removeFromCart(${index})"></i>
                </div>
            `;
        });
        
        cartItems.innerHTML = html;
        totalAmount.textContent = `₹${total}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    window.updateQuantity = function(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    };
    
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };
    
    // Add to cart functionality
    $(document).on('click', '[data-action="add-to-cart"]', function() {
        const dishBox = $(this).closest('.dish-box');
        const dishData = dishBox.data('dish');
        const dishName = dishBox.find('.h3-title').text();
        const priceText = dishBox.find('.dish-price').text();
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        
        const existingItem = cart.find(item => item.name === dishName);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: dishName,
                price: price,
                quantity: 1,
                image: dishBox.find('.dist-img img').attr('src')
            });
        }
        
        updateCartDisplay();
        
        // Show toast notification
        showToast(`${dishName} added to cart!`);
    });
    
    // Cart modal controls
    $('#cartBtn').click(function() {
        $('#cartModal').fadeIn(300);
        updateCartDisplay();
    });
    
    $('.cart-close').click(function() {
        $('#cartModal').fadeOut(300);
    });
    
    $(window).click(function(e) {
        if ($(e.target).is('#cartModal')) {
            $('#cartModal').fadeOut(300);
        }
    });
    
    // Checkout button
    $('#checkoutBtn').click(function() {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const message = `Hello! I would like to order:\n\n${cart.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}\n\nTotal: ₹${total}`;
        const whatsappUrl = `https://wa.me/918866998866?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // ===== Reservation System =====
    $('#reservationBtn').click(function() {
        $('#reservationModal').fadeIn(300);
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        $('#resDate').attr('min', today);
    });
    
    $('.reservation-close').click(function() {
        $('#reservationModal').fadeOut(300);
    });
    
    $(window).click(function(e) {
        if ($(e.target).is('#reservationModal')) {
            $('#reservationModal').fadeOut(300);
        }
    });
    
    $('#reservationForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#resName').val();
        const phone = $('#resPhone').val();
        const date = $('#resDate').val();
        const time = $('#resTime').val();
        const guests = $('#resGuests').val();
        const notes = $('#resNotes').val();
        
        const message = `Table Reservation Request:\n\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nSpecial Requests: ${notes || 'None'}`;
        const whatsappUrl = `https://wa.me/918866998866?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        $('#reservationModal').fadeOut(300);
        this.reset();
        showToast('Reservation request sent! We will confirm shortly.');
    });
    
    // ===== Menu Search =====
    $('#menuSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('.dish-box-wp').each(function() {
            const dishName = $(this).find('.h3-title').text().toLowerCase();
            if (dishName.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // ===== Language Toggle =====
    let currentLang = localStorage.getItem('language') || 'en';
    const translations = {
        en: {
            home: 'Home',
            about: 'About',
            menu: 'Menu',
            gallery: 'Gallery',
            blog: 'Blog',
            contact: 'Contact'
        },
        hi: {
            home: 'होम',
            about: 'हमारे बारे में',
            menu: 'मेनू',
            gallery: 'गैलरी',
            blog: 'ब्लॉग',
            contact: 'संपर्क'
        }
    };
    
    $('#languageToggle').click(function() {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        $('.lang-text').text(currentLang.toUpperCase());
        localStorage.setItem('language', currentLang);
        showToast(`Language switched to ${currentLang === 'en' ? 'English' : 'Hindi'}`);
    });
    
    // Toast notification function
    function showToast(message) {
        const toast = $(`<div class="toast-notification">${message}</div>`);
        $('body').append(toast);
        
        setTimeout(() => {
            toast.addClass('show');
        }, 10);
        
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Add toast styles
    if (!$('#toast-styles').length) {
        $('head').append(`
            <style id="toast-styles">
                .toast-notification {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%) translateY(100px);
                    background: var(--primary-color);
                    color: white;
                    padding: 15px 30px;
                    border-radius: 50px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                    z-index: 99999;
                    font-weight: 500;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                .toast-notification.show {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            </style>
        `);
    }
    
    // Initialize cart on page load
    updateCartDisplay();
    
    // ===== Dietary Filters =====
    $('.dietary-btn').click(function() {
        $('.dietary-btn').removeClass('active');
        $(this).addClass('active');
        
        const diet = $(this).data('diet');
        
        $('.dish-box-wp').each(function() {
            if (diet === 'all') {
                $(this).show();
            } else {
                const dishBox = $(this).find('.dish-box');
                const vegTag = dishBox.find('.veg-tag').length > 0;
                
                if (diet === 'veg' && vegTag) {
                    $(this).show();
                } else if (diet === 'non-veg' && !vegTag) {
                    $(this).show();
                } else if (diet === 'vegan' && vegTag) {
                    // Show vegan dishes (for now, same as veg - can be refined)
                    $(this).show();
                } else if (diet === 'jain' && vegTag) {
                    // Show jain dishes (for now, same as veg - can be refined)
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }
        });
    });

    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

// Menu Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuModal = document.getElementById("menuModal");
    const menuBtn = document.getElementById("menuBtn");
    const menuSpan = document.getElementsByClassName("menu-close")[0];
    const menuImg = document.getElementById("menuImg");
    const loadingText = document.querySelector('.menu-loading');
    let isModalOpen = false;

    function openModal() {
        if (!isModalOpen) {
            menuModal.style.display = "block";
            document.body.classList.add('modal-open');
            
            // Force reflow
            menuModal.offsetHeight;
            
            // Show loading state
            if (loadingText) loadingText.style.display = 'flex';
            if (menuImg) menuImg.style.opacity = '0';
            
            // Fade in animation
            gsap.to(menuModal, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Scale up animation for content
            gsap.fromTo(".menu-modal-content", 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
            
            isModalOpen = true;

            // Handle image loading
            if (menuImg) {
                if (menuImg.complete) {
                    handleImageLoad();
                } else {
                    menuImg.addEventListener('load', handleImageLoad);
                    menuImg.addEventListener('error', handleImageError);
                }
            }
        }
    }

    function handleImageLoad() {
        if (loadingText) loadingText.style.display = 'none';
        gsap.to(menuImg, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    function handleImageError() {
        if (loadingText) {
            loadingText.textContent = 'Error loading menu image';
            loadingText.style.color = '#ff0000';
        }
    }

    function closeModal() {
        if (isModalOpen) {
            // Fade out animation
            gsap.to(menuModal, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    menuModal.style.display = "none";
                    document.body.classList.remove('modal-open');
                    if (menuImg) menuImg.style.opacity = '0';
                    if (loadingText) loadingText.style.display = 'flex';
                }
            });

            // Scale down animation for content
            gsap.to(".menu-modal-content", {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            isModalOpen = false;
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', openModal);
    if (menuSpan) menuSpan.addEventListener('click', closeModal);

    // Close modal when clicking outside
    menuModal.addEventListener('click', function(event) {
        if (event.target === menuModal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && isModalOpen) {
            closeModal();
        }
    });

    // Prevent scrolling on mobile when touching modal
    menuModal.addEventListener('touchmove', function(event) {
        if (event.target === menuModal) {
            event.preventDefault();
        }
    }, { passive: false });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update icon based on theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('uil-sun');
            themeIcon.classList.add('uil-moon');
        } else {
            themeIcon.classList.remove('uil-moon');
            themeIcon.classList.add('uil-sun');
        }
    }

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('body-fixed');
            // Trigger initial animations
            animateOnScroll();
        }, 500);
    });

    // Enhanced scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-up, .fade-in, .scale-up, .slide-in-left, .slide-in-right');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            animateOnScroll();
        });
    });

    // Initial check for elements in view
    animateOnScroll();
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    const menuLinks = document.querySelectorAll('.food-nav-menu a');

    // Toggle menu
    menuToggle?.addEventListener('click', function() {
        headerMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking menu items
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            headerMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
            headerMenu?.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle menu modal
    const menuModal = document.getElementById('menuModal');
    const menuImg = document.getElementById('menuImg');
    const menuClose = document.querySelector('.menu-close');
    const menuLoading = document.querySelector('.menu-loading');

    function openModal() {
        menuModal.style.display = 'block';
        document.body.classList.add('modal-open');
        setTimeout(() => menuModal.style.opacity = '1', 10);
    }

    function closeModal() {
        menuModal.style.opacity = '0';
        setTimeout(() => {
            menuModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
    }

    // Image loading handling
    if (menuImg) {
        menuImg.onload = function() {
            menuLoading.style.display = 'none';
            menuImg.style.opacity = '1';
        };

        menuImg.onerror = function() {
            menuLoading.textContent = 'Error loading menu image';
        };
    }

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close modal when clicking outside
    menuModal?.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            closeModal();
        }
    });

    menuClose?.addEventListener('click', closeModal);

    // Prevent scrolling when modal is open
    function preventDefault(e) {
        e.preventDefault();
    }

    function disableScroll() {
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
    }

    function enableScroll() {
        document.body.removeEventListener('touchmove', preventDefault);
    }

    // Update modal state
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (document.body.classList.contains('modal-open')) {
                    disableScroll();
                } else {
                    enableScroll();
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true
    });

    // Handle swiper slider for better mobile experience
    const swiperTeam = new Swiper('.team-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
});