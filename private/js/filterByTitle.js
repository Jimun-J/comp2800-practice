"use strict";
const titlelist = document.querySelectorAll('.card-descript h2');
const searchBar = document.forms['search'].querySelector('input');

searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    titlelist.forEach(function (card) {
        const nameTitle = card.parentElement.querySelector('h2').textContent
        if (nameTitle.toLowerCase().indexOf(term) != -1) {
            card.parentElement.parentElement.parentElement.style.display = 'block';
        } else {
            card.parentElement.parentElement.parentElement.style.display = 'none';
        }
    });
});