import React, { useContext, useEffect, useState } from 'react';
import Fancybox from './Fancybox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import contex from '../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import notFound from '../../Assets/image/imageNotFound.jpg'

export default function Tag_Image(props) {

    const contextData = useContext(contex);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState();
    const [ImageData, setImageData] = useState([]);
    const filtername = contextData.TageImageFilterName

    let inputdata = contextData.chartImage
    useEffect(() => {
        handleShowPhotos()
        setCurrentPage(1)
        setPageNo(0)
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
                if (res.data.lstResult.length !== 0) {
                    for (let i = 0; i < res.data.lstResult.length; i++) {
                        imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'Tagno': res.data.lstResult[i]['Tagno'] })
                    }
                    setImageData(imageData);
                }
            } else {
                alert(res['Error']);
            }
        })

    }






    return (
        <>
            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                <div class="title-top-graphdetail">
                    <h5><span>Tag Image {filtername !== "" ? "( " + filtername + " )" : null}</span> <div className='pageNo'>Page No.{currentPage}</div></h5>

                </div>
                <div class="graphdetailcards-silder graphdetail-fourthcard">

                  

                    <ul id="TagImage" class="js-carousel ag-carousel_list" >
                        {ImageData.length > 0 ?
                            <Fancybox>
                                <Slider  {...settings} >
                                    {
                                        ImageData.map((e, i) => {
                                            return <><li class="ag-carousel_item" >
                                                <figure class="ag-carousel_figure">

                                                    <a data-fancybox="gallery" href={e['ImagePath']} data-caption={" Net Wt : " + e['netweight'].toFixed(3) + ", Tagno : " + e['Tagno']}><img src={e['ImagePath']} id='imageid'/></a>
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
                                    <img src={notFound} alt='hii' id='imageid' />
                                </figure>
                            </li>
                        }
                        <div className='padonation'>
                            <div className='pagonationdiv'>
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
