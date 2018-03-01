import axios from '../../axios-joinus';
import * as actionTypes from './actionTypes';




export const setEmails = (emails) => { //called after fetching emails to pass them to our reducer
	return {
		type: actionTypes.SET_EMAILS,
		emails: emails
	}
}


export const retriveEmails = () => { // will fetch emails from firebase database
	return dispatch => {
		axios.get('//path')
	.then(response => {
		dispatch(setEmails(response.data));
	}).catch (error => {
		// this.setState({error: true});
	});
};
}


