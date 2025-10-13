import { useState } from 'react'
import './ChangePassword.css'
import { changePassword } from '../../service/changePasswordService'

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
            setMessage(`Đã có lỗi: ${err.message}`)
        }
    }
    return(
        <>
        <form action="" onSubmit={handleSubmit}>
            <h2>Change Password</h2>
            <div className="input-wrapper">
                <h3>Current Password</h3>
                <input type="password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} required/>
                <h3>New Password</h3>
                <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required/>
                <h3>Confirm Password</h3>
                <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required/>
            </div>
            <button type='submit' className='btn-submit-cpass'>Submit</button>
        </form>

        {message && <p style={{ marginTop: 10, color: 'red'}}>{message}</p>}
        </>
    )
}