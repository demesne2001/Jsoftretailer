import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header_detailed from './Components_Detailed/Header_detailed';
import './../Assets/css/style.css';
import './../Assets/css/responsive.css';
import Main_chart from './Components_Detailed/Main_chart';
import ContexState1 from '../contex/ContextState1';

export default function DetailedScreen() {
    const location = useLocation()
    console.log(location.state);

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
                                <Main_chart chart={location.state} />
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                <div class="top-slider">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="graphdetailcards-silder graphdetailtopslider-card">
                                                <div class="ag-carousel-arrow_box carousel-arrow-top">
                                                    <i class="js-ag-carousel-arrow_prev ag-carousel-arrow"></i>
                                                    <i class="js-ag-carousel-arrow_next ag-carousel-arrow"></i>
                                                </div>
                                                <ul id="topitem" class="js-carousel ag-carousel_list detailgraph-carousel topicon-gd">
                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
                                                                <div class="crancy-featured-user__fcontent">
                                                                    <div class="crancy-featured-user__ficon">
                                                                        <i class="fas fa-calendar-week icon-m"></i>
                                                                    </div>
                                                                    <h4 class="crancy-featured-user__fname">Month</h4>
                                                                </div>
                                                            </a>
                                                        </figure>
                                                    </li>
                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
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
                                                            <a href="#">
                                                                <div class="crancy-featured-user__fcontent">
                                                                    <div class="crancy-featured-user__ficon">
                                                                        <i class="fas fa-stream icon-m"></i>
                                                                    </div>
                                                                    <h4 class="crancy-featured-user__fname">Team & Mode of Sale</h4>
                                                                </div>
                                                            </a>
                                                        </figure>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="crancy-featured-default-box">
                                                <div class="crancy-featured-user__fcontent graphdetaildefault">
                                                    <form class="form-check checkbox-filter">
                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                        <label class="form-check-label checkbox-filter-label graphdetail-text" for="flexCheckChecked">Set
                                                            as Default</label>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </ContexState1>

    )
}
