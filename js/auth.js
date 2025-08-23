// Authentication Functions

// Handle Login Form
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Mock successful login
        const user = {
            id: '1',
            name: 'User',
            email: email
        };
        
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('ktg_user', JSON.stringify(user));
        
        closeModal('loginModal');
        updateUIForLoggedInUser();
        showNotification('Login successful!', 'success');
        
        // Reset form
        document.getElementById('loginForm').reset();
    }, 1000);
}

// Handle Signup Form
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Store signup data temporarily
        localStorage.setItem('ktg_signup_data', JSON.stringify({
            name, email, phone, password
        }));
        
        closeModal('signupModal');
        showOTP();
        showNotification('OTP sent to your phone number', 'success');
        
        // Reset form
        document.getElementById('signupForm').reset();
    }, 1000);
}

// Handle OTP Verification
function handleOTP(event) {
    event.preventDefault();
    
    const otpInputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        showNotification('Please enter the complete OTP', 'error');
        return;
    }
    
    // Simulate OTP verification
    setTimeout(() => {
        if (otp === '123456') {
            // Get signup data
            const signupData = JSON.parse(localStorage.getItem('ktg_signup_data') || '{}');
            
            const user = {
                id: '1',
                name: signupData.name || 'New User',
                email: signupData.email || 'user@example.com',
                phone: signupData.phone
            };
            
            currentUser = user;
            isLoggedIn = true;
            localStorage.setItem('ktg_user', JSON.stringify(user));
            localStorage.removeItem('ktg_signup_data');
            
            closeModal('otpModal');
            updateUIForLoggedInUser();
            showNotification('Account verified successfully!', 'success');
            
            // Reset OTP inputs
            otpInputs.forEach(input => input.value = '');
        } else {
            showNotification('Invalid OTP. Please try again.', 'error');
        }
    }, 1000);
}

// OTP Input Navigation
function moveToNext(current, index) {
    const value = current.value;
    
    if (value.length === 1 && index < 5) {
        const nextInput = document.querySelectorAll('.otp-input')[index + 1];
        if (nextInput) {
            nextInput.focus();
        }
    }
    
    // Auto-submit when all fields are filled
    const otpInputs = document.querySelectorAll('.otp-input');
    const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
    
    if (allFilled) {
        setTimeout(() => {
            document.getElementById('otpForm').dispatchEvent(new Event('submit'));
        }, 500);
    }
}

// Handle backspace in OTP inputs
document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                const prevInput = otpInputs[index - 1];
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
        
        // Only allow numbers
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (!/^\d*$/.test(value)) {
                e.target.value = value.replace(/\D/g, '');
            }
        });
    });
});

// Resend OTP
function resendOTP() {
    showNotification('OTP resent successfully', 'success');
    
    // Clear current OTP inputs
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => input.value = '');
    
    // Focus first input
    if (otpInputs.length > 0) {
        otpInputs[0].focus();
    }
}

// Social Login Functions (for future implementation)
function loginWithGoogle() {
    showNotification('Google login coming soon!', 'info');
}

function loginWithFacebook() {
    showNotification('Facebook login coming soon!', 'info');
}

// Password visibility toggle
function togglePasswordVisibility(inputId, buttonElement) {
    const input = document.getElementById(inputId);
    const icon = buttonElement.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', () => {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#ef4444';
                showNotification('Please enter a valid email address', 'error');
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
    });
    
    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validatePhone(input.value)) {
                input.style.borderColor = '#ef4444';
                showNotification('Please enter a valid 10-digit phone number', 'error');
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
    });
    
    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id === 'signupPassword') {
            input.addEventListener('input', () => {
                const strength = getPasswordStrength(input.value);
                updatePasswordStrengthIndicator(input, strength);
            });
        }
    });
});

function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrengthIndicator(input, strength) {
    let color = '#ef4444';
    let text = 'Weak';
    
    if (strength >= 4) {
        color = '#10b981';
        text = 'Strong';
    } else if (strength >= 2) {
        color = '#f59e0b';
        text = 'Medium';
    }
    
    // You can add a visual indicator here if needed
    input.style.borderColor = color;
}