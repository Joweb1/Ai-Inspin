import { useStateContext } from '../context/ContextProvider';
import '../css/savedtopics.css';


function PopUpComponent() {
    const {setShowPop, showPop, keywordState} = useStateContext();
    return (
        <div className={showPop ? "trashdT trashdt" : "trashdT"} id="saved" >
        <div className="xclose" onClick={() => setShowPop(false)}><i className="fa fa-solid fa-close"></i> </div>
        <p className="headId">Article Keywords <i className="fa fa-solid fa-key"></i></p>
        <div className="allT" >
            <div>
                <p className='sty'>{keywordState ? keywordState.toString() : "No Available Keywords"}</p>
            </div>
        </div>
    </div>
    );
}

export default PopUpComponent;