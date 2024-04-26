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

export default function Tag_Image() {
    const contextData = useContext(contex);
    const [pagesize, setPageSize] = useState(5);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState();
    const [ImageData, setImageData] = useState([]);
    let inputdata = contextData.chartImage
    useEffect(() => {
        handleShowPhotos()
        console.log(inputdata, "effectimage");
    }, [inputdata])
    useEffect(() => {
        handleShowPhotos()
    }, [])
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
        // console.log(style, className);
        return (
            null
        );
    }

    async function handleShowPhotos() {
        await post(inputdata, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data.lstResult.length !== 0) {
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
                }
                setImageData(imageData);
                setTotalCount(res.data.lstResult[0]['TotalCount']);
            } else {
                setImageData(imageData);
                setTotalCount(0);
            }
        })
    }

    function handleLeftFivePage() {
        if (pageNo > 0) {
            setPageNo(pageNo - 5);
        }
    }
    function handleRightFivePage() {
        console.log(pageNo);
        if (pageNo + 5 < TotalCount) {
            setPageNo(pageNo + 5);
        }
    }

    async function handlePageNoChange(page) {
        console.log(page, "pages");
        var inputPageUpdate = { ...inputdata, ['PageNo']: page }
        setCurrentPage(page)
        await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data.lstResult.length !== 0) {
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
                }
                setImageData(imageData);
                // setTotalCount(res.data.lstResult[0]['TotalCount']);
            }
        })
        // for (let i = 0; i < document.getElementsByClassName('pageImageButtom').length; i++) {
        //     console.log((parseInt(document.getElementsByClassName('pageImageButtom')[i]['id'])), page, 'tagsimage');
        //     if (parseInt(document.getElementsByClassName('pageImageButtom')[i]['id']) === page) {
        //         console.log("image_true",document.getElementById(page) );
        //         document.getElementById(page).style.backgroundColor = "#e3e9ed";
        //         document.getElementById(page).style.color = "#094876";
        //         document.getElementById(page).style.border = "1px solid #094876";
        //     } else {
        //         console.log("image_false");

        //         document.getElementById(page).style.backgroundColor = "#094876";
        //         document.getElementById(page).style.color = "#e3e9ed";
        //         document.getElementById(page).style.border = "";
        //     }
        // }

    }
    // async function handleLeftOnePage() {
    //     if (currentPage > 1) {
    //         var inputPageUpdate = { ...inputdata, ['PageNo']: currentPage - 1 }
    //         setCurrentPage(currentPage - 1)
    //         await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
    //             var imageData = [];
    //             if (res.data.lstResult.length !== 0) {
    //                 for (let i = 0; i < res.data.lstResult.length; i++) {
    //                     imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
    //                 }
    //                 setImageData(imageData);
    //                 // setTotalCount(res.data.lstResult[0]['TotalCount']);
    //             }
    //         })
    //         if (currentPage < pageNo + 2) {
    //             setPageNo(pageNo - 5)
    //         }
    //     }
    // }
    // async function handleRightOnePage() {
    //     if (currentPage < TotalCount) {


    //         var inputPageUpdate = { ...inputdata, ['PageNo']: currentPage + 1 }
    //         setCurrentPage(currentPage + 1)
    //         await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
    //             var imageData = [];
    //             if (res.data.lstResult.length !== 0) {
    //                 for (let i = 0; i < res.data.lstResult.length; i++) {
    //                     imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
    //                 }
    //                 setImageData(imageData);
    //                 // setTotalCount(res.data.lstResult[0]['TotalCount']);
    //             }
    //         })
    //         if (currentPage > pageNo + 4) {
    //             setPageNo(pageNo + 5)
    //         }
    //     }
    // }
    return (
        <>
            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                <div class="title-top-graphdetail">
                    <h5>Tag Image</h5>
                    
                </div>
                <div class="graphdetailcards-silder graphdetail-fourthcard">
                <div align='right'>Page No.{currentPage}</div>
                    {/* <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div> */}


                    <ul id="TagImage" class="js-carousel ag-carousel_list" >
                    {ImageData.length > 0?
                        <Fancybox
                            options={{
                                Carousel: {
                                    infinite: false,
                                },
                            }}
                        >
                  
                            <Slider  {...settings} >
                            

                                {
                                    ImageData.map((e) => {
                                        return <><li class="ag-carousel_item">
                                            <figure class="ag-carousel_figure">
                                                <a data-fancybox="gallery" href={e['ImagePath']}><img src={e['ImagePath']} alt='hii' /></a>
                                                <figcaption class="ag-carousel_figcaption">
                                                    NetWeight: {e['netweight']}<br></br>{e['barcode']}
                                                </figcaption>
                                            </figure>
                                        </li >

                                        </>
                                    })
                                }


                            </Slider>
                          
                           
                        </Fancybox>:
                            <li class="ag-carousel_item">
                            <figure class="ag-carousel_figure">
                               <img src={notFound} alt='hii' />
                               
                            </figure>
                        </li >

                        
                        }

                        <div className='pagonationdiv'>
                            <button class="fa-solid fa-angles-left pageImageButtom" onClick={handleLeftFivePage}></button>
                            {(pageNo + 1)*5 <= (TotalCount + (TotalCount % 5)) ? <button className='pageImageButtom' id={(pageNo + 1)} onClick={() => handlePageNoChange((pageNo + 1))}>{pageNo + 1}</button> : null}
                            {(pageNo + 2)*5 <= (TotalCount + (TotalCount % 5)) ? <button className='pageImageButtom' id={(pageNo + 2)} onClick={() => handlePageNoChange((pageNo + 2))}>{pageNo + 2}</button> : null}
                            {(pageNo + 3)*5 <= (TotalCount + (TotalCount % 5)) ? <button className='pageImageButtom' id={(pageNo + 3)} onClick={() => handlePageNoChange((pageNo + 3))}>{pageNo + 3}</button> : null}
                            {(pageNo + 4)*5 <= (TotalCount + (TotalCount % 5)) ? <button className='pageImageButtom' id={(pageNo + 4)} onClick={() => handlePageNoChange((pageNo + 4))}>{pageNo + 4}</button> : null}
                            {(pageNo + 5)*5 <= (TotalCount + (TotalCount % 5)) ? <button className='pageImageButtom' id={(pageNo + 5)} onClick={() => handlePageNoChange((pageNo + 5))}>{pageNo + 5}</button> : null}
                            <button class="fa-solid fa-angles-right pageImageButtom" onClick={handleRightFivePage}></button>
                        </div>
                    </ul>

                </div>

            </div >
            {/* <button onClick={handleShowPhotos}>Open</button> */}
        </>

    )
}
