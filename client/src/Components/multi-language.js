import React, { useContext } from "react";
import { IntlContext } from "../context/internationalization";
import ReactCountryFlag from "react-country-flag";
import { Dropdown, Menu} from "antd";
import "antd/dist/antd.css";
import "../css/languages.css";

export default function Languages() {
  const context = useContext(IntlContext);
  const locales = ["fr", "en"];

  const countries = {
    en: "us",
    fr: "fr",
  };

  const texts = {
    en: "English",
    fr: "Français",
  };
  const menu = (
    <Menu>
      {locales.map((locale, key) => (
        <Menu.Item
          key={key}
          onClick={() => {
            localStorage.setItem("locale", locale);
            context.switchLanguage(locale);
          }}
        >
          <ReactCountryFlag
            style={{ margin: "0 10px" }}
            countryCode={countries[locale]}
            svg
          />
          <span>{texts[locale]}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="dropdown-languages">
      <div className="languages-button">
        <ReactCountryFlag  className="flag"
          // style={{ width: "3em", height: "2em" ,marginRight: "15px",cursor: "pointer"}}
          countryCode={countries[context.state.locale]}
          svg
        />
      </div>
    </Dropdown>
  );
}

// import { Menu, Dropdown, Button, Space } from "antd";
// import "antd/dist/antd.css";
// export default function Languages() {
//   const menu = (
//     <Menu>
//       <Menu.Item>
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           href="https://www.antgroup.com"
//         >
//           1st menu item
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           href="https://www.aliyun.com"
//         >
//           2nd menu item
//         </a>
//       </Menu.Item>
//       <Menu.Item>
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           href="https://www.luohanacademy.com"
//         >
//           3rd menu item
//         </a>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown overlay={menu} placement="bottomLeft">
//           <Button>bottomLeft</Button>
//         </Dropdown>
//       </Space>
//     </Space>
//   );
// }
