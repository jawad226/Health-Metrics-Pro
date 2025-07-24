// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Tab functionality for calculator
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // BMI Calculator
    const bmiForm = document.getElementById('bmi-tab');
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiNumber = document.getElementById('bmi-number');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiInfo = document.getElementById('bmi-info');
    
    calculateBmiBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            showError('Please enter valid height and weight values.');
            return;
        }
        
        // Calculate BMI (weight in kg / (height in m)^2)
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBmi = Math.round(bmi * 10) / 10;
        
        // Display BMI value
        bmiNumber.textContent = roundedBmi;
        
        // Determine BMI category and set appropriate styling
        let category, categoryClass, recommendation;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'underweight';
            recommendation = 'You may need to gain weight. Consider consulting a nutritionist for a balanced diet plan.';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            categoryClass = 'normal';
            recommendation = 'Your weight is in the healthy range. Maintain your current lifestyle with balanced diet and regular exercise.';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            categoryClass = 'overweight';
            recommendation = 'Consider adopting healthier eating habits and increasing physical activity to reach a healthier weight.';
        } else {
            category = 'Obese';
            categoryClass = 'obese';
            recommendation = 'It is recommended to consult with a healthcare provider for guidance on weight management and lifestyle changes.';
        }
        
        // Update category display
        bmiCategory.textContent = category;
        bmiCategory.className = 'bmi-category';
        bmiCategory.classList.add(categoryClass);
        
        // Update info text
        bmiInfo.innerHTML = `
            <p><strong>${category}</strong></p>
            <p>${recommendation}</p>
            <p class="small-text">BMI between 18.5 and 24.9 is considered healthy for most adults.</p>
        `;
        
        // Animate the result
        animateResult(bmiNumber);
    });
    
    // Ideal Weight Calculator
    const idealWeightForm = document.getElementById('ideal-weight-tab');
    const calculateIdealWeightBtn = document.getElementById('calculate-ideal-weight');
    const idealWeightNumber = document.getElementById('ideal-weight-number');
    const idealWeightRange = document.getElementById('ideal-weight-range');
    const idealWeightInfo = document.getElementById('ideal-weight-info');
    
    calculateIdealWeightBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const gender = document.getElementById('ideal-gender').value;
        const height = parseFloat(document.getElementById('ideal-height').value);
        const frameSize = document.getElementById('frame-size').value;
        
        if (isNaN(height) || height <= 0) {
            showError('Please enter a valid height value.');
            return;
        }
        
        // Calculate ideal weight using Devine formula (modified for metric)
        let idealWeight;
        if (gender === 'male') {
            idealWeight = 50 + 0.9 * (height - 152);
        } else {
            idealWeight = 45.5 + 0.9 * (height - 152);
        }
        
        // Adjust for frame size
        let adjustment = 0;
        if (frameSize === 'small') {
            adjustment = -0.1 * idealWeight;
        } else if (frameSize === 'large') {
            adjustment = 0.1 * idealWeight;
        }
        
        idealWeight += adjustment;
        const roundedWeight = Math.round(idealWeight * 10) / 10;
        
        // Calculate weight range (±10% of ideal weight)
        const lowerRange = Math.round(idealWeight * 0.9 * 10) / 10;
        const upperRange = Math.round(idealWeight * 1.1 * 10) / 10;
        
        // Display results
        idealWeightNumber.textContent = roundedWeight;
        idealWeightRange.textContent = `${lowerRange} - ${upperRange} kg`;
        
        idealWeightInfo.innerHTML = `
            <p>Your ideal weight range is based on your height, gender, and body frame size.</p>
            <p>Maintaining a weight within this range can help reduce health risks associated with being underweight or overweight.</p>
        `;
        
        // Animate the result
        animateResult(idealWeightNumber);
    });
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showError('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            showSuccess('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                showError('Please enter your email address.');
                return;
            }
            
            // In a real application, you would send the email to a server here
            showSuccess('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-slideInUp');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Helper functions
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #dc3545;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: fadeIn 0.3s ease forwards;
        `;
        
        document.body.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => errorElement.remove(), 300);
        }, 5000);
    }
    
    function showSuccess(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: fadeIn 0.3s ease forwards;
        `;
        
        document.body.appendChild(successElement);
        
        setTimeout(() => {
            successElement.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => successElement.remove(), 300);
        }, 5000);
    }
    
    function animateResult(element) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff7e5f';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#4a6fa5';
        }, 300);
    }
    
    // Add fadeIn animation to hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fadeIn');
    }
});