import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex';

import API from '../../Utility/API'
import post from '../../Utility/APIHandle'

import return1 from '../../Assets/img/svgs bold/return 1.svg'
import return2 from '../../Assets/img/svgs bold/return 2.svg'


export default function ReturnTrend() {

	// const [postData, setPostData] = useState({
    //     "strBranch": "",
    //     "strState": "",
    //     "strCity": "",
    //     "strItem": "",
    //     "strSubItem": "",
    //     "strItemGroup": "",
    //     "strItemSubitem": "",
    //     "strPurchaseParty": "",
    //     "strSalesParty": "",
    //     "strSaleman": "",
    //     "strProduct": "",
    //     "strDesignCatalogue": "",
    //     "strSaleAging": "",
    //     "strModeofSale": "",
    //     "strTeamModeofSale": "",
    //     "FromDate": "",
    //     "ToDate": "",
    //     "strMetalType": "",
    //     "strDayBook": "",
    //     "PageNo": 0,
    //     "PageSize": 0,
    //     "Search": ""
    // })


    // useEffect(()=>{
    //     getdata()
    // },[])
    

    // function getdata() {

    //     post(postData,API.GetReturnTrendCard,'post')
    //     .then((res)=>{
            
    //     })
    // }
    const contexData = useContext(contex);
    const [weight, setweight] = useState([])
    const [costAmount, setcostAmount] = useState()
    let inputdata = contexData.state;

    useEffect(() => {
        getdata()
    }, [inputdata])

    async function getdata() {

        inputdata = { ...inputdata, ['Grouping']: 'r' }
        // console.log("branchwise data", inputdata);
        await post(inputdata, API.CommonCard, {}, 'post')
            .then((res) => {
               
                setweight(res.data.lstResult[0]['FineWt'])
                setcostAmount(res.data.lstResult[0]['CostAmount'])
                // console.log(res.data.lstResult[0]['FineWt'], "weright card");
                inputdata = { ...inputdata, ['Grouping']: '' }
            })
    }

    function format(val) {
        // console.log("value", typeof(val));
		if (localStorage.getItem('value') === 'k') {
            // console.log("thousand selected");
			return ((((val / 1000).toFixed(1)).toString()) + "K");
		} else if (localStorage.getItem('value')  === 'l') {
			return ((((val / 100000).toFixed(1)).toString()) + "L");
		} else if (localStorage.getItem('value')  === 'm') {
			return ((((val / 1000000).toFixed(1)).toString()) + "M");
		} else if (localStorage.getItem('value')  === 'c') {
			return ((((val / 10000000).toFixed(1)).toString()) + "CR");
		}else if (localStorage.getItem('value')  === 'b') {
			return ((((val / 1000000000).toFixed(1)).toString()) + "B");
		} else {
			return Math.floor(val);;
		}
	}

  return (
    
      <div className="col-xl-2 col-lg-4 col-md-4 col-12">
								<div className="graph-card">
									<div className="card-title-top2">
										<h4>Return Trend</h4>
									</div>
									<div className="crancy-progress-card2 top-contant-top-card">
										<div className="crancy-progress-card__content">
											<h4 className="crancy-progress-card__title">{weight}</h4>
											<div className="crancy-progress-card__history">
												<span>(16.57% Ret.)</span>
											</div>
										</div>
										<div className="crancy-progress__single">
											<img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
												fill="none" src={return1}/>
										</div>
									</div>
									<div className="crancy-progress-card2 top-contant-botton-card">
										<div className="crancy-progress-card__content">
											<h4 className="crancy-progress-card__title">{format(costAmount)}</h4>
											<div className="crancy-progress-card__history">
												<span>(16.57% Ret.)</span>
											</div>
										</div>
										<div className="crancy-progress__single">
											<img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
												fill="none" src={return2}/>
										</div>
									</div>
								</div>
							</div>
  )
}
