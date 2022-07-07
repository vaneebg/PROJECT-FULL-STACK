
import Login from '../TabsComp/Login/Login';
import Register from '../TabsComp/Register/Register'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import './TabsComp.scss'

const { TabPane } = Tabs;


const TabsComp = () => {
  return (
    <Tabs defaultActiveKey="2" destroyInactiveTabPane={true}>
    <TabPane
      tab={
        <span>
          <AppleOutlined />
        </span>
      }
      key="1"
    >

        <Register/>
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
        </span>
      }
      key="2"
    >

      <Login/>
    </TabPane>
  </Tabs>
);
  
}

export default TabsComp