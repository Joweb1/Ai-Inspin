import '../css/menu.css';
import starDark from '../assets/img/starDark.png';
import { useStateContext } from "../context/ContextProvider";
import ProfileLogo from "../assets/img/logo-site.png"
import { useGeminiContext } from '../context/GoogleGemini';


function MenuComponent() {

    const {setShowSavedArticles, setAbout, setShowSavedTopics, menu, user, auth, wait, logOutUser, setAuth, setMenu, token} = useStateContext();
    const {setErrorContent, setStateError} = useGeminiContext();
    function closeMenu(){
        setMenu(!menu)
    }

    function openAuth(){
        closeMenu();
        setAuth(!auth)
    }
    function logOut() {
        logOutUser()
        setMenu(false)
        setAuth(false)
        setStateError(true);
        setErrorContent("Logout successful.");
        wait(5500).then(()=>setStateError(false))
    }
    function premium() {
        setErrorContent("Premium coming soon");
        setStateError(true);
        wait(7000).then(() => setStateError(false))
    }
    function wordpress() {
        setErrorContent("Wordpress feature coming soon");
        setStateError(true);
        wait(8000).then(() => setStateError(false))
    }

    return (
        < div id="menuPage" className={menu ? "showM" : undefined}  >
            <div className="cancleSign" onClick={closeMenu}><i className="fa fa-close" ></i></div>
            <div className="menuElement" id="contentMenu" >
                <div className="mplan" >
                    <div><i className="fa fa-bolt" ></i></div>
                    <h4>Free Plan </h4>
                    <img src= {starDark} />
                </div>
                {!token || !user ?
                <div className="mSign" onClick={openAuth}>
                    <i className="fa fa-user" ></i>
                    <h4> Sign in </h4>
                    <i className="fa fa-angle-right" ></i>
                </div> : 
                <div className="mSign" onClick={logOut}>
                    <img className="userlogo" src={user.picture ? user.picture : ProfileLogo} />
                    <h4> {user.given_name ? user.given_name : user.name ? user.name : "Username" } </h4>
                    <p>Sign out </p>
                    <i className="fa fa-sign-out" ></i>
                </div>}
                
                <div className="subShare" >
                    <div className="mSub" onClick={premium}>
                        <div><i className="fa fa-rocket" ></i><i className="fa fa-angle-right" ></i></div>
                        <h4> Premium </h4>
                        <p>Get the full power of AI InSpin</p>
                    </div>
                    <div className="mShare" onClick={()=>navigator.share({title:"AI-Inspin", text:"Check this incredible AI Tool", url:window.location.href})}>
                        <div><i className="fa fa-share" ></i><i className="fa fa-angle-right" ></i></div>
                        <h4> Share </h4>
                        <p>Share what you love</p>
                    </div>
                </div>
                <div className="mSign" onClick={()=>setShowSavedTopics(true)} >
                    <i className="fa fa-save" ></i>
                    <h4> Saved topics </h4>
                    <i className="fa fa-angle-right" ></i>
                </div>
                <div className="mSign" onClick={()=>setShowSavedArticles(true)} >
                    <i className="fa fa-folder-plus" ></i>
                    <h4> Saved articles</h4>
                    <i className="fa fa-angle-right" ></i>
                </div>
                <div className="mUpdates" onClick={wordpress}>
                    <div><i className="fa fa-brands fa-wordpress" ></i><i className="fa fa-angle-right" ></i></div>
                    <h4> Post to Wordpress </h4>
                    <p>Post articles directly to wordpress using the wordpress API</p>
                </div>
                <div className="subShare" >
                <a href='mailto:support@ai-inspin.com.ng'>
                    <div className="mSub" >
                        <div><i className="fa fa-question-circle" ></i><i className="fa fa-angle-right" ></i></div>
                        <h4> Help</h4>
                        <p>Contact us to ask for help via Email</p>
                    </div>
                </a>
                    <div className="mShare" onClick={()=>setAbout(true)}>
                        <div><i className="fa fa-exclamation-circle" ></i><i className="fa fa-angle-right" ></i></div>
                        <h4> About </h4>
                        <p>Learn about us</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuComponent;