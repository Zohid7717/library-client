import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import searchBtn from '../../../../../public/images/icon/search-icon.svg'
import './HeaderSearch.scss'

const HeaderSearch: FC = () => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<{ title: string, value: string } | null>(null);
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
  const { t } = useTranslation()
  const searchCategories = [
    { title: t("HeaderSearchCategories.all"), value: 'all' },
    { title: t("HeaderSearchCategories.title"), value: 'title' },
    { title: t("HeaderSearchCategories.author"), value: 'author' },
    { title: t("HeaderSearchCategories.category"), value: 'category' },
  ]

  return <div className='header-search'>
    <div className="header-search__drop-down" ref={dropDownRef}>
      <button onClick={() => setSelectMenu(!selectMenu)}>{filter ? filter.title : t('HeaderSearchCategories.all')}</button>
      <div className={selectMenu ? "header-search__drop-down-list active" : "header-search__drop-down-list"}>
        {searchCategories.map((item, i) => (
          <label key={i}>
            {item.title}
            <input
              hidden
              type="radio"
              name='item'
              value={item.value}
              onChange={() => {
                setFilter(item)
                setSelectMenu(false)
              }}
            />
          </label>
        ))}
      </div>
    </div>
    <div className="header-search__input">
      <input type="text" placeholder={t('HeaderSearchInput')} />
      <img src={searchBtn} alt="searchBtn" />
    </div>
  </div>
}

export default HeaderSearch