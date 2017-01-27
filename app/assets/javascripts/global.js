
$(function() {

  const fullscrtarget = $('#target')[0]; // Get DOM element from jQuery collection

  $('.js-triggerFullScreen').on('click', () => {
      if (screenfull.enabled) {
          screenfull.request(fullscrtarget);
          $('#target').addClass('is-fullscreen');
      }
  });

  $('.btn-byebyeFullScreen').click(function() {
    screenfull.exit();
    $('#target').removeClass('is-fullscreen');
  });


  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      $('#target').removeClass('is-fullscreen');
    }
  });

});
