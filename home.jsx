import React, { useContext } from "react";
import '../../app.css';
import { RiImageAddLine } from "react-icons/ri";
import { RiImageAiLine } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

import { dataContext,user } from "../context/Usercontext";
import Chat from "./chat";
import { generateresponse } from "../../gemini";
import zippyLogo from './Zippy_logo.jpg';

export let prevuser = {
    data: null,
    mime_type: null,
    prompt: null,
    imgurl: null
};

function Home() {
    const { startRes, setStartRes, popup, setPopUP, input, setInput, feature, setFeature, setLastInput, setAiResponse } = useContext(dataContext);
const [showPaidPopup, setShowPaidPopup] = React.useState(false);
function handleimage(e){
    setFeature("upimg");
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    let reader=new FileReader();
    reader.onloadend=(event)=>{
        let base64=event.target.result.split(",")[1]; // Extract base64 string
       user.data=base64;
       user.mime_type=file.type;
       user.imgurl = `data:${user.mime_type};base64,${user.data}`;
       console.log(user);
    }
    reader.readAsDataURL(file);
    
}
   async function handleSubmit(e) {
        e.preventDefault(); // Prevent form default immediately
        if (input && input.trim() !== "") {
            setLastInput(input); // Save the submitted input
            setStartRes(true);   // Show chat page immediately
            setInput("");        // Clear input after submit

            
            prevuser.data = user.data;
            prevuser.mime_type = user.mime_type;
            prevuser.prompt = input; // <-- Make sure input is not empty!
            prevuser.imgurl = user.imgurl;

            let result = await generateresponse(prevuser);
            setAiResponse(result); // set this in context
        }
    }

    return (
        <div className="home">
            <a
  href="https://zippy-ai.netlify.app"
  target="_blank"
  rel="noopener noreferrer"
  className="zippy-float-btn"
  title="Go to Zippy AI"
>
  <img src={zippyLogo} alt="Zippy AI" className="zippy-logo-img" />
</a>
            <nav>
                <div className="logo">
                    PIXIE
                </div>
            </nav>
            <input type="file" accept="image/*" hidden id="inputImg" onChange={handleimage}/>
            {!startRes ? (
                <div className="hero">
                    <span id="tag">Shoot your thoughts</span>
                    <div className="cate">
                        <div
                            className="upimg"
                            onClick={() => {
                                const inputElem = document.getElementById("inputImg");
                                if (inputElem) inputElem.click();
                            }}
                        >
                            <RiImageAddLine />
                            <span>Upload Image</span>
                        </div>
                        <div className="genimg" onClick={() => setFeature("genimg")}>
                            <RiImageAiLine />
                            <span>Generate Image</span>
                        </div>
                        <div className="chat">
                            <FaRegMessage />
                            <span>Chat</span>
                        </div>
                    </div>
                </div>
            ) : (
                <Chat />
            )}
            <form className="inputbox" onSubmit={handleSubmit}>
                {popup && (
                    <div className="popup">
                        <div
                            className="selectup"
                            onClick={() => {
                                const inputElem = document.getElementById("inputImg");
                                if (inputElem) inputElem.click();
                            }}
                        >
                            <RiImageAddLine />
                            <span>Upload Image</span>
                        </div>
                        <div className="selectgen" onClick={() => setFeature("genimg")}>
                            <RiImageAiLine />
                            <span>Generate Image</span>
                        </div>
                    </div>
                )}
                <button id="add" type="button" onClick={() => setShowPaidPopup(true)}>
                    {feature === "upimg" ? <RiImageAddLine /> : feature === "genimg" ? <RiImageAiLine /> : <FaRegMessage />}
                    <FaPlus />
                </button>
                <input
                    type="text"
                    placeholder="Type your thoughts here..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <button
                    id="submit"
                    type="submit"
                    disabled={!input || input.trim() === ""}
                >
                    <FaArrowUp />
                </button>
            </form>
            {showPaidPopup && (
  <div className="popup">
    <div style={{padding: "20px", textAlign: "center"}}>
      <strong>Generate Image</strong> is available in the paid version only.
      <br />
      <button onClick={() => setShowPaidPopup(false)} style={{marginTop: "12px"}}>Close</button>
    </div>
  </div>
)}
        </div>
    );
}

export default Home;