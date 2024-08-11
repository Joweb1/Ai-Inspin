import { useRef, useState } from "react";
import "../css/topics.css";
import { useStateContext } from "../context/ContextProvider";
import { useGeminiContext } from "../context/GoogleGemini";

function TopicFormComponent() {

	const { scrollArticle, setShowEdit, setLoading, topicForm, setArticleTitle, setKeywordState, setArtValue, setTopicForm, selectedOption, setSelectedOption, setCategoryState, setDescriptionState} = useStateContext();
	const { generateArticle, generateTopic, setTopicsLoadingGenerate, topicState, topicsLoadingGenerate, getTest, savingTopic } = useGeminiContext();
	const categoryRef = useRef("");
	const descriptionRef = useRef("");
	const [dropDown, setDropDown] = useState(false);
	const [allTopics, setAllTopics] = useState(false);
	const choice = (ev) => {
		setSelectedOption(ev.target.innerHTML);
		setDropDown(!dropDown)
	}
	const generateChange = () => {
		setCategoryState(categoryRef.current.value);
		if (descriptionRef.current.value) {
			setDescriptionState(descriptionRef.current.value)
		}
		//console.log(categoryRef.current.value, descriptionRef.current.value, selectedOption);
	}
	const generateTopics = (ev) => {
		ev.preventDefault();
		generateChange()
		if (selectedOption) {
			setTopicsLoadingGenerate(true);
			generateTopic().then(() => {
				setTopicsLoadingGenerate(false);
				setAllTopics(true);
			});
			//generateTopic();
		}
		//console.log(categoryRef.current.value, descriptionRef.current.value, selectedOption, descriptionState);
	}
	function usThis(params) {
		console.log(topicState[params]);
		setCategoryState(topicState[params].category);
		setArtValue(topicState[params].title);
		setArticleTitle(null);
		setKeywordState(null);
		setTopicForm(false);
		//console.log(categoryState);
		//console.log(articleTitle);
		//console.log(params)
		setLoading(true);
		generateArticle(true ,params).then(()=>{
			setLoading(false);
			setShowEdit(true);
			setArticleTitle(topicState[params].title);
			setKeywordState(topicState[params].keywords.toString());
			scrollArticle.current.scrollIntoView({
				behavior: 'smooth', 
				block: 'center'
			});
		})

	}

	function saveThis(params){
		savingTopic(params);
	}

	return (
		<><div className={topicForm ? "classpop scaleIn" : "classpop"} id="backpop" ></div>
			<div className={topicForm ? "classpopin scaleIn" : "classpopin"} id="classpop">
				<div className="xclose" onClick={() => setTopicForm(false)}><i className="fa fa-solid fa-close"></i></div>
				<p className="headId">Generate Topics <i className="fa fa-solid fa-fire"></i></p>
				<div className={allTopics ? "con-ID classmain" : "con-ID"} id="fillInfo" onClick={getTest}>
					<form onSubmit={(e) => generateTopics(e)}>
						<p className="classlabel">Write a Category <i className="fa fa-solid fa-pencil"></i></p>
						<input type="text" className="classid" id="category" placeholder="Type in any category" ref={categoryRef} onChange={(e)=>setCategoryState(e.target.value)} onMouseMove={()=>generateChange()} list="listed" required />
						<datalist id="listed" name="listed">
							<option>Sport</option>
							<option>Technology</option>
							<option>Business</option>
							<option>Food</option>
							<option>Lifestyle</option>
						</datalist>
						<p className="if-error" id="errRequired">This field is required</p>
						<p className="classlabel">Description (optional) <i className="fa fa-solid fa-pencil" ></i></p>
						<input type="text" className="classid" ref={descriptionRef} onChange={generateChange} id="description" placeholder="About ???" />
						<p className="if-error">Invalid className ID</p>
						<p className="classlabel">Choose relevance tone <i className="fa fa-solid fa-list"></i></p>
						<select className="classid" value={selectedOption} aria-label="Select tone" id="topicStatus" required readOnly onFocus={() => setDropDown(true)} onMouseEnter={() => setDropDown(true)} onMouseOut={() => setDropDown(false)}>
							<option value={selectedOption}>{selectedOption}</option>
						</select>
						<div className={dropDown ? "dropDown showDown" : "dropDown"} onMouseEnter={() => setDropDown(true)} onMouseOut={() => setDropDown(false)}>
							<li onClick={(e) => choice(e)} onMouseEnter={() => setDropDown(true)}>General</li>
							<li onClick={(e) => choice(e)} onMouseEnter={() => setDropDown(true)}>Unique</li>
							<li onClick={(e) => choice(e)} onMouseEnter={() => setDropDown(true)}>Trending</li>
							<li onClick={(e) => choice(e)} onMouseEnter={() => setDropDown(true)}>Most Searched</li>
						</div>
						<div className="buttonGContain">
							<button className="buttonG" id="genB" type="submit">
								{topicsLoadingGenerate ? <p className="classid gen" id="submitG" >Generating <i className="fa fa-refresh reroll" ></i></p> : <p className="classid" id="submitG">Generate <i className="fa fa-fire"></i></p>}
							</button>
						</div>
					</form>
				</div>

				<div className={allTopics ? "con-ID" : "con-ID classmain"} id="generatedTopics">
					<div id="iframeC">
						<div className="scrollable">
							<ul id="listId">
								{topicState.map((object, index) => (
									<li key={index}>
										<p>{object.title}</p>
										<div>
											<p className="use" onClick={()=>usThis(index)} >Use</p>
											<p className="use" onClick={()=>saveThis(index)}><i className="fa fa-save" ></i></p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="actionB">
						<div className="" >
							<p className="" onClick={()=>setAllTopics(false)}><i className="fa fa-arrow-left"></i> Back </p>
						</div>
						<div className="" onClick={(e)=>generateTopics(e)} >
						{topicsLoadingGenerate ? <p className="gen" >Generating <i className="fa fa-refresh reroll" ></i></p> : <p className="" >Regenerate <i className="fa fa-refresh"></i></p>}
						</div>
					</div>
				</div>
			</div></>
	);
}

export default TopicFormComponent;