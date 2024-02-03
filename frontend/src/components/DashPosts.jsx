import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import {Link} from 'react-router-dom'

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [postsData, setPostsData] = useState([])
  console.log(postsData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()

        if (res.ok) {
          setPostsData(data.posts)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (currentUser.isAdmin) {
      fetchData()
    }
  }, [currentUser._id])


  return (
    <div className=' overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && postsData && postsData.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className='divide-y'>
            {postsData.map((post) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt="img" className='w-20 h-10 object-cover bg-gray-200' />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white'  to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {post.category}
                </Table.Cell>
                <Table.Cell>
                  <span className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                    <span>Edit</span>
                  </Link>
                  
                </Table.Cell>
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (<p>You have no posts yet...</p>)}
    </div>
  )
}

export default DashPosts