import { useStateContext } from "../context/ContextProvider";
import "../css/about.css";

function AboutComponent() {
    const { about, setAbout } = useStateContext();

    return (
        <div id="abouted" className={about ? "trashdT act" : "trashdT"} >
            <div className="xclose" onClick={() => setAbout(false)}><i className="fa fa-solid fa-close"></i> </div>
            <p className="headId">About Ai Inspin <i className="fa fa-solid fa-question"></i></p>
            <div className="abt" >
                <div>
                    <h3>Creator: Uroh Jonadab</h3>
                    <section id="about">
                        <p>Ai Inspin is an innovative content generation tool designed to help bloggers and writers spark new ideas and create high-quality content with ease. Inspired by the hackathon hosted by <strong> Gemini</strong>, our platform leverages the power of artificial intelligence to suggest engaging blog titles, relevant keywords, and thought-provoking topics.</p>
                        <br />
                        <p>With Ai Inspin, users can:</p>
                        <ul>
                            <li>Generate unique and captivating blog title ideas</li>
                            <li>Discover relevant keywords to optimize their content for search engines</li>
                            <li>Explore thought-provoking topics to inspire their writing</li>
                            <li>Create high-quality blog articles with our AI-powered content generation tool</li>
                            <li>Seamlessly publish their content directly to WordPress</li>
                        </ul>
                        <p>Our mission is to empower writers and bloggers to produce exceptional content that resonates with their audience, while saving time and effort in the content creation process. <br /> <br />Try Ai Inspin today and unlock your full writing potential!</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AboutComponent;