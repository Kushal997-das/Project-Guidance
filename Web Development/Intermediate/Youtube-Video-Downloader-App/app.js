const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static("public"));


app.get("/", (request, response) => {
	response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo", async (request, response) => {
	try {
		const videoURL = request.query.videoURL;
		const info = await ytdl.getInfo(videoURL);
		response.status(200).json(info);
	} catch (err) { 
		console.log(err); 
	}
});

app.get("/download", (request, response) => {
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	response.header("Content-Disposition", 'attachment;\ filename="video.mp4"');
	ytdl(videoURL, {
		filter: format => format.itag == itag
	}).pipe(response);
});

app.listen(process.env.PORT || 5000);