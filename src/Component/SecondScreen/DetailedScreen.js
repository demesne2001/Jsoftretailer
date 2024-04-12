import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header_detailed from './Components_Detailed/Header_detailed';
import './../Assets/css/Custom.css';
import './../Assets/css/style.css';
import './../Assets/css/responsive.css';
import Main_chart from './Components_Detailed/Main_chart';
import ContexState1 from '../contex/ContextState1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../Assets/image/slider/ring1.png';
import img2 from '../Assets/image/slider/ring2.png';
import img3 from '../Assets/image/slider/ring3.png';
import img4 from '../Assets/image/slider/ring4.png';
import img5 from '../Assets/image/slider/ring5.png';
import img6 from '../Assets/image/slider/Ring11.png';
import img7 from '../Assets/image/slider/Ring12.png';
import img8 from '../Assets/image/slider/Ring13.png';
import img9 from '../Assets/image/slider/Ring14.png';
import img10 from '../Assets/image/slider/Ring15.png';
import Default_chart from './Components_Detailed/default_chart';

export default function DetailedScreen() {
    const location = useLocation()
    const [graph, setGraph] = useState("")
    const [componentName, setComponentName] = useState(location.state)

    

    const settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        getDefaultGraph()
    }, [])

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (

            <div
                className={className}
                style={{ ...style, marginLeft: '100px', display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />

        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        // console.log(style, className);
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />
        );
    }


    function handleOnLink(str) {
        setGraph(str)

        let temp = JSON.parse(localStorage.getItem('defaultGraph')) // to check uncheck checkbox
        console.log(temp.componentName)

        if (str.componentName === temp.componentName ){
            document.getElementById("DefaultCheckBoxSeconScreen").checked = true;
        }
        else{
            document.getElementById("DefaultCheckBoxSeconScreen").checked = false;
        }
    }

    function handleDefault(e) {

        // let temp = JSON.stringify(graph)
        // localStorage.setItem('defaultGraph',temp)

        localStorage.setItem('defaultGraph', JSON.stringify(graph))
    }

    function getDefaultGraph() {

        if (localStorage.getItem('defaultGraph') !== null) {
            setGraph(JSON.parse(localStorage.getItem('defaultGraph')))
            
        }
    }

    return (
        <ContexState1>
            <div id="crancy-dark-light">
                <div class="crancy-body-area">
                    <Header_detailed />
                </div>
                <section class="crancy-adashboard crancy-show">
                    <div class="container"></div>
                </section>
                <section class="crancy-adashboard dashboard-graphdetail">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                <Main_chart state={componentName} />
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                <div class="top-slider">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="graphdetailcards-silder graphdetailtopslider-card">

                                                <ul id="topitem" class="js-carousel ag-carousel_list detailgraph-carousel topicon-gd">
                                                    <Slider {...settings}>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'a.BranchID,b.BranchName', column: 'BranchID', componentName: 'Branch Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-chart-pie icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Branch</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'k.stateID,k.Statename', column: 'Statename', componentName: 'State Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-map-marker-alt icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">State</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'c.cityname', column: 'CityName', componentName: 'City Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-city icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">City</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'l.RegionID,l.RegionName', column: 'RegionName', componentName: 'Region Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="topicon-gd">
                                                                            <div class="crancy-featured-user__ficon">
                                                                                <i class="fas fa-globe icon-m"></i>
                                                                            </div>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Region</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'd.itemID,d.ItemName', column: 'ItemName', componentName: 'Item Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-project-diagram icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Item</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'e.subitemID,e.subItemName', column: 'subItemName', componentName: 'Sub-Item Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-th-list icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Sub-Item</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'o.ItemGroupId,o.GroupName', column: 'GroupName', componentName: 'Item Group Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-chart-area icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Item Group</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'f.ItemSubNAme,f.ItemSubID', column: 'ItemSubID', componentName: 'Item with Sub-item Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-sitemap icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Item with Sub-item</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a  onClick={() => { handleOnLink({ group: 'g.DesigncodeID,g.DesignCode', column: 'DesignCode', componentName: 'Purchase Party Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="graphdetail-topsildericon">
                                                                            <div class="crancy-featured-user__ficon">
                                                                                <i class="fas fa-people-carry icon-m"></i>
                                                                            </div>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Purchase Party</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'a.accountID,c.AccountName', column: 'AccountName', componentName: 'Sales Party Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-handshake icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Sales Party</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'h.SalesmanID,h.SalesmanNAme', column: 'SalesmanNAme', componentName: 'Saleman Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-users icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Saleman</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'i.ProductId,i.ProductName', column: 'ProductName', componentName: 'Product Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-boxes icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Product</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'j.designCatalogID,j.DesignNo', column: 'DesignNo', componentName: 'Design Catalogue Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-gem icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Design Catalogue</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'datename(month,voucherDate)', column: 'MonthName', componentName: 'Month Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-calendar-week icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname" >Month</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'M.FinYearID,m.YearCode', column: 'YearCode', componentName: 'Year Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas  fa-calendar-alt icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Year</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'a.[rd.caption]', column: 'caption', componentName: 'Sale Aging Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-chart-line icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Sale Aging</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', column: 'ChallanGenerateType', componentName: 'Mode of Sale Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-layer-group icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Mode of Sale</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                        <li class="ag-carousel_item">
                                                            <figure class="ag-carousel_figure">
                                                                <a onClick={() => { handleOnLink({ group: '', column: '', componentName: 'Team & Mode of Sale Wise' }) }}>
                                                                    <div class="crancy-featured-user__fcontent">
                                                                        <div class="crancy-featured-user__ficon">
                                                                            <i class="fas fa-stream icon-m"></i>
                                                                        </div>
                                                                        <h4 class="crancy-featured-user__fname">Team & Mode of Sale</h4>
                                                                    </div>
                                                                </a>
                                                            </figure>
                                                        </li>
                                                    </Slider>
                                                </ul>
                                            </div>
                                            <div class="crancy-featured-default-box">
                                                <div class="crancy-featured-user__fcontent graphdetaildefault">
                                                    <form class="form-check checkbox-filter">
                                                        <input class="form-check-input" type="checkbox" value="" id="DefaultCheckBoxSeconScreen" onClick={handleDefault} />
                                                        <label class="form-check-label checkbox-filter-label graphdetail-text" for="DefaultCheckBoxSeconScreen">Set as Default</label>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <Default_chart graph={graph} />
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div class="title-top-graphdetail">
                                    <h5>Tag Image</h5>
                                </div>
                                <div class="graphdetailcards-silder graphdetail-fourthcard">
                                    <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div>
                                    <ul id="TagImage" class="js-carousel ag-carousel_list">
                                        <Slider  {...settings}>
                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        111
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        112
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        113
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        114
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        115
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        116
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        117
                                                    </figcaption>
                                                </figure>
                                            </li>

                                            <li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a href={img1} data-fancybox="gallery">
                                                        <img src={img1} class="ag-carousel_img"
                                                            alt="Certificates 1" />
                                                    </a>

                                                    <figcaption class="ag-carousel_figcaption">
                                                        118
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        </Slider>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>


                </section >
            </div >
        </ContexState1 >

    )
}
