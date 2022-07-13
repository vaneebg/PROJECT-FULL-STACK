import Login from '../TabsComp/Login/Login';
import Register from '../TabsComp/Register/Register'
import { Tabs } from 'antd';
import './TabsComp.scss'
const { TabPane } = Tabs;


const TabsComp = () => {
  return (
    <Tabs defaultActiveKey="2"
      tabBarGutter={50} destroyInactiveTabPane={true}>
      <TabPane
        tab={
          <span className='contentHome'>
            <i className="fa-solid fa-building-user"></i>&nbsp;
            Registrarse
          </span>
        }
        key="1"
      >
        <Register />
      </TabPane>
      <TabPane
        tab={
          <span className='contentHome'>
            <i className="fa-solid fa-laptop-file"></i> &nbsp;
            Login        
          </span>
        }
        key="2"
      >
        <Login />
      </TabPane>
    </Tabs>
  );

}

export default TabsComp