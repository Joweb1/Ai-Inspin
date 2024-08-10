
import { useStateContext } from "../context/ContextProvider";
import { useGeminiContext } from "../context/GoogleGemini";
import "../css/savedtopics.css";

function SavedArticleComponent() {

    const { setKeywordState, setArtValue, setShowEdit, wait, setLoading, setArticleTitle, scrollArticle, setMenu, setShowSavedArticles, showSavedArticles } = useStateContext();
    const { deleteArticle, setErrorContent, setStateError, savedArticles, setArticleState } = useGeminiContext();

    const editThis = (e) => {
        setArticleState(savedArticles[e].article);
        setMenu(false);
        setShowSavedArticles(false);
        setShowEdit(true);
        setArticleTitle(savedArticles[e].title);
        setArtValue(savedArticles[e].title);
        if(savedArticles[e].keywords){
        setKeywordState(savedArticles[e].keywords.toString());
        }
        scrollArticle.current.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
        setErrorContent("Article Loaded");
        setStateError(true);
        setLoading(false);
        wait(5500).then(() => setStateError(false))
        //console.log("working")
    }
    const deleteThis = (e) => {
        deleteArticle(e);
        //console.log("working")
    }
    return (
        <div className={showSavedArticles ? "trashdT trashdt" : "trashdT"} id="saved" >
            <div className="xclose" onClick={() => setShowSavedArticles(false)}><i className="fa fa-solid fa-close"></i> </div>
            <p className="headId">Saved Articles <i className="fa fa-solid fa-book"></i></p>
            <div className="allT" >
                <div>
                    <ul>
                        {savedArticles && savedArticles.map((object, index) => (
                           <li key={index}>
                                <p>{object.title}</p>
                                <p className="use" onClick={() => editThis(index)} >Edit</p>
                                <p className="use" onClick={() => deleteThis(index)} ><i className="fa fa-trash" ></i></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SavedArticleComponent;