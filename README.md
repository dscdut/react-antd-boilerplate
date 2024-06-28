<div align="center">
    <img src="https://dut.gdsc.dev/static/media/full_logo.0703a97c176aa84cbc51.jpg" alt="tailwindcss" borderRadius="10px" />
  </div>

<h3 align="center">React Boilerplate</h3>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Assets & Code](#snippets)

## <a name="introduction">🤖 Introduction</a>

Build a react boilerplate application that displays basic pages so candidates can rely on them to use

## <a name="tech-stack">⚙️ Tech Stack</a>

- ReactJS
- TypeScript
- React Query
- Ant Design
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Authentication**: Implement authentication features from the Backend api and Login with Google & Firebase

👉 **CRUD Users**: Build a page that allows users to manipulate data returned from the Backend (update, delete)

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/vophuocthanh/react-boilerplate.git
cd react-boilerplate
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_API_URL=YOUR_API_KEY=
APP_FIREBASE_KEY=
MESSAGING_SENDER_ID=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>pages/auth/Login.tsx</code></summary>

```typescript
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Account } from '@/redux/authSaga'
import { authApi } from '@/api/auth.api'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/utils/storage'
import { toast } from 'sonner'
import { Button, Form, Input, Typography } from 'antd'
import { FieldType } from '@/types/general.type'
const { Text } = Typography

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const loginMutation = useMutation({
    mutationFn: (data: Account) => authApi.login(data)
  })

  const onSubmit = async (data: Account) => {
    setIsLoading(true)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAccessTokenToLS(data.access)
        setRefreshTokenToLS(data.refresh)
        navigate('/')
        toast.success('Login successfully!')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='p-10 space-y-6 border rounded w-[30rem] shadow-md'
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete='off'
        onFinish={onSubmit}
      >
        <Text className='flex justify-center mx-auto text-3xl font-bold'>Login</Text>
        <Form.Item<FieldType>
          label='Email'
          name='email'
          className='mr-20'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input className='w-72' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          className='mr-20'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='w-72' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={isLoading} type='primary' htmlType='submit' className='flex ml-auto'>
            Submit
          </Button>
        </Form.Item>

        <p className='font-medium'>
          Don’t have an account yet?{' '}
          <Link to='/register' className='text-blue-600 underline cursor-pointer'>
            Create account
          </Link>
        </p>
      </Form>
    </div>
  )
}
```

</details>

### Follow GDSC - DUT on [Facebook](https://www.facebook.com/gdsc.dut), [GitHub](https://github.com/dscdut) and [Website](https://dut.gdsc.dev/)

## Source code written by✨

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/92651849?v=4" width="100px;" alt=""/><br /><sub><b>Vo Phuoc Thanh</b></sub>
  </tr>
  
</table>
