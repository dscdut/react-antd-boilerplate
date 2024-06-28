import { usersAPI } from '@/api/user.api'
import config from '@/configs'
import HttpStatusCode from '@/constants/http'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Skeleton } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function UsersDetails() {
  const { id } = useParams()

  const {
    data: getUserDetail,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ['usersDetails', id],
    queryFn: () => usersAPI.getUserDetails(id as unknown as number)
  })
  console.log('getUserDetail:', getUserDetail?.id)
  const [name, setName] = useState(getUserDetail?.name || '')
  const [email, setEmail] = useState(getUserDetail?.email || '')
  const [role, setRole] = useState(getUserDetail?.role.name || '')
  const [createdAt, setCreatedAt] = useState<string | undefined>(getUserDetail?.created_at || '')

  useEffect(() => {
    if (isSuccess && getUserDetail) {
      setName(getUserDetail.name)
      setEmail(getUserDetail.email)
      setRole(getUserDetail.role.name)
      setCreatedAt(getUserDetail.created_at)
    }
  }, [isSuccess, getUserDetail])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const res = await axios.put(
        `${config.baseUrl}/users/${id}/`,
        {
          name,
          email,
          role: { name: role }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      )
      if (res.status === HttpStatusCode.Ok) {
        toast.success('User updated successfully')
        refetch()
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col justify-center w-full p-6 mx-auto space-y-4'>
      <h1 className='flex justify-center mx-auto text-3xl'>Users Details</h1>
      <form action='' className='flex flex-col justify-center gap-4 mx-auto' onSubmit={handleSubmit}>
        <div className='flex items-center gap-4 space-y-2'>
          <label htmlFor='name' className='w-32 text-xl font-bold'>
            Name
          </label>
          {name ? (
            <Input
              id='name'
              placeholder='Name here ...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <Skeleton active paragraph={{ rows: 1 }} />
          )}
        </div>
        <div className='flex items-center gap-4 space-y-2'>
          <label htmlFor='email' className='w-32 text-xl font-bold'>
            Email
          </label>
          {email ? (
            <Input
              id='email'
              placeholder='Email here ...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <Skeleton active paragraph={{ rows: 1 }} />
          )}
        </div>
        <div className='flex items-center gap-4 space-y-2'>
          <label htmlFor='role' className='w-32 text-xl font-bold'>
            Role
          </label>
          {role ? (
            <Input
              id='role'
              placeholder='Role here ...'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='outline-none lg:w-96'
            />
          ) : (
            <Skeleton active paragraph={{ rows: 1 }} />
          )}
        </div>
        <div className='flex items-center gap-4 space-y-2'>
          <label htmlFor='created_at' className='w-32 text-xl font-bold'>
            Created At
          </label>
          {createdAt ? (
            <Input
              id='created_at'
              placeholder='Created here ...'
              value={createdAt}
              disabled
              className='outline-none lg:w-96'
            />
          ) : (
            <Skeleton active paragraph={{ rows: 1 }} />
          )}
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Link to='/users'>
            <Button className='w-20 mt-10 text-white bg-gray-500 shadow-md hover:bg-blue-500'>Back</Button>
          </Link>
          <Button className='w-40 mt-10 text-white bg-blue-400 shadow-md hover:bg-blue-500' htmlType='submit'>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
