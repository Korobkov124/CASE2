import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 
import { login } from "../components/AuthService";
import '../Login.css'

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await login(event.target.email.value, event.target.password.value);
        if (response == null){
            alert("ПИПЕЦ");
            return;
        }
        document.cookie = `access_token=${response.accessToken}`;
        setIsLoading(false);
        navigate('/');
    };

    return (
        <div className="auth-page">
        
            <div className="auth-illustration">
                <div>
                    <h3>Привет!</h3>
                    <p>Это интерактивная система визуализации технологического процесса электролиза</p>
                </div>
            </div>

            <form className="signUp" onSubmit={ onLogin }>
                <h3>Авторизация</h3>
                <div>
                    <input type="email" placeholder="Email" id="email" name="email" disabled={ isLoading }/>
                    <input type="password" placeholder="Пароль" id="password" name="password" disabled={ isLoading }/>
                </div>
                <Link to="/registration" className="AuthLink">Зарегистрироваться</Link>
                <button type="submit" disabled={ isLoading }>Войти</button>
            </form>
        </div>
    )
}

export default Login