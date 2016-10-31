$('.op-sidebar .op-sidebar-toggle').on('click', function() {
    var sidebar = $(this).closest('.op-sidebar');

    if (sidebar.attr('aria-expanded') === 'true') {
        sidebar.attr('aria-expanded', 'false');
    } else {
        sidebar.attr('aria-expanded', 'true');
    }
});
