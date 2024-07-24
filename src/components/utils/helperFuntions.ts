const convertToJson = (someObj: any) => {
  return JSON.stringify(someObj)
}

export const saveOptionsToLocale = (key: string, options: any) => {
  localStorage.setItem(key, convertToJson(options))
}

