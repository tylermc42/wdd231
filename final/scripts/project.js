document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements to avoid repeated queries
    const elements = {
        copyrightYear: document.getElementById('copyright-year'),
        lastModified: document.getElementById('last-modified'),
        plansContainer: document.getElementById('plans-container'),
        toggleAcclaim: document.getElementById('toggle-acclaim'),
        toggleAscent: document.getElementById('toggle-ascent'),
        togglePulte: document.getElementById('toggle-pulte'),
        docList: document.getElementById('doc-list'),
        openModal: document.getElementById('open-modal'),
        closeModal: document.getElementById('close-modal'),
        modal: document.getElementById('design-modal'),
        modalContent: document.getElementById('modal-content'),
        homeText: document.querySelector('.home_text'),
        hamburger: document.querySelector('.hamburger'),
        navigation: document.querySelector('.navigation')
    };

    // Update copyright year and last modified date
    if (elements.copyrightYear) elements.copyrightYear.textContent = new Date().getFullYear();
    if (elements.lastModified) elements.lastModified.textContent = document.lastModified;

    // Hamburger menu toggle
    if (elements.hamburger && elements.navigation) {
        elements.hamburger.addEventListener('click', () => {
            elements.navigation.classList.toggle('active');
            elements.hamburger.classList.toggle('active');
        });
    }

    // Fetch and display home plans with toggle functionality
    if (window.location.pathname.includes('designs_jf.html') && elements.plansContainer) {
        function displayHomes(filter) {
            elements.plansContainer.innerHTML = '';
            fetch('data/homes.json')
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load homes.json. Please check the file path or server.');
                    return response.json();
                })
                .then(homes => {
                    if (!homes || homes.length === 0) {
                        throw new Error('No home plans found in homes.json.');
                    }
                    let filteredHomes;
                    if (filter === 'acclaim') {
                        filteredHomes = homes.filter(home => home.plan.startsWith('352'));
                    } else if (filter === 'ascent') {
                        filteredHomes = homes.filter(home => home.plan.startsWith('402'));
                    } else if (filter === 'pulte') {
                        filteredHomes = homes.filter(home => ['Barletta', 'Avelino', 'Prato', 'Casoria'].includes(home.plan));
                    }
                    if (filteredHomes.length === 0) {
                        elements.plansContainer.innerHTML = '<p>No home plans available for this category.</p>';
                        return;
                    }
                    filteredHomes.forEach(home => {
                        const card = document.createElement('div');
                        card.classList.add('plan-card');
                        card.innerHTML = `
                            <img src="images/${home.image}" alt="Plan ${home.plan} Model Home" loading="lazy">
                            <h3>Plan ${home.plan}</h3>
                            <p>Priced from ${home.price}</p>
                            <ul>
                                <li>Bedrooms: ${home.bedrooms}</li>
                                <li>Bathrooms: ${home.bathrooms}</li>
                                <li>Stories: ${home.stories}</li>
                                <li>Square Footage: ${home.squareFootage} sq. ft.</li>
                                <li>Garage: ${home.garage}</li>
                            </ul>
                        `;
                        elements.plansContainer.appendChild(card);
                    });
                })
                .catch(error => {
                    console.error('Error loading home plans:', error);
                    elements.plansContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                });
        }

        // Initial display (Acclaim homes)
        displayHomes('acclaim');

        // Single event handler for toggle buttons
        [elements.toggleAcclaim, elements.toggleAscent, elements.togglePulte].forEach(button => {
            if (button) {
                button.addEventListener('click', () => {
                    elements.toggleAcclaim.classList.toggle('active', button === elements.toggleAcclaim);
                    elements.toggleAscent.classList.toggle('active', button === elements.toggleAscent);
                    elements.togglePulte.classList.toggle('active', button === elements.togglePulte);
                    displayHomes(button === elements.toggleAcclaim ? 'acclaim' : button === elements.toggleAscent ? 'ascent' : 'pulte');
                });
            }
        });
    }

document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form submitted with:', {
        name: formData.get('name'),
        address: formData.get('address'),
        document: formData.get('document').name
    });
    // Note: Actual file upload would require a backend server (e.g., Node.js, PHP) to process FormData
    alert('Form submitted! Check the console for details. (Note: File upload requires a server.)');
});

    // Populate document list with file links
    if (window.location.pathname.includes('documents_jf.html') && elements.docList) {
        const docs = [
            { title: 'Community By Laws', file: 'by_laws.pdf' },
            { title: 'Association Rules and Design Guidelines', file: 'association_rules_and_design_guidelines.pdf' },
            { title: 'Articles of Incorporation', file: 'articles_of_incorporation.pdf' },
            { title: 'Architectural Committee Submittal Form', file: 'architectural_committee_submittal_form.pdf' },
            { title: 'Amend Design Guidelines for Security Lighting and Cameras', file: 'amend_dg_security_lighting_and_cameras.pdf' },
            { title: 'Amend Design Guidelines for Accessory Structures', file: 'amend_dg_accessory_structures.pdf' },
            { title: '3d Designation Builder Under Declaration CC&Rs', file: '3d_designation_builder_under_declaration_ccrs.pdf' },
            { title: '3c Declaration Annexation CC&Rs', file: '3c_declaration_annexation_ccrs.pdf' },
            { title: '3b Declaration Annexation CC&Rs', file: '3b_declaration_annexation_ccrs.pdf' },
            { title: '2025 Cash Flow Budget', file: '2025_cash_flow_budget.pdf' },
            { title: '2025 Built Out Budget', file: '2025_built_out_budget.pdf' },
            { title: '2023 Year End Financials', file: '2023_year_end_financials.pdf' },
            { title: 'Change of Address Form', file: 'change_of_address_form.pdf' },
            { title: 'Collection Policy', file: 'collection_policy.pdf' },
            { title: 'Declaration of CC&Rs', file: 'declaration_ccrs.pdf' },
            { title: 'Fine Policy', file: 'fine_policy.pdf' },
            { title: 'First Amendment to CC&Rs', file: 'first_amendment_ccrs.pdf' },
            { title: 'Insurance Certificate', file: 'insurance_certificate.pdf' },
            { title: 'Reserve Study', file: 'reserve_study.pdf' }
        ];
        elements.docList.innerHTML = docs.map(doc => 
            `<li><a href="documents/${doc.file}" target="_blank">${doc.title}</a></li>`
        ).join('');
    }

    // Visit counter for home page
    if (window.location.pathname.includes('index.html') && elements.homeText) {
        let visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
        localStorage.setItem('visitCount', visitCount);
        elements.homeText.appendChild(Object.assign(document.createElement('p'), {
            textContent: `Visits: ${visitCount}`
        }));
    }
});