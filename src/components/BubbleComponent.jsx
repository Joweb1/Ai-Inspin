import '../css/bubble.css';
import { useStateContext } from "../context/ContextProvider";

function BubbleComponent() {

    const {menu, setMenu} = useStateContext();
    
    function openMenu() {
        setMenu(!menu);
    }

    return (
        <div className= "circleC" id="cc">
			<div className="circleT pie animate">
				<label>
                    <input className="bubble" type="checkbox" name="dummy" value="on" id="introC" onClick={openMenu}/>
                </label>
			</div>
		</div>
    );
}

export default BubbleComponent;