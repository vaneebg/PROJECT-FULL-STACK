
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';


const { TabPane } = Tabs;


const TabsComp = () => {
  return (
    <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
        Holi
        </span>
      }
      key="1"
    >
      Tab 1
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
       Adios
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>
);
  
}

export default TabsComp