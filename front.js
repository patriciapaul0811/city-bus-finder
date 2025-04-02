// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        navbar.appendChild(mobileMenuBtn);
    }
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });
    
    // Resize event listener
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                navbar.appendChild(mobileMenuBtn);
            }
        } else {
            if (document.querySelector('.mobile-menu-btn')) {
                document.querySelector('.mobile-menu-btn').remove();
                document.querySelector('.nav-links').classList.remove('show');
            }
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('show');
            }
        });
    });
    
    // Animated entrance for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.classList.add('animate');
        heroImage.classList.add('animate');
    }, 300);
    
    // Add additional CSS for animations
    const styl = document.createElement('styl');
    style.innerHTML = `
        .hero-content, .hero-image {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
        
        .hero-content.animate, .hero-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-image.animate {
            transition-delay: 0.3s;
        }
        
        .nav-links.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            z-index: 100;
        }
        
        .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 24px;
            color: #1e50a2;
        }
    `;
    
    document.head.appendChild(styl);
});