$(document).ready(function () {
    $('#myCarousel').carousel({interval: 4000});
    $('#carouselButton').click(function () {
        if ($('#carouselButton').children('span').hasClass('fa-pause')) {
            $('#myCarousel').carousel('pause');
            $('#carouselButton').children('span').addClass('fa-play');
            $('#carouselButton').children('span').removeClass('fa-pause');
        }
        else if ($('#carouselButton').children('span').hasClass('fa-play')) {
            $('#myCarousel').carousel('cycle');
            $('#carouselButton').children('span').addClass('fa-pause');
            $('#carouselButton').children('span').removeClass('fa-play');
        }
    });
});
