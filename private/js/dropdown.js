const dropdown = document.querySelector('.dropdown i');
const nav_ul = document.querySelector('nav #mobile');

dropdown.addEventListener('click', () => {
    let status = dropdown.getAttribute('class');

    if (status === "fas fa-bars") {
        dropdown.setAttribute("class", "fas fa-times");
        nav_ul.style.display = "block";
    } else {
        dropdown.setAttribute("class","fas fa-bars");
        nav_ul.style.display = "none";
    }
});