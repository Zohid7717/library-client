import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import eyeOff from "../../../../public/images/icon/eye-off.svg";
import eyeOn from "../../../../public/images/icon/eye-on.svg";
import './AuthModal.scss'
import axios from '../../../server/axios/axios';
import { handleFileChange } from '../../../components/utils/helperFuntions';

const AuthModal: FC = () => {
  const [inputType, setInputType] = useState<string>('password')
  const [userImg, setUserImg] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onSubmit"
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
      }
      const formData = {
        ...data,
        user_img: imageName
      }
      await axios.post('/users/regUser', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error(error)
    }
  })

  return <div className='auth-modal'>
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
      </div>
      <label className='custom-img'>
        <p>{t("Authorization.User_photo")}</p>
        <input
          type="file"
          hidden
          {...register('user_img', {
            required: t("Authorization.error empty input")
          })}
          onChange={(e)=> handleFileChange(e, setPreviewImg,  setImageName, setUserImg)}
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
}

export default AuthModal