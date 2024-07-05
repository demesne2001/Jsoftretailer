import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import StockToSalesContext from '../contex/StockToSalesContext';
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import StockToSalesHeader from './Stock_To_Sales_Components/StockToSalesHeader';
import StockToSalesCharts from './Stock_To_Sales_Components/StockToSalesCharts';

export default function Stock_To_Sales_Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('username') === null || localStorage.getItem('token') === null) {
            navigate('/', { replace: true })
        }
        var element = document.getElementById("root");
        element.scrollIntoView({ block: 'start' })
    }, [])
    return (
        <div>
            <StockToSalesContext>
                <Navbar />
                <StockToSalesHeader />
                <section class="crancy-adashboard crancy-show">
                    <div class="container">
                        <div class="crancy-body">

                            <div class="crancy-dsinner">
                                <div class="row">

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="crancy-adashboard dashboard-graphdetail">
                    <div class="container">
                        <div class="row">
                            <StockToSalesCharts id={1}/>
                            <StockToSalesCharts id={2}/>
                            <StockToSalesCharts id={3}/>
                            <StockToSalesCharts id={4}/>
                            <StockToSalesCharts id={5}/>
                        </div>
                    </div>
                </section>
            </StockToSalesContext>
        </div>
    )
}
