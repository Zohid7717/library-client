import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import './AddBook.scss'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import InputList from '../../components/ui/InputList/InputList'
import CategoryList from '../../components/ui/CategoryList/CategoryList'
import ChangeImg from '../../components/ui/ChangeImg/ChangeImg'
import CKEditorEl from '../../components/ui/CKEditor/CKEditor'
import axios from '../../server/axios/axios'
import { useNavigate } from 'react-router-dom'

const AddBook: FC = () => {
  const [eBookQR, setEBookQR] = useState<File | null>(null)
  const [eBookQRName, setEBookQRName] = useState<string | null>(null)
  const [aBookFile, setABookFile] = useState<File | null>(null)
  const [useHBook, setUseHBook] = useState<boolean>(false)
  const [useABook, setUseABook] = useState<boolean>(false)
  const [useEBook, setUseEBook] = useState<boolean>(false)
  const [bookImg, setBookImg] = useState<File | null>(null)
  const [bookImgName, setBookImgName] = useState<string | null>(null)
  const [authors, setAuthors] = useState<string[] | null>(null)
  const navigate = useNavigate()
  const [editor, setEditor] = useState('')
  const [author, setAuthor] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    mode: "onChange"
  })

  const { t } = useTranslation()

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (aBookFile) {
        const formData = new FormData()
        formData.append('file', aBookFile, data.a_book_file)
        await axios.post('/uploadBook/uploadBookFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      if (eBookQR) {
        const formData = new FormData()
        formData.append('file', eBookQR, data.e_book_img)
        await axios.post('/uploadBook/uploadEBook', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      if (bookImg) {
        const formData = new FormData()
        formData.append('file', bookImg, data.image)
        await axios.post('/uploadBook/uploadBookImg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      const newBook = await axios.post('books/addBook', data)
      reset()
      navigate(`/book/${newBook.data.newBookId}`)
    } catch (error) {
      console.log(error)
    }
  })

  const handleFileChange = () => async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.type !== 'application/x-zip-compressed') {
        console.log('Setting error')
        setError('a_book_file', {
          type: 'manual',
          message: 'error'
        })
      } else {
        setABookFile(file)
        clearErrors('a_book_file')
        setValue('a_book_file', file.name)
      }
      await trigger('a_book_file')
    }
  }

  const changeCheckbox = (
    setElement: Dispatch<SetStateAction<boolean>>,
    fistFormElement: string,
    secondFormElement?: string
  ) => (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setElement(isChecked)
    if (isChecked) {
      setValue(fistFormElement, isChecked)
    } else {
      setValue(fistFormElement, null)
    }
    if (secondFormElement) {
      if (!isChecked) {
        setValue(secondFormElement, null)
      }
    }
  }

  const handleAddAuthor = () => {
    if (authors && author) {
      if (authors?.includes(author)) {
        setAuthors([...authors])
      } else {
        setAuthors([...authors, author])
      }
    } else if (author) {
      setAuthors([author])
    }
  }

  const removeElement = (element: number) => {
    if (authors) {
      const newArr = [...authors]
      newArr.splice(element, 1)
      setAuthors(newArr)
    }
  }

  useEffect(() => {
    if (bookImgName) {
      setValue('image', bookImgName)
    } else {
      setValue('image', null)
    }
  }, [bookImgName])

  useEffect(() => {
    if (useEBook) {
      setValue('e_book_img', eBookQRName)
    } else {
      setValue('e_book_img', null)
      setEBookQR(null)
    }
  }, [eBookQRName])

  useEffect(() => {
    if (!useEBook) {
      setEBookQRName(null)
    }
  }, [useEBook])

  useEffect(() => {
    if (!useABook) {
      setABookFile(null)
    }
  }, [useABook])


  useEffect(() => {
    setValue('authors_name', authors)
    setValue('book_category', category)
  }, [authors, category])

  useEffect(() => {
    setValue('fragment', editor)
  }, [editor])

  useEffect(() => {
    if (!useHBook) {
      setValue('quantity', null)
      setValue('book_location', null)
    }
  }, [useHBook])

  return <div className='add-book'>
    <h2>{t("admin.addBook.title")}</h2>
    <form onSubmit={onSubmit}>
      <h3>{t("admin.addBook.Fill up Book Details")}</h3>
      <div className="form__wrap">
        <div className="form__input-wrap">
          <label>
            <input type="text"
              className='add-book__visible'
              placeholder={t("admin.addBook.Book name")}
              {...register('title', {
                required: t("Authorization.error empty input")
              })}
            />
            {errors?.title && <p className='form-error'>{String(errors.title.message)}</p>}
          </label>
          <div className="add-book__authors">
            <div className="add-book__authors-input">
              <label >
                <InputList selectItem={setAuthor} placeholder={t("admin.addBook.Author name")} />
              </label>
              <span className='btn-add' onClick={handleAddAuthor}>+</span>
            </div>
            <input type="text" hidden value={author ? author : ""}
              {...register('authors_name', {
                required: t("Authorization.error empty input")
              })}
            />
            <div className="add-book__authors-items">
              {authors &&
                authors.map((item, i) => (
                  <p key={i}><span>{item}</span><span onClick={() => removeElement(i)}>x</span></p>
                ))
              }
            </div>
          </div>
          {errors?.authors_name && <p className='form-error'>{String(errors.authors_name.message)}</p>}
          <textarea rows={9} cols={72}
            className='add-book__visible'
            placeholder={t("admin.addBook.Fill up Book Details")}
            {...register('book_about')}
          />
          <label >
            <CategoryList selectItem={setCategory} placeholder={t("admin.addBook.Book category")} />
            <input type="text" hidden value={category ? category : ""}
              {...register('book_category', {
                required: t("Authorization.error empty input")
              })}
            />
            {errors?.book_category && <p className='form-error'>{String(errors.book_category.message)}</p>}
          </label>
        </div>
        <div className='form__checkbox-wrap'>
          <label>
            <input
              type="checkbox"
              {...register('h_book')}
              onChange={changeCheckbox(setUseHBook, 'h_book')}
            />
            <p style={{ fontSize: 16 }}>{t("admin.addBook.Hard book")}</p>
          </label>
          {useHBook &&
            <div className='form__checkbox-wrap-hbook'>
              <label>
                <input
                  type="number" className='add-book__visible'
                  placeholder={t('admin.addBook.Book quantity')}
                  {...register('quantity', {
                    required: t("Authorization.error empty input")
                  }
                  )} />
                {errors?.quantity && <p className='form-error'>{String(errors.quantity.message)}</p>}
              </label>
              <label>
                <input
                  type="text" className='add-book__visible'
                  placeholder={t('admin.addBook.Book location')}
                  {...register('book_location')} />
                {errors?.book_location && <p className='form-error'>{String(errors.book_location.message)}</p>}
              </label>
            </div>
          }
          <label >
            <input
              type="checkbox"
              {...register('e_book')}
              onChange={changeCheckbox(setUseEBook, 'e_book',)}
            />
            <p style={{ fontSize: 16 }}>{t("admin.addBook.E book")}</p>
          </label>
          {useEBook &&
            <div className='form__checkbox-e-book'>
              <ChangeImg setImg={setEBookQR} setImgName={setEBookQRName} />
              <input
                type="text"
                hidden
                {...register('e_book_img', {
                  required: t("Authorization.error empty input")
                })}
              />
              {errors?.e_book_img && <p className='form-error'>{String(errors.e_book_img.message)}</p>}
            </div>
          }
          <label>
            <input
              type="checkbox"
              {...register('a_book')}
              onChange={changeCheckbox(setUseABook, 'a_book', 'a_book_file',)}
            />
            <p style={{ fontSize: 16 }}>{t("admin.addBook.Audio book")}</p>
          </label>
          {useABook &&
            <div>
              <input
                type='file'
                accept='.zip'
                onChange={handleFileChange()}
              />
              <input
                type="text"
                hidden
                {...register('a_book_file', {
                  required: t("Authorization.error empty input"),
                })}
              />
            </div>
          }
          {errors?.a_book_file && (<p className='form-error'>{String(errors.a_book_file.message)}</p>)}
          <label>
            <div>
              <input
                type="text" className='add-book__visible'
                placeholder={t('admin.addBook.Book language')}
                {...register('book_lang', {
                  required: t("Authorization.error empty input")
                }
                )} />
              {errors?.book_lang && <p className='form-error'>{String(errors.book_lang.message)}</p>}
            </div>
          </label>
          <label>
            <div>
              <input
                type="text" className='add-book__visible'
                placeholder={t('admin.addBook.Book price')}
                {...register('price', {
                  required: t("Authorization.error empty input")
                }
                )} />
              {errors?.price && <p className='form-error'>{String(errors.price.message)}</p>}
            </div>
          </label>
        </div>
        <div className="add-book__book-img">
          <p>{t('admin.addBook.Book image')}</p>
          <ChangeImg setImg={setBookImg} setImgName={setBookImgName} />
          <input
            type="text"
            hidden
            {...register('image', {
              required: t("Authorization.error empty input")
            })}
          />
          {errors?.image && <p className='form-error'>{String(errors.image.message)}</p>}
        </div>
      </div>
      <div className='add-book__textarea-editor'>
        <CKEditorEl setText={setEditor} />
      </div>
      <button type='submit'>Submit</button>
    </form >
  </div >
}

export default AddBook