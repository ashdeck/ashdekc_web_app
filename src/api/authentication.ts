import request from "../utils/network"
import { Login, ResetPasswordRequest, UpdateUserInfo } from "../types/Auth";
import { CreateUserAccount, CreateUserAccountOfficeX, ChangePassword, ResetPassword, Logout } from "../types/Auth";

export const login = async (data: Login) => await request({
    method: "POST",
    url: "/auth/basic/login",
    data: new URLSearchParams(Object.entries(data)).toString(),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const user_info = async () => await request({
    method: "GET",
    url: "/auth/me"
})

export const update_user_info = async (data: UpdateUserInfo) => await request({
    method: "PATCH",
    url: "/auth",
    data: data
})

// export const logout = async () => await request({
//     method: "GET",
//     url: "/auth/logout"
// })

export const logout = async (data: Logout) => await request({
    method: "POST",
    url: `/auth/logout`,
    data: data
})


export const get_all_users = async () => await request({
    method: "GET",
    url: `/auth?user_type=admin`
})

export const get_company_users = (company_id: string) => request({
    method: "GET",
    url: "/auth/company_users",
    params: {company_id: company_id}
})


export const me = async () => await request({
    method: "GET",
    url: "/auth/me"
})

export const delete_user = async (id: string) => await request({
    method: "DELETE",
    url: `/auth/${id}`
})


export const request_password_reset = async (data: ResetPasswordRequest) => await request({
    method: "POST",
    url: `/auth/basic/request_password_reset`,
    data: data
})

export const reset_password = async (data: ResetPassword, token: string) => await request({
    method: "POST",
    url: `/auth/basic/reset-password?token=${token}`,
    data: data
})

export const create_account = async (data: CreateUserAccount) => await request ({
        method: "POST",
        url: "/auth/basic",
        data: data
    })

export const create_account_office_x = async (data: CreateUserAccountOfficeX) => await request ({
        method: "POST",
        url: "/auth/basic/office_x",
        data: data
    })


export const change_password = async (data: ChangePassword) => request({
    method: "PATCH",
    url: "/auth/change_password",
    data: data
})

export const google_auth = (user_id: string) => request({
    method: "GET",
    url: "/auth/google/login",
    params: {user_id: user_id}
})


export const google_init_auth = (redirect_url: string) => request({
    method: "GET",
    url: "/auth/google",
    params: {redirect_url: redirect_url}
})