import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex'
import API from '../../Utility/API'
import post from '../../Utility/APIHandle'
import StockAnalysis2 from '../../Assets/img/svgs bold/stock analysis 2.svg'
import Vector2 from '../../Assets/img/svgs bold/Vector (2).svg'

export default function StockAnalysis() {

  const contexData = useContext(contex);
  const [tag, settag] = useState(0)
  const [loose, setloose] = useState(0)
  let inputdata = contexData.state;

  useEffect(() => {

    getdata()

  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'stock' }

    await post(inputdata, API.CommonCard, {}, 'post')
      .then((res) => {
        console.log(res)
        if (res.data !== undefined) {
          if (res.data.lstResult.length > 0) {
            if (res.data.lstResult.length === 1) {
              settag(res.data.lstResult[0]['NetWt']);
              setloose(0)
            }else{
              settag(res.data.lstResult[1]['NetWt']);
              setloose(res.data.lstResult[0]['NetWt'])
            }
          

            inputdata = { ...inputdata, ['Grouping']: '' }
          }
        } else {
          alert(res['Error']);
        }
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
            <h4 className="crancy-progress-card__title">{tag !== undefined ? tag.toString() + " KG":"0 KG"}</h4>
            <div className="crancy-progress-card__history">
              <span>(Tag Stock)</span>
            </div>
          </div>
          <div className="crancy-progress__single">
            <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
              fill="none" src={StockAnalysis2} />
          </div>
        </div>
        <div className="crancy-progress-card4 top-contant-botton-card">
          <div className="crancy-progress-card__content">
            <h4 className="crancy-progress-card__title">{loose !== undefined ? loose.toString() + " KG" : "0 KG"}</h4>
            <div className="crancy-progress-card__history">
              <span>(Loose Stock)</span>
            </div>
          </div>
          <div className="crancy-progress__single">
            <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
              fill="none" src={Vector2} />
          </div>
        </div>
      </div>
    </div>
  )
}
