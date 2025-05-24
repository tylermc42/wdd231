// spotlight.js
export function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    container.innerHTML = '';

    // Filter Gold and Silver members (levels 2 and 3)
    const eligibleMembers = members.filter(member => member.membership_level >= 2);
    
    // Randomly select 2–3 members
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