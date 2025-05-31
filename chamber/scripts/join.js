// Set the submission timestamp if the field exists
const submissionTimestamp = document.getElementById('submission-timestamp');
if (submissionTimestamp) {
    submissionTimestamp.value = new Date().toISOString();
}

// Set the last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.setAttribute('aria-expanded', 'false'); // Initial state
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
});

// Modal functionality - Toggle all modals on help-text click
const modalLink = document.querySelector('.membership-info-link');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalLink.addEventListener('click', (e) => {
    e.preventDefault();
    modals.forEach(modal => {
        modal.classList.toggle('active');
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('active'));
    });
});

// Form submission with validation and data passing
const form = document.getElementById('join-form');
const errorMessage = document.getElementById('error-message');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        if (form.checkValidity()) {
            // Form is valid, pass data via URL parameters
            errorMessage.style.display = 'none';
            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();
            window.location.href = `thankyou.html?${params}`;
        } else {
            // Form is invalid, show error
            errorMessage.textContent = 'Please fill out all required fields correctly.';
            errorMessage.style.display = 'block';
            form.reportValidity();
        }
    });
}

// Display submitted data on thank-you page
if (window.location.pathname.includes('thankyou.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('display-first-name').textContent = urlParams.get('first-name') || 'N/A';
    document.getElementById('display-last-name').textContent = urlParams.get('last-name') || 'N/A';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('display-phone').textContent = urlParams.get('phone') || 'N/A';
    document.getElementById('display-business-name').textContent = urlParams.get('business-name') || 'N/A';
    document.getElementById('display-timestamp').textContent = urlParams.get('submission-timestamp') || 'N/A';
}