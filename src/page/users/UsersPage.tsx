import { usersAPI } from '@/api/user.api'
import { AppContext, AppContextType } from '@/contexts/app.context'
import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TablePaginationConfig, TableProps } from 'antd'
import { Button, Input, Popconfirm, Spin, Table, Tag } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

interface DataType {
  id: number
  name: string
  email: string
  role: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

interface UsersResponse {
  count: number
  next: string | null
  previous: string | null
  results: DataType[]
}

export default function UsersPage() {
  const { setIsAuthenticated } = useContext<AppContextType>(AppContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<DataType[]>([])

  const queryClient = useQueryClient()

  const { data: usersData, isLoading } = useQuery<UsersResponse>({
    queryKey: ['users', currentPage, pageSize],
    queryFn: () =>
      usersAPI.getUsers({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
      })
  })

  console.log('usersData:', usersData)
  useEffect(() => {
    if (usersData) {
      setIsAuthenticated(true)
      const filtered = usersData.results.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      setFilteredData(filtered)
    }
  }, [usersData, searchTerm])

  const data = filteredData
  const total = usersData?.count || 0

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersAPI.deleteUser(id)
  })

  const handleDeleteUser = async (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Deleted user successfully')
        queryClient.invalidateQueries(['users'] as InvalidateQueryFilters)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1)
    setPageSize(pagination.pageSize || 6)
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role.name',
      key: 'role',
      render: (_, record) => (
        <Tag color={record.role.name === 'member' ? 'processing' : 'green'}>{record.role.name}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='flex justify-center gap-4'>
          <Link to={`/users/${record.id}`}>
            <Button className='text-white bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>VIEW</Button>
          </Link>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDeleteUser(record.id)}>
            <Button className='text-white bg-red-400 hover:bg-red-500 hover:shadow-md'>DELETE</Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className='space-y-4'>
      <Input placeholder='Search...' className='flex mt-4 ml-auto w-80' onChange={handleSearch} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['6', '10', '20', '50'],
          onChange: (page, size) => handleTableChange({ current: page, pageSize: size })
        }}
        loading={{
          indicator: (
            <div>
              <Spin size='large'>
                <div className='content' />
              </Spin>
            </div>
          ),
          spinning: isLoading
        }}
        onChange={(pagination) => handleTableChange(pagination as TablePaginationConfig)}
      />
    </div>
  )
}
