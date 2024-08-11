
import HomeComponent from "../components/HomeComponent"
import CircleComponent from "../components/CircleComponent"
import MenuComponent from '../components/MenuComponent'
import { useStateContext } from "../context/ContextProvider";
import IntroComponent from "../components/IntroComponent";
import ArticleViewComponent from "../components/ArticleViewComponent";
import BubbleComponent from "../components/BubbleComponent";
import EditComponent from "../components/EditComponent";
import { useEffect, useState } from "react";
import RegisterComponent from "../components/RegisterComponent";
import TopicFormComponent from "../components/TopicFormComponent";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useGeminiContext } from "../context/GoogleGemini";
import EditArticleComponent from "../components/EditArticleComponent";
import { useNavigate } from "react-router-dom";
import SavedTopicsComponent from "../components/SavedTopicsComponent";
import SavedArticleComponent from "../components/SavedArticleComponent";
import PopUpComponent from "../components/PopUpComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import AboutComponent from "../components/AboutComponent";
import { useMediaQuery } from "react-responsive";


const Home = () => {

  const { welcome, token, wait, setToken, setUser, editStatus, scrollArticle, loading, setShowEdit, showEdit } = useStateContext();
  const { stateError, setErrorContent, setStateError }=useGeminiContext();
  const [toScreen, setToScreen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({query:'(max-width:500px)'});

  const elementIsVisibleInViewport = (el, partiallyVisible) => {
    if (el) {
      const { top, left, bottom, right } = el.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;
      return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    }
  };

  function showEditF() {
    if(scrollArticle){
    let toView = elementIsVisibleInViewport(scrollArticle.current, false); // false - (not fully visible)
    setToScreen(toView);
    if (showEdit != toScreen) {
      setShowEdit(toView);
    }
  }
    //console.log(showEdit)
  }

  const getUserDetails = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUser(data);
    console.log(data)
  };

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      getUserDetails(accessToken);
      setToken(accessToken);
      setStateError(true);
      navigate("./")
      setErrorContent("Login successful.");
      wait(5500).then(()=>setStateError(false))
    }
  });

  return (
    <section className="bodyM" id="bodyW" onScroll={showEditF} >
      {isMobile && <BubbleComponent />}
      <HomeComponent />
      <CircleComponent />
      <MenuComponent />
      {!token ? 
      <>
      <IntroComponent /> 
      <RegisterComponent/>
      </>
      : undefined}
      {loading ? <LoadingComponent/> : undefined}
      {editStatus ? <EditArticleComponent/> :<ArticleViewComponent />}
      {stateError ? <ErrorComponent/> : undefined}
      <EditComponent />
      <TopicFormComponent/>
      <SavedTopicsComponent/>
      <SavedArticleComponent/>
      <PopUpComponent/>
      {welcome && <WelcomeComponent/>}
      <AboutComponent/>
    </section>
  )
}

export default Home