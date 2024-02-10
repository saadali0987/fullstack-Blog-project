import { Sidebar } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice.js'
import {useDispatch, useSelector} from 'react-redux'

const DashSidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=>state.user)
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }

    }, [location.search])

    const handleSignout = async()=>{
        try{
        const res = await fetch('api/auth/signout', {
            method: "POST"
        })
        const data = await res.json()
        if(!res.ok)
        {
            console.log(data.message)
        }
        else
        {
            dispatch(signoutSuccess())
        }
        }catch(err)
        {
            console.log(err.message)
        }
    }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item as='div' icon={HiUser} active={tab === "profile"} label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=posts">
                            <Sidebar.Item as='div' icon={HiDocumentText} active={tab === 'posts'}>Posts</Sidebar.Item>
                        </Link>
                    )} 
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=users">
                            <Sidebar.Item as='div' icon={HiOutlineUserGroup} active={tab === 'users'}>Users</Sidebar.Item>
                        </Link> 
                    )}
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=comments">
                            <Sidebar.Item as='div' icon={HiAnnotation} active={tab === 'comments'}>Comments</Sidebar.Item>
                        </Link> 
                    )}
                    

                    <Sidebar.Item className="cursor-pointer" icon={HiArrowSmRight} onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar