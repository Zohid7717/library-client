import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import translateIcon from '../../../../../public/images/icon/Translate.svg'
import './HeaderLang.scss'


const HeaderLang: FC = () => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false)
  const [chosenLang, setChosenLang] = useState<string | null>(localStorage.getItem('i18nextLang') ? localStorage.getItem('i18nextLang') : 'uz')
  const dropDownRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setSelectMenu(false)
    }
  }

  

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const { i18n } = useTranslation()
  const langList = [
    { title: "O'zbek", value: 'uz' },
    { title: "Русский", value: 'ru' }
  ]

  useEffect(() => {
    if (chosenLang) {
      i18n.changeLanguage(chosenLang)
    }
  }, [chosenLang])

  return <div className='header-lang'>
    <div className="header-lang__drop-down" ref={dropDownRef}>
      <button
        onClick={
          () => setSelectMenu(!selectMenu)
        }>
        <img src={translateIcon} alt="translate" />
        <span>
        {
          chosenLang === 'uz' ?
            "O'zbek" :
            'Русский'
        }
        </span>
      </button>
      <div className={selectMenu ? "header-lang__drop-down-list active" : "header-lang__drop-down-list"}>
        {langList.map((item, i) => (
          <label key={i}>
            {item.title}
            <input
              hidden
              type="radio"
              name='item'
              value={item.value}
              onChange={() => {
                setChosenLang(item.value)
                setSelectMenu(false)
              }}
            />
          </label>
        ))}
      </div>
    </div>
  </div>
}

export default HeaderLang