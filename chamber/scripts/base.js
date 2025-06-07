// Shared Functions (Used across multiple HTML files)
function setFooterDates() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    const copyrightYear = document.getElementById('copyright-year');
    const lastModifiedEl = document.getElementById('last-modified');
    if (copyrightYear) copyrightYear.textContent = currentYear;
    if (lastModifiedEl) lastModifiedEl.textContent = lastModified;
}

function toggleNav() {
    const nav = document.querySelector('nav') || document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (nav && menuToggle) {
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    }
}

// Functions for directory.html
function toggleView(view) {
    const cards = document.getElementById('cards');
    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');
    if (!cards || !gridButton || !listButton) return;

    if (view === 'grid') {
        cards.classList.remove('list-view');
        cards.classList.add('grid-view');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    } else {
        cards.classList.remove('grid-view');
        cards.classList.add('list-view');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    }
}

function displayMembers(members) {
    const cards = document.querySelector('#cards');
    if (!cards) return;

    cards.innerHTML = '';
    members.forEach((member) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h3');
        let portrait = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');
        let membership = document.createElement('p');
        let additionalInfo = document.createElement('p');

        fullName.textContent = member.name;

        portrait.setAttribute('src', `images/${member.image}`);
        portrait.setAttribute('alt', `${member.name} logo`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        website.innerHTML = `Website: <a href="${member.website}" target="_blank">${member.website}</a>`;
        membership.textContent = `Membership Level: ${member.membership_level === 1 ? 'Member' : member.membership_level === 2 ? 'Silver' : 'Gold'}`;
        membership.classList.add('membership-level');
        if (member.additional_info) {
            additionalInfo.textContent = member.additional_info;
        }

        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        if (member.additional_info) {
            card.appendChild(additionalInfo);
        }
        cards.appendChild(card);
    });

    toggleView('grid');
}

// Functions for index.html
function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    if (!container) return;

    container.innerHTML = '';
    const eligibleMembers = members.filter(member => member.membership_level >= 2);
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="200">
            <h4>${member.name}</h4>
            <p>${member.additional_info || 'Proud member of the Arizona Chamber of Commerce.'}</p>
        `;
        container.appendChild(card);
    });
}

const API_KEY = 'e400122962027ef9801e1575a44dc9f5';
const CITY = 'Phoenix,AZ,US';
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=imperial&appid=${API_KEY}`;

async function fetchWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_WEATHER_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        const weather = document.querySelector('#weather');
        if (weather) {
            weather.innerHTML = '<p style="color: var(--red); text-align: center;">Failed to load weather data.</p>';
        }
    }
}

function displayCurrentWeather(data) {
    const temp = document.querySelector('#current-temp');
    const icon = document.querySelector('#current-icon');
    const description = document.querySelector('#current-description');
    if (!temp || !icon || !description) return;

    temp.textContent = Math.round(data.main.temp);
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    description.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
}

function displayForecast(data) {
    const container = document.querySelector('#forecast-container');
    if (!container) return;

    container.innerHTML = '';
    const dailyForecasts = [];
    const datesAdded = new Set();

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const hour = new Date(forecast.dt * 1000).getHours();

        if (!datesAdded.has(date) && hour >= 12 && hour <= 15) {
            dailyForecasts.push(forecast);
            datesAdded.add(date);
        }
    });

    dailyForecasts.slice(0, 3).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <p><strong>${day}</strong></p>
            <p>${temp} °F</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;
        container.appendChild(forecastDay);
    });
}

// Functions for join.html and thankyou.html
function setupJoinForm() {
    const submissionTimestamp = document.getElementById('submission-timestamp');
    if (submissionTimestamp) {
        submissionTimestamp.value = new Date().toISOString();
    }

    const form = document.getElementById('join-form');
    const errorMessage = document.getElementById('error-message');
    if (form && errorMessage) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                errorMessage.style.display = 'none';
                const formData = new FormData(form);
                const params = new URLSearchParams(formData).toString();
                window.location.href = `thankyou.html?${params}`;
            } else {
                errorMessage.textContent = 'Please fill out all required fields correctly.';
                errorMessage.style.display = 'block';
                form.reportValidity();
            }
        });
    }

    const modalLink = document.querySelector('.membership-info-link');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    if (modalLink && modals.length > 0) {
        modalLink.addEventListener('click', (e) => {
            e.preventDefault();
            modals.forEach(modal => modal.classList.toggle('active'));
        });
    }
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });
}

function displayThankYouPage() {
    if (!window.location.pathname.includes('thankyou.html')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const fields = ['first-name', 'last-name', 'email', 'phone', 'business-name', 'submission-timestamp'];
    fields.forEach(field => {
        const element = document.getElementById(`display-${field}`);
        if (element) {
            element.textContent = urlParams.get(field) || 'N/A';
        }
    });
}

// Functions for discover.html
function updateVisitCounter() {
    if (!window.location.pathname.includes('discover.html')) return;

    const visitCountEl = document.getElementById('visit-count');
    if (!visitCountEl) return;

    let visitCount = localStorage.getItem('discoverVisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('discoverVisitCount', visitCount);
    visitCountEl.textContent = visitCount;
}

async function fetchPlaces() {
    try {
        const response = await fetch('data/places.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching places:', error);
        return null;
    }
}

function displayPlaces(places) {
    const container = document.getElementById('cards-container');
    if (!container) return;

    container.innerHTML = '';
    places.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}" alt="${place.name} image" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more">Learn more</button>
        `;
        container.appendChild(card);
    });
}

function displayVisitMessage() {
    if (!window.location.pathname.includes('discover.html')) return;

    const messageEl = document.getElementById('visit-message').querySelector('p');
    if (!messageEl) return;

    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = currentTime - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            message = 'Back so soon Awesome!';
        } else {
            message = `You last visited ${daysDiff} day${daysDiff === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentTime);
    messageEl.textContent = message;
}

// Initialization Function (Handles all page-specific logic)
function init() {
    setFooterDates();

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', toggleNav);
    }

    // Logic for directory.html
    if (window.location.pathname.includes('directory.html')) {
        fetchMembers().then(members => {
            if (members) {
                displayMembers(members);
            } else {
                const cards = document.querySelector('#cards');
                if (cards) {
                    cards.innerHTML = '<p style="color: white; text-align: center;">Failed to load members. Please ensure you are running this on a local server (e.g., python -m http.server) and that data/members.json exists.</p>';
                }
            }
        });

        const gridButton = document.getElementById('grid-view');
        const listButton = document.getElementById('list-view');
        if (gridButton && listButton) {
            gridButton.addEventListener('click', () => toggleView('grid'));
            listButton.addEventListener('click', () => toggleView('list'));
        }
    }

    // Logic for index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        fetchMembers().then(members => {
            if (members) {
                displaySpotlights(members);
            } else {
                const spotlight = document.querySelector('#spotlight-container');
                if (spotlight) {
                    spotlight.innerHTML = '<p style="color: var(--red); text-align: center;">Failed to load spotlight members.</p>';
                }
            }
        });
        fetchWeather();
    }

    // Logic for join.html and thankyou.html
    if (window.location.pathname.includes('join.html') || window.location.pathname.includes('thankyou.html')) {
        setupJoinForm();
        displayThankYouPage();
    }

    // Logic for discover.html
    if (window.location.pathname.includes('discover.html')) {
        updateVisitCounter();
        fetchPlaces().then(places => {
            if (places) {
                displayPlaces(places);
            } else {
                const container = document.getElementById('cards-container');
                if (container) {
                    container.innerHTML = '<p style="color: white; text-align: center;">Failed to load places. Please ensure data/places.json exists.</p>';
                }
            }
        });
        displayVisitMessage();
    }
}

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching members:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', init);