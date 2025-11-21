import '../Login.css'

function Login() {
    return (
        <div className="auth-page">
        
            <div className="auth-illustration">
                <div>
                    <h3>Привет!</h3>
                    <p>Это интерактивная система визуализации технологического процесса электролиза</p>
                </div>
            </div>

            <div className="signUp">
                <h3>Авторизация</h3>
                <div>
                    <input type="text" placeholder="Ваше имя" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Пароль" />
                </div>
                <button>Войти</button>
            </div>

        </div>
    )
}

export default Login