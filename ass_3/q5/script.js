// Registration validation for Q5
(function() {
    const form = document.getElementById('reg-form');
    const result = document.getElementById('result');

    const fields = {
        fname: document.getElementById('fname'),
        lname: document.getElementById('lname'),
        password: document.getElementById('password'),
        email: document.getElementById('email'),
        mobile: document.getElementById('mobile'),
        address: document.getElementById('address')
    };

    const errors = {
        fname: document.getElementById('err-fname'),
        lname: document.getElementById('err-lname'),
        password: document.getElementById('err-password'),
        email: document.getElementById('err-email'),
        mobile: document.getElementById('err-mobile'),
        address: document.getElementById('err-address')
    };

    // Validation rules
    function validateFirstName() {
        const v = fields.fname.value.trim();
        if (v.length === 0) { setError('fname', 'First Name is required'); return false }
        if (!/^[A-Za-z]+$/.test(v)) { setError('fname', 'Only alphabets allowed'); return false }
        if (v.length < 6) { setError('fname', 'Minimum 6 characters required'); return false }
        clearError('fname');
        return true
    }

    function validateLastName() {
        const v = fields.lname.value.trim();
        if (v.length === 0) { setError('lname', 'Last Name should not be empty'); return false }
        clearError('lname');
        return true
    }

    function validatePassword() {
        const v = fields.password.value;
        if (v.length < 6) { setError('password', 'Password must be at least 6 characters'); return false }
        clearError('password');
        return true
    }

    function validateEmail() {
        const v = fields.email.value.trim();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(v)) { setError('email', 'Enter a valid email (name@domain.com)'); return false }
        clearError('email');
        return true
    }

    function validateMobile() {
        const v = fields.mobile.value.trim();
        if (!/^\d{10}$/.test(v)) { setError('mobile', 'Mobile must be exactly 10 digits'); return false }
        clearError('mobile');
        return true
    }

    function validateAddress() {
        const v = fields.address.value.trim();
        if (v.length === 0) { setError('address', 'Address must not be empty'); return false }
        clearError('address');
        return true
    }

    // Helper to set/clear error
    function setError(name, message) {
        const input = fields[name];
        const err = errors[name];
        err.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(name) {
        const input = fields[name];
        const err = errors[name];
        err.textContent = '';
        input.removeAttribute('aria-invalid');
    }

    // Wire up realtime validation
    fields.fname.addEventListener('input', validateFirstName);
    fields.lname.addEventListener('input', validateLastName);
    fields.password.addEventListener('input', validatePassword);
    fields.email.addEventListener('input', validateEmail);
    fields.mobile.addEventListener('input', validateMobile);
    fields.address.addEventListener('input', validateAddress);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        result.textContent = '';

        const validators = [validateFirstName, validateLastName, validatePassword, validateEmail, validateMobile, validateAddress];
        const valid = validators.map(fn => fn()).every(Boolean);

        if (!valid) {
            result.innerHTML = '<span class="error">Please fix the errors above and try again.</span>';
            // Focus first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // All good — demo success
        result.innerHTML = '<span class="success">Registration successful! (demo)</span>';
        form.reset();
    });
})();