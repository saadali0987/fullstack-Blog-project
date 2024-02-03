import { Sidebar } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice.js'
import {useDispatch} from 'react-redux'

const DashSidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
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
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item as='div' icon={HiUser} active={tab === "profile"} label={'User'} labelColor="dark">
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item className="cursor-pointer" icon={HiArrowSmRight} onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar