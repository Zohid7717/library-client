import { Dispatch, FC, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import './CategoryList.scss'
import axios from '../../../server/axios/axios'


interface InputListProps {
  selectItem: Dispatch<SetStateAction<string | null>>,
  placeholder: string
}

const CategoryList: FC<InputListProps> = ({ selectItem, placeholder}) => {
  const [categoriesList, setCategoriesList] = useState<{
    id: number,
    category_title: string
  }[] | null>(null)
  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    selectItem(value)
  }

  const getCategories = async () => {
    const res = await axios.get('/category/getAll')
    setCategoriesList(res.data.categories)
    // console.log(categoriesList)
  }

  useEffect(() => {
    getCategories()
  }, [])
  return <div className='input-list'>
    <input className='add-book__visible' list='category-favorite' type="text" placeholder={placeholder} onChange={(e)=>onChange(e)}/>
    <datalist id='category-favorite'>
      {
        categoriesList?.map((item, i) => (
          <option key={i} value={item.category_title} ></option>
        ))
      }
    </datalist>
  </div>
}

export default CategoryList