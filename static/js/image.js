// semi-colons are optional in javascript, and are often not included in this code!
var maxFrameNum=159
var delay = 150 // time between frames in milliseconds
var frameNum = 0    // The frame counter: keeps track of current frame
var j=1
var timeout_id = null  // Allows us to stop the animation with clearTimeout( )
var aniFrames = new Array()
for (i=0; i<=159; i++)
{
  aniFrames[i] = new Image();
  aniFrames[i].src = "./novaFiles/fset"+i+".jpg";
}



document.onkeydown = myKeyDownHandler;
//this function is used for keyboard mapping@
function myKeyDownHandler(e){
    if (timeout_id!=null) {killAnimate()}
//  if (e.which==13) {Animate()} // oddly, the enter key seems to be reserved for repeating the last click
    if (e.which==39 || e.which==40) {incrementFrame()} // rightarrow
    if (e.which==37 || e.which==38) {decrementFrame()} // leftarrow
    if (e.which==110 || e.which==110) {test()}
  //  alert(e.which+" was pressed")   //helps to find key numbers  also alert allow to pop alerts@
}

// This function performs the animation.
function xanimate() {
    incrementFrame()
    timeout_id = setTimeout("xanimate()", delay )  // Display the next frame after delay millisecs
}

function test() {
  if (j==16){j=0}
  document.imageWindow.style="width: 6128px; height: 383px; margin-left: -"+(j*383)+"px;"
  j++
  //if (j=0){incrementFrame()}
  timeout_id = setTimeout(function() {
    requestAnimationFrame(test);
  showFrame();
  }, delay  )
}
//A better way? http://creativejs.com/resources/requestanimationframe/
function yanimate() {
    timeout_id = setTimeout( function() {
    requestAnimationFrame(yanimate);
    incrementFrame();
    }, delay );  // Display the next frame after delay millisecs
}

function slower() {
    delay=delay+63
    if (delay > 4000) delay = 4000
}

function faster() {
    delay=delay-63
    if (delay < 50 ) delay = 50
}

function incrementFrame(){
    frameNum++
    if (frameNum > maxFrameNum) { frameNum = 0  }
    showFrame()
}

function decrementFrame(){
    frameNum+=-1
    if (frameNum < 0 ) { frameNum = maxFrameNum  }
    showFrame()
}

// Note that we refer to the onscreen image and text using the id imageWindow and textWindow,  defined by us.
function showFrame(){
    var str = "" + frameNum
    var pad = "000"
    var frameNumPad = pad.substring(0, pad.length - str.length) + str
    document.getElementById('textWindow').innerHTML = frameNumPad // Display frame number as text
    //document.imageWindow.height= 6000+'px'
    //document.imageWindow.width= 3083+'px'
    document.imageWindow.src = aniFrames[frameNum].src  // Display the current frame image
    //document.imageWindow.style="width: 6128px; height: 383px; margin-left: -0px;"
}
function killAnimate(){
if (timeout_id) clearTimeout(timeout_id)
timeout_id=null
}
