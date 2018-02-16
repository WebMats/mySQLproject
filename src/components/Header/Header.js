import React from 'react';

import csS from './Header.css';


const header = (props) => (
		<div className={csS.FlexContainer}>
			<div className="container" style={{overflow: 'scroll'}}>
				<h1>JOIN US</h1>
				<p className="lead">Enter your email to join <strong>{props.count.length}</strong> others on our waitlist.</p>
				<form onSubmit={props.submit}>
					<input onChange={props.changed} type="email"  className={csS.Form} placeholder="Enter Your Email" />
					<button>Join Now</button>
					<p className={csS.Unlock} >unlock game after submitting</p>
				</form>
			</div>
	</div>

	);

	export default header;