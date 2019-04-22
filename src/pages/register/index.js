import React from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd'
import { register } from '../../service/api/user.js'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formLayout: 'horizontal'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gotoLogin = this.gotoLogin.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const user = {
        email: values.email,
        nikename: values.nickname,
        password: values.password,
        phone: values.phone,
        username: values.userName
      }
      if (!err) {
        register(user).then(res => {
          window.localStorage.setItem('user', user.username)
          window.localStorage.setItem('userId', res.data.result)
          this.props.history.push('/home')
        })
      }
    })
  }

  gotoLogin() {
    this.props.history.push('/login');
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
            <Form.Item label="邮箱" {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱' }],
              })(
                <Input placeholder="请输入邮箱" />
              )}
            </Form.Item>
            <Form.Item label="电话" {...formItemLayout}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入电话' }],
              })(
                <Input placeholder="请输入电话" />
              )}
            </Form.Item>
            <Form.Item label="昵称" {...formItemLayout}>
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入昵称' }],
              })(
                <Input placeholder="请输入昵称" />
              )}
            </Form.Item>
            <Form.Item label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </Form.Item>
            <Form.Item label="确认密码" {...formItemLayout}>
              {getFieldDecorator('confirmPwd', {
                rules: [{ required: true, message: '请确认密码!' },
                { validator: this.compareToFirstPassword }],
              })(
                <Input type="password" placeholder="输入密码切确保与第一次输入相同" />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{marginRight: '16px'}}>
                注 册
              </Button>
              <a href="javascrit:void(0)" onClick={this.gotoLogin}>
                <span>登录</span>
              </a>
            </Form.Item>
          </Form>
        </main>
      </div>   
    )
  }
}

export default Form.create()(Register)
