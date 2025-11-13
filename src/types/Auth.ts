export type User = {
    id: string
    name: string
    email?: string
    full_name?: string
}

export type Tokens = {
    access_token: string
    refresh_token: string
}

export type Login = {
    username: string
    password: string
}

export type Logout = {
    access: string
    refresh: string
}


export type ResetPasswordRequest = {
    email: string
    redirect_url?: string
}

export type UpdateUserInfo = {
    first_name?: string,
    last_name?: string,
    address?: string,
    country?: string,
    city?: string
}


export type ResetPassword = {
    confirm_password: string
    password: string
}

export type CreateUserAccount = {
    name: string
    email: string
    password: string
    created_at?: Date,
    redirect_url?: string
}

export type CreateUserAccountOfficeX = {
    name: string
    email: string
    password: string
    created_at?: Date,
    redirect_url?: string
    office_x_id: string
}


export type ChangePassword = {
    old_password: string
    new_password: string
}