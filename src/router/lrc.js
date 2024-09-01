
import DashboardHome from "@/views/Dashboard/FarmManager/DashboardHome.vue";
import LRC from "@/views/Dashboard/LRC/LRC.vue";
import LrcHome from "@/views/Dashboard/LRC/LrcHome.vue";
import AllDocuments from "@/views/Dashboard/LRC/Education/AllDocuments.vue";
import AllTrainings from "@/views/Dashboard/LRC/Education/AllTrainings.vue";


const routes =[
    {
        path: '/lrc',
        component: LrcHome,
        children:
            [
                {
                    path: '',
                    component: LRC,
                },
                {
                    path: '/education/documents', // This will be /farm_manager/progress
                    component: AllDocuments,
                },
                {
                    path: '/education/training', // This will be /farm_manager/progress
                    component: AllTrainings,
                },
            ]
    }
]

export default routes
