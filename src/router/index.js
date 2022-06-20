import {
    createRouter,
    createWebHashHistory
}
    from 'vue-router'
import Lyout from '../page/layout/layout.vue'
import Main from '../page/main/main.vue'
import Containers from '../page/Docker/Containers.vue'
import Image from "../page/Docker/Image.vue";
import Networks from '../page/Docker/networks.vue'
import Monitoring_New from '../page/Monitoring/New.vue'
import Plan_New from '../page/Plan/Plan_New.vue'
import Safe_Group from '../page/Safe_Group/Safe_Group.vue'
import Monitoring_See from '../page/Monitoring/See.vue'
import Basic from '../page/main/Basic.vue'
import Plan_see from "../page/Plan/Plan_see.vue";
import Journal from "../page/Journal/journal.vue";

const routes = [
    {
        path:"/",
        component: Lyout,
        redirect:'/Main',
        children:[
            {
                path:'/Main',
                name:Main,
                component:Main
            },
            {
                path:'/Basic',
                name:'Basic',
                component: Basic
            },
            {
                path: '/Containers',
                name:Containers,
                component: Containers
            },
            {
                path:'/Image',
                name:Image,
                component: Image
            },
            {
                path:'/Networks',
                name:Networks,
                component: Networks
            },
            {
                path: '/Monitoring_NEW',
                name:Monitoring_New,
                component: Monitoring_New,
            },
            {
                path:'/Monitoring_See',
                name:Monitoring_See,
                component: Monitoring_See
            },
            {
                path:'/Plan_New',
                name:Plan_New,
                component: Plan_New
            },
            {
                path:'/Plan_See',
                name:Plan_see,
                component: Plan_see
            },
            {
                path:'/Journal',
                name:Journal,
                component: Journal
            },
            {
                path:'/Safe_Group',
                name:Safe_Group,
                component: Safe_Group
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router


