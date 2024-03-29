import { Button, Select, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    })
    const location = useLocation()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate()

    console.log(sidebarData)
    useEffect(()=>{
        const urlparams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlparams.get('searchTerm')
        const sortFromUrl = urlparams.get('sort')
        const categoryFromUrl = urlparams.get('category')
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl
            })
        }

        const fecthPosts = async()=>{
            setLoading(true)
            const searchQuery = urlparams.toString()
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
            if(!res.ok){
                setLoading(false)
                return
            }

            const data = await res.json()
            setPosts(data.posts)
            setLoading(false)
            if(data.posts.length === 9){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
        }
        fecthPosts()

    }, [location.search])

    const handleChange = (e)=>{
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }

        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc'
            setSidebarData({...sidebarData, sort:order})
        }

        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized'
            setSidebarData({...sidebarData, category})
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('category', sidebarData.category)
        const searchQuery = urlParams.toString()
        console.log(searchQuery)
        navigate(`/search?${searchQuery}`) 

    }

    const handleShowMore = async()=>{
        const numberOfPosts = posts.length
        const startIndex = numberOfPosts
        const urlParams = new URLSearchParams(location.search)
        urlParams.set("startIndex", startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok){
            return
        }
        const data = await res.json()
        setPosts([...posts, ...data.posts])
        if(data.posts.length === 9){
            setShowMore(true)
        }else{
            setShowMore(false)
        }

    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-6'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <TextInput placeholder='Search...' id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange} />
                </div>

                <div className='flex items-center gap-20'>
                    <label className='font-semibold'>Sort:</label>
                    <Select onChange={handleChange} className='' value={sidebarData.sort} id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </div>

                <div className='flex items-center gap-10'>
                    <label className='font-semibold'>Category:</label>
                    <Select onChange={handleChange} className='' value={sidebarData.category || 'uncategorized'} id='category'>
                        <option value='uncategorized'>Uncategorized</option>
                        <option value='react'>React.js</option>
                        <option value='next'>Next.js</option>
                        <option value='node'>Node.js</option>
                        <option value='other'>Others</option>
                    </Select>
                </div>
                <Button gradientDuoTone="purpleToPink" outline type='submit'>Apply Filter</Button>
            </form>
        </div>

        <div className='w-full'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Results:</h1>
            <div className='flex flex-wrap gap-16 p-7 mx-auto justify-center'>
                {!loading && posts.length === 0 && <p className='text-xl text-gray-500'>No Posts Found...</p>}

                {loading &&  <p className='text-xl text-gray-500'>Loading...</p>}

                {!loading && posts && posts.map(post=><PostCard key={post._id} post={post} />)}

                {showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>Show More</button>}
            </div>
        </div>
    </div>
  )
}

export default Search