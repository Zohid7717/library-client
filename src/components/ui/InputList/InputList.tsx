import { Dispatch, FC, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import axios from '../../../server/axios/axios'


import './InputList.scss'

interface InputListProps {
  selectItem: Dispatch<SetStateAction<string | null>>,
  placeholder: string
}

const InputList: FC<InputListProps> = ({ selectItem, placeholder }) => {
  const [authorsList, setAuthorsList] = useState<{
    id: number,
    author_name: string
  }[] | null>(null)
  const getAuthors = async () => {
    const res = await axios.get('/authors/getAll')
    setAuthorsList(res.data.result)
  }
  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    selectItem(value)
  }
  useEffect(() => {
    getAuthors()

  }, [])


  return <div className='input-list'>
    <input list='item-favorite' id='itim-input' type="text" className='add-book__visible' placeholder={placeholder} onChange={(e) => onChange(e)} />
    <datalist id='item-favorite'>
      {
        authorsList?.map((item, i) => (
          <option key={i} value={item.author_name} ></option>
        ))
      }
    </datalist>


  </div>
}

export default InputList