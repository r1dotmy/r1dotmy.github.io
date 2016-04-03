var homepage = {
    buttons: function()
    {
        $('body').on('click', '.smooth', function(e)
        {
            e.preventDefault();
            var button = $(this);
            var section = $(button).attr('data-section');
            var target = $('#' + section);
            $('html, body').animate({
                scrollTop: ( target.offset().top + 40 )
            }, 750, function()
            {
                $('#header a.active').removeClass('active');
                $('#header a[href="#'+section+'"]').addClass('active');
            });
        });
    },
    init: function()
    {
        homepage.buttons();
    }
};

$(document).ready(function()
{
    homepage.init();
});