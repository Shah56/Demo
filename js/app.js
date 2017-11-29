// replace these values with those generated in your TokBox Account
var apikey = "YOUR_API_KEY";
var apisecret = "YOUR_API_KEY";

var opentok = new opentok.OpenTok(apikey, apisecret);

// Session Creation:
var sessionId;
opentok.createSession({mediaMode:"relayed"}, function(error, session) {
  if (error) {
    console.log("Error creating session:", error)
  } else {
    sessionId = session.sessionId;
    console.log("Session ID: " + sessionId);
  }
});

// Token Generation
var token = opentok.generateToken(sessionId);

//Send token+session viaxmpp here....


//Wait for conformation from xmpp, then initialize the session...


// (optional) add server code here

// This needs to be controlled in an if conditional, once conformation is recieved via xmpp, only then will this initialize!
initializeSession();






// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
	session.on('streamCreated', function(event) {
	  session.subscribe(event.stream, 'subscriber', {
	    insertMode: 'append',
	    width: '100%',
	    height: '100%'
	  }, handleError);
	});
  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

