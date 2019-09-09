/* 
  Reading indicator
  https://css-tricks.com/reading-position-indicator/
*/

var progressBar = $('progress');
var winHeight = $(window).height();
var docHeight = $(document).height();

console.log("docHeight = " + docHeight);
console.log("winHeight = " + winHeight);

// set max value of progress bar
var max = docHeight - winHeight;
progressBar.attr('max', max); 

// update on scroll
$(document).on('scroll', function() {
  value = $(window).scrollTop();
  progressBar.attr('value', value);

  // show/hide outlineBlock after below certain pixels
  if (value > 200) {
    $('#outlineBlock').fadeIn();
  }
  /* else {
    $('#outlineBlock').fadeOut();
  } // should it fade out? */
});

// user resizes window
$(window).on('resize', function () {
  winHeight = $(window).height(),
  docHeight = $(document).height();

  max = docHeight - winHeight;
  progressBar.attr('max', max);

  value = $(window).scrollTop();
  progressBar.attr('value', value);
});

