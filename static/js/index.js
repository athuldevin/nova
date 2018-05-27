var $messages = $('.messages-content'), //copying messages
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    //fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
	interact(msg);
  setTimeout(function() {
    //fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function interact(message){
	// loading message
  $('<div class="message loading new"><figure class="avatar"><img src="/static/res/botim.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
	// make a POST request [ajax call]
	$.post('/message', {
		msg: message,
	}).done(function(reply) {
		// Message Received
		// 	remove loading meassage
    $('.message.loading').remove();
		// Add message to chatbox
    $('<div class="message new"><figure class="avatar"><img src="/static/res/botim.jpg" /></figure>' + reply['text'] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();

		}).fail(function() {
				alert('error calling function');
				});
}












function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/bgd.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  url="http://localhost:9999/test?q="+msg;
  loadDoc(url,hit);
}

function loadDoc(url, cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
 };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function hit(xhttp) {
  test =xhttp.responseText;
  postcheck(test);
}

function postcheck(test){
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/bgd.jpg" /></figure>' + test + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);
}
