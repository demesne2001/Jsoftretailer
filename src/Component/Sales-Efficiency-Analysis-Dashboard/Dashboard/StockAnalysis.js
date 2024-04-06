import React, { useEffect, useState,useContext } from 'react'
import contex from '../../contex/Contex'
import API from '../../Utility/API'
import post from '../../Utility/APIHandle'

import StockAnalysis2 from '../../Assets/img/svgs bold/stock analysis 2.svg'
import Vector2 from '../../Assets/img/svgs bold/Vector (2).svg'

export default function StockAnalysis() {

	// const [postData, setPostData] = useState({
  //       "strBranch": "",
  //       "strState": "",
  //       "strCity": "",
  //       "strItem": "",
  //       "strSubItem": "",
  //       "strItemGroup": "",
  //       "strItemSubitem": "",
  //       "strPurchaseParty": "",
  //       "strSalesParty": "",
  //       "strSaleman": "",
  //       "strProduct": "",
  //       "strDesignCatalogue": "",
  //       "strSaleAging": "",
  //       "strModeofSale": "",
  //       "strTeamModeofSale": "",
  //       "FromDate": "",
  //       "ToDate": "",
  //       "strMetalType": "",
  //       "strDayBook": "",
  //       "PageNo": 0,
  //       "PageSize": 0,
  //       "Search": ""
  //   })


  //   useEffect(()=>{
  //       getdata()
  //   },[])
    

  //   function getdata() {

  //       post(postData,API.GetStockAnalysisCard,'post')
  //       .then((res)=>{
            
  //       })
  //   }
  const contexData = useContext(contex);
  const [tag, settag] = useState()
  const [loose, setloose] = useState()
  let inputdata = contexData.state;

  useEffect(() => {
      getdata()
  }, [inputdata])

  async function getdata() {

      inputdata = { ...inputdata, ['Grouping']: 'stock' }
      // console.log("branchwise data", inputdata);
      await post(inputdata, API.CommonCard, {}, 'post')
          .then((res) => {
             console.log(res.data.lstResult);
              settag(res.data.lstResult[1]['NetAmount']);
              setloose(res.data.lstResult[0]['NetAmount'])
              // console.log(res.data.lstResult[0]['FineWt'], "weright card");
              inputdata = { ...inputdata, ['Grouping']: '' }
          })
  }

  return (
    <div className="col-xl-2 col-lg-6 col-md-6 col-12">
								<div className="graph-card">
									<div className="card-title-top4">
										<h4>Stock Analysis</h4>
									</div>
									<div className="crancy-progress-card4 top-contant-top-card">
										<div className="crancy-progress-card__content">
											<h4 className="crancy-progress-card__title">{tag}</h4>
											<div className="crancy-progress-card__history">
												<span>(Tag Stock)</span>
											</div>
										</div>
										<div className="crancy-progress__single">
											<img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
												fill="none" src={StockAnalysis2}/>
										</div>
									</div>
									<div className="crancy-progress-card4 top-contant-botton-card">
										<div className="crancy-progress-card__content">
											<h4 className="crancy-progress-card__title">{loose}</h4>
											<div className="crancy-progress-card__history">
												<span>(Losse Stock)</span>
											</div>
										</div>
										<div className="crancy-progress__single">
											<img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
												fill="none" src={Vector2}/>
										</div>
									</div>
								</div>
							</div>
  )
}
