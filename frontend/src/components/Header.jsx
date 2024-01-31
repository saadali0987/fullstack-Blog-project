import { Navbar, TextInput,Button, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {useSelector} from 'react-redux'





const Header = () => {
    const path = useLocation().pathname
    const  {currentUser} = useSelector(state => state.user)

  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center text-sm sm:text-xl whitespace-nowrap font-semibold dark:text-white'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded px-2 py-1 text-white'>Saad's</span> Blog
        </Link>


        <form>
            <TextInput
                type="text"
                placeholder="Search... "
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>


        <Button className='w-12 h-10 lg:hidden'  color='gray' pill>
            <AiOutlineSearch />
        </Button>


        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' pill color='gray'>
                <FaMoon />
            </Button>

            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={<Avatar rounded alt='user' img={currentUser.profilePicture} />}>
                    <Dropdown.Header>
                        <span className='block mb-1 text-xs font-bold '>{currentUser.username}</span>
                        <span className='block text-xs font-semibold'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown.Header>
                </Dropdown>
            ): (
                <Link to="/signin ">
                <Button outline gradientDuoTone="purpleToBlue">
                    Sign In
                </Button>
            </Link>
            )}
            
            <Navbar.Toggle />
        </div>

        
        <Navbar.Collapse>
            <Navbar.Link active={path == "/"} as={"div"}>
                <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path == "/about"} as={"div"}>
                <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path == "/projects"} as={"div"}>
                <Link to="/projects">Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header