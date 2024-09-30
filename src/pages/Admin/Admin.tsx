import { ChangeEvent, FC, useState } from 'react'
import './Admin.scss'
import logo from '../../../public/images/icon/Logo 1.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from '../../server/axios/axios';
import eyeOff from "../../../public/images/icon/eye-off.svg";
import eyeOn from "../../../public/images/icon/eye-on.svg";
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../server/redux/hooks'
import { regAdmin } from '../../server/redux/userSlice/userSlice'
import { AdminRegReq } from '../../server/redux/userSlice/types'


const Admin: FC = () => {
  const [inputType, setInputType] = useState<string>('password')
  const [userImg, setUserImg] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (userImg && imageName) {
        const formData = new FormData()
        formData.append('file', userImg, imageName)
        await axios.post('/upload/uploadUserImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        throw new Error('Ошибка при загрузке изображения')
      }
      const formData: AdminRegReq = {
        user_firstname: data.user_firstname,
        user_lastname: data.user_lastname,
        user_passport: data.user_passport,
        user_number: data.phone_number,
        user_pass: data.user_pass,
        admin_pass: data.admin_pass,
        user_img: imageName
      }
      console.log(formData)
      await dispatch(regAdmin(formData))
    } catch (error) {
      console.error(error)
    }
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const render = new FileReader()
      render.onloadend = () => {
        setPreviewImg(render.result)
      }
      render.readAsDataURL(file)
      setUserImg(file)
      const fileNameParts = file.name.split('.')
      setImageName(`${fileNameParts[0]}_${Date.now()}.${fileNameParts[1]}`)
    }
  }

  return <div className='admin'>
    <div className="admin__bg">
      <div className="admin__bg">
        <div className="admin__card">
          <div className="admin__card-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className='auth-modal'>
            <h2>{t("Authorization.Welcome")}</h2>
            <h3>{t("Authorization.registration")}</h3>
            <form onSubmit={onSubmit}>
              <div className="inputs-area">
                <label>
                  <p>{t("Authorization.Name")}</p>
                  <input
                    type="text"
                    placeholder={t("Authorization.Name")}
                    {...register('user_firstname', {
                      required: t("Authorization.error empty input"),
                      pattern: {
                        value: /^[a-zA-Z]{3,}$/,
                        message: t("Authorization.Name error")
                      }
                    })}
                  />
                  {errors?.user_firstname && <p className='form-error'>{String(errors.user_firstname.message)}</p>}
                </label>
                <label>
                  <p>{t("Authorization.Last-name")}</p>
                  <input
                    type="text"
                    placeholder={t("Authorization.Last-name")}
                    {...register('user_lastname', {
                      required: t("Authorization.error empty input"),
                      pattern: {
                        value: /^[a-zA-Z]{3,}$/,
                        message: t("Authorization.Name error")
                      }
                    })}
                  />
                  {errors?.user_lastname && <p className='form-error'>{String(errors.user_lastname.message)}</p>}
                </label>
                <label>
                  <p>{t("Authorization.User-passport")}</p>
                  <input
                    type="text"
                    placeholder={t("Authorization.User-passport")}
                    {...register('user_passport', {
                      required: t("Authorization.error empty input"),
                    })}
                  />
                  {errors?.user_passport && <p className='form-error'>{String(errors.user_passport.message)}</p>}
                </label>
                <label>
                  <p>{t("Authorization.User-phone")}</p>
                  <div className="custom-phone">
                    <span>+998</span>
                    <input
                      type="text"
                      placeholder={t("Authorization.User-phone")}
                      {...register('phone_number', {
                        required: t("Authorization.error empty input"),
                        pattern: {
                          value: /^[0-9]{9}$/,
                          message: t('Authorization.User-phone-error')
                        }
                      })}
                    />
                  </div>
                  {errors?.phone_number && <p className='form-error'>{String(errors.phone_number.message)}</p>}
                </label>
                <label>
                  <p> {t("Authorization.Password")}</p>
                  <div className='custom-input'>
                    <input
                      type={inputType}
                      placeholder={t("Authorization.Password")}
                      {...register('user_pass', {
                        required: t("Authorization.error empty input"),
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: t("Authorization.Password error")
                        }
                      })}
                    />
                    {
                      inputType === 'password' ?
                        <div className='eye-btn' onClick={() => setInputType('text')}>
                          <img src={eyeOff} alt="eye" />
                        </div> :
                        <div className='eye-btn' onClick={() => setInputType('password')}>
                          <img src={eyeOn} alt="eye" />
                        </div>
                    }
                  </div>
                  {errors?.user_pass && <p className='form-error'>{String(errors.user_pass.message)}</p>}
                </label>
                <label>
                  <p> {t("Authorization.admin-pass")}</p>
                  <div className='custom-input'>
                    <input
                      type={inputType}
                      placeholder={t("Authorization.admin-pass")}
                      {...register('admin_pass', {
                        required: t("Authorization.error empty input")
                      })}
                    />
                    {
                      inputType === 'password' ?
                        <div className='eye-btn' onClick={() => setInputType('text')}>
                          <img src={eyeOff} alt="eye" />
                        </div> :
                        <div className='eye-btn' onClick={() => setInputType('password')}>
                          <img src={eyeOn} alt="eye" />
                        </div>
                    }
                  </div>
                  {errors?.admin_pass && <p className='form-error'>{String(errors.admin_pass.message)}</p>}
                </label>
              </div>
              <label className='custom-img'>
                <p>{t("Authorization.User_photo")}</p>
                <input
                  type="file"
                  hidden
                  {...register('user_img', {
                    required: t("Authorization.error empty input")
                  })}
                  onChange={handleFileChange}
                />
                <div >
                  {typeof (previewImg) === 'string' ?
                    <img src={previewImg} alt="" /> :
                    <p> {t("Authorization.User_photo error")}</p>
                  }
                </div>
              </label>
              <button type='submit'>{t("Authorization.signup")}</button>
            </form>
          </div>
          <div className="admin__status">
            <Link to='/' >{t("LogIn.Use as Guest")}</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Admin