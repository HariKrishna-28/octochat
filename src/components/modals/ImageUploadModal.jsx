import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#202225',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
};

const ImageUploadModal = ({ handleClose, open, exportUrl }) => {
    // const storage = getStorage(app);
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [error, setError] = useState(false)
    const [upload, setUpload] = useState(false)

    const handleSubmit = async (event) => {
        setUpload(true)
        event.preventDefault()
        const id = `images/${uuid().slice(0, 10)}`
        const imageRef = ref(storage, id)
        await uploadBytes(imageRef, selectedFile)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => exportUrl(url))
            }).catch(err => {
                console.log(err.message)
            })
        setUpload(false)
        handleClose()
    }

    const handleChange = (e) => {
        setError(false)
        const file = e.target.files ? e.target.files[0] : undefined;
        if (file.type.split("/")[0] === "image")
            setSelectedFile(file);
        else {
            setError(true)
            setSelectedFile(undefined)
        }

    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setError(false)
                handleClose()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='text-discord_chatINputText'
                sx={style}
            >
                <div className='flex items-center justify-between p-3'>
                    <div className='text-2xl font-bold'>
                        Upload Image
                    </div>
                    <button
                        className='text-discord_channel hover:text-white hover:bg-discord_channelHoverBg rounded-md p-2'
                        onClick={() => {
                            setError(false)
                            handleClose()
                        }}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    {error &&
                        <Alert variant="filled" severity="error" >
                            <strong>
                                Please add only image of jpeg format
                            </strong>
                        </Alert>
                    }
                    <form
                        className='h-28'
                        onSubmit={(e) => handleSubmit(e)}>
                        <div className='flex flex-col gap-2 text-center mt-2 mb-2'>
                            <input
                                type="file"
                                autoFocus
                                required
                                placeholder='Enter the name of the channel'
                                onChange={(e) => {
                                    handleChange(e)
                                    // const file = e.target.files ? e.target.files[0] : undefined;
                                    // setSelectedFile(file);
                                }}
                                className='bg-discord_chatInputBg p-3 rounded focus:outline-none text-discord_chatINputText lg:max-w-xl w-full placeholder:divide-discord_chatINputText text-sm'
                            />

                        </div>

                        <div className='text-center'>
                            {!error && !upload ?
                                <button
                                    className='hover:bg-discord_serverBg bg-discord_purple text-white p-2 rounded hover:rounded-md font-semibold'
                                    type='submit '>
                                    Upload
                                </button> :
                                <div className='font-bold'>
                                    Uploading
                                </div>
                            }
                        </div>

                    </form>
                </div>

            </Box>
        </Modal>
    )
}

export default ImageUploadModal