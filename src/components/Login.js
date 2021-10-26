import React from 'react'
import login from './loginLogo.svg'
import { Link } from 'react-router-dom';

const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = props;

    return (
        <section>
            <div className="loginContainer">
                <img src={login} alt='logo' width='110' height='110' />
                <h4>Имя пользователя</h4>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}></input>
                <p className="errorMsg">{emailError}</p>
                <h4>Пароль</h4>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>  <Link to='/about'>
                            <button onClick={handleLogin}>Вход</button>
                        </Link>
                            <p>Нет учетной записи? <h5 onClick={() => setHasAccount(!hasAccount)}>Зарегистрироваться</h5></p>
                        </>
                    ) : (
                        <>
                        <Link to='/about'>
                            <button onClick={handleSignUp}>Регистрация</button>
                            </Link>
                            <p>У вас есть учетная запись? <h5 onClick={() => setHasAccount(!hasAccount)}>Войти</h5></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;