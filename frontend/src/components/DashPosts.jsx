import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, Modal } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [postsData, setPostsData] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false) 
  const [postIdToDelete, setPostIdToDelete] = useState(null)
  console.log(postsData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()

        if (res.ok) {
          setPostsData(data.posts)
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (currentUser.isAdmin) {
      fetchData()
    }
  }, [currentUser._id])


  const handleShowMore = async()=>{
    const startIndex = postsData.length
    try{
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setPostsData((prev)=>setPostsData([...prev, ...data.posts]))
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    }catch(err)
    {

    }
  }


  const handleDelete = async()=>{
    setShowModal(false)
    try{
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        setPostsData((prev)=>prev.filter(post=>post._id !== postIdToDelete))
      }
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div className=' overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && postsData && postsData.length > 0 ? (
        <>
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
                  <span onClick={()=>{
                    setShowModal(true)
                    setPostIdToDelete(post._id)
                  }} className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span>
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
        {showMore && (<Button onClick={handleShowMore} className='w-full self-center text-xs mt-4 '>Show More</Button>)}
        </>
      ) : (<p>You have no posts yet...</p>)}
      {showModal &&
                <Modal dismissible show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this post? 
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setShowModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>}
    </div>
  )
}

export default DashPosts