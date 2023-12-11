$(document).ready(function () {
    // AJAX call to numbersapi
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#content').html(data.text);
            // You can write this information to some area in the page
            // e.g., $('#info-area').html(data.text);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Uppy for image upload
    const uppy = Uppy({
        autoProceed: true,
        restrictions: {
            maxFileSize: 1000000,
            allowedFileTypes: ['image/*']
        }
    }).use(Uppy.Dashboard, {
        target: '#drag-drop-area',
        inline: true,
        closeModalOnClickOutside: true
    });
});