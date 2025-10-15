import { useState } from 'react'
import './ChangePassword.css'
import { changePassword } from '../../service/changePasswordService'
import cpass from '../../assets/cpass.jpg'

export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        if(newPassword !== confirmPassword){
            setMessage('Mật khẩu xác nhận không khớp')
            return
        }

        try{
            await changePassword(oldPassword, newPassword)
            setMessage('Đổi mật khẩu thành công')
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch(err) {
            setMessage(`${err.message}`)
        }
    }
    return(
        <>
        <div className='cpass-wrapper'>
            <div className='cpass-img'><img src={cpass} alt="" /></div>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <h2>Change Password</h2>
                    <div className="input-wrapper">
                        <input type="password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} placeholder='Current Password' required/>
                        
                        <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder='New Password' required/>
                        
                        <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required/>
                    </div>
                    {message && <p style={{ marginTop: 10, color: 'red'}}>{message}</p>}
                    <button type='submit' className='btn-submit-cpass'>Submit</button>
                </form>

            </div>
        </div>

        </>
    )
}