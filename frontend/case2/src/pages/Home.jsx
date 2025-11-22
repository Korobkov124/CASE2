import ElectrolyzerSVG from "../components/ElectrolyzerSVG";
import "../Home.css"

function Home() {
    return (
        <div className="elDiv">
            <h1>Модель электролизера</h1>
            <div>
                <ElectrolyzerSVG />
            </div>
        </div>
    )

}

export default Home;