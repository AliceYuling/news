import React from 'react'
import { Form, Input, Icon, Checkbox, Button, Alert } from 'antd'
import { login } from '../../service/api/user.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formLayout: 'horizontal',
      loginErr: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gotoRegister = this.gotoRegister.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const user = {
        password: values.password,
        userName: values.userName
      }
      if (!err) {
        login(user).then(res => {
          window.localStorage.setItem('user', res.data.result.username)
          window.localStorage.setItem('userId', res.data.result.id)
          this.props.history.push('/home')
        }).catch(err => {
          this.setState({
            loginErr: true
          })
        })
      }
    })
  }

  gotoRegister() {
    this.props.history.push('/register');
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('请确保两次输入密码相同')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { formLayout } = this.state
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    } : null
    return (
      <div style={{width: '100%',textAlign: 'center'}}>
        {
          this.state.loginErr ? (
          <Alert
            message="登录失败"
            description="请检查用户名和密码后重试"
            type="error"
            closable
          />) : null
        }
        <h1>注册</h1>
        <main>
          <Form
            layout={formLayout}
            onSubmit={this.handleSubmit}>
            <Form.Item label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input placeholder="请输入用户名" />
              )}
            </Form.Item>
            <Form.Item label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{marginRight: '16px'}}>
                登 录
              </Button>
              <a href="javascrit:void(0)" onClick={this.gotoRegister}>
                <span>注册</span>
              </a>
            </Form.Item>
          </Form>
        </main>
      </div>   
    )
  }
}

export default Form.create()(Login)
