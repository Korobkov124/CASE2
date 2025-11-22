import { Link } from "react-router-dom";  
import '../Login.css'

function Registration() {
    return (
        <div className="auth-page">
        
            <div className="auth-illustration">
                <div>
                    <h3>Привет!</h3>
                    <p>Это интерактивная система визуализации технологического процесса электролиза</p>
                </div>
            </div>

            <div className="signUp">
                <h3>Регистрация</h3>
                <div>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Пароль" />
                </div>
                <Link to="/login" className="AuthLink">Login form</Link>
                <button>Войти</button>
            </div>

        </div>
    )
}

export default Registration