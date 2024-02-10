import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
  return (
    <div className='group relative max-w-[300px] border border-teal-500 hover:border-2 transition-all h-[370px] overflow-hidden rounded-lg'>
        <Link className='self-center' to={`/post/${post.slug}`}>
            <img src={post.image} alt="img" className='h-[220px] sm:w-[400px] block mx-auto w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 ' />
        </Link>
        <div className='flex flex-col p-3 gap-2 !pb-0'>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <span className='italic text-sm'>{post.category}</span>
            <Link className='z-10  group-hover:bottom-0 absolute bottom-[-100px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 py-2 text-center dark:text-white rounded-md !rounded-tl-none m-2' to={`/post/${post.slug}`}>
                Read Blog
            </Link>
        </div>
    </div>
  )
}

export default PostCard