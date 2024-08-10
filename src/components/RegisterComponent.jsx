import { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import '../css/signup.css';
import axiosClient from '../pages/AxiosClient';
import { useGeminiContext } from '../context/GoogleGemini';

// A component for both Registeration and Logging in of the user

function RegisterComponent() {

    // Getting Authpage status from stateContext to know which element to display or not
    const { setToken, wait, setLoading, setUser, setShowSignUp, showSignUp, setShowSignIn, showSignIn } = useStateContext();
    const { setStateError, setErrorContent } = useGeminiContext()
    // Creating Ref for the input fields and labels
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState("");
    //Empty label object
    const labelList = {};

    //function to return back to introPage
    function backToAuth() {
        setShowSignUp(false);
        setShowSignIn(false)
    }

    //Control function for the input fields and label interations
    function inputControl(e, status) {
        let labelId = e.target.id;
        // Getting the label Element from the Labellist assigned by useEffect
        // Using the target inputfield id to find the corresponding label to control
        let label = labelList[labelId];
        label.classList.add("labelUp");
        label.classList.add("keepColor");
        if (!e.target.value && status) {
            label.classList.remove("labelUp");
            label.classList.remove("keepColor");
            console.log(label.innerHTML);
        } else if (e.target.value && status) {
            label.classList.remove("keepColor");
        }
    }

    function controlAuth(){
        setShowSignIn(!showSignIn);
        setShowSignUp(!showSignUp);
    }
    // Register Users and Log them in if successful.
    const register = (ev) => {
        ev.preventDefault()
        const payload = {
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordRef.current.value,
        }   
        setLoading(true)
        axiosClient.post('/register', payload)
            .then(({ data }) => {
                setToken(data.token)
                setUser(data.user)
                setLoading(false)
                setStateError(true);
                setErrorContent("Registration successful.");
                wait(5500).then(()=>setStateError(false))
                //console.log(data)
                })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
                if (response && response.status == 500) {
                    //console.log(response.data.message);
                }
                setStateError(true);
                 setErrorContent("Registration failed");
                setLoading(false);
                wait(5500).then(()=>setStateError(false))
            })

    }

    // Send login credentials to backend, if successful log user in.
    const login = (ev) => {
        ev.preventDefault()

        const details = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setLoading(true);
        axiosClient.post('/login', details)
          .then(({ data }) => {
            setToken(data.token)
            setUser(data.user)
            setLoading(false)
            setStateError(true);
            setErrorContent("Login successful.");
            wait(5500).then(()=>setStateError(false))
            //console.log(data)
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status == 422) {
              setErrors(response.data.errors)
              //console.log(response.data.errors);
            }
            if (response && response.status == 500) {
              //console.log(response.data.message);
            } else {
              //console.log(response.data);
            }
            setStateError(true);
            setErrorContent("Login failed");
            setLoading(false);
            wait(5500).then(()=>setStateError(false))
          })
    }
    //Effect to assign label Elements to Object
    useEffect(() => {
        labelList["username"] = username.current;
        labelList["email"] = email.current;
        labelList["password"] = password.current;
    })

    return (
        <div id="signUpP" className={(showSignUp || showSignIn) ? "showSign" : undefined}>
            <div className="topSign" onClick={backToAuth}><i className="fa fa-arrow-left btnHover" ></i><p className="signT">{ showSignIn ? "Sign in" : showSignUp ? "Sign up" : null}</p></div>
            <div className="conSign">
                <form onSubmit={showSignUp ? (e)=>register(e) : showSignIn ? (e)=> login(e) : undefined}>
                    {showSignUp ? (
                        <div className="inputSign" >
                            <label ref={username} htmlFor="username">Username</label>
                            <input type="text" ref={usernameRef} required name="username" id="username" onFocus={(e) => inputControl(e)} onMouseOut={(e) => inputControl(e, true)} onChange={()=>setErrors("")} />
                            {errors.name && <span className='error'>{errors.name[0]}</span>}
                        </div>
                    ) : null}
                    <div className="inputSign" >
                        <label ref={email} htmlFor="email">Email</label>
                        <input type="email" ref={emailRef} required name="email" id="email" onFocus={(e) => inputControl(e)} onMouseOut={(e) => inputControl(e, true)} onChange={()=>setErrors("")}/>
                        {errors.email && <span className='error'>{errors.email[0]}</span>}
                    </div>
                    <div className="inputSign" >
                        <label ref={password} htmlFor="password">Password</label>
                        <input type="password" ref={passwordRef} required name="password" id="password" onFocus={(e) => inputControl(e)} onMouseOut={(e) => inputControl(e, true)} onChange={()=>setErrors("")}/>
                        {errors.password && <span className='error'>{errors.password[0]}</span>}
                    </div>
                    <p className="bySign" >By signing in, you agree to our <strong>Terms of Use</strong> as well as our <strong>Privacy</strong> and <strong>Cookies Policy</strong></p>
                    <div className="inputSign inputBtn" >
                        <input type="submit" value={ showSignIn ?  "Sign in"  : showSignUp ?"Create account": "Sign up"} name="submit" id="submit" />
                    </div>
                </form>
            </div>
            <div className="signBottom" >
                <hr />
                <div>
                    <p> {showSignIn ? "Don't have an account?" : "Already have an account?"} <strong onClick={controlAuth}> { showSignIn ? "Sign up" : showSignUp ? "Sign in" : null} </strong></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;