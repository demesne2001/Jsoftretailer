import './Cylinder3d.css'

export default function Cylinder(props) {

  const lineDiffrence = ["100%", "80%", "60%", "40%", "20%", "0%"]

  const label = ["x1", "x2", "x3", "x4", "x5", "x6"]
  const data = ["95%", "83%", "80%", "93%", "65%", "78%"]


  return (
    <>
      <div className='container itemwise'>

        {/* <section className="background_grid">

          <div className='line' value = "100%"></div>
          <div className='line' value = "80%"></div>
          <div className='line' value = "60%"></div>
          <div className='line' value = "40%"></div>
          <div className='line' value = "20%"></div>
          <div className='line' value = "0%"></div>


        <section className='base'></section>

        <section className='bar_container'>

          <div className='bar' style={{ maxHeight: '94%'}}></div>
          <div className='bar' style={{ maxHeight: '20%'}}></div>
          <div className='bar' style={{ maxHeight: '40%'}}></div>
          <div className='bar' style={{ maxHeight: '60%'}}></div>

        </section>

        </section> */}

         {lineDiffrence.map((yaxis) => {

            return <span className='line' value={yaxis}></span>
          })} 

        <div className="base"></div>

        <div className="bar_container">

          {data.map((height) => {

            return <><div className='bar' style={{ maxHeight: height }}><div class="hide"> {height} </div></div></>
          })}

        </div>

        <div className='titles'>

          {label.map((label) => {

            return <span>{label}</span>
          })}
        </div>

      </div>
    </>
  )
}
