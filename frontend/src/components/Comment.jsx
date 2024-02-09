import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";
import moment from 'moment'
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react'


const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState({})
    const { currentUser } = useSelector(state => state.user)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setUser(data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [comment])


    const handleEdit = async () => {
        setIsEditing(true)
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent
                })
            })
            if (res.ok) {
                setIsEditing(false)
                onEdit(comment, editedContent)
            }


        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className='flex items-top p-4 border-b dark:border-gray-600 text-sm'>
            <div>
                <img className='flex-shrink-0 mr-3 w-10 h-10 rounded-full object-cover bg-gray-200' src={user.profilePicture} alt="user image" />
            </div>
            <div className='w-full'>
                <div className='flex items-center mb-2'>
                    <span className='font-bold text-xs mr-2 truncate'>{user ? `@${user.username}` : 'Anonymous user'}</span>
                    <span className='text-xs text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea className='' value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />

                        <div className='flex justify-end gap-2 text-xs mt-2'>
                            <Button onClick={handleSave} size='sm' gradientDuoTone="purpleToBlue" type='button'>Save</Button>
                            <Button onClick={() => setIsEditing(false)} size='sm' gradientDuoTone="purpleToBlue" outline type='button'>Cancel</Button>
                        </div>
                    </>

                ) : (
                    <>
                        <p className='text-gray-500 mb-2'>{comment.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t max-w-fit dark:border-gray-700 gap-2 '>
                            <button onClick={() => onLike(comment._id)} type="button" className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numOfLikes > 0 && comment.numOfLikes + " " + (comment.numOfLikes === 1 ? 'like' : "likes")}
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button onClick={handleEdit} type='button' className='text-gray-400 hover:text-blue-400'>
                                        Edit
                                    </button>
                                    <button onClick={()=>onDelete(comment._id)} type='button' className='text-gray-400 hover:text-blue-400'>
                                        Delete
                                    </button>
                                </>

                            )}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Comment