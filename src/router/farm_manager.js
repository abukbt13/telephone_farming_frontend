
import DashboardHome from "@/views/Dashboard/FarmManager/DashboardHome.vue";
import FarmIndex from "@/views/Dashboard/FarmManager/FarmIndex.vue";
import FarmProgress from "@/views/Dashboard/FarmManager/FarmProgress.vue";


const routes =[
    {
        path: '/farm_manager',
        component: DashboardHome,
        children:
            [
                {
                    path: '/farm_manager',
                    component: FarmIndex,
                },
                {
                    path: '/farm_manager/progress/:id', // This will be /farm_manager/progress
                    component: FarmProgress,
                },
            ]
    }
    ]

export default routes
