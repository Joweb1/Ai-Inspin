
import { useStateContext } from "../context/ContextProvider";
import { useGeminiContext } from "../context/GoogleGemini";
import "../css/savedtopics.css";

function SavedTopicsComponent() {

    const {setMenu, scrollArticle, setShowEdit, setLoading, setCategoryState, setArticleTitle, setKeywordState, setArtValue, setShowSavedTopics, showSavedTopics} = useStateContext();
    const {generateArticle, savedTopics, deleteTopics} = useGeminiContext();
    
    function usTopics(params){
        console.log(savedTopics[params]);
		setCategoryState(savedTopics[params].category);
		setArtValue(savedTopics[params].title);
		setArticleTitle(null);
		setKeywordState(null);
		setMenu(false);
        setShowSavedTopics(false);
		setLoading(true);
		generateArticle(true ,params, true).then(()=>{
			setLoading(false);
			setShowEdit(true);
			setArticleTitle(savedTopics[params].title);
			setKeywordState(savedTopics[params].keywords.toString());
			scrollArticle.current.scrollIntoView({
				behavior: 'smooth', 
				block: 'center'
			});
		})
    }
    return (
        <div className={showSavedTopics ? "trashdT trashdt" : "trashdT"} id="saved" >
            <div className="xclose" onClick={()=>setShowSavedTopics(false)}><i className="fa fa-solid fa-close"></i> </div>
            <p className="headId">Saved Topics <i className="fa fa-solid fa-save"></i></p>
            <div className="allT" >
                <div>
                    <ul>
                    {savedTopics && savedTopics.map((object, index) => (
                        <li key={index}>
                            <p>{object.title}</p>
                            <p className="use" onClick={()=> usTopics(index)} >Use</p>
                            <p className="use" onClick={()=>deleteTopics(index)} ><i className="fa fa-trash" ></i></p>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SavedTopicsComponent;