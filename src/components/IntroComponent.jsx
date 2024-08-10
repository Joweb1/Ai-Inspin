import "../css/intro.css"
import SiteLogo from "../assets/img/logo-site.png"
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";


function IntroComponent() {

    const { token, auth, setLoading, setAuth, showSignUp, setShowSignUp, showSignIn, setShowSignIn} = useStateContext();
    const [authControl, setAuthControl] = useState(false);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    function closeAuth(){
        setAuth(!auth)
    }

    function controlAuth(){
        setAuthControl(!authControl);
    }

    function signUpControl(){
        setShowSignUp(!showSignUp);
    }
    function signInControl(){
        setShowSignIn(!showSignIn);
    }
    const OAuthLogin = () => {
        const callbackUrl = `${window.location.origin}`;
        const googleClientId = clientId;
        const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
        window.location.href = targetUrl;
        setLoading(true);
    }
    useEffect(()=>{
        if(!token){
            setAuth(true);
        }
    })

    return (
        <div id="introView" className={(auth && showSignUp && showSignIn) ? "display scrollOut" : (auth && !showSignUp && !showSignIn) ? "display" : undefined}>
            <div className="cancleSign" onClick={closeAuth}><i className="fa fa-close" ></i></div>
            <div className="introLogo" >
                <img className="mainlogo" src={SiteLogo} />
                <h2 className="wel" >Welcome to AI InSpin</h2>
            </div>
            <p>{authControl ? "Sign up" : "Sign in"} with</p>
            <div className="btnSign" >
                <div className="googleSign" onClick={()=>OAuthLogin()}><i className="fa fa-brands fa-google" ></i><p>Google</p>
                </div>
                <p className="or" >Or</p>
                <div className="emailSign" onClick={authControl ? signUpControl : signInControl}><i className="fa fa-regular fa-envelope" ></i><p >Email</p></div>
            </div>
            <p className="bySign" >By signing, you agree to our <strong>Terms of Use</strong> as well as our <strong>Privacy</strong> and <strong>Cookies Policy</strong></p>

            <div className="signBottom" >
                <hr/>
                    <div>
                        <p> {authControl ? "Already have an account?" : "Don't have an account?"} <strong onClick={controlAuth}> { authControl ? "Sign in" : "Sign up"} </strong></p>
                    </div>
            </div>
        </div>
    );
}

export default IntroComponent;