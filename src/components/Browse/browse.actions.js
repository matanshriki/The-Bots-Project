export const FILTER_BOT = 'FILTER_BOT'
export const CHOOSE_BOT = 'CHOOSE_BOT'
export const HIDE_SPINNER = 'HIDE_SPINNER'

export const filterBot = (botList) => ({
    type: FILTER_BOT,
    payload: botList
})
export const chooseBot = (bot) => ({
    type: CHOOSE_BOT,
    payload: bot
})


export const FETCHING_BOTS = 'FETCHING_BOTS'
export const BOTS_FETCHED  = 'BOTS_FETCHED'
export const FETCH_BOTS_ERROR  	  = 'FETCH_BOTS_ERROR'

export const fetchRandomUser = ()=> {

	return function (dispatch) {

		dispatch({ type: FETCHING_BOTS })

		return  fetch('./static/data/MOCK_DATA.json')
				.then((res) => res.json())
				.then(res => dispatch({
					type	: BOTS_FETCHED,
					payload	: res
				}))
				.catch( err => dispatch({
					type	: FETCH_BOTS_ERROR,
					payload	: err.message
				}))
	  }
}
