"use strict";
const form = $('form')[0];
const error = $('.error')[0];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    error.textContent = '';

    const email = form.email.value;
    const password = form.password.value;

    $.ajax({
        url: '/login',
        dataType: "json",
        type: "POST",
        data: {
            email,
            password
        },
        success: function (data) {
            window.location.href = '/';
        },
        error: function (data) {
            error.textContent = data.responseJSON.error;
        }
    })
})