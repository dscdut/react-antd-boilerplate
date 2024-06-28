import { authApi } from '@/api/auth.api'
import { Account } from '@/redux/authSaga'
import { FieldType } from '@/types/general.type'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const { Text } = Typography

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const registerMutation = useMutation({
    mutationFn: (data: Account) => authApi.register(data)
  })

  const onSubmit = async (data: Account) => {
    setIsLoading(true)
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registration account successful!')
        navigate('/login')
      },
      onError: () => {
        toast.error('An error occurred. Please try again.')
      }
    })
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='p-10 space-y-6 border rounded shadow-md'
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete='off'
        onFinish={onSubmit}
      >
        <Text className='flex justify-center mx-auto text-3xl font-bold'>Register</Text>
        <Form.Item<FieldType>
          label='Email'
          name='email'
          className='mr-10'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input className='w-72' />
        </Form.Item>

        <Form.Item<FieldType>
          label={<div>Password</div>}
          name='password'
          className='mr-10'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='w-72' />
        </Form.Item>
        <Form.Item<FieldType>
          label={<div>Name</div>}
          name='name'
          className='mr-10'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input className='w-72' />
        </Form.Item>
        <Form.Item<FieldType>
          label={<div>Role</div>}
          name='role'
          className='mr-10'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input className='w-72' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={isLoading} type='primary' htmlType='submit' className='flex ml-auto'>
            Register
          </Button>
        </Form.Item>

        <p className='font-medium'>
          Do you already have an account?{' '}
          <Link to='/login' className='text-blue-600 underline cursor-pointer'>
            Login
          </Link>
        </p>
      </Form>
    </div>
  )
}
