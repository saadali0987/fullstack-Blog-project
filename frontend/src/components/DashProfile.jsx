import React, { useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {TextInput, Label, Button, Alert} from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const filePickerRef = useRef()
    const { currentUser } = useSelector(state => state.user)
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file)
        {
            setImageFile(file) 
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(()=>{
        if(imageFile)
        {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async()=>{

        setImageUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setImageUploadProgress(progress.toFixed(0))
            },
            (error)=>{
                setImageUploadError('could not upload image')
                setImageUploadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    setImageFileUrl(downloadUrl)
                

                })
            }
        )
    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            {/* <h1 className='text-center my-3 font-semibold text-3xl'>Profile</h1> */}
            <form className='flex flex-col gap-4 my-5'>
                <input className='hidden' type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
                <div className='relative w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    {imageUploadProgress && <CircularProgressbar value={imageUploadProgress || 0} text={imageUploadProgress+'%'} strokeWidth={5} styles={{
                        root:{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        },
                        path:{
                            stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`
                        }
                    }} />}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full object-cover w-full h-full border-4 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`} onClick={()=>filePickerRef.current.click()} />
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

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