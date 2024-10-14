# AI Image Generator Project

In this AI Image Generator project, I have utilized the **Hugging Face API** based on the **StableDiffusion** model along with **Aceternity UI**. The user-provided prompt is processed to generate an image.

## Tools & Technologies Used

- **Build Tool**: Vite
- **API**: Hugging Face API
- **Server**: Express
- **UI**: Aceternity UI

## Project Setup

### Clone the Repository

```
git clone <repository-url>
```

## Frontend Setup :

```
cd <repository-directory>
```
## create .env  at root of the folder
```
VITE_HOST= your server URL 
```

### Starting Frontend :

```
npm i
npm run dev
```

## Backend Setup :

### Get API KEY:

#### from : [Hugging Face](https://huggingface.co)

### Navigate to Server:

```
cd server
```

### Create a "public" folder at the root of server

### After obtaining your API key, add it to the .env file located in the server directory:

```
API_KEY=your_api_key_here
FRONTEND_URL=""
```

### Starting Backend :

```
npm install
npx nodemon index.js
```
## Demo video
Demo Video [Here](https://drive.google.com/file/d/15PmkjI34Wo2k6_bGK53dmWar4GSQ99WU/view?usp=drive_link)
## Hosted LInk

[Here](https://ai-image-generator-frontend-hers9ipc5-damarudhvarmas-projects.vercel.app/).


## Acknowledgements

- [Hugging Face](https://huggingface.co) for the StableDiffusion model.
- [Aceternity UI](https://www.aceternity.com) for UI components.
