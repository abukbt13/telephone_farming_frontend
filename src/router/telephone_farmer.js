import ManagerHome from "@/views/Dashboard/FarmManager/DashboardHome.vue";
import Farms from "@/views/Dashboard/TelephoneFarmer/Farms.vue";
import DashboardView from "@/views/Dashboard/TelephoneFarmer/DashboardView.vue";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";
import Managers from "@/views/Dashboard/TelephoneFarmer/Managers.vue";
import Network from "@/views/Dashboard/Network.vue";

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
                    path: '/telephone_farmer/:id',
                    component: Farms
                },
                // {
                //     path: '/telephone_farmer/managers',
                //     component: Managers
                // },

            ]
    }
]
export default routes