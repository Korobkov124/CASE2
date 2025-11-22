import { register } from "../components/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Login.css'

function Registration() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onRegistry = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await register(event.target.email.value, event.target.password.value);
        setIsLoading(false);
        navigate('/login');
    }
    return (
        <div className="auth-page">
        
            <div className="auth-illustration">
                <div>
                    <h3>Привет!</h3>
                    <p>Это интерактивная система визуализации технологического процесса электролиза</p>
                </div>
            </div>

            <form className="signUp" onSubmit={ onRegistry }>
                <h3>Регистрация</h3>
                <div>
                    <input type="email" placeholder="Email" id="email" name="email" disabled={ isLoading }/>
                    <input type="password" placeholder="Пароль" id="password" name="password" disabled={ isLoading }/>
                </div>
                <Link to="/login" className="AuthLink">Войти</Link>
                <button type="submit" disabled={ isLoading }>Зарегистрироваться</button>
            </form>

        </div>
    )
}

export default Registration