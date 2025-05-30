// Toggle navigation for mobile
function toggleNav() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById("copyright-year").textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById("last-modified").textContent = lastModified;


// Set the submission timestamp
document.getElementById('submission-timestamp').value = new Date().toISOString();

// Update last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
});

// Form submission simulation
const form = document.getElementById('join-form');
const thankYouMessage = document.getElementById('thank-you-message');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    } else {
        form.reportValidity();
    }
});
