// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');
const searchTabs = document.querySelectorAll('.tab-btn');
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('.search-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close-modal');
const modalTabs = document.querySelectorAll('.modal-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const testimonialDots = document.querySelectorAll('.dot');
const viewDealsButtons = document.querySelectorAll('.destination-card .btn');
const bookNowButtons = document.querySelectorAll('.offer-card .btn');
const transportButtons = document.querySelectorAll('.transport-card .btn');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });
}

// Search Tabs
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        searchTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Update form elements or behavior based on selected tab
        const transportType = tab.getAttribute('data-tab');
        console.log(`Selected transport type: ${transportType}`);
        
        // You could update form fields, placeholders, etc. here
        // For example, change the "From" and "To" placeholders
        const fromInput = document.getElementById('from');
        const toInput = document.getElementById('to');
        
        if (transportType === 'flight') {
            fromInput.placeholder = 'Departure airport';
            toInput.placeholder = 'Arrival airport';
        } else if (transportType === 'bus') {
            fromInput.placeholder = 'Departure bus station';
            toInput.placeholder = 'Arrival bus station';
        } else if (transportType === 'train') {
            fromInput.placeholder = 'Departure train station';
            toInput.placeholder = 'Arrival train station';
        } else if (transportType === 'ferry') {
            fromInput.placeholder = 'Departure port';
            toInput.placeholder = 'Arrival port';
        }
    });
});

// Search Form Submission
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        const passengers = document.getElementById('passengers').value;
        const transportType = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        
        if (!from || !to) {
            alert('Please enter both departure and arrival locations.');
            return;
        }
        
        if (!date) {
            alert('Please select a travel date.');
            return;
        }
        
        // Construct search parameters
        const searchParams = new URLSearchParams({
            from,
            to,
            date,
            passengers,
            transportType
        });
        
        // Redirect to search results page
        console.log(`Searching for: ${searchParams.toString()}`);
        alert(`Search submitted for ${transportType} from ${from} to ${to} on ${date} for ${passengers} passenger(s).`);
        
        // In a real application, you would redirect to a search results page:
        // window.location.href = `/search-results.html?${searchParams.toString()}`;
    });
}

// Auth Modal
if (loginBtn && registerBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('register');
    });
}

function openAuthModal(tab) {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Set active tab
    modalTabs.forEach(t => {
        if (t.getAttribute('data-tab') === tab) {
            t.classList.add('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
        } else {
            t.classList.remove('active');
            document.getElementById(`${t.getAttribute('data-tab')}-tab`).classList.remove('active');
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Modal Tabs
modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        modalTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked tab and its content
        tab.classList.add('active');
        document.getElementById(`${tab.getAttribute('data-tab')}-tab`).classList.add('active');
    });
});

// Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }
        
        console.log(`Login attempt: ${username}`);
        alert(`Login successful for ${username}`);
        
        // Close modal
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // In a real application, you would send a request to your backend
        // and handle the response (success, errors, etc.)
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const termsChecked = document.getElementById('terms').checked;
        
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        if (!termsChecked) {
            alert('Please agree to the Terms & Conditions.');
            return;
        }
        
        console.log(`Registration attempt: ${username}, ${email}`);
        alert(`Registration successful for ${username}`);
        
        // Close modal
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // In a real application, you would send a request to your backend
        // and handle the response (success, errors, etc.)
    });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    
    // Show the selected testimonial
    if (testimonials[index]) {
        testimonials[index].style.display = 'block';
    }
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Initialize the first testimonial
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Click event for dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto advance testimonials every 5 seconds
setInterval(() => {
    if (testimonials.length > 0) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
}, 5000);

// View Deals Button Click Events
viewDealsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const destinationName = button.closest('.destination-card').querySelector('h3').textContent;
        alert(`Searching deals for ${destinationName}...`);
        // In a real application:
        // window.location.href = `/search-results.html?destination=${encodeURIComponent(destinationName)}`;
    });
});

// Book Now Button Click Events
bookNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        const offerTitle = button.closest('.offer-card').querySelector('h3').textContent;
        alert(`Proceeding to book: ${offerTitle}`);
        // In a real application:
        // window.location.href = `/booking.html?offer=${encodeURIComponent(offerTitle)}`;
    });
});

// Transport Button Click Events
transportButtons.forEach(button => {
    button.addEventListener('click', () => {
        const transportType = button.textContent.trim().replace('Book ', '');
        alert(`Proceeding to book ${transportType} tickets...`);
        // In a real application:
        // window.location.href = `/?type=${encodeURIComponent(transportType.toLowerCase())}`;
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input').value;
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        console.log(`Newsletter subscription: ${email}`);
        alert(`Thank you for subscribing to our newsletter with email: ${email}`);
        
        // Clear the input
        newsletterForm.querySelector('input').value = '';
        
        // In a real application, you would send a request to your backend
        // and handle the response (success, errors, etc.)
    });
}

// Animation when elements come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.destination-card, .transport-card, .offer-card, .step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('slide-up');
        }
    });
}

// Run animation check on page load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Set current date as min date for date picker
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    // Format month and day to have leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    const formattedDate = `${year}-${month}-${day}`;
    dateInput.setAttribute('min', formattedDate);
    
    // Set default date to tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const tomorrowYear = tomorrow.getFullYear();
    let tomorrowMonth = tomorrow.getMonth() + 1;
    let tomorrowDay = tomorrow.getDate();
    
    tomorrowMonth = tomorrowMonth < 10 ? `0${tomorrowMonth}` : tomorrowMonth;
    tomorrowDay = tomorrowDay < 10 ? `0${tomorrowDay}` : tomorrowDay;
    
    const formattedTomorrow = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
    dateInput.value = formattedTomorrow;
}

// Simulate loading state for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Run initial animations
    animateOnScroll();
});





