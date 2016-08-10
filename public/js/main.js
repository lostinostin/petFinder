/**
 * jTinder initialization
 */
(function($) {
    $(function() {
        $('#tinderslide').jTinder({
            // dislike callback
            onDislike: function(item) {
                // set the status text
                $('#status').html('Not Interested');
            },
            // like callback
            onLike: function(item) {
                // set the status text
                $('#status').html('Interested');
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