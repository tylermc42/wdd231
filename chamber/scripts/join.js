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

// Form submission with validation
const form = document.getElementById('join-form');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    if (form.checkValidity()) {
        // Form is valid, redirect to thank-you.html
        errorMessage.style.display = 'none';
        window.location.href = 'thankyou.html';
    } else {
        // Form is invalid, show error
        errorMessage.textContent = 'Please fill out all required fields correctly.';
        errorMessage.style.display = 'block';
        form.reportValidity();
    }
});