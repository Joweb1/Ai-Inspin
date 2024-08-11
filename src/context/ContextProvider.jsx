import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosClient from "../pages/AxiosClient";

const StateContext = createContext({
    user: null,
    token: null,
    code: null,
    menu: false,
    auth: false,
    showEdit: false,
    scrollArticle:null,
    showSignUp:false,
    showSignIn:false,
    topicForm:false,
    descriptionState:null,
    categoryState:null,
    keywordState:null,
    articleTitle:null,
    selectedOption:"General",
    catValue:null,
    artValue:null,
    keyValue:null,
    loading:false,
    editStatus:false,
    home:null,
    showSavedTopics: null,
    showSavedArticles: null,
    showPop: null,
    welcome: null,
    about:null,
    setAbout: () => { },
    setWelcome : () => { },
    setShowSavedTopics: () => { },
    setShowSavedArticles: () => { },
    setHome:() => { },
    setLoading: () => { },
    wait: () => { },
    setUser: () => { },
    setToken: () => { },
    getUser: () => { },
    setKey: () => { },
    setCode: () => { },
    setMenu: () => { },
    setAuth: () => { },
    setShowPop: () => { },
    setEditStatus: () => { },
    setDescriptionState: () => { },
    setCategoryState: () => { },
    setSelectedOption: () => { },
    setShowEdit: () => { },
    setScrollArticle: () => { },
    setShowSignUp: () => { },
    setShowSignIn: () => { },
    setTopicForm: () => { },
    setKeywordState: () => { },
    setArticleTitle: () => { },
    setKeyValue: () => { },
    setCatValue: () => { },
    setArtValue: () => { },
    logOutUser: () => { },
})


export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER_DATA')));
    const [menu, setMenu] = useState();
    const [showEdit, setShowEdit] = useState();
    const [scrollArticle, setScrollArticle] = useState();
    const [auth, setAuth] = useState();
    const [welcome, setWelcome] = useState(true);
    const [topicForm, setTopicForm] = useState();
    const [showSignUp, setShowSignUp] = useState();
    const [showSignIn, setShowSignIn] = useState();
    const [categoryState, setCategoryState] = useState();
    const [selectedOption, setSelectedOption] = useState("General");
    const [descriptionState, setDescriptionState] = useState();
    const [keywordState, setKeywordState] = useState();
    const [articleTitle, setArticleTitle] = useState();
    const [artValue, setArtValue] = useState();
    const [catValue, setCatValue] = useState();
    const [keyValue, setKeyValue] = useState();
    const [home, setHome] = useState();
    const [about, setAbout] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [showSavedTopics, setShowSavedTopics] = useState(false);
    const [showSavedArticles, setShowSavedArticles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [code, setCode] = useState(localStorage.getItem('SECURITY'));
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const setUser = (data) => {
        _setUser(data)
        if (data) {
            localStorage.setItem('USER_DATA', JSON.stringify(data));
        } else {
            localStorage.removeItem('USER_DATA');
        }
    }
    const setKey = (code) => {
        setCode(code)
        if (code) {
            localStorage.setItem('SECURITY', code);
        } else {
            localStorage.removeItem('SECURITY');
        }
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const logOutUser = () => {
        localStorage.removeItem('USER_DATA');
        localStorage.removeItem('ACCESS_TOKEN');
        setUser(null);
        setToken(null);
    }

    const getUser = () => {
        axiosClient.get('/api/user')
            .then(({ data }) => {
                setUser(data.user)
                setKey(data.code)    
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 401) {
                    setUser({})
                    setToken(null)
                }
                if (response && response.status == 405) {
                    setUser(response.data[1])
                    setKey(response.data[2])
                    console.log(response.data)
                }
                if (response && response.status == 500) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data);
                }
            })
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            code,
            welcome,
            setWelcome,
            setUser,
            setToken,
            getUser,
            setKey,
            setCode,
            wait,
            logOutUser,
            home,
            setHome,
            showPop,
            setShowPop,
            menu,
            setMenu,
            auth,
            setAuth,
            showEdit,
            setScrollArticle,
            setShowEdit,
            scrollArticle,
            showSignUp,
            setShowSignUp,
            showSignIn,
            setShowSignIn,
            topicForm,
            setTopicForm,
            descriptionState,
            setDescriptionState,
            categoryState,
            setCategoryState,
            selectedOption,
            setSelectedOption,
            articleTitle,
            setArticleTitle,
            keywordState,
            setKeywordState,
            artValue,
            setArtValue,
            catValue,
            setCatValue,
            keyValue,
            setKeyValue,
            loading,
            setLoading,
            editStatus,
            setEditStatus,
            showSavedArticles,
            setShowSavedArticles,
            showSavedTopics,
            setShowSavedTopics,
            about,
            setAbout,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)