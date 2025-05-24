// index.js
import { fetchWeather } from './weather.js';
import { displaySpotlights } from './spotlight.js';

// Toggle navigation for mobile
export function toggleNav() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('copyright-year').textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;

// Fetch members data for spotlight
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        const spotlight = document.querySelector('#spotlight-container');
        spotlight.innerHTML = '<p style="color: var(--red); text-align: center;">Failed to load spotlight members.</p>';
    }
}

// Event Listeners
document.querySelector('.menu-toggle').addEventListener('click', toggleNav);

// Fetch and display data
fetchMembers();
fetchWeather();