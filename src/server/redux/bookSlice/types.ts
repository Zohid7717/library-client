type UserReviewType = {
  user_id: number,
  user_img: string | null,
  user_lastname: string,
  user_firstname: string
}

export type ReviewType = {
  user: UserReviewType,
  comment: string,
  review_id: number,
  review_date: string
}

type BookType = {
  id: number,
  title: string,
  h_book: boolean,
  e_book: boolean,
  a_book: boolean,
  quantity: number,
  book_lang: string,
  price: number,
  book_location: string,
  book_about: string,
  e_book_img: string,
  fragment: string,
  image: string,
  a_book_file: string,
  authors_names: string,
  category_title: string,
  reviews: ReviewType[],
  sum_of_ratings: number,
  number_of_voters: number
}

export type BookSliceType = {
  book: BookType | null,
  isLoading: boolean,
  message: string | null
}