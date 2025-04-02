// login.js
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Check if there's a success parameter in the URL (after successful registration)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'success') {
        showSuccessMessage('Account created successfully! Please log in.');
    }
    
    // Check for stored credentials if remember me was selected previously
    checkStoredCredentials();
    
    // Add active state to login button (since we're on the login page)
    loginBtn.classList.add('active');
    
    // Add event listener for form submission
    const form = loginForm.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Validate the form
            if (validateForm()) {
                // If remember me is checked, store credentials
                if (rememberMeCheckbox.checked) {
                    storeCredentials();
                } else {
                    // Clear any stored credentials
                    localStorage.removeItem('busTracker_email');
                    localStorage.removeItem('busTracker_rememberMe');
                }
                
                // Submit the form
                simulateLogin();
            }
        });
    }
    
    // Functions
    function validateForm() {
        let isValid = true;
        
        // Clear previous error messages
        clearErrors();
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        formGroup.appendChild(errorElement);
        inputElement.classList.add('input-error');
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(element => element.remove());
        
        const inputElements = document.querySelectorAll('.input-error');
        inputElements.forEach(element => element.classList.remove('input-error'));
    }
    
    function showSuccessMessage(message) {
        // Remove any existing success message
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new success message
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        // Insert at the top of the form
        loginForm.insertBefore(successElement, loginForm.firstChild);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            successElement.style.opacity = '0';
            setTimeout(() => {
                successElement.remove();
            }, 300);
        }, 5000);
    }
    
    function storeCredentials() {
        localStorage.setItem('busTracker_email', emailInput.value.trim());
        localStorage.setItem('busTracker_rememberMe', 'true');
    }
    
    function checkStoredCredentials() {
        const storedEmail = localStorage.getItem('busTracker_email');
        const remembered = localStorage.getItem('busTracker_rememberMe');
        
        if (storedEmail && remembered) {
            emailInput.value = storedEmail;
            rememberMeCheckbox.checked = true;
        }
    }
    
    function simulateLogin() {
        // For demonstration - in production, this would submit the form to the server
        const submitButton = document.querySelector('.primary-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;
        
        // Simulate server communication delay
        setTimeout(() => {
            // For demo purposes, we'll just redirect to a dashboard page
            // In production, this would be handled by your server-side code
            window.location.href = 'dashboard.html';
            
            // In case the redirect fails, reset the button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
        
        // In production, the form would be submitted like this:
        // form.submit();
    }
});