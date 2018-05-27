import aiml
import sys
import pyttsx
from flask import Flask,request, render_template
from flask import jsonify

engine = pyttsx.init()
voice="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0"
engine.setProperty('voice', voice)

kern = aiml.Kernel()
kern._addSession("athuldevin")
sessionID="athuldevin"

brainLoaded = False
forceReload = False
while not brainLoaded:
    if forceReload or (len(sys.argv) >= 2 and sys.argv[1] == "reload"):
        # Use the Kernel's bootstrap() method to initialize the Kernel. The
        # optional learnFiles argument is a file (or list of files) to load.
        # The optional commands argument is a command (or list of commands)
        # to run after the files are loaded.
        kern.bootstrap(learnFiles="std-startup.xml", commands="load aiml b")
        brainLoaded = True
        # Now that we've loaded the brain, save it to speed things up for
        # next time.
        kern.saveBrain("nova.brn")
    else:
        # Attempt to load the brain file.  If it fails, fall back on the Reload
        # method.
        try:
            # The optional branFile argument specifies a brain file to load.
            kern.bootstrap(brainFile = "nova.brn")
            brainLoaded = True
        except:
            forceReload = True

kern.restoreSessionData("nova.dat",sessionID)

app = Flask(__name__,static_url_path="/static")


@app.route('/message', methods=['POST'])
def reply():
    user =  request.form['msg']
    out=kern.respond(user,sessionID)
    kern.saveSessionData("nova.dat",sessionID)
    print user
    print out

    engine.say(out)
    engine.runAndWait()
    return jsonify( { 'text':out})

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='localhost', port=9999)
"""
with open("info.txt", "w") as f:
        f.write(user)
        f.close()
"""
