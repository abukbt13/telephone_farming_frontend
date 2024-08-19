
import DashboardHome from "@/views/Dashboard/FarmManager/DashboardHome.vue";
import LRC from "@/components/dashboard/LRC.vue";
import LrcHome from "@/views/Dashboard/LRC/LrcHome.vue";


const routes =[
    {
        path: '/lrc',
        component: LrcHome,
        // children:
        //     [
        //         {
        //             path: '/farm_manager',
        //             component: LRC,
        //         },
        //         {
        //             path: '/education', // This will be /farm_manager/progress
        //             component: Education,
        //         },
        //     ]
    }
]

export default routes
