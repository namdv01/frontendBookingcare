import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { BACKEND_API, systemHeader } from "../utils/constant";
import { LOGOUT, TRANSLATE_EN, TRANSLATE_VN } from "../redux/constants";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import MenuSystemHeader from "./MenuSystemHeader";
import "../scss/systemHeader.scss";
import axios from "axios";
import { logout } from "../redux/thunk";
import { useNavigate } from "react-router-dom";

const SystemHeader = () => {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const auth = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const languageVN = useSelector(
    (state) => state.translateReducer.isVietNamese
  );
  const dispatch = useDispatch();

  const toggleLanguage = (e, value) => {
    dispatch({ type: value });
  };

  const toggleMenu = (e) => {
    setMenu(!menu);
  };

  const logOut = async (e) => {
    dispatch(logout());
  };

  const navigateManage = (path) => {
    if (path == "all") {
      navigate(`./user-manage`);
    } else navigate(`./${path}-manage`);
  };

  useEffect(() => {
    const getOwnUser = async () => {
      const u = await axios
        .get(`${BACKEND_API}/user/getOwner`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          return { name: data.user.fullName, role: data.user.roleId };
        })
        .then(({ name, role }) => {
          setUser(name);
          setRole(role);
        });
    };
    if (auth.isLogin) getOwnUser();
  }, []);

  return (
    <div className="systemHeader">
      <div className="leftSystemHeader">
        <AiOutlineMenu
          size="32"
          style={{ padding: "4px 8px" }}
          className="leftSystemHeader__menu"
          color="#969495"
          onClick={toggleMenu}
        />
        {menu ? (
          <MenuSystemHeader menu={menu} toggleMenu={toggleMenu} />
        ) : (
          <></>
        )}
        <ul>
          {systemHeader.map((item, i) => {
            return typeof item == "string" ? (
              <li key={`systemHeader-item${i}`}>
                <FormattedMessage id={`system_header.${item}`} />
              </li>
            ) : (
              <li className="have-subnav" key={`systemHeader-item${i}`}>
                <FormattedMessage id={`system_header.${item.parent}`} />
                <ul className="subnav-sysHeader">
                  {role == "R1"
                    ? item.child.admin.map((childItem, childIndex) => {
                        return (
                          <li onClick={(e) => navigateManage(childItem)}>
                            <FormattedMessage
                              id={`system_header.${item.parent}.${childItem}`}
                            />
                          </li>
                        );
                      })
                    : item.child.doctor.map((childItem, childIndex) => {
                        return (
                          <li onClick={(e) => navigateManage(childItem)}>
                            <FormattedMessage
                              id={`system_header.${item.parent}.${childItem}`}
                            />
                          </li>
                        );
                      })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rightSystemHeader">
        <div className="user">
          <span className="userName">
            <FormattedMessage id="system_header.helloUser" />,{user}
          </span>
          <span className="menuSys-language">
            {languageVN ? (
              <span>
                <p
                  className="active"
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_VN);
                  }}
                >
                  VI
                </p>
                <p
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_EN);
                  }}
                >
                  EN
                </p>
              </span>
            ) : (
              <span>
                <p
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_VN);
                  }}
                >
                  VI
                </p>
                <p
                  className="active"
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_EN);
                  }}
                >
                  EN
                </p>
              </span>
            )}
          </span>
          <span className="btn-logout" onClick={logOut}>
            <FiLogOut color="white" size="24" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemHeader;
