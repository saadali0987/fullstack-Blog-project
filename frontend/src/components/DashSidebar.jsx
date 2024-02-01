import { Sidebar } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'

const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }

    }, [location.search])
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item icon={HiUser} active={tab === "profile"} label={'User'} labelColor="dark">
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar