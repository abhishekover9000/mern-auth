import React, { Component } from "react";

class Input extends Component {
	render() {
		return (
			<div>
				<input
					type={this.props.type}
					ref={this.props.inputRef}
					placeholder={this.props.placeholder}
				/>
				<span ref={this.props.errorRef}> </span>
			</div>
		);
	}
}

export default Input;
