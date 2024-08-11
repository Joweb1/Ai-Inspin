import { useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import "../css/articleview.css";
import { useGeminiContext } from "../context/GoogleGemini";
import { useMediaQuery } from "react-responsive";
import BubbleComponent from "./BubbleComponent";

function ArticleViewComponent() {
    const {setScrollArticle} = useStateContext();
    const {articleState} = useGeminiContext();
    const articleRef = useRef();
    
    const isDesktop = useMediaQuery({query:'(min-width:500px)'});
    useEffect(() => {
        if(articleRef.current){
            setScrollArticle(articleRef);
        }
    })
    return (
        <section className="containM art" id="contentTwo" ref={articleRef}>
            {isDesktop && <BubbleComponent/>}
            {articleState ? <div className="artBody" dangerouslySetInnerHTML={{ __html : articleState }}></div>:
            <div className="loadA" ><i className="fa fa-cloud-arrow-up"></i><p>Load saved articles</p></div>
            }
        </section>
    );
}

export default ArticleViewComponent;