import React, { useEffect } from 'react'
import MinimumStockContext from '../contex/MinimumStockContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import MinimumStockHeader from './MinimumStocksComponents/MinimumStockHeader';
import MinimumStockChart from './MinimumStocksComponents/MinimumStockChart';

export default function MinimumStocksDashboard() {
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

            <MinimumStockContext>
                <Navbar />
                <MinimumStockHeader />
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
                            <MinimumStockChart id={3} />
                            <MinimumStockChart id={4} />
                            <MinimumStockChart id={5} />
                        </div>
                    </div>
                </section>
            </MinimumStockContext>
        </div>

    )
}
