import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";
import moment from 'moment'
import { useSelector } from 'react-redux';

const Comment = ({comment, onLike}) => {
    const [user, setUser] = useState({})
    const {currentUser} = useSelector(state=>state.user)
    console.log(user)

    useEffect(()=>{
        const getUser = async () =>{
            try{
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            }catch(err){
                console.log(err)
            }
        }

        getUser()
    }, [comment])


  

  return (
    <div className='flex items-top p-4 border-b dark:border-gray-600 text-sm'>
        <div>
            <img className='flex-shrink-0 mr-3 w-10 h-10 rounded-full object-cover bg-gray-200' src={user.profilePicture} alt="user image" />
        </div>
        <div>
            <div className='flex items-center mb-2'>
                <span className='font-bold text-xs mr-2 truncate'>{user ? `@${user.username}` : 'Anonymous user'}</span>
                <span className='text-xs text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 mb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t max-w-fit dark:border-gray-700 gap-2 '>
                <button onClick={()=>onLike(comment._id)} type="button" className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                    <FaThumbsUp className='text-sm' />
                </button>
                <p className='text-gray-400'>
                    {comment.numOfLikes > 0 && comment.numOfLikes + " " + (comment.numOfLikes === 1 ? 'like' : "likes")}
                </p>
            </div>
        </div>
    </div>
  )
} 

export default Comment