// signup.js
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        // Form validation
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const phone = document.getElementById('phone').value.trim();
            const termsAgree = document.getElementById('termsAgree').checked;
            
            // Reset previous error messages
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(el => el.remove());
            
            let isValid = true;
            
            // Validate full name
            if (fullName === '') {
                displayError('fullName', 'Full name is required');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                displayError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                displayError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (password === '') {
                displayError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                displayError('password', 'Password must be at least 8 characters long');
                isValid = false;
            } else if (!isValidPassword(password)) {
                displayError('password', 'Password must contain both letters and numbers');
                isValid = false;
            }
            
            // Validate confirm password
            if (confirmPassword === '') {
                displayError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                displayError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            // Validate phone if provided
            if (phone !== '' && !isValidPhone(phone)) {
                displayError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate terms agreement
            if (!termsAgree) {
                displayError('termsAgree', 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // For demonstration, let's log the data
                console.log('Form submitted with:', {
                    fullName,
                    email,
                    password,
                    phone,
                    termsAgree
                });
                
                // In a real application, you would make an AJAX request to your server
                submitFormData({
                    fullName,
                    email,
                    password,
                    phone,
                    termsAgree
                });
            }
        });
    }
    
    // Helper functions
    function displayError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        
        // For checkbox, add error after its label
        if (inputId === 'termsAgree') {
            const checkboxGroup = inputElement.closest('.checkbox-group');
            checkboxGroup.appendChild(errorElement);
        } else {
            // For other inputs, add error right after the input
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPassword(password) {
        // Password must contain at least one letter and one number
        return /[A-Za-z]/.test(password) && /\d/.test(password);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation - adjust based on your requirements
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        return phoneRegex.test(phone);
    }
    
    function submitFormData(formData) {
        // Show loading indicator
        const submitButton = document.querySelector('.primary-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Creating Account...';
        submitButton.disabled = true;
        
        // Simulate an AJAX request
        setTimeout(function() {
            // In a real application, you would use fetch or XMLHttpRequest
            
            // Simulate successful registration
            // Redirect to success page or show success message
            alert('Account created successfully! You can now log in.');
            window.location.href = 'login.html';
            
            // Reset button state (in case redirect fails)
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Reset form
            signupForm.reset();
        }, 1500);
    }
});