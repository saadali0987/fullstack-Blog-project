import React, { useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextInput, Label, Button, Alert} from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateFailure, updateSuccess } from '../redux/user/userSlice.js'

const DashProfile = () => {
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [imageUploadLoading, setImageUploadLoading] = useState(false)
    const [updateDone, setUpdateDone] = useState(null)
    const [updateFail, setUpdateFail] = useState(null)
    const filePickerRef = useRef()
    const [formData, setFormData] = useState({})
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    
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
        setUpdateDone(null)
        setUpdateFail(null)
        setImageUploadLoading(true)
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
                setImageUploadLoading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    setImageFileUrl(downloadUrl)
                    setFormData({...formData, profilePicture: downloadUrl})
                    setImageUploadLoading(false)
                    
                    

                })
            }
        )
    }


    const handleChange = async(e)=>{
        setFormData({...formData, [e.target.id]:e.target.value})
        setUpdateDone(null)
    }
    
    const handleSubmit = async(e)=>{
        setUpdateDone(null)
        setUpdateFail(null)
        e.preventDefault()
        if(Object.keys(formData).length === 0){
            setUpdateFail("No changes made")
            return
        }

        if(imageUploadLoading)
        {
            setUpdateFail("Wait for the image to upload")
            return
        }

        try{
            dispatch(updateStart())
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if(!res.ok)
            {
                setUpdateFail(data.message)
                dispatch(updateFailure(data.message))
                setFormData({})
                setImageUploadProgress(null)

            }
            else
            {
                dispatch(updateSuccess(data ))
                setUpdateDone("Profile Updated Succesfuly")
                setFormData({})
                setImageUploadProgress(null)
            }
        }catch(err)
        {
            setUpdateFail("Failed to update")
            dispatch(updateFailure(err.message))
            setFormData({})
        }
    }
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            {/* <h1 className='text-center my-3 font-semibold text-3xl'>Profile</h1> */}
            <form className='flex flex-col gap-4 my-5' onSubmit={handleSubmit}>
                <input className='hidden' type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
                <div className='relative w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    {imageUploadProgress && <CircularProgressbar value={imageUploadProgress || 0} text={imageUploadProgress+'%'} strokeWidth={3} styles={{
                        root:{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        },
                        path:{
                            stroke: imageUploadProgress == 100 ? 'green' : `rgba(62, 152, 199, ${imageUploadProgress / 100})`
                        }
                    }} />}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full object-cover w-full h-full border-4 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`} onClick={()=>filePickerRef.current.click()} />
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Your username:" />
                    </div>
                    <TextInput type='text' id='username' placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
                </div>

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email:" />
                    </div>
                    <TextInput type='email' id='email' placeholder="email" defaultValue={currentUser.email} onChange={handleChange}/>
                </div>

                <div className='italic'>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password:" />
                    </div>
                    <TextInput onChange={handleChange} type='password' id='password' placeholder="password" />
                </div>

                <Button className='mt-3' type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>

            <div className='text-red-500 flex justify-end mt-4 text-sm'>
                <span className='underline'>*Delete Account</span>
            </div>

            {updateDone && <Alert className='h-12 mt-4 relative' color='success'><div className='absolute  text-center w-full h-full pr-8 '>{updateDone}!</div></Alert>}
            {updateFail && <Alert className='h-12 mt-4 relative' color='failure'><div className='absolute  text-center w-full h-full pr-8 '>{updateFail}!</div></Alert>}
        </div>
    )
}

export default DashProfile