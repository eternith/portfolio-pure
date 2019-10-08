var spy = new Gumshoe('#outlineBlock a', {
  nested: true,
  nestedClass: 'active-parent'
});

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
  easing: "easeOutQuad"
});



/* 
  Reading indicator
  https://css-tricks.com/reading-position-indicator/
*/
var progressBar = $("progress");
var max, value;

// set initial max value on document ready, but may not be correct due to images loading
$(document).ready(function () {
  // console.log("ready docHeight = " + $(document).height());

  // set max value of progress bar
  max = $(document).height() - $(window).height();
  progressBar.attr("max", max);


  // Magnific Popup
  // https://dimsemenov.com/plugins/magnific-popup/
  $('.image-link').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-with-zoom',
    zoom: {
      enabled: true,
      easing: 'ease-in-out',
      duration: 200
    }
  });
  $('.imageTrio, .imageDuo').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-with-zoom',
    zoom: {
      enabled: true,
      easing: 'ease-in-out',
      duration: 200
    }
  });
});

// get true max value once all images are loaded
$(window).on("load", function () {
  console.log("onload docHeight = " + $(document).height());

  // set max value of progress bar
  max = $(document).height() - $(window).height();
  progressBar.attr("max", max); 
});


// update on scroll
var updateProgressBar = function() {
  value = $(window).scrollTop();
  progressBar.attr("value", value);

  // show/hide outlineBlock after below certain pixels
  if (($(window).width()) > 992 && (value > 750)) {
    $("#outlineBlock").fadeIn();
  }
  else {
    $("#outlineBlock").fadeOut();
  }
};
$(document).on("scroll", updateProgressBar);



// user resizes window
$(window).on("resize", function () {
  max = $(document).height() - $(window).height();
  progressBar.attr("max", max);

  value = $(window).scrollTop();
  progressBar.attr("value", value);
});




// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};