
// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.setAttribute('aria-expanded', 'false'); // Initial state
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
});


// Toggle between grid and list view
function toggleView(view) {
    const cards = document.getElementById('cards');
    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');

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

// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById("copyright-year").textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById("last-modified").textContent = lastModified;

// Fetch members data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        const cards = document.querySelector('#cards');
        cards.innerHTML = '<p style="color: white; text-align: center;">Failed to load members. Please ensure you are running this on a local server (e.g., python -m http.server) and that data/members.json exists.</p>';
    }
}

// Display members
function displayMembers(members) {
    const cards = document.querySelector('#cards');
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

    // Set default view to grid
    toggleView('grid');
}

// Fetch and display the members
fetchMembers();