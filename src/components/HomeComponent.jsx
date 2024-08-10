
import { useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import { useGeminiContext } from "../context/GoogleGemini";
import "../css/home.css";
import BubbleComponent from "./BubbleComponent";
import { useMediaQuery } from "react-responsive";

const HomeComponent = () => {

	const {setHome, scrollArticle, setArtValue, setLoading, setTopicForm, setCategoryState, setArticleTitle, setKeywordState} = useStateContext();
	const {generateArticle} = useGeminiContext();
	const keywordRef = useRef("");
	const articleTitleRef = useRef("");
	const categoryRef = useRef("");
	const generateChanges = () => {
		setArticleTitle(articleTitleRef.current.value);
		setCategoryState(categoryRef.current.value);
		setArtValue(articleTitleRef.current.value);
		if (keywordRef.current.value) {
			setKeywordState(keywordRef.current.value);
		}else{
			setKeywordState(null);
		}
		//console.log(articleTitleRef.current.value, keywordRef.current.value, categoryState);
	}
	const homeRef = useRef();
    
	const submitArticle = (ev) => {
		ev.preventDefault();
		generateChanges();
		setLoading(true);
		generateArticle().then(()=>{
			setLoading(false)
			scrollArticle.current.scrollIntoView({
				behavior: 'smooth', 
				block: 'center'
			});
		})
		//console.log(a.current.value, descriptionRef.current.value, selectedOption, descriptionState);
	}
	const isDesktop = useMediaQuery({query:'(min-width:500px)'});

	useEffect(() => {
        if(homeRef.current){
            setHome(homeRef);
        }
    })

	return (
		<section className="containM" id="contentOne" ref={homeRef}>

			<div className="logoE">
				<a href="#menu" id="signin" ><h1>Ai-InSpin</h1></a>
			</div>
			{isDesktop && <BubbleComponent/>}
			<div className="introT">
				<h2 className="headF"><i className="fa fa-brain"></i> <br />Create Article</h2>
				<form className='aiFormScroll' onSubmit={submitArticle}>
					<div className="ai-form" id="aiFormC">
						<label id="articleC" name="articleC">Category/Niche</label>
						<input label="articleC" placeholder="Enter type of article" ref={categoryRef} onChange={generateChanges} id="article-C" required />
					</div>

					<div className="ai-form" id="aiFormT">
						<label id="articleT" name="articleT">Article title</label>
						<textarea label="articleT" ref={articleTitleRef} onChange={generateChanges} placeholder="Enter a title that accurately reflects your article content." id="article-T" required></textarea>
						<label id="articleK" name="articleK">Keywords (optional)</label>
						<input label="articleK" ref={keywordRef} onChange={generateChanges} placeholder="Enter keywords" id="article-K" />
					</div>
					<div className="doneT" id="done">
						<i className="fa fa-check"></i>
					</div>

					<div className="ai-suggest" id="aiSuggest">
						<button type="submit" id="installApp" onMouseOver={generateChanges}> Generate article <i className="fa fa-arrow-right"></i></button>
						<button type="button" className="searchMe" onClick={()=>setTopicForm(true)} > Let AI suggest topics <i className="fa fa-fire"></i></button>
					</div>
					<br/><br/>
				</form>
			</div>
		</section>
	);
}

export default HomeComponent