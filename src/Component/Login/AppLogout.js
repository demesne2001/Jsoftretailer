import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];
const AppLogout = ({ children }) => {
    const navigate = useNavigate()
    let timer;
    let m = "5";
    let s = "00";
    function startTimer() {
        function checkSecond(sec) { if (sec < 10 && sec >= 0) { sec = "0" + sec }; if (sec < 0) { sec = "59" }; return sec; }
        setInterval(function () {
            if (document.getElementById('timer') !== null) {
                let presentTime = document.getElementById('timer').innerHTML;
                let timeArray = presentTime.split(/[:]+/);
                m = timeArray[0];
                s = checkSecond((timeArray[1] - 1));
                if (s == 59) { m = m - 1 }
                if (m < 0) {
                    return
                }
                document.getElementById('timer').innerHTML = m + ":" + s;
            }
        }, 1000);
    }

    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
            resetTimer();
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer);
            });
            logoutAction();
        }, 5 * 60 * 1000);
    };

    const resetTimer = () => {
        if (timer) clearTimeout(timer);
    };

    const [Count, setCount] = useState(0)
    let path = window.location.pathname
    useEffect(() => {
        if (window.location.pathname === "/") {
            setCount(1)
        } else {
            setCount(Count + 2)
        }
        if (Count <= 1) {
            if (window.location.pathname === "/") {
                setCount(1)
            } else {
                Object.values(events).forEach((item) => {
                    window.addEventListener(item, () => {
                        m = "5";
                        s = "00";
                        if (document.getElementById('timer') !== null) {
                            document.getElementById('timer').innerHTML = m + ":" + s
                        }
                        resetTimer();
                        handleLogoutTimer();
                    });
                });
                if (document.getElementById('timer') !== null) {
                    document.getElementById('timer').innerHTML = m + ":" + s;
                    startTimer();
                    resetTimer();
                    handleLogoutTimer();
                }
            }

        }
    }, [path]);

    const logoutAction = () => {
        localStorage.clear();
        navigate('/');
        navigate(0);
    };


    return children;

};


export default AppLogout;