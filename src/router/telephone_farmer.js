import ManagerHome from "@/views/Dashboard/FarmManager/Home.vue";
import Farms from "@/views/Dashboard/TelephoneFarmer/Farms.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";

const routes =[
    {
        path: '/telephone_farmer/dashboard',
        component: DashboardView,
        children:
            [
                {
                    path: '/telephone_farmer/dashboard',
                    component: TelephoneFarmerHome
                },
                {
                    path: '/telephone_farmer/farm',
                    component: Farms
                },
            ]
    }
]
export default routes