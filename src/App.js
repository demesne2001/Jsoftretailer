import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import Navbar from './Component/Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import Dashboard from './Component/Sales-Efficiency-Analysis-Dashboard/Dashboard/Dashboard';
import DetailedScreen from './Component/SecondScreen/DetailedScreen';

import './Component/Assets/css/bootstrap-select.min.css'
import './Component/Assets/css/bootstrap.min.css'
import './Component/Assets/css/charts.min.css'
import './Component/Assets/css/font-awesome-all.min.css'
import './Component/Assets/css/reset.css'

// import './Component/Assets/css/style.css'
import './Component/Assets/css/style copy.css'
// import './Component/Assets/css/final_style.css'


import './Component/Assets/css/Custom.css'
import './Component/Assets/css/slick.css'
import './Component/Assets/css/responsive.css'
import Main from './Component/Login/Main';
import Schedule_Analysis_MainScreen from './Component/Schedule_Analysis/Schedule_Analysis_MainScreen';
import DetailedCommanScheduleScreen from './Component/Schedule_Analysis/DetailedScheduleComponants/DetailedCommanScheduleScreen';






// import './Component/Assets/js/bootstrap-select.min';
// import  './Component/Assets/js/bootstrap.min'
// import  './Component/Assets/js/jquery-migrate';
// import  './Component/Assets/js/jquery.min'
// import  './Component/Assets/js/main'
// import  './Component/Assets/js/popper.min';
// import './Component/Assets/js/slick.min';
// import './Component/Assets/js/jquery.fancybox.min';


function App() {
  return (
    
      <Router>
        <div>


          <Routes>
            <Route exact path='/Home' element={<Dashboard />}></Route>
            <Route exact path='/graph-detail' element={<DetailedScreen />}></Route>
            <Route exact path='/schedual_analysis' element={<Schedule_Analysis_MainScreen />}></Route>
            <Route exact path='/schedual_analysis_detail' element={<DetailedCommanScheduleScreen />}></Route>
            <Route exact path='/' element={<Main />}></Route>
          </Routes>


          {/* <script type="text/javascript" src={bootstrapSelectMin}></script>
            <script type="text/javascript" src={bootstrapMin}></script> 

            <script type="text/javascript" src={jqueryMigrate}></script>
            <script type="text/javascript" src={jquaryMin}></script>
            <script type="text/javascript" src={main}></script>
            <script type="text/javascript" src={popperMin}></script> */}


        </div>
      </Router>

  );
}

export default App;
