"use strict";
$(document).ready(function() {
    
    // deleting post AJAX call
    $('.close').click(() => {
        const id = $('.close')[0].dataset.id;

        $.ajax({
            url: `/posts/${id}`,
            dataType: "json",
            type: "DELETE",
            success: function(data) {
                window.location.href = data.redirect;
            }
        });
    });

    // updating post AJAX call
    $('#update').click(() => {
        const id = $('#update')[0].dataset.id;

        var title = $('#title').val();
        var quantity = $('#unit').val();
        var price = $('#price').val();
        var description = $('#description').val();

        // default value
        if (title === '') {
            title = $('#title')[0].placeholder;
        }

        if (quantity === '') {
            quantity = $('#unit')[0].placeholder;
        }

        if (price === '') {
            price = $('#price')[0].placeholder;
        }

        if (description === '') {
            description = $('#description')[0].placeholder;
        }

        $.ajax({
            url: `/posts/${id}/update`,
            dataType: "json",
            type: "GET",
            data: {
                title,
                quantity,
                price,
                description
            },
            success: function() {
                $('#pop-up-background').css("visibility", "visible");
                $('#pop-up-menu').css("visibility", "visible");
            }
        })
    });

    // redirecting the window
    $('#confirm').click(() => {
        window.location.href = '/';
    });

})