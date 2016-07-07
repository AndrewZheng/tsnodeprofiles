$(document)
    .ready(function () {
        $('select.dropdown').each(function (index, element) {
            var value = $(element).data('value');
            $(element.children).each(function (index, option) {
                if (option.value == value) {
                    $(option).attr('selected', 'selected');
                    return false;
                }
            })
        })
        $('select.dropdown').dropdown();
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your e-mail'
                            },
                            {
                                type: 'email',
                                prompt: 'Please enter a valid e-mail'
                            }
                        ]
                    }
                }
            });
    });