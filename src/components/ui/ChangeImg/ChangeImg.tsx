import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next';
import './ChangeImg.scss'

type Props = {
  setImg: Dispatch<SetStateAction<File | null>>,
  setImgName: Dispatch<SetStateAction<string | null>>
}

const ChangeImg: FC<Props> = ({ setImg, setImgName }) => {
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null);
  const { t } = useTranslation()
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const render = new FileReader()
      render.onloadend = () => {
        setPreviewImg(render.result)
      }
      render.readAsDataURL(file)
      setImg(file)
      const fileNameParts = file.name.split('.')
      setImgName(`${fileNameParts[0]}_${Date.now()}.${fileNameParts[1]}`)
    } else {
      setImgName(null)
    }
  }
  return (
    <label className='change-img'>
      <input
        type="file"
        hidden
        onChange={handleChangeFile}
      />
      <div className='change-img'>
        {
          typeof (previewImg) === 'string' ?
            <img src={previewImg} alt='e-book img' /> :
            <p>{t("Authorization.User_photo error")}</p>
        }
      </div>
    </label>
  );
}

export default ChangeImg;
