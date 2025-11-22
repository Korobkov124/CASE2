import ElectrolyzerSVG from "../components/ElectrolyzerSVG";
import "../Home.css"

function Home() {
    return (
        <div className="elDiv">
            <h1>Модель электролизера</h1>
            <div>
                <ElectrolyzerSVG />
            </div>
            <div className="Inputs">
                <input type="range"></input>
                <input type="range"></input>
                <input type="range"></input>
            </div>
            <div className="Charts">
            { /* TODO: Илюха компонент графиков вот тут*/ }
            </div>
            <div className="Calc">

            </div>
        </div>
    )

}

export default Home;