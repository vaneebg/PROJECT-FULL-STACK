
import { Form, Input, Button, notification ,message, Upload,InputNumber} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined,  UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import {register} from '../../features/auth/authSlice'

const Register=()=> {

    const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('valores formulario',values)
    dispatch(register(values))
    return notification.success({
      message: "Bienvenido!",
      description: "Usuario creado con éxito!",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
 
  const props = {
    name: 'image',
    action: 'http://localhost:8080/users/',
   
  
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
            <InputNumber  min={16} />
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
        label="Confirma Password"
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
      <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Form.Item>
        </Form>
    
  );
}
export default Register