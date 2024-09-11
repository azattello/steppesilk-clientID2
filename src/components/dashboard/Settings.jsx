import React, {useEffect, useState } from "react";
import './css/admin.css';
import { getSettings, updateSettings } from '../../action/settings';

const Settings = () => {

    const [videoLink, setVideoLink] = useState('')
    const [chinaAddress, setChinaAddress] = useState('')
    const [whatsappNumber, setWhatsappNumber] = useState('')
    const [aboutUsText, setAboutUsText] = useState('')
    const [prohibitedItemsText, setProhibitedItemsText] = useState('')

    const [ settingList, setSettingList] = useState([]);

    useEffect(() => {
        fetchSettings(); // Вызываем функцию получения данных о филиалах при загрузке компонента
    }, []);
    
    const fetchSettings = async () => {
        try {
            // Вызываем функцию getSettings для получения данных о всех филиалах
            const allSettings = await getSettings();
            setSettingList(allSettings || {});
        } catch (error) {
            console.error('Ошибка при получении данных о филиалах:', error);
        }
    };
    
    useEffect(() => {
        console.log(settingList); // Выполняем действие после обновления состояния settingList
    }, [settingList]);

     
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы по умолчанию
    
        try {
            if(videoLink !== '' || chinaAddress !== '' || whatsappNumber !== '' || aboutUsText !== '' || prohibitedItemsText !== ''){
                // Вызываем функцию addFilial с введенными данными филиала
                const response = await updateSettings(videoLink, chinaAddress,whatsappNumber,aboutUsText,prohibitedItemsText);
                alert('Данные успешно сохранены:', response);
                // Очищаем поля ввода после успешного добавления

                setVideoLink('')
                setChinaAddress('')
                setWhatsappNumber('')
                setAboutUsText('')
                setProhibitedItemsText('')

                fetchSettings()
            }else{
                alert('Все поля пустые')
            }
          
        } catch (error) {
            alert('Ошибка при сохранении данных:', error);
        }
      };
    
    


        
  return (
      <div className="status-list">
        <h1 className="status-list-title">Дополнительная информация</h1>

        <form className="form-filialAdd" onSubmit={handleSubmit}>
            <div className="inputs-wrapper">
            <p><b>Ссылка на инструкцию (youtube, vimeo)</b></p>
            <input 
                className="input-filialAdd"
                type="text"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Ссылка на инструкцию (youtube, vimeo)"
                />
                <p className="settingsGet">
                {settingList.videoLink || ''}
                </p>
            </div>

            <div className="inputs-wrapper">
                <p><b>Адресс китайского склада</b></p>
                <textarea
                    className="input-filialAdd"
                    type="text"
                    value={chinaAddress}
                    onChange={(e) => setChinaAddress(e.target.value)}
                    placeholder="Адресс китайского склада"
                    />
                    <p className="settingsGet">
                    {settingList.chinaAddress || ''}
                    </p>
                
            </div>
            <div className="inputs-wrapper">
                <p><b>Ссылка на ватсап</b></p>
                <input
                    className="input-filialAdd"
                    type="text" 
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Ссылка на ватсап"
                    />
                    <p className="settingsGet">
                    {settingList.whatsappNumber || ''}
                    </p>
                
            </div>
            <div className="inputs-wrapper">
                <p><b>Текст "О нас"</b></p>
                <textarea
                    className="input-filialAdd"
                    type="text"
                    value={aboutUsText}
                    onChange={(e) => setAboutUsText(e.target.value)}
                    placeholder='Текст "О нас"'
                    />
                <p className="settingsGet">
                    {settingList.aboutUsText || ''}
                    </p>
            </div>
            <div className="inputs-wrapper">
                <p><b>Текст "Товары которые нельзя заказывать"</b></p>
                <textarea
                    className="input-filialAdd"
                    type="text"
                    value={prohibitedItemsText}
                    onChange={(e) => setProhibitedItemsText(e.target.value)}
                    placeholder='Текст "Товары которые нельзя заказывать"'
                    />
                <p className="settingsGet">
                    {settingList.prohibitedItemsText || ''}
                    </p>
            </div>

          <button className="filialAdd-button" type="submit" >Сохранить</button>
        </form>
        

          
      </div>
  );
}


export default Settings;