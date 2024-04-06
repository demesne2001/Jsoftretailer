import React, { useEffect, useState } from 'react'

import Gradient from "javascript-color-gradient";

export default function CustomTable() {

    const [sales, setSales] = useState([
        {product: 'Black Watch', thisYearProfit: 312122, color : ""},
        {product: 'Gaming Set',  thisYearProfit: 296232, color : ""},
        {product: 'Brown Purse',  thisYearProfit: 500332, color : ""},
        {product: 'Bamboo Watch', thisYearProfit: 43342, color : ""},
        {product: 'Blue Band' ,thisYearProfit: 8500, color : ""},
        {product: 'Blue T-Shirt',  thisYearProfit: 65323, color : ""},
        {product: 'Chakra Bracelet',thisYearProfit: 150005, color : ""},
        {product: 'Galaxy Earrings',  thisYearProfit: 100214, color : ""},
        {product: 'Game Controller', thisYearProfit: 53322, color : ""},
        {product: 'Gold Phone Case', thisYearProfit: 12533, color : ""}
    ]);

    const gradientArray = new Gradient()
  .setColorGradient("#01555b", "#98c8cb")
  .getColors()

  
  useEffect(()=>{
    gradientdata()
  },[])

  useEffect(()=>{

  },[sales])

  function gradientdata(){
    var j=[]

    for (let index = 0; index < sales.length; index++) {
        j.push({...sales[index],['color']:gradientArray[index]})
        // sales[index].color = gradientArray[index]
        // setSales({...sales,['color']:gradientArray[index]})
    }
    setSales(j)
    // console.log('salsses',j)
  }



  return (
    <div >

      <table align='center' rules='rows' border='white' style={{border:'white'}}>
        <tr>  
            <th> Product</th>
            <th> Profit</th>
        </tr>

        
            {sales.map((data)=>{
                // console.log(data);
                return(
                <tr> 
                    <td style={{backgroundColor:data.color, width:250 ,padding:''}}>{data.product} </td>
                    <td style={{backgroundColor:data.color, width:250}}>{data.thisYearProfit} </td>
        
                </tr>
                )
            })}  
        
        
      </table>

    </div>
  )
}
