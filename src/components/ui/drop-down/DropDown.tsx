import { Dispatch, FC, SetStateAction, useState, useRef, useEffect } from 'react'
import './DropDown.scss'

interface DropDownProps {
  itemArr: {
    title: string;
    value: string;
  }[],
  setDropDownTitle: Dispatch<SetStateAction<{
    title: string;
    value: string;
} | null | undefined>>,
  title: string
}
const DropDown: FC<DropDownProps> = ({ itemArr, setDropDownTitle, title }) => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false)
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
  return <div className='drop-down' ref={dropDownRef}>
    <button onClick={() => setSelectMenu(!selectMenu)}>{title}</button>
    <div className={selectMenu ? "drop-down__list active" : "drop-down__list"}>
      {itemArr.map((item, i) => (
        <label key={i}>
          {item.title}
          <input
            hidden
            type="radio"
            name='item'
            value={item.value}
            onChange={() => {
              setDropDownTitle(item)
              setSelectMenu(false)
            }}
          />
        </label>
      ))}
    </div>
  </div>
}

export default DropDown