import * as actionTypes from './actions/actionTypes';

const initialState = {
		emails: [],
		error: false,
		newEmail: ''
	}

const setEmails= (state, action) => { //updates the state with the new emails fetched from firebase DB
	const loadEmails= []
	loadEmails.push(...action.emails)
	const updatedEmails = {
		emails: loadEmails,
		error: false,
		newEmail: ''
	}
	return updatedEmails
}

const reducer = (state= initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_EMAILS: return setEmails(state, action)
		default: return state;
	}
}
export default reducer;