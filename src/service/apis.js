const BASE_URL = process.env.REACT_APP_BASE_URL

//-----------------Rating and Review-----------------------

export const ratingAndReview = {
    GET_ALL_RATINGANDREVIEW : BASE_URL + "/anime/getAllRatingAndReviews",
    GET_TOP_10_REVIEWS : BASE_URL + "/anime/getTop10Review"
}

//-----------------Authentication--------------------------

export const auth = {
    SEND_OTP: BASE_URL + "/auth/sendotp",
}