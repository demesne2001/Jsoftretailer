import React, { useContext, useEffect, useState } from 'react';
import Fancybox from './Fancybox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import contex from '../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import { map } from '../../Assets/font/js/v4-shims';
import notFound from '../../Assets/image/imageNotFound.jpg'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import src from 'react-select/dist/declarations/src';

export default function Tag_Image(props) {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    const [pagesize, setPageSize] = useState(5);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState();
    const [ImageData, setImageData] = useState([]);
    const [show, setShow] = useState(false);
    const filtername = contextData.TageImageFilterName

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let inputdata = contextData.chartImage
    useEffect(() => {
        handleShowPhotos()

        setCurrentPage(1)
        setPageNo(0)
        console.log(inputdata, "sdtagimage");
    }, [inputdata])
    useEffect(() => {
        handleShowPhotos()
    }, [])
    useEffect(() => {
        if (pageNo === 0) {
            document.getElementById('prev').style.display = 'none';
        } else {
            document.getElementById('prev').style.display = 'block';
        }

        if ((pageNo + 5) * 5 >= TotalCount) {
            document.getElementById('nxt').style.display = 'none';
        } else {
            document.getElementById('nxt').style.display = 'block';
        }
    }, [pageNo, TotalCount])
    const settings = {

        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 0,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            null
            // <div
            //     // className={className}
            //     // style={{ ...style, marginLeft: '100px', zIndex: '1', display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
            //     // onClick={onClick}

            // />

        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;

        return (
            null
        );
    }

    async function handleShowPhotos() {
        inputdata = { ...inputdata, 'FromDate': props.Date.FromDate, 'ToDate': props.Date.ToDate }
        await post(inputdata, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data !== undefined) {
                if (res.data.lstResult.length !== 0) {
                    for (let i = 0; i < res.data.lstResult.length; i++) {
                        imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'Tagno': res.data.lstResult[i]['Tagno'] })
                    }
                    setImageData(imageData);
                    setTotalCount(res.data.lstResult[0]['TotalCount']);
                } else {
                    setImageData(imageData);
                    setTotalCount(0);
                }
            } else {
                alert(res['Error']);
            }
        })
    }

    function handleLeftFivePage() {
        if (pageNo > 0) {
            setPageNo(pageNo - 5);
        }
    }
    function handleRightFivePage() {

        if ((pageNo + 5) * 5 < TotalCount) {
            setPageNo(pageNo + 5);
        }
    }

    async function handlePageNoChange(page) {

        var inputPageUpdate = { ...inputdata, ['PageNo']: page }
        setCurrentPage(page)
        await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data !== undefined) {
                console.log(res.data.lstResult);
                if (res.data.lstResult.length !== 0) {
                    for (let i = 0; i < res.data.lstResult.length; i++) {
                        imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'Tagno': res.data.lstResult[i]['Tagno'] })
                    }
                    setImageData(imageData);
                    // setTotalCount(res.data.lstResult[0]['TotalCount']);
                }
            } else {
                alert(res['Error']);
            }
        })
        // for (let i = 0; i < document.getElementsByClassName('pageImageButtom').length; i++) {

        //     if (parseInt(document.getElementsByClassName('pageImageButtom')[i]['id']) === page) {

        //         document.getElementById(page).style.backgroundColor = "#e3e9ed";
        //         document.getElementById(page).style.color = "#094876";
        //         document.getElementById(page).style.border = "1px solid #094876";
        //     } else {


        //         document.getElementById(page).style.backgroundColor = "#094876";
        //         document.getElementById(page).style.color = "#e3e9ed";
        //         document.getElementById(page).style.border = "";
        //     }
        // }

    }






    return (
        <>
            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                <div class="title-top-graphdetail">
                    <h5><span>Tag Image {filtername !== "" ? "( " + filtername + " )" : null}</span> <div className='pageNo'>Page No.{currentPage}</div></h5>

                </div>
                <div class="graphdetailcards-silder graphdetail-fourthcard">

                    {/* <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div> */}


                    <ul id="TagImage" class="js-carousel ag-carousel_list" >
                        {ImageData.length > 0 ?
                            <Fancybox>
                                <Slider  {...settings} >
                                    {
                                        ImageData.map((e, i) => {
                                            console.log(e, "imagedata");
                                            return <><li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">

                                                    <a data-fancybox="gallery" href={e['ImagePath']} data-caption={" Net Wt : " + e['netweight'].toFixed(3) + ", Tagno : " + e['Tagno']}><img src={e['ImagePath']} /></a>
                                                    {/* <img src={e['ImagePath']} onClick={(e) => { openModal() }} class="hover-shadow cursor" /> */}
                                                    <figcaption class="ag-carousel_figcaption">
                                                        Net Wt: {e['netweight'].toFixed(3)}<br></br>Tag No: {e['Tagno']}
                                                    </figcaption>
                                                </figure>
                                            </li >

                                            </>
                                        })
                                    }
                                </Slider>
                            </Fancybox> :
                            <li class="ag-carousel_item">
                                <figure class="ag-carousel_figure">
                                    <img src={notFound} alt='hii' />
                                </figure>
                            </li>
                        }
                        <div className='padonation'>
                            <div className='pagonationdiv'>
                                {/* {TotalCount}  */}
                                {/* {(TotalCount + (TotalCount % 5) + 1)} */}
                                <button id='prev' class="fa-solid fa-angles-left pageImageButtom prev-nxt" onClick={handleLeftFivePage}></button>
                                {(pageNo + 1) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 1)} onClick={() => handlePageNoChange((pageNo + 1))}>{pageNo + 1}</button> : null}
                                {(pageNo + 2) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 2)} onClick={() => handlePageNoChange((pageNo + 2))}>{pageNo + 2}</button> : null}
                                {(pageNo + 3) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 3)} onClick={() => handlePageNoChange((pageNo + 3))}>{pageNo + 3}</button> : null}
                                {(pageNo + 4) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 4)} onClick={() => handlePageNoChange((pageNo + 4))}>{pageNo + 4}</button> : null}
                                {(pageNo + 5) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 5)} onClick={() => handlePageNoChange((pageNo + 5))}>{pageNo + 5}</button> : null}
                                <button id='nxt' class="fa-solid fa-angles-right pageImageButtom prev-nxt" onClick={handleRightFivePage}></button>

                            </div>

                        </div>
                    </ul>

                </div>


            </div>

        </>

    )
}
