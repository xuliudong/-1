import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import React, { Suspense, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import routers from './routers';
import './App.css'
import Cure from './pages/Cure';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('住户申请', 'sub1', <DesktopOutlined />, [
    getItem('住户出入申请', '/household'),
  ]),
  getItem('信息管理', 'sub2', <UserOutlined />, [
    getItem('住户基本信息', '/information'),
    getItem('突发事件处理', '/emergency'),
    getItem('公告', '/notice'),
  ]),
  getItem('来访登记', 'sub3', <TeamOutlined />, [
    getItem('人员来访登记', '/pregistration'),
    getItem('车辆来访登记', '/vregistration')]
  ),
  getItem('疫情管理', 'sub4', <FileOutlined />,
    [
      getItem('确诊患者管理', '/diagnosis'),
      getItem('密切接触者管理', '/contact'),
      getItem('死亡管理', '/death'),
      getItem('治愈管理', '/cure'),
    ]),
];

const breadcrumbNameMap: Record<string, string> = {
  '/': '首页',
  '/household': '住户出入申请',
  '/information': '住户基本信息',
  '/emergency': '突发事件处理',
  '/notice': '公告',
  '/pregistration': '人员来访登记',
  '/vregistration': '车辆来访登记',
  '/diagnosis': '确诊患者管理',
  '/contact': '密切接触者管理',
  '/death': '死亡管理',
  '/cure': '治愈管理',
};

const arr: any = []
const b:any=[]
const Home = () => {
  const location = useLocation();
  const [routers, setRouters] = useState()
  const pathSnippets = location.pathname.split('/').filter(i => i);
  console.log(pathSnippets);
 
  function itemClick(e:any){
    // console.log('我点击了');
    // console.log(e);
   
    // b.push(...arr)
    
    // console.log(Array.from(new Set(b)).slice(e,-1));
    // arr.p
    // console.log(arr);
    // arr.slice(0)
    // Array.from(new Set(arr))
    // console.log(arr);
    
    
  }
  
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    arr.push(url)
    // arr.length>
    return (
      Array.from(new Set(arr)).map((item:any,index:any) => {
        if (arr.length>=0) arr.unshift()
        console.log(arr);      
        // console.log(url);
        console.log('进来了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊');
        // console.log(breadcrumbNameMap[index]);
        
        console.log(item);
        return <Breadcrumb.Item key={item} onClick={()=>{itemClick(index)}}>
          <Link to={item}>{breadcrumbNameMap[item]}</Link>
        </Breadcrumb.Item>
      })

    );
  });

  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="home">
  //     <Link to="/">Home</Link>
  //   </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);

  return (
    <div className="demo">
     <Breadcrumb>
     <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
     {extraBreadcrumbItems}
     </Breadcrumb>
    </div>
  );
}
// };



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['']);
  const [headFont, setHeadFont] = useState('首页');
  const rootSubmenuKeys = ['/', 'sub1', 'sub2', 'sub3', 'sub4'];
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const element = useRoutes(routers)
  const navigate = useNavigate()
  function onSelect(e: MenuItem) {
    // console.log(items:ItemTe[]);
    const item: any = items.filter(item => item!.key === openKeys[0])
    const result: any = e!.key !== '/' ? item[0].children.find((row: any) => e!.key === row!.key) : ''
    result ? setHeadFont(result.label) : setHeadFont('首页')
    navigate((e!.key) as string)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingLeft: 35, fontSize: 18 }} >
          {headFont}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Home />
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Suspense fallback={'加载中'}>
              {element}
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
