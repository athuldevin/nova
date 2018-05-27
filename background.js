chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('/static/index.htm', {
    frame: "none",
    id: "framelessWinID",
    'innerBounds': {
      'width': 300,
      'height': 500,
      'left': 600,
      'minWidth': 300,
      'minHeight': 85
    }
  });
});
