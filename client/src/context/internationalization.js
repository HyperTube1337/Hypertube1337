import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import msgs_en from "../json/locales/en.json";
import msgs_fr from "../json/locales/fr.json";
import msgs_ar from "../json/locales/ar.json";
const menu_messages = {
  en: msgs_en,
  fr: msgs_fr,
  ar: msgs_ar,
};
const Context = React.createContext();
const getDirection = () => {
  const lng = localStorage.getItem("locale");
  if (!lng || ["en", "fr", "ar"].indexOf(lng) === -1)
    localStorage.setItem("locale", "fr");
  if (lng === "ar") localStorage.setItem("direction", "rtl");
  else localStorage.setItem("direction", "ltr");
  return localStorage.getItem("direction");
};
export default function IntlProviderWrapper(props) {
  const [state, setState] = useState({
    locale: localStorage.getItem("locale"),
    messages: menu_messages[localStorage.getItem("locale")],
    direction: getDirection(),
  });
  useEffect(() => {
    if (state.direction === "rtl")
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }, [state]);
  const { children } = props;
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
