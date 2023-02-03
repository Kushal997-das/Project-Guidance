//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var changeText = document.getElementById("changeText");


//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);
changeText.addEventListener("click", changeTextFunction);

function startRecording() {
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	changeText.disabled =true;
	stopButton.disabled = false;
	pauseButton.disabled = false;

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		document.getElementById("formats").innerHTML="Start Speaking Now";

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
    	pauseButton.disabled = true;
    	changeText.disabled =false;
	});
}

function pauseRecording(){
	console.log("pauseButton clicked rec.recording=", rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		pauseButton.innerHTML="Resume";
	}
    else{
		//resume
		rec.record()
		pauseButton.innerHTML="Pause";
	}
}

function stopRecording() {
	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;
	changeText.disabled =false;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML="Pause";
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);

	rec.exportWAV(getSentence);
}

function changeTextFunction() {
	console.log("Change Text clicked");
	console.log(document.getElementById('speechToText').value);
    fetch("/ChangeSentenceFunction", {
        method: "post",
        body: document.getElementById('speechToText').value
    }).then(function (response) {
          return response.json();
    }).then(function (text) {
        console.log('New Post response:');
        console.log(text.sentence);
        document.getElementById('speechToText').value = text.sentence;
        getISL();
    })
}

function getSentence(blob) {
    // sends data to flask url /messages as a post with data blob - in format for wav file, hopefully. it is a promise
    fetch("/sentences", {
        method: "post",
        body: blob
    }).then(function (response) {
          return response.json();
        }).then(function (text) {
          console.log('POST response:');
          console.log(text.sentence);
          console.log(text.sentence.lower=="error");
          if(text.sentence=="Error"){
            alert("Could Not identify Audio. Please try again.");
        }
        document.getElementById('speechToText').value = text.sentence;
        getISL();
      })
}

function getISL() {
    fetch("/isl_gloss", {}).then(function (response) {
          return response.json();
      }).then(function (text) {
          console.log('POST response:');
          console.log(text.isl);
          document.getElementById('textToISL').value = text.isl;
          getVideo();
      });
}
var youtube_links;
function getVideo() {
    fetch("/videos", {youtube_links}).then(function (response) {
          return response.json();
      }).then(function (text) {
          console.log('POST response:');
          var links = text.links;
          youtube_links = links;
          console.log(youtube_links);
          localStorage.links = youtube_links;
          getVideoData();
      });
}
function test() {
   console.log('abc', youtube_links);

   var tag = document.createElement('script');

     tag.src = "https://www.youtube.com/iframe_api";
     var firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

     // 3. This function creates an <iframe> (and YouTube player)
     //    after the API code downloads.
     var player;
     var i = 0;
//      var videos = ['Zux-Hazhhqo','922S3GXI7eI','7Vn_Dto8Vq4'];
     var videos = youtube_links;
     onYouTubeIframeAPIReady();

       function onYouTubeIframeAPIReady() {
           console.log('in onYouTubeIframeAPIReady');
           player = new YT.Player('player', {
           height: '390',
           width: '640',
           videoId: '1f6OchgCQrE',
           events: {
               'onReady': onPlayerReady,
               'onStateChange': onPlayerStateChange
           }
           });
     }
     console.log('out onYouTubeIframeAPIReady');
     // 4. The API will call this function when the video player is ready.
     function onPlayerReady(event) {
       console.log('in onPlayerReady');
       event.target.playVideo();
     }
        console.log('out onPlayerReady');
     // 5. The API calls this function when the player's state changes.
     //    The function indicates that when playing a video (state=1),
     //    the player should play for six seconds and then stop.
     var done = false;
     function onPlayerStateChange(event) {
       // if (event.data == YT.PlayerState.PLAYING && !done) {
       //   setTimeout(stopVideo, 6000);
       //   done = true;
       // }
       console.log('in onPlayerStateChange');
       if (event.data == YT.PlayerState.ENDED) {
           if (i<videos.length){
               player.loadVideoById({videoId: videos[i],
                           startSeconds:0,
                           endSeconds:10})
                       }
           i++;
           console.log(i);
       }
     }
     console.log('out onPlayerStateChange');
     function stopVideo() {
       player.stopVideo();
     }
}


function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
//	var filename = new Date().toISOString();
    var filename = url;
	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Save to disk";

	//add the new audio element to li
	li.appendChild(au);
	
	//add the filename to the li
	li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	li.appendChild(link);
	
	//upload link
	var upload = document.createElement('a');
	upload.href="#";
	upload.innerHTML = "Upload";
	upload.addEventListener("click", function(event){
		  var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
		          console.log("Server returned: ",e.target.responseText);
		      }
		  };
		  var fd=new FormData();
		  fd.append("audio_data",blob, filename);
		  xhr.open("POST","upload.php",true);
		  xhr.send(fd);
	})
	li.appendChild(document.createTextNode (" "))//add a space in between
	li.appendChild(upload)//add the upload link to li

//	//add the li element to the ol
	recordingsList.appendChild(li);
}


var myPlayerState;
//    function(){
   var yt_int, yt_players={},
       initYT = function() {
           $("IDOrClassOfMyVideo").each(function() {
               yt_players[this.id] = new YT.Player(this.id,
               {
                   events: {
                       'onReady' : onPlayerReady,
                       'onStateChange': onPlayerStateChange
                   }
               });
           });
       };

   getScript("//www.youtube.com/player_api", function() {
       yt_int = setInterval(function(){
           if(typeof YT === "object"){
               initYT();
               clearInterval(yt_int);
           }
       },500);
   });
//});
