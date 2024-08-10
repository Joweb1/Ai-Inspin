import '../css/welcome.css';
import SiteLogo from "../assets/img/logo-site.png";
import { useStateContext } from '../context/ContextProvider';
import { useEffect } from 'react';

function WelcomeComponent() {
const {setWelcome, token} = useStateContext();
useEffect(()=>{
    if (token) {
        setWelcome(false);
      }
})
    return (
        <div className="trashdT" >
            <img src={SiteLogo} />
            <h1 className="headId"><p className="intro-text active" >Welcome to Ai InSpin </p></h1>
            <div className="blac" >
                <div className="abt" >
                    <p className="intro-button active" >Create endless articles</p>
                </div>
                <p className="gemini" ><span>Powered</span> <br /> <span> by </span><br />Gemini</p>
                <p></p>
            </div>
            <div className="abtS" onClick={() => setWelcome(false)}>
                <p className="intro-button active" >Get started</p>
            </div>
        </div>
    );
}

export default WelcomeComponent;