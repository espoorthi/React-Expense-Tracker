import React,{useState} from "react";

const popupContext = React.createContext({
  enable: false,
  openPopup: () => {},
  closePopup: () => {},
  popupData:{}
});

export const PopupProvider = (props) => {
    const [showPopup,setShowPopup] = useState(false);
    const [popupData,setPopupData] = useState({});

    const openPopup = (heading,message)=>{
        setShowPopup(true);
        setPopupData({heading,message});
    }

    const closePopup = ()=>{
        setShowPopup(false);
    }

  return <popupContext.Provider value={{
      enable:showPopup,
      openPopup,
      closePopup,
      popupData

  }}>{props.children}</popupContext.Provider>;
};

export default popupContext;