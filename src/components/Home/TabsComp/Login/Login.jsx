import { useDispatch } from 'react-redux'
import {login} from '../../../../features/auth/authSlice'
import { Form, Input, Button } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss'
const Login = () => {

    const onFinish = (values) => {
        console.log('formulario',values)
        dispatch(login(values))
    
      }
    
      const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo)
      }

const dispatch = useDispatch()

return (
  <div className="centerLog">
    <Form className='formLog'
    name="basic"
    labelCol={{ span: 9 }}
    wrapperCol={{ span: 20 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Pon tu email" }]}
    >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Pon tu contraseña!" }]}
    >
      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button className='logbtn' type="primary" htmlType="submit">
        Enviar
      </Button>
    </Form.Item>
  </Form>
  </div>
)
}
export default Login
