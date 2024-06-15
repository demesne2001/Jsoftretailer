import React, { useEffect, useState } from 'react'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import DynamicHeader from './DynamicHeader'
import ContexState from '../contex/ContexState'
import post from '../Utility/APIHandle'
import API from '../Utility/API'
import CommonchartComp from './CommonchartComp'
import { useLocation } from 'react-router-dom'
import { render } from 'react-dom'


export default function DynamicDashBoard() {

    let inputd = {
        VendorID: 0,
        PageID: 0
    }

    const [ChartConfigobj, setChartConfigobj] = useState([]);
    const location = useLocation()
    useEffect(() => {
        FetchchartConfig()
    }, [location.state])
    // useEffect(() => {
    //     FetchchartConfig()
    // }, [ChartConfigobj])

    function FetchchartConfig() {
        inputd = { ...inputd, PageID: location.state.PageID}
        post(inputd, API.GetDynamicChartConfig, [], 'post').then((res) => {            
            if (res.data != undefined) {
                if (res.data.lstResult.length > 0) {
                    
                    setChartConfigobj(res.data.lstResult)
                    inputd = { ...inputd, PageID: 0 }
                }
                else {
                    setChartConfigobj([])
     
                }
            }
        })

    }
    return (
        <div>
            <Navbar></Navbar>
            <ContexState>
                <DynamicHeader PageName={location.state.PageName}></DynamicHeader>
            </ContexState>
            <div className=''>
                <section className="crancy-adashboard crancy-show" >
                    <div className="container" >
                        <div className="crancy-body">
                            <div className="crancy-dsinner">
                                <div id='rootElementId'  >
                                    <div className="row crancy-gap-30">                                        
                                        {ChartConfigobj.map((key, i) => {
                                            return <CommonchartComp Chartconf={key} pageID={location.state.PageID}> </CommonchartComp>
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}
