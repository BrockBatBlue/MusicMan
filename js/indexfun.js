
//Function for making the carousel sticky

(function($) {
	var $window = $(window);
    var $videoWrap = $('.videos');
	var $video = $('.orbit');
    var videoHeight = $video.outerHeight();

	$window.on('scroll', function() {
    	var windowScrollTop = $window.scrollTop();
		
        
        if ($videoWrap) {
            var videoBottom = videoHeight + $videoWrap.offset().top;
            if (windowScrollTop > videoBottom) {
                $videoWrap.height(videoHeight);
                $video.addClass('stuck');
            } else {
                $videoWrap.height('auto');
                $video.removeClass('stuck');
          }
        }
    
       
	});
}(jQuery));
