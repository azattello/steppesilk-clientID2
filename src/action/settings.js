import axios from 'axios';
import config from '../config';

let configUrl = config.apiUrl;
export const updateSettings = async (
    videoLink,
    chinaAddress,
    whatsappNumber,
    aboutUsText,
    prohibitedItemsText) => {
  try {
    // Отправляем POST запрос на сервер для добавления нового филиала
    const response = await axios.post(`${configUrl}/api/settings/updateSettings`, {
        videoLink,
        chinaAddress,
        whatsappNumber,
        aboutUsText,
        prohibitedItemsText
    });

    // Если запрос выполнен успешно, возвращаем данные ответа
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
        const { message, errors } = error.response.data;
        console.log('Validation errors:', errors);
        alert(message);
      } else {
            // Если есть ошибка валидации, отображаем сообщение об ошибке
        if (error.response && error.response.status === 400) {
          const { message, errors } = error.response.data;
          console.log('Validation errors:', errors);
          alert(message);
        } else {
          // Если произошла другая ошибка, выводим сообщение об ошибке в консоль
          console.error('Error:', error.message);
        }
      }
  }
};


export const getSettings = async () => {
    try {
      // Отправляем GET запрос на сервер для получения данных о всех филиалах
      const response = await axios.get(`${configUrl}/api/settings/getSettings`);
      
      // Если запрос выполнен успешно, возвращаем данные ответа
      return response.data;
    } catch (error) {
      // Если произошла ошибка, выводим её в консоль и возвращаем null
      console.error('Ошибка при получении данных о филиалах:', error);
      return null;
    }
  };