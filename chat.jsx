import React, { useContext } from "react";
import '../../app.css';
import { dataContext, user } from "../context/Usercontext";

function Chat() {
    const { lastInput, aiResponse } = useContext(dataContext);
    return (
        <div className="chatpage">
            <div className="user">
                {user.imgurl ? <img src={user.imgurl} alt="" /> : null}
                <span>{lastInput}</span>
            </div>
            <div className="ai">
                <span>{aiResponse}</span>
            </div>
        </div>
    );
}

export default Chat;