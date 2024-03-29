import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

const PostPage = () => {
  const {postSlug} = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const [recent, setRecent] = useState(null)

 

  useEffect(()=>{
    const fetchpost = async()=>{
      try{
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json()

        if(!res.ok){
          setLoading(false)
          setError(true)
          return
        }

        if(res.ok){
          setPost(data.posts[0])
          setLoading(false)
          setError(false)
        }
      }catch(err)
      {
        setLoading(false)
        setError(true)
      }
    }

    fetchpost()
  }, [postSlug])


  useEffect(()=>{
    try{
      const fetchRecentPosts = async()=>{
        const res = await fetch(`/api/post/getposts?limit=3`)
        const data = await res.json()
        if(res.ok){
          setRecent(data.posts)
        }
      }
      fetchRecentPosts()

    }catch(err){
      console.log(err)
    }
  }, [])


  if(loading) return (
    <div className='flex min-h-screen justify-center items-center'>
      <Spinner size='xl' />
    </div>
  )

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-serif mt-10 p-3 mx-auto lg:text-4xl'>{post && post.title}</h1>

      {post && post.category !== "uncategorized" && (
        <Link to={`/search/category=${post && post.category}`} className='self-center mt-5'>
          <Button className='' color='gray' pill size="xs">{post && post.category !== "uncategorized" && post.category}</Button>
      </Link>
      )}

      <img src={post.image} alt="postimg" className='mt-10 max-h-[600px] max-w-full sm:max-w-[600px]  mx-auto object-cover p-3'  />

      <div className='flex justify-between p-3 border-b border-slate-500 text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>


      <div className='mt-10 post-content p-3 max-w-3xl w-full mx-auto' dangerouslySetInnerHTML={{__html: post && post.content}}></div>

      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent Blogs</h1>

        <div className='flex flex-wrap gap-20 mt-10 justify-center'>
          {
            recent && recent.map(recentPost=>(
              <PostCard key={recentPost._id} post={recentPost} />
            ))
          }
        </div>
      </div>
      
    </main>
  )
}

export default PostPage 