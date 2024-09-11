import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/home.css';
import phonePNG from '../assets/img/phone.png';
import passwdPNG from '../assets/img/passwd.png';
import namePNG from '../assets/img/name.png';
import idPNG from '../assets/img/id.png';

import { registration } from "../action/user";
import { useDispatch } from 'react-redux'; // Импортируем useDispatch

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    // const [termsAccepted, setTermsAccepted] = useState(false); // Добавляем состояние для чекбокса

    const navigate  = useNavigate(); // Инициализируем useHistory
    
    const dispatch = useDispatch(); // Получаем dispatch

    const handleRegistration = async () => {
        if (name && surname && phone && password && id) {
            
            const registrationSuccess = await dispatch(registration(name, surname, phone, password, id));
            if (registrationSuccess) {
                navigate("/main");
            }
        }
    };

    const isFormValid = name && surname && phone && password && id; // Проверка валидности формы

    return (
        <div className="auth">
            <div className="form">
                <h1 className="h1-auth">Регистрация</h1>
                <div className="input__div">
                    <img src={namePNG} alt="person" className="phonePNG"/>
                    <input 
                        value={name} 
                        onChange={(event) => setName(event.target.value)} 
                        type="text" 
                        className="input" 
                        placeholder="Имя"
                    />
                </div>
                <div className="input__div">
                    <img src={namePNG} alt="person" className="phonePNG"/>
                    <input 
                        value={surname} 
                        onChange={(event) => setSurname(event.target.value)} 
                        type="text" 
                        className="input" 
                        placeholder="Фамилия"
                    />
                </div>
                <div className="input__div">
                    <img src={idPNG} alt="person" className="phonePNG"/>
                    <input 
                        value={id} 
                        onChange={(event) => setId(event.target.value)} 
                        type="text" 
                        className="input" 
                        placeholder="Персональный код"
                    />
                </div>
                <div className="input__div">
                    <img src={phonePNG} alt="Phone" className="phonePNG"/>
                    <input 
                        value={phone} 
                        onChange={(event) => setPhone(event.target.value)} 
                        type="number" 
                        className="input" 
                        placeholder="Номер телефона"
                    />
                </div>
                <div className="input__div">
                    <img src={passwdPNG} alt="Password" className="phonePNG"/>
                    <input 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" 
                        className="input" 
                        placeholder="Придумайте пароль"
                    />
                </div>
                {/* <div className="input__div">
                    <input 
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={() => setTermsAccepted(!termsAccepted)} 
                        className="checkbox"
                    />
                    <span className="checkbox-text">
                        Нажимая галочку вы принимаете все условия договора
                    </span>
                </div> */}
                <button 
                    className={`buttonLogin ${isFormValid ? '' : 'disabled'}`} 
                    onClick={handleRegistration}
                    disabled={!isFormValid}
                >
                    Зарегистрироваться
                </button>
                <Link to="/login" className="link__auth">Войти</Link>
            </div>
        </div>
    )
}

export default Registration;
