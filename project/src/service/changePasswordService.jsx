import { getCookie, setCookie } from "../helpers/cookie"
import { get, patch } from "../utils/request"

export const changePassword = async (oldPassword, newPassword)=>{
    const email = getCookie('email')

    const existed = await get(`accounts?email=${email}`)
    if(existed.length === 0){
        throw new Error('Không tìm thấy tài khoản')
    }

    const user = existed[0]

    if(user.password !== oldPassword){
        throw new Error('Mật khẩu hiện tại không đúng, hãy nhập lại.')
    }

    const updatedPassword = await patch(`accounts/${user.id}`,{
        password: newPassword
    })

    setCookie('password', newPassword)

    return updatedPassword
}