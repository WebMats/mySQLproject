import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/joinus';
import './Game.css';


var px, py, gs, tc, ax, ay, xv, yv, trail, tail; //globally declares game variables
py=5; tc=20; ay=15; yv=0; px=5; gs=20; ax=15; xv=0; trail=[]; tail = 5; // sets their value
class Games extends Component {
		class ={}
componentDidMount() {
		this.props.onComponentLoad(); // fetches email count from firebase
		setInterval(this.game, 450/5); // calls upon our game method every 90 milliseconds to simulate momentum
}

 game = () => {
 	const canv = ReactDOM.findDOMNode(this.refs.gc);
	const ctx = canv.getContext('2d');
px+=xv;
	py+=yv;
	if(px<0) { 
		px= tc-1;
	}
	if(px>tc-1) { 
		px= 0;
	}
	if(py<0) { 
		py= tc-1;
	}
	if(py>tc-1) { 
		py= 0;
	}
ctx.fillStyle = "transparent";
ctx.fillRect(0,0,canv.width,canv.height);

	ctx.fillStyle="lime"; // sets the color of the snake
	for(let i=0;i<trail.length && i<tail;i++) {
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-3,gs-3); //updates trail of snake 
		if(trail[i].x===px && trail[i].y===py) { // if the leading square hits the body the tail is reset
			tail = 5;
		}
	}
	trail.push({x:px,y:py}); // updates trail coordinates
	while(trail.length>tail && (xv !==0 || yv !==0)) { 
	ctx.clearRect((trail[0].x)*gs ,(trail[0].y)*gs,gs-3,gs-3); //makes sure we are removing 'lime' color from canvas after trail has moved
	trail.shift(); // updates trail
	}

	if(ax===px && ay===py) { //if snake reaches apple tail is made longer and apple position is reset
		tail++;
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
	}
	ctx.fillStyle="red"; // sets the color of apple
	ctx.fillRect(ax*gs,ay*gs,gs-3,gs-3);

}

keyPressHandler = (event) => { //method that handles keypress input from user
	switch(event.keyCode) {
		case 37: if(xv !==1) {xv = -1; yv = 0}; break; // makes sure snake can't eat itself backwards, only from sides
		case 38: if(yv !==1) {xv = 0; yv = -1}; break; // makes sure snake can't eat itself backwards, only from sides
		case 39: if(xv !==-1) {xv = 1; yv = 0}; break; // makes sure snake can't eat itself backwards, only from sides
		case 40: if(yv !==-1) {xv = 0; yv = 1}; break; // makes sure snake can't eat itself backwards, only from sides
		default: return event
	}
}


render() {

let str = 'th'; //sets default ordinal number suffix to 'th' for 4th-0th (code can't handle # >= 100 yet)
if (this.props.emails-(Math.floor(this.props.emails/10)*10)===1) {str = 'st'}; //sets ordinal number suffix to 'st' for x1st
if (this.props.emails-(Math.floor(this.props.emails/10)*10)===2) {str = 'nd'}; //sets ordinal number suffix to 'nd' for x2nd
if (this.props.emails-(Math.floor(this.props.emails/10)*10)===3) {str = 'rd'}; //sets ordinal number suffix to 'rd' for x3rd
let message = this.props.emails ===0 ? null : <p>Thanks for becoming our <strong>{this.props.emails}{str}</strong> member!</p>

		return (
			<div onKeyDown={(event) => this.keyPressHandler(event)} tabIndex="0">
				{message}
				<p> Here's a cool game we built</p>
				<br />
				<canvas ref="gc" width="400" height="400"></canvas>
			</div>
			);
			}
	}

const mapStateToProps = state => {
	return{
		emails: state.emails.length
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onComponentLoad: () => dispatch(actions.retriveEmails())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Games);