import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import "../css/edit.css"
import { useGeminiContext } from "../context/GoogleGemini";

function EditComponent() {
    const {home, setShowPop, showEdit, setShowEdit, wait, setLoading, setEditStatus, scrollArticle} = useStateContext();
    const {articleState, generateArticle, saveCurrentArticle, setStateError, setErrorContent} = useGeminiContext();
    const [activeE, setActiveE] = useState(false);
    const [acting, setActing] = useState(false);

    function stay() {
        scrollArticle.current.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
    }
    function getNew(){
        home.current.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
        setActing(false)
        //console.log("working");
    }

    function regenerateArticle(){
        setLoading(true);
        generateArticle().then(()=>{
            setLoading(false)
            setStateError(true);
            setShowEdit(false);
            setErrorContent("Article Regenerated");
            wait(5500).then(()=>{
                setStateError(false);setShowEdit(true)})
        });
        //console.log("working");
    }
    function getKeywords(){
        setShowPop(true)
        //console.log("working");
    }
    function editArticle(){
        setEditStatus(true);
        stay();
       // console.log("working");
    }
    function saveArticle(){
        setEditStatus(false);
        saveCurrentArticle();
        stay();
        setStateError(true);
        setLoading(false);
        wait(5500).then(()=>setStateError(false))
       // console.log("working");
    }
    function regulate(s){
        if(articleState){
        setActiveE(s);
        setActing(s);
        }else{
            setStateError(true);
            setErrorContent("Generate an article, to use these");
            wait(5500).then(()=>setStateError(false))
        }
    }
    return (
        <div className={(showEdit && acting) ? "editFeature showE acting" : (showEdit) ? "editFeature showE" : "editFeature" } id="editF" onClick={()=>{regulate(true)}} onMouseOver={()=>{regulate(true)}} onMouseOut={()=>{regulate(false)}} onMouseLeave={()=>{regulate(false)}}>
        {activeE ? 
            <>  
                <div onClick={getNew}><i className="fa fa-file" ></i><p>New</p></div>
                <div onClick={regenerateArticle}><i className="fa fa-repeat"  ></i><p>Regenerate</p></div>
                <div onClick={getKeywords}><i className="fa fa-key" ></i><p>Keywords</p></div>
                <div onClick={editArticle}><i className="fa fa-edit" ></i><p>Edit article</p></div>
                <div onClick={saveArticle}><i className="fa fa-save" ></i><p>Save article</p></div></> :
            <><div><i className="fa fa-file"></i><p>New</p></div><div><i className="fa fa-repeat"></i><p>Regenerate</p></div><div><i className="fa fa-key"></i><p>Keywords</p></div><div><i className="fa fa-edit"></i><p>Edit article</p></div><div><i className="fa fa-save"></i><p>Save article</p></div></>
        }
        </div>
    );
}

export default EditComponent;