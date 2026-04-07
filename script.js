/* ============================================
   LESS FORTUNATE CHARITY - JAVASCRIPT
   ============================================ */

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.faq-toggle');
        
        // Close other open items
        document.querySelectorAll('.faq-answer.active').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
                item.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
            }
        });
        
        // Toggle current item
        answer.classList.toggle('active');
        toggle.textContent = answer.classList.contains('active') ? '−' : '+';
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const message = `Thank you for reaching out! Your message "${formData.get('subject')}" has been received. We'll get back to you soon.`;
        showAlert(message, 'success');
        this.reset();
    });
}

// Donation Form Handling
const donationForm = document.getElementById('donationForm');
if (donationForm) {
    donationForm.addEventListener('change', function() {
        const customAmount = document.getElementById('customAmount');
        const selectedOption = document.querySelector('input[name="amount"]:checked');
        if (selectedOption) {
            customAmount.value = '';
        }
    });

    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let amount = document.querySelector('input[name="amount"]:checked').value;
        const customAmount = document.getElementById('customAmount').value;
        
        if (customAmount) {
            amount = customAmount;
        }
        
        const type = document.querySelector('input[name="type"]:checked').value;
        const message = `Thank you for your generous ${type === 'monthly' ? 'monthly ' : ''}donation of $${amount}! You will be redirected to a secure payment page.`;
        showAlert(message, 'success');
    });
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showAlert(`Thank you for subscribing! Check ${email} for confirmation.`, 'success');
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe various elements for animation
document.querySelectorAll('.stat-card, .service-item, .mission-card, .donation-card, .blog-card, .program-card, .team-member, .timeline-item, .value-card, .help-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Handle donation buttons
document.querySelectorAll('.btn-donate-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const amount = this.closest('.donation-card').querySelector('.amount').textContent;
        const customAmount = document.getElementById('customAmount')?.value;
        const finalAmount = customAmount || amount;
        showAlert(`Processing donation of ${finalAmount}...`, 'info');
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Alert Function
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#06A77D' : type === 'error' ? '#D62828' : '#2E86AB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});
