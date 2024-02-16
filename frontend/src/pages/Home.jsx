import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from "../components/PostCard"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchposts = async()=>{
      const res = await fetch("/api/post/getposts")
      const data = await res.json()
      setPosts(data.posts)
    }

    fetchposts()
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto'>
        <h1 className='font-bold text-3xl lg:text-6xl'>Welcome To My Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>chippi chippi chappa chappa dubbi dubbi dabba dabba magico mi</p>
        <Link to="/search" className='text-xs sm:text-sm text-teal-500 font-bold hover:underline' >View All Blogs</Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className=' flex justify-center flex-wrap gap-4'>
                {posts.map(post=>(
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link className='text-lg text-teal-500 hover:underline text-center' to="/search">View All Posts</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home