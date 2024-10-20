const path = require("path")
const express = require("express");
const app = express()
const port = process.env.PORT || 3000;
app.get("/",(req,res) => {
    res.sendFile( path.join(__dirname, "index.html"))
})
console.log(path.join(__dirname,"/index.html"))
 app.use(express.static(__dirname))
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname, '404.html'))
    })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});