
import { Form, Input, Button, notification , InputNumber} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';


const Register=()=> {
  const onFinish = (values) => {
    console.log('valores formulario',values)
    return notification.success({
      message: "Bienvenido!",
      description: "Usuario creado con éxito!",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  return (
   
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 29 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre de usuario"
            name="username"
            rules={[{ required: true, message: "Introduce un nombre de usuario" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: "Introduce tu edad" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Introduce tu correo" }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} />
          </Form.Item>
         
          <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Introduce una contraseña',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Confirma tu contraseña',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden!'));
            },
          }),
        ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}/>
      </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Form.Item>
        </Form>
    
  );
}
export default Register