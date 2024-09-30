import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import eyeOff from "../../../assets/images/icon/eye-off.svg";
import eyeOn from "../../../assets/images/icon/eye-on.svg";
import './LoginModal.scss'
import { useAppDispatch, useAppSelector } from '../../../server/redux/hooks';
import { authUser } from '../../../server/redux/userSlice/userSlice';
import { authUserReq } from '../../../server/redux/userSlice/types';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../../server/redux/toastSlice/toastSlice';

type Props = {
  fromPage: string
}

const LoginModal: FC<Props> = (fromPage) => {
  const [inputType, setInputType] = useState<string>('password')
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onBlur"
  })

  const isAuth = useAppSelector(state => state.user.role)

  const onSubmit = handleSubmit(async (data) => {
    const authData: authUserReq = {
      user_passport: data.user_passport,
      user_pass: data.user_pass
    }
    await dispatch(authUser(authData))
  })


  
  useEffect(() => {
    if (isAuth) {
      dispatch(setMessage('Вы авторизованы'))
      reset()
      navigate(fromPage.fromPage, { replace: true })
    } else {
      dispatch(setMessage('Вы не авторизованы'))
    }
  }, [isAuth])

  return <div className='login-modal'>
    <h2>{t("Authorization.Welcome")}</h2>
    <h3>{t("Authorization.authorization")}</h3>
    <form onSubmit={onSubmit}>
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
      <button type='submit'>{t("Authorization.Login")}</button>
    </form>
  </div>
}

export default LoginModal