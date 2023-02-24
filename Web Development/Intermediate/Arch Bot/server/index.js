import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const app = express();


app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 3000

app.get("/", async (req, res) => {
    res.status(200).send("hello");
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            prompt: `${prompt}`, model: "text-davinci-002",
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });

        res.status(200).send({ bot: response.data.choices[0].text })
    } catch (error) {

        console.log(error);
        res.status(500).send(error)
    }
});

app.listen(port, () => {
    console.log("Server listening on port http://localhost:" + port);
})
