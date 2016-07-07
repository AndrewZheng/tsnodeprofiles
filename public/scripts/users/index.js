$(function () {
    $('.delete.operation').on('click', function (e) {
        var href = $(this).attr('href');
        $('.delete.modal a.yes.button').attr('href', href);
        $('.delete.modal').modal('show');
        e.preventDefault();
    });
});
//# sourceMappingURL=index.js.map