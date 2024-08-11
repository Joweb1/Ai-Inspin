import { useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import "../css/articleview.css";
import { useGeminiContext } from "../context/GoogleGemini";

function EditArticleComponent() {
    const {setScrollArticle} = useStateContext();
    const {setArticleState, articleState} = useGeminiContext();
    const articleRef = useRef();
    const articleValueRef = useRef();
    
    function saveArt() {
        setArticleState(articleValueRef.current.innerHTML)
    }
    useEffect(() => {
        if(articleRef.current){
            setScrollArticle(articleRef);
        }
    })
    return (
        <section className="containM art " id="contentTwo" ref={articleRef} >
            {articleState ? <div className="artBody editArt" ref={articleValueRef} onMouseMove={saveArt} onMouseOut={saveArt} contentEditable suppressContentEditableWarning dangerouslySetInnerHTML={{ __html : articleState }}></div>:
            <div className="loadA" ><i className="fa fa-cloud-arrow-up"></i><p>Load saved articles</p></div>
            }
        </section>
    );
}

export default EditArticleComponent;