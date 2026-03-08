document.addEventListener('DOMContentLoaded', () => {

    // ── Helper: show error ──────────────────────────────────
    function showError(input, message) {
        clearError(input);
        input.style.borderColor = '#e53e3e';

        const error = document.createElement('p');
        error.classList.add('error-msg');
        error.textContent = message;
        error.style.color = '#e53e3e';
        error.style.fontSize = '0.78rem';
        error.style.marginTop = '5px';
        error.style.fontWeight = '600';
        input.closest('.form-group').appendChild(error);
    }

    // ── Helper: clear error ─────────────────────────────────
    function clearError(input) {
        input.style.borderColor = '';
        const existing = input.closest('.form-group').querySelector('.error-msg');
        if (existing) existing.remove();
    }

    // ── Helper: valid name ──────────────────────────────────
    function isValidName(value) {
        return /^[a-zA-Z\s]+$/.test(value.trim()) && value.trim().length >= 2;
    }

    // ── Helper: valid email ─────────────────────────────────
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    // ════════════════════════════════════════════════════════
    // REGISTRATION PAGE LOGIC
    // ════════════════════════════════════════════════════════
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        const firstname       = document.getElementById('firstname');
        const lastname        = document.getElementById('lastname');
        const regEmail        = document.getElementById('email');
        const password        = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');

        firstname.addEventListener('input', () => {
            if (!isValidName(firstname.value)) {
                showError(firstname, 'First name must contain letters only (min 2 characters).');
            } else {
                clearError(firstname);
                firstname.style.borderColor = '#D4A017';
            }
        });

        lastname.addEventListener('input', () => {
            if (!isValidName(lastname.value)) {
                showError(lastname, 'Last name must contain letters only (min 2 characters).');
            } else {
                clearError(lastname);
                lastname.style.borderColor = '#D4A017';
            }
        });

        regEmail.addEventListener('input', () => {
            if (!isValidEmail(regEmail.value)) {
                showError(regEmail, 'Please enter a valid email address.');
            } else {
                clearError(regEmail);
                regEmail.style.borderColor = '#D4A017';
            }
        });

        password.addEventListener('input', () => {
            if (password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters.');
            } else {
                clearError(password);
                password.style.borderColor = '#D4A017';
            }

            // Re-check confirm password whenever password changes
            if (confirmPassword.value !== '' && confirmPassword.value !== password.value) {
                showError(confirmPassword, 'Passwords do not match.');
            } else if (confirmPassword.value === password.value && confirmPassword.value !== '') {
                clearError(confirmPassword);
                confirmPassword.style.borderColor = '#D4A017';
            }
        });

        confirmPassword.addEventListener('input', () => {
            if (confirmPassword.value !== password.value) {
                showError(confirmPassword, 'Passwords do not match.');
            } else {
                clearError(confirmPassword);
                confirmPassword.style.borderColor = '#D4A017';
            }
        });

        registrationForm.addEventListener('submit', (e) => {
            let hasError = false;

            if (!isValidName(firstname.value)) {
                showError(firstname, 'First name must contain letters only (min 2 characters).');
                hasError = true;
            }
            if (!isValidName(lastname.value)) {
                showError(lastname, 'Last name must contain letters only (min 2 characters).');
                hasError = true;
            }
            if (!isValidEmail(regEmail.value)) {
                showError(regEmail, 'Please enter a valid email address.');
                hasError = true;
            }
            if (password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters.');
                hasError = true;
            }
            if (confirmPassword.value !== password.value) {
                showError(confirmPassword, 'Passwords do not match.');
                hasError = true;
            }

            if (hasError) e.preventDefault();
        });
    }

    // ════════════════════════════════════════════════════════
    // LOGIN PAGE LOGIC
    // ════════════════════════════════════════════════════════
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        const loginEmail    = document.getElementById('email');
        const loginPassword = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');

        // Show/hide password toggle
        togglePassword.addEventListener('click', () => {
            const isPassword = loginPassword.type === 'password';
            loginPassword.type = isPassword ? 'text' : 'password';
            togglePassword.textContent = isPassword ? '🙈' : '👁';
        });

        loginEmail.addEventListener('input', () => {
            if (!isValidEmail(loginEmail.value)) {
                showError(loginEmail, 'Please enter a valid email address.');
            } else {
                clearError(loginEmail);
                loginEmail.style.borderColor = '#D4A017';
            }
        });

        loginPassword.addEventListener('input', () => {
            if (loginPassword.value.length < 6) {
                showError(loginPassword, 'Password must be at least 6 characters.');
            } else {
                clearError(loginPassword);
                loginPassword.style.borderColor = '#D4A017';
            }
        });

        loginForm.addEventListener('submit', (e) => {
            let hasError = false;

            if (!isValidEmail(loginEmail.value)) {
                showError(loginEmail, 'Please enter a valid email address.');
                hasError = true;
            }
            if (loginPassword.value.length < 6) {
                showError(loginPassword, 'Password must be at least 6 characters.');
                hasError = true;
            }

            if (hasError) e.preventDefault();
        });
    }

});