import React, { useEffect, useState } from "react";
import Map from "./Map";
import img1 from "./Asset/Jsoft.png";
import img2 from "./Asset/jsoft-initial.png";
import "./Asset/Login-Custom.css";
import { Link, useNavigate } from "react-router-dom";
import post from "../Utility/APIHandle";
import API from "../Utility/API";
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'


const Login = () => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(true);
  const [count, setcount] = useState("");
  const [login, setLogin] = useState({
    LoginID: "",
    PassWord: "",
  });
  let optionDonut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    chartId: 'RegionWiseLogin',
    propdata: [
      { value: 40 },
      { value: 38 },
      { value: 32 },
      { value: 30 },
      { value: 28 },
      { value: 26 },
      { value: 22 },
      { value: 18 }
    ],
    radius: [10, 150]
  }
  let optionPolar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'pie',
    height: '100%',
    width: '100%',
    chartId: 'RegionWiselogin',
    propdata: [
      { value: 800, name: '' },
      { value: 635, name: '' },
      { value: 580, name: '' },
      { value: 484, name: '' },
      { value: 300, name: '' },
      { value: 200, name: '' }
    ],
    radius: [15, 300],
  }
  let optionbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'bar',
    height: '800%',
    width: '103%',
    chartId: 'ItemWiseLogin',
    Xaxis: ['A', 'B', 'C', 'd', 'E'],
    Yaxis: [10, 20, 30, 40, 50],
  }
  let Halfpolar = {
    themeId: localStorage.getItem("ThemeIndex"),
    chartId: 'half-polar-barLogin',
    charttype: 'half-polar-bar',
    height: '100%',
    width: '100%',
    angleAxis: [
      {
        type: 'category',
        polarIndex: 0,
        startAngle: 90,
        endAngle: 0,
        data: ['S1', 'S2', 'S3', 's4']
      },
      {
        type: 'category',
        polarIndex: 1,
        startAngle: -90,
        endAngle: -180,
        data: ['T1', 'T2', 'T3', 't4']
      }
    ],
    dataset: [
      {
        type: 'bar',
        polarIndex: 0,
        colorBy: 'data',
        data: [11, 22, 33, 44],
        coordinateSystem: 'polar'
      },
      {
        type: 'bar',
        polarIndex: 1,
        colorBy: 'data',
        data: [19, 29, 40, 27],
        coordinateSystem: 'polar'
      }
    ]
  }
  let animation = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'live-bar',
    height: '800%',
    width: '100%',
    chartId: 'Loginpage',
  }
  useEffect(() => {
    if (count === "") {

      setTimeout(() => {
        setcount(0);
      }, 3500);
    } else {
      if (count < 6) {
        if (count === 0) {
          document.getElementsByClassName("user")[0].focus();
          setTimeout(() => {
            setcount(count + 1);
          }, 1500);
        } else if (count === 4) {
          setTimeout(() => {
            setcount(count + 1);
          }, 7700);
        }
        else {
          setTimeout(() => {
            setcount(count + 1);
          }, 1500);
        }
      } else {
        setflag(false);
      }
    }
  }, [count]);

  function handleLogin() {
    post(login, API.login, {}, "post").then((res) => {
      if (res.data === undefined) {
        alert(res.Error)
        if (document.getElementsByClassName('user') !== undefined) {
          document.getElementsByClassName('user')[0].value = "";
          document.getElementsByClassName('user')[1].value = "";
          document.getElementsByClassName('user')[0].focus()
        }
      } else {
        if (res.data.HasError === false) {
              if (res.data.UserName === undefined) {
                alert(res.data.Message)
                if (document.getElementsByClassName('user') !== undefined) {
                  document.getElementsByClassName('user')[0].value = "";
                  document.getElementsByClassName('user')[1].value = "";
                  document.getElementsByClassName('user')[0].focus()
                }
              } else {
                localStorage.setItem('username', res.data.UserName)
                localStorage.setItem('token', res.data.Token)
                localStorage.setItem('Maintoken', res.data.Token)
                navigate("/Home", { replace: true })
                post({ VendorID: 0, PageID: 0 }, API.GetPageData, [], "post").then(
                  (res) => {
                    if (res.data != undefined) {
                      localStorage.setItem("PageData", JSON.stringify([]));
                      if (res.data.lstResult.length > 0) {

                        localStorage.setItem(
                          "PageData",
                          JSON.stringify(res.data.lstResult)
                        );

                      } else {
                        localStorage.setItem("PageData", JSON.stringify([]));
                      }

                      navigate("/Home", { replace: true });
                    }
                  }
                );
              }
        }else {
          alert(res.data.Message)
          document.getElementsByClassName('user')[0].value = "";
          document.getElementsByClassName('user')[1].value = "";
        }
      }
    })
  }

  function handleoninputChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    if (e.target.name === "PassWord" && e.target.value !== "") {
      document.addEventListener("keydown", keyDownTextField1, false);
      function keyDownTextField1(e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
          if (e.target.value !== "" || document.getElementsByClassName("user") !== undefined) {
            document.getElementsByClassName("user")[2].focus();
            document.removeEventListener("keydown", keyDownTextField1, false);
          }
        }
      }
    } else if (e.target.name === "LoginID" && e.target.value !== "") {
      document.addEventListener("keydown", keyDownTextField, false);
      function keyDownTextField(e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
          document.getElementsByClassName("user")[1].focus();
          document.removeEventListener("keydown", keyDownTextField, false);
        }
      }
    }
  }

  return (
    <div className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4">
        <img src={img1} alt="Trulli" width="100%" height="100%" />
      </span>

      <main className="valign-wrapper">
        <span className="container012 grey-text text-lighten-1 ">
          {count !== "" && (
            <div className="container012" id="opacity">
              <div className="login-box">
                <img src={img2} alt="Avatar" className="avatar" />
                <h2>Login</h2>
                <form>
                  <div className="user-box dd">
                    <input
                      className="user"
                      type="text"
                      name="LoginID"
                      required
                      autoComplete="username"
                      onChange={handleoninputChange}
                    />
                    <label>Username</label>
                  </div>
                  <div className="user-box">
                    <input

                      className="user"
                      type="password"
                      name="PassWord"
                      required
                      autoComplete="current-password"
                      onChange={handleoninputChange}
                    />
                    <label>Password</label>
                  </div>

                  <Link className="user" id="Log" onFocus={handleLogin} replace>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    LOGIN
                  </Link>
                </form>
              </div>
            </div>
          )}
          {flag === true ? (
            count === 0 ? (
              <AlphaDashChart obj={JSON.parse(JSON.stringify(optionPolar))} />
            ) : count === 1 ? (
              <AlphaDashChart obj={JSON.parse(JSON.stringify(optionDonut))} />
            ) : count === 2 ? (
              <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} />
            ) : count === 3 ? (
              <AlphaDashChart obj={JSON.parse(JSON.stringify(Halfpolar))} />
            ) : count === 4 ? (
              <Map />
            ) : count === 5 ? (
              <AlphaDashChart obj={JSON.parse(JSON.stringify(animation))} />
            ) : null
          ) : (
            <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} />
          )}
        </span>
      </main>
    </div>
  );
};

export default Login;
