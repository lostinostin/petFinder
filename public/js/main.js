/**
 * jTinder initialization
 */
(function($) {
    $(function() {
        $('#tinderslide').jTinder({
            // dislike callback
            onDislike: function(item, err) {
                // set the status text
                if (err) throw err;
                $('#status').html('Not Interested');
                $.post('/decision',
                {
                    swipe_direction: 0,
                    petId: $("#petId").val()
                });
            },
            // like callback
            onLike: function(item, err) {
                // set the status text
                if (err) throw err;
                $('#status').html('Interested');
                $.post('/decision',
                {
                    swipe_direction: 1,
                    petId: $("#petId").val()
                });
            },
            animationRevertSpeed: 200,
            animationSpeed: 400,
            threshold: 1,
            likeSelector: '.like',
            dislikeSelector: '.dislike'
        });

        /**
         * Set button action to trigger jTinder like & dislike.
         */
        $('.actions .like, .actions .dislike').click(function(e) {
            e.preventDefault();
            $('#tinderslide').jTinder($(this).attr('class'));
        });
    }); // end of document ready
})(jQuery);