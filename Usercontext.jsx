import React, { createContext, useState } from "react";

export const dataContext = createContext();
export let user={
    data:null,
    mime_type:null,
    imgurl:null
    
}
export let prevuser = {
    data: null,
    mime_type: null,
    prompt: null,
    imgurl: null
};

function UserContext({ children }) {
    const [startRes, setStartRes] = useState(false);
    const [popup, setPopUP] = useState(false);
    const [input, setInput] = useState("");
    const [feature, setFeature] = useState("chat");
    const [lastInput, setLastInput] = useState(""); // <-- Add this
    const [aiResponse, setAiResponse] = useState("");

    return (
        <dataContext.Provider value={{
            startRes, setStartRes,
            popup, setPopUP,
            input, setInput,
            feature, setFeature,
            lastInput, setLastInput, // <-- Add this
            aiResponse, setAiResponse
        }}>
            {children}
        </dataContext.Provider>
    );
}

export default UserContext;
