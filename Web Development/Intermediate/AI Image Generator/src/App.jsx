import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import { WavyBackground } from "./components/ui/wavy-background";
import { CardBody, CardContainer, CardItem } from "./components/ui/3d-card";
import { useState } from "react";
import {  HOST } from "./utils/constants";
import axios from 'axios';
 import "./index.css";

function App() {
  const [prompt, setprompt] = useState("");
  const [imagePath, setimagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleSearch, settoggleSearch] = useState(true);

  const generateImage = async (prompt) => {
   
    const res = await axios.post(`${HOST}/api/generate-image`, { prompt });
    if (res.status === 200) {
     
      
        setLoading(false); 
        setimagePath(res.data); 
        settoggleSearch(true);
      
    }

  }
  const handleChange = (e) => {
  
    setimagePath("");
    setprompt(e.target.value);
 
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    settoggleSearch(false);
    await generateImage(prompt);
    console.log("Submitted", prompt);
  };

 
  

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] w-full">
        <WavyBackground className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto h-[calc(100vh-<footer-height>)] p-10 gap-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold inter-var text-center mb-4">
            Welcome to AI Image Generator
          </h3>
          {loading && <div class="spinner">
    <div class="spinner1"></div>
</div>} 
          {imagePath && (
          <div>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-8 border">
              <CardItem translateZ="100" className="w-full mt-2">
  
    <img
      src={imagePath}
      alt="Generated"
      className="h-64 w-full object-cover rounded-xl group-hover:shadow-xl"
    />

</CardItem>

                <div className="flex justify-between items-center "></div>
              </CardBody>
            </CardContainer>
          </div>
  ) }  
  {toggleSearch && (
    <div className="flex flex-col items-center justify-center w-full">
            <div className="w-[80vw] md:w-[50vw]">
              <PlaceholdersAndVanishInput
                placeholders={["beautifull sunset","beach","waterfalls"]}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
  )}




<footer className=" fixed text-white bottom-0">
  Made with ❤️ by  <a href="https://github.com/damarudhvarma">Damarudh Varma</a>
</footer>
          
        </WavyBackground>
        

      </div>
    </>
  );
}

export default App;
