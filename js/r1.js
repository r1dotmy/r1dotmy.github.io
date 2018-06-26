var r1 = {
    init: function()
    {
        r1.ux.buttons();
    },
    ux: {
        buttons: function()
        {
            $('body').on('click', '.btn-modal', function(e)
            {
                e.preventDefault();
                var id = $('#' + $(this).attr('data-modal') + '-modal');
                $('.modal').modal('hide');
                $(id).modal('show');
            });
        }
    }
};

$(document).ready(function()
{
    r1.init();
});