import React, {Component} from 'react';
import {connect} from 'react-redux';
// import faker from 'faker'; //used to create initial 50 emails
import axios from '../axios-joinus';
import JoinUsComponent from '../components/Header/Header';
import * as actions from '../store/actions/joinus';

class JoinUs extends Component {
	state ={
		newEmail: '',
	}

componentDidMount() {
	// this.createFakeEmail();
	this.props.onInitEmails();
}

// createFakeEmail = () => { // code that created initial 50 emails
// 	let fakeEmails = [];
// 	for (var i = 1; i <= 50; i++) {
// 		let fakerEmail = faker.internet.email();
// 		fakeEmails.push(fakerEmail);
// 	}
// 	axios.post('/emails.json', fakeEmails).then(response => {
// 		this.setState({loading: false});
// 	}).catch(error => {
// 		this.setState({loading: false})
// 	});
// }


postNewEmail = (event, email, count) => {
	event.preventDefault();
	axios.put('emails/-L5M0CtQD200fOxpU41w/'+count+'.json', JSON.stringify(email)) // line used to add email that user submitted to our list of emails in DB-emailList:(-L5M0CtQD200fOxpU41w)
	.catch(error => {
		this.setState({error: error})
	});
	this.setState({newEmail: "");
	// setTimeout(() => {
	// 	this.fetchEmails()
	// }, 500);
	setTimeout(() => this.props.history.push('/game'),100);
}

// fetchEmails = () => {
// 	axios.get('emails/-L5M0CtQD200fOxpU41w.json')
// 	.then(response => {
// 		this.setState({emails: response.data});
// 	}).catch (error => {
// 		// this.setState({error: true});
// 	});
// }

updateNewEmailHandler = (event) => { //updates our this.state with new email input user is typing
	event.preventDefault();
	let newEmail = event.target.value
	this.setState({newEmail: newEmail})
}

// shouldComponentUpdate(nextProps, nextState) { // makes sure we update component count if we are not redirected to /game
// 		return nextProps.emails.length !== this.props.emails.length
// }

render() {
let header = <JoinUsComponent 
			submit={(event) => this.postNewEmail(event, this.state.newEmail, this.props.emails.length)}
			changed={this.updateNewEmailHandler}
			count={this.props.emails}/>

	return(
		<div>
			{header}
		</div>
		)
}
}

const mapStateToProps = state => {
	return {
		emails: state.emails
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitEmails: () => dispatch(actions.retriveEmails())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(JoinUs);