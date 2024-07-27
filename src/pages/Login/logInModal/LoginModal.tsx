import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import eyeOff from "../../../../public/images/icon/eye-off.svg";
import eyeOn from "../../../../public/images/icon/eye-on.svg";
import './LoginModal.scss'


const LoginModal: FC = () => {
  const [inputType, setInputType] = useState<string>('password')
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onSubmit"
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return <div className='login-modal'>
    <h2>{t("Authorization.Welcome")}</h2>
    <h3>{t("Authorization.authorization")}</h3>
    <form onSubmit={onSubmit}>
      <label>
        <p>{t("Authorization.Name")}</p>
        <input
          type="text"
          placeholder={t("Authorization.Name")}
          {...register('user_name', {
            required: t("Authorization.error empty input"),
            pattern: {
              value: /^[a-zA-Z]{3,}$/,
              message: t("Authorization.Name error")
            }
          })}
        />
        {errors?.user_name && <p className='form-error'>{String(errors.user_name.message)}</p>}
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
              <button onClick={() => setInputType('text')}>
                <img src={eyeOff} alt="eye" />
              </button> :
              <button onClick={() => setInputType('password')}>
                <img src={eyeOn} alt="eye" />
              </button>
          }
        </div>
        {errors?.user_pass && <p className='form-error'>{String(errors.user_pass.message)}</p>}
      </label>
      <button type='submit'>{t("Authorization.Login")}</button>
    </form>
  </div>
}

export default LoginModal