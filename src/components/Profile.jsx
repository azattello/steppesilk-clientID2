import React, { useEffect, useState } from "react";
import './styles/profile.css';
import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";
import profile from '../assets/img/profile.png'
import { useNavigate, useLocation } from "react-router-dom";
import Tab from './Tab'
import { Link } from "react-router-dom";
import config from "../config";
import house from '../assets/icons/home-outline.svg';
import house2 from '../assets/icons/home.svg';
import box from '../assets/icons/layers-outline.svg';
import box2 from '../assets/icons/layers.svg';
import user from '../assets/icons/person-circle-outline.svg';
import user2 from '../assets/icons/person-circle.svg';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false); // Состояние для модального окна
    const [personalId, setPersonalId] = useState(""); // Состояние для ввода персонального кода
    const titlePage = 'Профиль';

    useEffect(() => {
        // Функция для получения данных профиля пользователя
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);
                } else {
                    console.error('Failed to fetch user profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const savePersonalId = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/auth/update-id`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: personalId })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser.user); // Обновляем данные пользователя
                setShowModal(false); // Закрываем модальное окно
            } else {
                console.error('Failed to update personal code:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating personal code:', error.message);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <div className="profile">
            <header className="header">
                <div className='LogoHeader'>
                    <div className="title2">
                        {titlePage}
                    </div>
                </div>

                <ul className="Menu">
                    <Link to="/main" className="tabbutton-menu">
                        <img className="icons-svg" src={location.pathname === '/main' ? house2 : house} alt="" />
                        <p style={location.pathname === '/main' ? { color: '#1F800C' } : { color: '#808080' } }>Главная</p>
                    </Link>
                    <Link to="/parcels" className="tabbutton-menu" >
                        <img className="icons-svg" src={location.pathname === '/parcels' ? box2 : box} alt="" />
                        <p style={location.pathname === '/parcels' ? { color: '#1F800C' } : { color: '#808080' } }>Посылки</p>
                    </Link>
                    <Link to="/profile" className="tabbutton-menu" >
                        <img className="icons-svg" src={location.pathname === '/profile' ? user2 : user} alt="" />
                        <p style={location.pathname === '/profile' ? { color: '#1F800C' } : { color: '#808080' } }>Профиль</p>
                    </Link>
                </ul>
            </header>

            <div className="section__profile">
                <img src={profile} alt="" className="profile__img" />
                {userData ? (
                    <div>
                        <p className="name info-el">{userData.name} {userData.surname}</p>
                        <p className="info-el">
                            Персональный код: 
                            {userData.id ? (
                                <span>{userData.id}</span>
                            ) : (
                                <span className="personal-code" onClick={openModal}>Указать персональный код</span>
                            )}
                        </p>
                        <p className="info-el">Телефон номер: {userData.phone}</p>
                        <p className="info-el">Аккаунт создан: {formatDate(userData.createdAt)}</p>
                    </div>
                ) : (
                    <p>Загрузка...</p>
                )}

                <div className="logout" onClick={() => {
                    dispatch(logout());
                    navigate("/");
                }}>Выйти</div>
            </div>
            <Tab />

            {/* Модальное окно для ввода персонального кода */}
            {showModal && (
              <div className="modal">
                  <div className="modal-content">
                      <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                      <h2>Укажите персональный код</h2>
                      <input
                          type="text"
                          value={personalId}
                          onChange={(e) => setPersonalId(e.target.value)}
                          placeholder="Введите персональный код"
                      />
                      <button onClick={savePersonalId}>Сохранить</button>
                  </div>
              </div>
          )}

        </div>
    );
};

export default Profile;
