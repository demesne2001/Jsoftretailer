import React from 'react'
import SalesEfficiency from './SalesEfficiency'
import Header from '../Header/Header'
import Piegraph1 from './Piegraph1'
import ReturnTrend from './ReturnTrend'
import Collection from './Collection'
import StockAnalysis from './StockAnalysis'
import BranchWise from './BranchWise'
import StateWise from './StateWise'
import CityWise from './CityWise'
import RegionWise from './RegionWise'
import ItemWise from './ItemWise'
import SubItemWise from './SubItemWise'
import ItemGroupWise from './ItemGroupWise'
import ItemWithSubItemWise from './ItemWithSubItemWise'
import PurchasePartyWise from './PurchasePartyWise'
import SalesPartyWise from './SalesPartyWise'
import SalesManWise from './SalesManWise'
import ProductWise from './ProductWise'
import DesignCatalogueWise from './DesignCatalogueWise'
import MonthWise from './MonthWise'
import YearWise from './YearWise'
import SalesAgingWise from './SalesAgingWise'
import ModeofSalesWise from './ModeofSalesWise'
import TeamModeofSalesWise from './TeamModeofSalesWise'

import ContexState from '../../contex/ContexState'

// import bootstrapSelectMin from '../../Assets/js/bootstrap-select.min';
// import bootstrapMin from '../../Assets/js/bootstrap.min'
// import jqueryMigrate from '../../Assets/js/jquery-migrate';
// import jquaryMin from '../../Assets/js/jquery.min'
// import main from '../../Assets/js/main'
// import popperMin from '../../Assets/js/popper.min';


export default function Dashboard() {
    
    return (
        <div>
            <ContexState>
            <Header />

            <section className="crancy-adashboard crancy-show">
                <div className="container">
                    <div className="crancy-body">
                        <div className="crancy-dsinner">

                            <div className="row">

                                <Piegraph1 />
                                <SalesEfficiency />
                                <ReturnTrend/>
                                <Collection/>
                                <StockAnalysis/>

                            </div>

                            <div className="row crancy-gap-30">
                                <BranchWise/>
                                <StateWise/>
                                <CityWise/>
                                <RegionWise/>
                                <ItemWise/>
                                <SubItemWise/>
                                <ItemGroupWise/>
                                <ItemWithSubItemWise/>
                                <PurchasePartyWise/>
                                <SalesPartyWise/>
                                <SalesManWise/>
                                <ProductWise/> 
                                <DesignCatalogueWise/>
                                <MonthWise/>
                                <YearWise/>
                                <SalesAgingWise/>
                                <ModeofSalesWise/>
                                {/* <TeamModeofSalesWise/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <script type="text/javascript" src={bootstrapSelectMin}></script>
            <script type="text/javascript" src={bootstrapMin}></script>
            <script type="text/javascript" src={jqueryMigrate}></script>
            <script type="text/javascript" src={jquaryMin}></script>
            <script type="text/javascript" src={main}></script>
            <script type="text/javascript" src={popperMin}></script> */}
    
        </ContexState>
        </div>
    )
}
