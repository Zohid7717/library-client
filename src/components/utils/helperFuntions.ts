import { ChangeEvent, SetStateAction } from 'react'

export const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  setPreviewImg: (value: SetStateAction<string | ArrayBuffer | null>) => void,
  setImgName: (value: SetStateAction<string | null>) => void,
  setElementImg: (value: SetStateAction<File | null>) => void
) => {
  if (e.target.files) {
    const render = new FileReader()
    const file = e.target.files[0]
    render.onloadend = () => {
      setPreviewImg(render.result)
    }
    render.readAsDataURL(file)
    setElementImg(file)
    const fileNamePath = file.name.split('.')
    setImgName(`${fileNamePath[0]}_${Date.now()}.${fileNamePath[1]}`)
  }
}