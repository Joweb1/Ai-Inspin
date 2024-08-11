import { useState } from "react";
import "../css/loading.css";

function LoadingComponent() {

    const [loadState] = useState("Just a sec");
            
    return (
        <div className="loadContain">
            <div className="loadCircle">
                <div className="loader"></div>
                <p>{loadState}</p>
            </div>
        </div>
    );
}

export default LoadingComponent;