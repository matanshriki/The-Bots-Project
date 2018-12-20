import {
    FILTER_BOT,
    CHOOSE_BOT,
    FETCHING_BOTS,
    BOTS_FETCHED,
    FETCH_BOTS_ERROR

} from './browse.actions';

import {
    CREATE_BOT
} from '../Create/create.actions';

const intialStateBrowse = {
    original_list: [],
    displayed_list: [],
    profile_data: {},
    isLoading: false,
    errorMSG: ''
}

export default (state = intialStateBrowse, action) => {
    switch (action.type) {
        case FILTER_BOT:
            return {
                ...state,
                displayed_list: action.payload
            }
        case CHOOSE_BOT:
            return {
                ...state,
                profile_data: action.payload
            }
        case FETCHING_BOTS:
            return {
                ...state,
                isLoading: true
            }
        case BOTS_FETCHED:
            return {
                ...state,
                original_list: action.payload,
                displayed_list: action.payload,
                profile_data: action.payload[0],
                isLoading: false
            }
        case FETCH_BOTS_ERROR:
            return {
                ...state,
                errorMSG: action.payload,
                isLoading: false
            }
        case CREATE_BOT:
            return {
                ...state,
                original_list: [...state.original_list, action.payload],
                displayed_list: [...state.displayed_list, action.payload],
                profile_data: action.payload
            }
        default:
            return state
    }
}




// export default function dataBase(state = { user: '' }, action) {
//     switch (action.type) {
//       case FETCHING_BOTS:
//         return { user: 'fetching random user...' }

//       case BOTS_FETCHED:
//         return {
//           user: JSON.stringify(action.payload)
//         }
//       case FETCH_BOTS_ERROR:
//         return {
//           user: action.payload.message
//         }
//       default:
//         return state
//     }
//   }