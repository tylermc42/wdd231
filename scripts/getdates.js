// Get the current year dynamically
const currentYear = new Date().getFullYear();

// Output the current year to the footer's first paragraph
document.getElementById("copyright-year").textContent = currentYear;

// Get the document's last modified date
const lastModified = document.lastModified;

// Output the last modified date to the footer's second paragraph
document.getElementById("last-modified").textContent = lastModified;

