type QuotesType = {
  quote_author_ru: string,
  quote_author_uz: string,
  quote_ru: string,
  quote_uz:string
}

export type QuotesSliceType = {
  quotes: QuotesType[] | null,
  isLoading: boolean,
  message: string | null,
}