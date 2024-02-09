import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'


const CommentSection = ({postId}) => {
  const [comment, setComment] = useState("")
  const {currentUser} = useSelector(state=>state.user)
  const [comments, setComments] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
      e.preventDefault()
      if(comment.length > 200) return
      
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({content: comment, postId, userId:currentUser._id})
      })

      const data = await res.json()

      if(res.ok){
        setComment("")
        setComments([data, ...comments])
      }
  }

  console.log(comments)


  useEffect(()=>{
    const getComments = async()=>{
      try{
        const res = await fetch(`/api/comment/getPostComments/${postId}`)
        if(res.ok){
          const data = await res.json()
          setComments(data)
        }

      }catch(err){
        console.log(err)
      }
    }

    getComments()

  }, [postId])


  const handleLike = async(commentId) =>{
    try{
      if(!currentUser){
        navigate("/sign-in")
        return
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      })

      if(res.ok){
        const data = await res.json()
        setComments(comments.map(commentt=>{
          return commentt._id === commentId ? {...commentt, likes:data.likes, numOfLikes:data.likes.length} : commentt
        }))
      }
    }catch(err){
      console.log(err) 
    }
  }

  return (
    <div className='w-full mx-auto max-w-2xl p-3'>
      {
        currentUser ? (
              <div className='flex items-center gap-2 text-gray-500 text-sm my-6'>
                <p>Signed in as:</p>
                <img className='w-7 h-7 object-cover rounded-full' src={currentUser.profilePicture} alt="pic" />
                <Link to="/dashboard?tab=profile" className='text-xs text-cyan-500 hover:underline'>
                  @{currentUser.username}
                </Link>
              </div>
        ) : (
          <div className='text-sm text-teal-500 my-5 flex gap-2'>
            You must be signed in to comment.
            <Link className='text-blue-500 hover:underline' to="/sign-in">
              Sign In
            </Link>
          </div>
        )
      }

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 p-3 rounded-md'>
          <Textarea value={comment} onChange={(e)=>setComment(e.target.value)} maxLength='200' rows='3' placeholder='Add a comment...' />
          <div className='flex justify-between mt-5 items-center'>
            <p className='text-xs text-gray-500'>{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone="purpleToBlue" type='submit'>Submit</Button>
          </div>
        </form>
      )}

      {comments.length === 0 ? (
        <p className='text-xs my-5'>No comments yet...</p>
      ) : (
        <>
          <div className='flex items-center gap-2 my-5 text-sm'>
            <p>Comments</p>
            <div className='border border-gray-500 py-1 px-2 rounded-sm'>
              <p className='font-bold'>{comments.length}</p>
            </div>
          </div>

          {comments.map(commenti => <Comment comment={commenti} key={commenti._id} onLike={handleLike} />)}
        </>
      )}
    </div>
  )
}

export default CommentSection