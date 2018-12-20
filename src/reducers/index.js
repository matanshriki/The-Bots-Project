import { combineReducers } from 'redux'

import browserReducer from '../components/Browse/browse.reducer'

const rootReducer = combineReducers({
    browse: browserReducer
})
export default rootReducer
