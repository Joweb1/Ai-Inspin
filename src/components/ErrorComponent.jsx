import { useGeminiContext } from "../context/GoogleGemini";
import "../css/error.css"

function ErrorComponent() {
    const {errorContent} = useGeminiContext();
    return (
        <div id="errorSignal">
            <div className="errorC">
                <div className="Emessage">
                    <p>{errorContent}</p>
                </div>
                <div className="errorLoad"></div>
            </div>
        </div>
    );
}

export default ErrorComponent;