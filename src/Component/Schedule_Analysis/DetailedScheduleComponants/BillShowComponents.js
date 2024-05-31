import React, { useContext, useEffect, useState } from 'react'
import contex from '../../contex/Contex'
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';

export default function BillShowComponents(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.billstate;
    const [billData, setBillData] = useState([]);
    const keyOfBillObject = {
        1: ['AccountName', 'NetWeight targetWt'],
        2: ['AccountName', 'Avgtime SpendMin'],
        3: ['AccountName', 'NetWeight AvgExpe'],
        4: ['AccountName', 'NetWeight targetWt'],
        5: ['AccountName', 'OutTime', 'SpendMin SpendDays'],
        6: ['AccountName', 'BillNetWeight TotalSalesNetWeight']
    }

    useEffect(() => {
        if (JSON.stringify(inputdata) !== JSON.stringify({
            "ScheduleID": 0,
            "Mode": 0
        })) {
            getBillcardData();
        }

    }, [inputdata])



    function getBillcardData() {
        inputdata = { ...inputdata, ['Mode']: props.id };

        post(inputdata, API.GetChartPartyDetails, {}, "post").then((res) => {
            if (res.data !== undefined) {
                setBillData(res.data.lstResult);
            } else {
                alert("Network Error!!!");
            }
        })
    }
    return (
        <div className='bill-container'>
            {
                billData.map((e, i) => {
                    return <div>
                        <button id="btn-message" class="button-message" >
                            <div class="content-avatar">
                                <div class="status-user"></div>
                                <div class="avatar">
                                    <svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
                                </div>
                            </div>
                            <div class="notice-content">

                                {props.id !== 5 ? keyOfBillObject[props.id].map((key, i) => {
                                    return i === 0 ? <div class="username">{key} : {e[key]}</div> : <div class="username">{key.split(' ')[0]} : {e[key.split(' ')[0]]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{key.split(' ')[1]} : {e[key.split(' ')[1]]}</div>
                                }) : keyOfBillObject[props.id].map((key, i) => {
                                    return i === 0 || i === 1 ? <div class="username">{key} : {e[key]}</div> : <div class="username">{key.split(' ')[0]} : {e[key.split(' ')[0]]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{key.split(' ')[1]} : {e[key.split(' ')[1]]}</div>
                                })}
                            </div>
                        </button>
                    </div >
                })
            }


        </div >
    )
}
