
import { lazy } from "react"

//首页
const Index = lazy(() => import('../pages/Index'))

//住户出入申请
const Household = lazy(() => import('../pages/Household'))

//住户基本信息
const Information = lazy(() => import('../pages/Information'))

//突发事件处理
const Emergency = lazy(() => import('../pages/Emergency'))

//公告
const Notice = lazy(() => import('../pages/Notice'))

//来访人员登记
const Pregistration = lazy(() => import('../pages/Pregistration'))

//来访车辆登记
const Vregistration = lazy(() => import('../pages/Vregistration'))

//确诊患者管理
const Diagnosis = lazy(() => import('../pages/Diagnosis'))

//密切接触者管理
const Contact = lazy(() => import('../pages/Contact'))

//死亡管理
const Death = lazy(() => import('../pages/Death'))

//治愈管理
const Cure = lazy(() => import('../pages/Cure'))


const route = [
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/household',
        element: <Household />,
    },
    {
        path: '/information',
        element: <Information />,
    },
    {
        path: '/emergency',
        element: <Emergency />,
    },
    {
        path: '/notice',
        element: <Notice />,
    },
    {
        path: '/pregistration',
        element: <Pregistration />,
    },
    {
        path: '/vregistration',
        element: <Vregistration />,
    },
    {
        path: '/diagnosis',
        element: <Diagnosis />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/death',
        element: <Death />,
    },
    {
        path: '/cure',
        element: <Cure />,
    },

]

export default route
