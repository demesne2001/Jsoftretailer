import Schedule_image_Graph from '../../Assets/img/schedule-img/top-graph.png'
import Schedule_img_newcustomer from '../../Assets/img/schedule-img/new customer.svg'
import Schedule_img_customer from '../../Assets/img/schedule-img/customer.svg'
import Schedule_img_Totalsales from '../../Assets/img/schedule-img/Total sales.svg'
import Schedule_img_Totalexpense from '../../Assets/img/schedule-img/Total expense.svg'
import Schedule_img_visitparty from '../../Assets/img/schedule-img/visit party.svg'
import Schedule_img_bill from '../../Assets/img/schedule-img/bill.svg'
import Schedule_img_perday from '../../Assets/img/schedule-img/per-day-1.svg'
import Schedule_img_weight from '../../Assets/img/schedule-img/weight.svg';
import ScheduleContextState from '../../contex/ScheduleContextState';

const CommanShedulecardObject = {
    2: {
        containerClass: "col-xl-2 col-lg-4 col-md-4 col-12",
        innerContainerClass1: "crancy-progress-card2 top-contant-top-card schedule-card-top",
        firstLabel: 'Total Sales',
        apiLabel1: 'TotalSales',
        apiLabel2: 'TotalExpense',
        secondLabel: "Total Expense",
        imageTag1: <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20" fill="none" src={Schedule_img_Totalsales} />,
        innerContainerClass2: "crancy-progress-card2 top-contant-botton-card schedule-card-bottom",
        imageTag2: <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20" fill="none" src={Schedule_img_Totalexpense} />
    },
    4: {
        containerClass: "col-xl-2 col-lg-6 col-md-6 col-12",
        innerContainerClass1: "crancy-progress-card4 top-contant-top-card schedule-card-top",
        firstLabel: 'Per Day Expense',
        secondLabel: "Per Kg Expense",
        apiLabel1: 'dayexpense',
        apiLabel2: 'kgexpense',
        imageTag1: <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20" fill="none" src={Schedule_img_perday} />,
        innerContainerClass2: "crancy-progress-card4 top-contant-botton-card schedule-card-bottom",
        imageTag2: <img class="crancy-color2__fill" width="38" height="38" viewBox="0 0 20 20" fill="none" src={Schedule_img_weight} />
    },
    3: {
        containerClass: "col-xl-2 col-lg-6 col-md-6 col-12",
        innerContainerClass1: "crancy-progress-card3 top-contant-top-card schedule-card-top",
        firstLabel: 'Visited Party',
        secondLabel: "No. of Bill",
        apiLabel1: 'TotalParty',
        apiLabel2: 'No.Bill',
        imageTag1:  <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20" fill="none" src={Schedule_img_visitparty} />,
        innerContainerClass2: "crancy-progress-card3 top-contant-botton-card schedule-card-bottom",
        imageTag2: <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20" fill="none" src={Schedule_img_bill} />
    },
}

export default CommanShedulecardObject;