document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    let menuToggle = document.querySelector('.menu-toggle');

    // Function to handle menu display based on screen size
    function handleMenuDisplay() {
        if (window.innerWidth <= 1200) {
            // Create menu toggle if it doesn't exist
            if (!menuToggle) {
                menuToggle = document.createElement('button');
                menuToggle.textContent = '☰';
                menuToggle.className = 'menu-toggle';
                header.appendChild(menuToggle);

                // Add click event listener for toggling nav
                menuToggle.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
                });
            }
            // Ensure nav is hidden by default on small screens
            nav.style.display = 'none';
        } else {
            // Remove menu toggle if it exists
            if (menuToggle) {
                menuToggle.remove();
                menuToggle = null;
            }
            // Ensure nav is visible on large screens
            nav.style.display = 'block';
        }
    }

    // Initial call to set up menu
    handleMenuDisplay();

    // Listen for window resize events
    window.addEventListener('resize', handleMenuDisplay);

    // Course list array
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    // Function to display courses
    function displayCourses(filter = 'ALL') {
        const courseContainer = document.querySelector('.course-list');
        courseContainer.innerHTML = ''; // Clear previous courses

        const filteredCourses = filter === 'ALL' ? courses : courses.filter(course => course.subject === filter);

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            if (course.completed) {
                courseCard.classList.add('completed');
            }
            
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number} - ${course.title}</h3>
                <p>Credits: ${course.credits}</p>
                <p>${course.description}</p>
                <p>Technologies: ${course.technology.join(', ')}</p>
            `;
            courseContainer.appendChild(courseCard);
        });

        // Update course count and total credits
        document.getElementById('course-count').textContent = filteredCourses.length;
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        document.getElementById('total-credits').textContent = totalCredits;
    }

    // Initial display
    displayCourses();

    // Filter buttons event listeners
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            displayCourses(button.dataset.filter);
        });
    });
});