var UserDictation = artyom.newDictation({
    continuous:true, // Enable continuous if HTTPS connection
    onResult:function(text){
      output(text);
        console.log(text);
    },
    onStart:function(){
        console.log("starting");
    },
    onEnd:function(){
        console.log("Dictation stopped by the user");
        //  UserDictation.start();
    }
});

artyom.initialize({
  lang:"en-US",// A lot of languages are supported. Read the docs !
  continuous:false,// Artyom will listen forever
  listen:false, // Start recognizing
  soundex: false,// Use the soundex algorithm to increase accuracy
  debug:true, // Show everything in the console
  speed:1 // talk normally
})
 UserDictation.start();
artyom.detectErrors();

var $messages = $('.messages-content'), //copying messages
    d, h, m,text,msg,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {

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

function output(text){
  UserDictation.stop();
  msg = text;
  insertMessage(true);}

function insertMessage(stt) {
  if (stt == false){
    msg = $('.message-input').val();
  }
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
  insertMessage(false);
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage(false);
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
    artyom.say(reply['text']);
    UserDictation.start();
		}).fail(function() {
				alert('error calling function');
				});
}
