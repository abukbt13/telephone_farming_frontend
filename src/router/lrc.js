
import DashboardHome from "@/views/Dashboard/FarmManager/DashboardHome.vue";
import LRC from "@/views/Dashboard/LRC/LRC.vue";
import LrcHome from "@/views/Dashboard/LRC/LrcHome.vue";
import AllDocuments from "@/views/Dashboard/LRC/Education/AllDocuments.vue";
import AllTrainings from "@/views/Dashboard/LRC/Training/AllTrainings.vue";
import YouTubeAll from "@/views/Dashboard/LRC/youtube/YouTubeAll.vue";
import NewProp from "@/views/Props/NewProp.vue";
import PassProp from "@/views/Props/PassProp.vue";


const routes =[
    {
        path: '/lrc',
        component: LrcHome,
        children:
            [
                {
                    path: '/lrc',
                    component: LRC,
                },
                {
                    path: 'documents', // This will be /farm_manager/progress
                    component: AllDocuments,
                },
                {
                    path: 'training', // This will be /farm_manager/progress
                    component: AllTrainings,
                },
                {
                    path: 'Youtube', // This will be /farm_manager/progress
                    component: YouTubeAll,
                },
                {
                    path: 'props', // This will be /farm_manager/progress
                    component: NewProp,
                },
                {
                    path: 'passprop', // This will be /farm_manager/progress
                    component: PassProp,
                },

            ]
    }
]

export default routes
