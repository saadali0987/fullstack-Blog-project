import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, Modal } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false) 
  const [commentIdToDelete, setCommentIdToDelete] = useState(null)

 
 
  useEffect(() => {
    const fetchData = async () => {
        console.log("hi")
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json()

        if (res.ok) {
            console.log(data.comments)
          setComments(data.comments)
          if(data.comments.length < 9){
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
    const startIndex = comments.length
    try{
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setComments((prev)=>setComments([...prev, ...data.comments]))
        if(data.comments.length < 9){
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
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if(res.ok)
      {
        setComments(prev=>prev.filter(comm=>comm._id !== commentIdToDelete))
        setShowModal(false)
      }else{
        console.log(data.message)
      }

    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className=' overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments && comments.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>Comment Content</Table.HeadCell>
            <Table.HeadCell>No. of Likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            
          </Table.Head>

          <Table.Body className='divide-y'>
            {comments.map((comment) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                    {comment.content}
                </Table.Cell>
                <Table.Cell>
                  
                    {comment.numOfLikes}
                  
                </Table.Cell>
                <Table.Cell>
                  {comment.postId}
                </Table.Cell>
                <Table.Cell>
                  {comment.userId}
                </Table.Cell>
                
                <Table.Cell>
                  
                 <span onClick={()=>{
                      setShowModal(true)
                      setCommentIdToDelete(comment._id)
                    }} className='text-red-500 font-medium hover:underline text-xs cursor-pointer'>Delete</span>
                  
                  
                </Table.Cell>
                
                  
             
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {showMore && (<Button onClick={handleShowMore} className='w-full self-center text-xs mt-4 '>Show More</Button>)}
        </>
      ) : (<p>There are no comments yet...</p>)}
      {showModal &&
                <Modal dismissible show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this comment? 
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

export default DashComments