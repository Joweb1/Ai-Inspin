
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createContext, useContext, useState } from 'react';
import { useStateContext } from './ContextProvider';

const JsonDefault = [];

const GeminiContext = createContext({
    topicState: JsonDefault,
    articleState: null,
    stateError: false,
    errorContent: null,
    articleLoading: false,
    articleLoadingRegenerate: false,
    topicsLoadingGenerate: false,
    topicsLoadingRegenerate: false,
    savedTopics: null,
    savedArticles: null,
    savingTopic: () => { },
    deleteArticle: () => { },
    deleteTopics: () => { },
    setSavedTopics: () => { },
    setArticlLoadingRegenerate: () => { },
    setTopicsLoadingGenerate: () => { },
    setTopicsLoadingRegenerate: () => { },
    setArticlLoading: () => { },
    setTopicState: () => { },
    generateTopic: () => { },
    getTest: () => { },
    setStateError: () => { },
    setErrorContent: () => { },
    generateArticle: () => { },
    setArticleState: () => { },
    saveCurrentArticle: () => { },
    setSavedArticles: () => { },
})

export const GeminiContextProvider = ({ children }) => {

    const { setShowEdit, categoryState, setLoading, selectedOption, descriptionState, articleTitle, keywordState, artValue } = useStateContext();
    const [topicState, setTopicState] = useState(JsonDefault);
    const [articleState, setArticleState] = useState();
    const [articleLoading, setArticlLoading] = useState();
    const [articleLoadingRegenerate, setArticlLoadingRegenerate] = useState();
    const [topicsLoadingGenerate, setTopicsLoadingGenerate] = useState();
    const [topicsLoadingRegenerate, setTopicsLoadingRegenerate] = useState();
    const [stateError, setStateError] = useState(false);
    const [errorContent, setErrorContent] = useState("Some Error occured. Try again.");
    const [savedTopics, setSavedTopics] = useState(JSON.parse(localStorage.getItem('SAVED_TOPICS')));
    const [savedArticles, setSavedArticles] = useState(JSON.parse(localStorage.getItem('SAVED_ARTICLES')));

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const topicPrompt = `Generate "${selectedOption}" blog post title on the niche '${categoryState}'. ${descriptionState ? "Topics should be centred around " + descriptionState : ""}. it should be in Json format. Use this format:"[{"title": "","keywords": [""],"category":"","status":""}]". 
                        Give just the topics alone no additional reply. Add to the Json format ranking Keywords for SEO for the blog post title generated. The topics should be friendly and relevant. 
                        Use simple and concise terms for easy search and SEO optimisation. Add this:'${categoryState}'  to the object "category" in the Json object. Check the internet and search the web to make sure the topics genereted are ${selectedOption} on the internet. 
                        if they are not regenerate it again and again until they are. if they are ${selectedOption} indicate by adding "${selectedOption}" to json object "status". 
                        And if they are not indicate by adding "Not-${selectedOption}" to the Json object "status". ${(topicState[0]) ? (topicState[0].category === categoryState) ? ". Don't generate similar topics like these:" + JSON.stringify(topicState) : "" : ""}. Remember no extra reply just Json object. Maximum topics generated should be ten (10)`;

    function articlePrompt(sect, params, saved) {
        if (sect && params && saved) {
            return `You are professional blog article writer known for writing straight forward, friendly, and engaging articles using keywords wisely, amusing and educating your audience. 
                            You are to write an blog post on the Title:'${savedTopics[params].title}', under the niche : '${savedTopics[params].category}', using these keywords:" ${savedTopics[params].keywords.toString()} to streamline SEO. 
                            This blog article is to be comprehensive and prescise, use an ideal length best suited for the blog title and SEO. The article must be in HTML Format. Important info should be bold using html strong tag. 
                            Use list and table tags if needed for the article, put all paragraphs in the Paragraph html tag "<p>". Make deep research about the title and get useful backlinks from other websites or blogs adding them properly to the article using the anchor tag. 
                            Note: Don't use asterisk in the article, use html Tags to emphasis instead. Don't use any other format apart from Html format. Make sure all the research made are from reliable sources.`;
        } else if(sect && params){
            return `You are professional blog article writer known for writing straight forward, friendly, and engaging articles using keywords wisely, amusing and educating your audience. 
            You are to write an blog post on the Title:'${topicState[params].title}', under the niche : '${topicState[params].category}', using these keywords:" ${topicState[params].keywords.toString()} to streamline SEO. 
            This blog article is to be comprehensive and prescise, use an ideal length best suited for the blog title and SEO. The article must be in HTML Format. Important info should be bold using html strong tag. 
            Use list and table tags if needed for the article, put all paragraphs in the Paragraph html tag "<p>". Make deep research about the title and get useful backlinks from other websites or blogs adding them properly to the article using the anchor tag. 
            Note: Don't use asterisk in the article, use html Tags to emphasis instead. Don't use any other format apart from Html format. Make sure all the research made are from reliable sources.`;
        }else{
            if (!articleTitle) {
                setErrorContent("Please try again.");
                setStateError(true);
                setLoading(false);
                wait(5500).then(() => setStateError(false))
            } else {
                return `You are professional blog article writer known for writing straight forward, friendly, and engaging articles using keywords wisely, amusing and educating your audience. 
                            You are to write an blog post on the Title:'${articleTitle}', under the niche : '${categoryState}', '${keywordState ? "using these keywords:" + keywordState : "using the best keywords"}' to streamline SEO. 
                            This blog article is to be comprehensive and prescise, use an ideal length best suited for the blog title and SEO. The article must be in HTML Format. Important info should be bold using html strong tag. 
                            Use list and table tags if needed for the article. Make deep research about the title and get useful backlinks from other websites or blogs adding them properly to the article using the anchor tag. 
                            Note: Don't use asterisk in the article, use html Tags to emphasis instead. Don't use any other format apart from Html format. Make sure all the research made are from reliable source.`;
            }
        }
    }

    const API_KEY = import.meta.env.VITE_GEMINI_SECRET_KEY;

    const genAI = new GoogleGenerativeAI(API_KEY);

    const generateTopic = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(topicPrompt);
            const response = await result.response;
            const text = response.text();
            const promted = text.replaceAll(/```json/g, "");
            const aTopics = promted.replaceAll(/`/g, "");
            const someTopics = aTopics.trim();
            const dive = JSON.parse(someTopics);
            //console.log(dive, "working");
            setTopicState(dive);
        } catch (error) {
            if (error.response) {
                setStateError(true);
                setErrorContent("Some Error occured. Try again.");
                setTopicsLoadingGenerate(false);
                wait(5500).then(() => setStateError(false))
                const { status, data } = error.response;
                //console.error(`Api Error: ${status} - ${data.message}`);
                throw new Error(`Api Error: ${status} - ${data.message}`);
            } else if (error.request) {
                setStateError(true);
                setErrorContent("Some Error occured. Try again.");
                setTopicsLoadingGenerate(false);
                wait(5500).then(() => setStateError(false))
                //console.error(`Request Error:`, error.request);
                throw new Error(`Request Error`);
            } else {
                setStateError(true);
                setErrorContent("Check internet connection.");
                setTopicsLoadingGenerate(false);
                wait(5500).then(() => setStateError(false))
                //console.error('Unknown Error:', error);
                throw new Error('Unknown Error');
            }
        }
        console.log(topicState);
    }

    const generateArticle = async (sect, params, saved) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(articlePrompt(sect, params, saved));
            const response = await result.response;
            const text = response.text();
            const promted = text.replaceAll(/```html/g, "").replaceAll("*", "").replaceAll(/`/g, "").replaceAll("/n", "");
            const aTopics = promted;
            //console.log(articlePrompt(sect, params, saved), aTopics, "working");
            setArticleState(aTopics);
            setShowEdit(true);
        } catch (error) {
            if (error.response) {
                setStateError(true);
                setErrorContent("Some Error occured. Try again.");
                setLoading(false);
                wait(5500).then(() => setStateError(false))
                const { status, data } = error.response;
                //console.error(`Api Error: ${status} - ${data}`);
                throw new Error(`Api Error: ${status} - ${data}`);
            } else if (error.request) {
                setStateError(true);
                setErrorContent("Some Error occured. Try again.");
                setLoading(false);
                wait(5500).then(() => setStateError(false))
                //console.error(`Request Error:`, error.request);
                throw new Error(`Request Error`);
            } else {
                setStateError(true);
                setErrorContent("Some Error occured. Try again.");
                setLoading(false);
                wait(5500).then(() => setStateError(false))
                //console.error('Unknown Error:', error);
                throw new Error('Unknown Error');
            }
        }
       // console.log(articleState);
    }

    function savingTopic(param) {
        console.log(savedTopics);
        if (!savedTopics) {
            const savedArray = [];
            savedArray.push(topicState[param]);
            setSavedTopics(savedArray);
            localStorage.setItem('SAVED_TOPICS', JSON.stringify(savedArray));
            setStateError(true);
            setErrorContent("Saved Successfully");
            setLoading(false);
            wait(5500).then(() => setStateError(false))
            //console.log(savedArray)
        } else {
            const savedArray = savedTopics;
            const exist = savedArray.some(titles => titles.title === topicState[param].title);
            if (exist) {
                setStateError(true);
                setErrorContent("Already Saved");
                setLoading(false);
                wait(5500).then(() => setStateError(false))
            } else {
                savedArray.push(topicState[param]);
                setSavedTopics(savedArray);
                localStorage.setItem('SAVED_TOPICS', JSON.stringify(savedArray));
                setStateError(true);
                setErrorContent("Saved Successfully");
                setLoading(false);
                wait(5500).then(() => setStateError(false))
               // console.log(savedArray)
            }
        }
    }

    function getTest() {
        console.log("Getting test")
    }

    function addArray([titled, keyword, content]) {
        if (savedArticles) {
            let articleArrays = savedArticles;
            const exist = articleArrays.some(titles => titles.title === titled);
            if (exist) {
                const exactMatch = savedArticles.findIndex(titles => titles.title === titled);
                articleArrays[exactMatch].article = content;
                setErrorContent("Article edited saved");
                return articleArrays;
            } else {
                let obj = { title: titled, keywords:keyword, article: content };
                articleArrays.push(obj);
                setErrorContent("Article saved");
                return articleArrays;
            }
        } else {
            let articleArrays = [];
            let obj = { title: titled, keywords:keyword, article: content };
            articleArrays.push(obj);
            setErrorContent("Article saved");
            return articleArrays;
        }
    }

    function saveCurrentArticle() {
        if (!articleState) {
            setStateError(true);
            setErrorContent("Generate an article.");
            setLoading(false);
            wait(5500).then(() => setStateError(false))
        } else {
            //console.log(savedArticles)
            if (savedArticles) {
                let articleArrays = addArray([artValue, keywordState, articleState]);
                setSavedArticles(articleArrays);
                localStorage.setItem('SAVED_ARTICLES', JSON.stringify(articleArrays));
                //console.log(articleArrays);
            } else {
                let articleArrays = addArray([artValue, keywordState, articleState]);
                setSavedArticles(articleArrays);
                localStorage.setItem('SAVED_ARTICLES', JSON.stringify(articleArrays));
                //console.log(articleArrays);
            }
        }
    }
    function deleteArticle(e){
        const newArrayed = savedArticles;
        newArrayed.splice(e, 1);
        setSavedArticles(newArrayed);
            localStorage.setItem('SAVED_ARTICLES', JSON.stringify(newArrayed));
            //console.log(newArrayed);
            setStateError(true);
            setErrorContent("Article deleted.");
            setLoading(false);
            wait(5500).then(() => setStateError(false))
    }
    function deleteTopics(e){
        const newArrayed = savedTopics;
        newArrayed.splice(e, 1);
        setSavedTopics(newArrayed);
            localStorage.setItem('SAVED_TOPICS', JSON.stringify(newArrayed));
            //console.log(newArrayed);
            setStateError(true);
            setErrorContent("Topic deleted.");
            setLoading(false);
            wait(5500).then(() => setStateError(false))
    }
    return (
        <GeminiContext.Provider value={{
            topicState,
            articleState,
            articleLoading,
            articleLoadingRegenerate,
            topicsLoadingGenerate,
            topicsLoadingRegenerate,
            errorContent,
            stateError,
            savedArticles,
            savedTopics,
            savingTopic,
            setErrorContent,
            setStateError,
            setArticlLoading,
            setArticlLoadingRegenerate,
            setTopicsLoadingGenerate,
            setTopicsLoadingRegenerate,
            setTopicState,
            generateTopic,
            generateArticle,
            getTest,
            setArticleState,
            saveCurrentArticle,
            setSavedArticles,
            setSavedTopics,
            deleteArticle,
            deleteTopics,
        }}>
            {children}
        </GeminiContext.Provider>
    )
}

export const useGeminiContext = () => useContext(GeminiContext);
