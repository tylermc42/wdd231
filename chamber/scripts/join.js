// Set the submission timestamp
document.getElementById('submission-timestamp').value = new Date().toISOString();

// Update last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.setAttribute('aria-expanded', 'false'); // Initial state
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
});

// Form submission simulation with custom error message
const form = document.getElementById('join-form');
const formFields = document.getElementById('form-fields');
const thankYouMessage = document.getElementById('thank-you-message');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        formFields.style.display = 'none';
        thankYouMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = 'Please fill out all required fields correctly.';
        errorMessage.style.display = 'block';
        form.reportValidity();
    }
});