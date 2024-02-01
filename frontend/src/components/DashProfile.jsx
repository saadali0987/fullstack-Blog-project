import React from 'react'
import { useSelector } from 'react-redux'
import {TextInput, Label, Button} from 'flowbite-react'

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            {/* <h1 className='text-center my-3 font-semibold text-3xl'>Profile</h1> */}
            <form className='flex flex-col gap-4 my-5'>
                <div className='w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    <img src={currentUser.profilePicture} alt="user" className='rounded-full object-cover w-full h-full border-4 border-[lightgray]' />
                </div>

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Your username:" />
                    </div>
                    <TextInput type='text' id='username' placeholder="username" defaultValue={currentUser.username} />
                </div>

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email:" />
                    </div>
                    <TextInput type='email' id='email' placeholder="email" defaultValue={currentUser.email} />
                </div>

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password:" />
                    </div>
                    <TextInput type='password' id='password' placeholder="password" />
                </div>

                <Button className='mt-3' type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>

            <div className='text-red-500 flex justify-end mt-4 text-sm'>
                <span className='underline'>*Delete Account</span>
            </div>
        </div>
    )
}

export default DashProfile