import React from 'react'
import './CylinderFilled.css'

export default function CylinderFilled(props) {
    const lineDiffrence = ["100%","80%","60%","40%","20%","0%"]  

	const label = ["x1","x2","x3","x4","x5","x6"]
	const data = ["95%","83%","80%","93%","65%","78%"]
  return (
    <>
    <div className='container itemwise'>
    <div className="background_grid">


    {lineDiffrence.map((yaxis)=>{
        
      return <span className='line' value={yaxis}></span>
    })}


</div>

<div className="base"></div >

<div className="bar_container">

    {data.map((height)=>{

        return <><div className='shell'><div className='bar' style={{maxHeight:height}}/> <div class="hide">{height}</div></div></>
    })}

</div>

<div className='titles'>

    {label.map((label)=>{

        return <span>{label}</span>
    })}
</div>
</div>
</>
  )
}
