import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/main.css';
import { getSettings } from '../action/settings';

import guide from '../assets/icons/help-circle-outline.svg';
import track from '../assets/icons/navigate-circle-outline.svg';
import geo from '../assets/icons/map-outline.svg';
import handshake from '../assets/icons/people-circle-outline.svg';
import logo from '../assets/img/logo.jpg'

import Tab from './Tab'
import config from '../config';

import './styles/tab.css';
import house from '../assets/icons/home-outline.svg';
import house2 from '../assets/icons/home.svg';

import box from '../assets/icons/layers-outline.svg';
import box2 from '../assets/icons/layers.svg';


import user from '../assets/icons/person-circle-outline.svg';
import user2 from '../assets/icons/person-circle.svg';

const Main = () => {
    const location = useLocation();
    const [settings, setSettings] = useState([]);
    const [showAdress, setShowAdress] = useState(false); // Для управления видимостью всплывающего окна
    


    const [userData, setUserData] = useState(null);

    
    const fetchSettings = async () => {
        // Вызываем функцию getFilials для получения данных о всех филиалах
        const allSettings = await getSettings();
        setSettings(allSettings || {}); // Обновляем список филиалов
        console.log(settings)
      };

      fetchSettings()

    useEffect(() => {
        // Функция для получения данных профиля пользователя
        const fetchUserProfile = async () => {
            try {
                // Отправляем GET запрос на сервер для получения данных профиля
                const response = await fetch(`${config.apiUrl}/api/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Передаем токен в заголовке запроса
                    }
                });

                // Проверяем, успешно ли выполнен запрос
                if (response.ok) {
                    // Если запрос успешен, получаем данные профиля из ответа
                    const data = await response.json();
                    setUserData(data.user); // Сохраняем данные профиля в состоянии
                } else {
                    // Если произошла ошибка, выводим сообщение об ошибке
                    console.error('Failed to fetch user profile:', response.statusText);
                }
            } catch (error) {
                // Если произошла ошибка при выполнении запроса, выводим сообщение об ошибке
                console.error('Error fetching user profile:', error.message);
            }
        };

        // Вызываем функцию для получения данных профиля пользователя
        fetchUserProfile();
        
    }, []); // Запрос будет выполнен только при первом рендере компонента

    
    const toggleAdress = () => {
        setShowAdress(!showAdress);
    };


    return (

            <div className="main">
                <header className="header">
                    <div className='LogoHeader'>
                        <img src={logo} className="logo2" alt="" />
                        <h3 className='title'> {config.nameCargo}</h3>
                    </div>

                    <ul className="Menu">
                        <Link to="/main" className="tabbutton-menu">
                            <img className="icons-svg" src={location.pathname === '/main' ? house2 : house} alt="" />
                            <p style={location.pathname === '/main' ? { color: '#1F800C' } : { color: '#808080' } }>Главная</p>
                        </Link>
                        
                        <Link to="/parcels" className="tabbutton-menu" >
                            <img className="icons-svg" src={location.pathname === '/parcels' ? box2 : box}  alt="" />
                            <p style={location.pathname === '/parcels' ? { color: '#1F800C' } : { color: '#808080' } }>Посылки</p>
                        </Link>

                        {/* <Link to="/notification" className="tabbutton-menu" >
                            <img src={location.pathname === '/notification' ? bell2 : bell} alt="" />
                            <p>Уведомление</p>
                        </Link> */}

                        <Link to="/profile" className="tabbutton-menu" >
                            <img className="icons-svg" src={location.pathname === '/profile' ? user2 : user}  alt="" />
                            <p style={location.pathname === '/profile' ? { color: '#1F800C' } : { color: '#808080' } }>Профиль</p>
                        </Link>
                        {userData && userData.role === 'admin' && (
                            <Link to="/dashboard" className="tabbutton-menu">Панель управления</Link>
                        )}
                        {userData && userData.role === 'filial' && (
                            <Link to="/dashboard" className="tabbutton-menu">Панель управления</Link>
                        )}
                        
                    </ul>

                </header>
                <div className="section">
                                    
                        <div className="blocks__info">

                            <a href={settings.videoLink || '#'} target='_blank' rel="noreferrer" className="block_info">
                                <h3 className='text__block_info'>Инструкция</h3>
                                <img className="iconMain" src={guide} alt="" />

                            </a>
                            <Link  className="block_info" to="/parcels">
                                    <h3 className='text__block_info'>Отследить трек номер</h3>
                                    <img className="iconMain" src={track} alt="" />
                            </Link>
                            

                            <div className="block_info" onClick={toggleAdress}>
                                <h3 className='text__block_info'>Адрес склада</h3>
                                <img className="iconMain" src={geo} alt="" />

                            </div>

                            <a href={settings.whatsappNumber || '#'} target='_blank' rel="noreferrer" className="block_info ">
                                <h3 className='text__block_info'>Стать партнером</h3>
                                <img className="iconMain" src={handshake} alt="" />

                            </a>


                            
                    </div>
                        {showAdress && (
                            <div className="about">                                   
                                <p className='chinaAddress'>
                                    {settings.chinaAddress}
                                </p>

                            </div>
                        )}

                    <div className="abouts_container">
                        
                        <div className="about">
                            <h3>О нас</h3>
                            <p>{settings.aboutUsText}</p>
                        </div>

                        
                        <div className="about">
                            <h3>Товары, которые нельзя заказывать.</h3>
                            <p>
                            {settings.prohibitedItemsText}
                            </p>
                        </div>
                    </div>


            
                    
                    
                </div>

               

                <div className="area"></div>
                
                <Tab/>
                

                  
                
            </div>

    )
}

export default Main;