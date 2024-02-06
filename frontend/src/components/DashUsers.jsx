import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, Modal } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false) 
  const [userIdToDelete, setUserIdToDelete] = useState(null)
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()

        if (res.ok) {
          setUsers(data.users)
          if(data.users.length < 9){
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
    const startIndex = users.length
    try{
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setUsers((prev)=>setUsers([...prev, ...data.users]))
        if(data.users.length < 9){
          setShowMore(false)
        }
      }
    }catch(err)
    {

    }
  }


  const handleDelete = ()=>{}
  
  return (
    <div className=' overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users && users.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>Profile Picture</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            
          </Table.Head>

          <Table.Body className='divide-y'>
            {users.map((user) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                
                    <img src={user.profilePicture} alt="img" className='w-10 h-10 object-cover bg-gray-200 rounded-full' />
            
                </Table.Cell>
                <Table.Cell>
                  
                    {user.username}
                  
                </Table.Cell>
                <Table.Cell>
                  {user.email}
                </Table.Cell>
                <Table.Cell style={user.isAdmin ? {color:"green", fontWeight: "bold"} : {color:"gray"}}>
                  {user.isAdmin ? "Admin" : "User"}
                </Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setUserIdToDelete(user._id)
                  }} className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>
                
                  
             
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {showMore && (<Button onClick={handleShowMore} className='w-full self-center text-xs mt-4 '>Show More</Button>)}
        </>
      ) : (<p>There are no users yet...</p>)}
      {showModal &&
                <Modal dismissible show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this user? 
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

export default DashUsers