const BASE_URL = process.env.REACT_APP_BASE_URL

//-----------------Rating and Review-----------------------

export const ratingAndReview = {
    CREATE_RATINGANDREVIEW : BASE_URL + "/anime/createRatingAndReview",
    GET_ANIME_RATINGANDREVIEW: BASE_URL + "/anime/getAllRatingAndReviewsOfAnime",
    GET_ALL_RATINGANDREVIEW : BASE_URL + "/anime/getAllRatingAndReviews",
    GET_TOP_10_REVIEWS : BASE_URL + "/anime/getTop10Review",
    ADD_OR_REMOVE_LIKE : BASE_URL + "/anime/addAndRemoveLike",

}

//-----------------Authentication--------------------------

export const auth = {
    SEND_OTP: BASE_URL + "/auth/sendotp",
    SIGN_UP: BASE_URL + "/auth/signup",
    LOG_IN: BASE_URL + "/auth/login",
    RESET_TOKEN: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD: BASE_URL + "/auth/reset-password",
}


//-----------------Anime--------------------------

export const anime = {
    GET_ANIME_DETAILS: BASE_URL + "/anime/getRatedAnime",
}