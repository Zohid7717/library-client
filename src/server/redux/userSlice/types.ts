export type authUserReq = {
  user_passport: string,
  user_password: string
}

export type UserType = {
  id: number,
  user_firstname: string,
  user_lastname: string,
  user_passport: string,
  user_role: string,
  user_img: string
}

export type authUserRes = {
  success: boolean,
  user: UserType,
  token: string
}
