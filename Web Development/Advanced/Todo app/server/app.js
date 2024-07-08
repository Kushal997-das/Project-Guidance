require('dotenv').config();
const express = require("express");
const cors = require('cors');
const toDoRoutes = require("./routes/ToDoRoutes")
const connectDB = require("./config/db");
const { handleErrors } = require('./middlewares/ErrorHandler');
const port = process.env.PORT || 9000
const app = express();

// app.use(
//     cors({
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST", "DELETE", "PUT"],
//       allowedHeaders: ["Content-Type"],
//       credentials: true,
//     })
// );

app.use(cors())
app.use(express.json())
app.use(handleErrors)

connectDB()

app.use("/todo", toDoRoutes);

app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful!" })
})

app.listen(port, () => {
    console.log("Connected to port " + port)
})