import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import msgs_en from "../json/locales/en.json";
import msgs_fr from "../json/locales/fr.json";

const menu_messages = {
  en: msgs_en,
  fr: msgs_fr,
};

const Context = React.createContext();

const getDirection = () => {
  const lng = localStorage.getItem("locale");
  if (!lng || ["en", "fr"].indexOf(lng) === -1)
    localStorage.setItem("locale", "fr");
  return localStorage.getItem("direction");
};

export default function IntlProviderWrapper({ children }) {
  const [state, setState] = useState({
    locale: localStorage.getItem("locale"),
    messages: menu_messages[localStorage.getItem("locale")],
    direction: getDirection(),
  });
  
  return (
    <Context.Provider
      value={{
        state,
        switchLanguage: (language) => {
          setState({
            locale: language,
            messages: menu_messages[language],
            direction: getDirection(),
          });
          localStorage.setItem("locale", language);
        },
      }}
    >
      <IntlProvider
        key={state.locale}
        locale={state.locale}
        messages={state.messages}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
}
export { IntlProviderWrapper, Context as IntlContext };
