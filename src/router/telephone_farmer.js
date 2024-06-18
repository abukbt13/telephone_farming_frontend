import ManagerHome from "@/views/Dashboard/FarmManager/Home.vue";
import Farms from "@/views/Dashboard/TelephoneFarmer/Farms.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";
import Managers from "@/views/Dashboard/TelephoneFarmer/Managers.vue";

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
                {
                    path: '/telephone_farmer/managers',
                    component: Managers
                },
                // {
                //     path: '/telephone_farmer/farm',
                //     component: Farms
                // },
            ]
    }
]
export default routes