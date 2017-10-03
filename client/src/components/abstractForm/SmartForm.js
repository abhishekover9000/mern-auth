import React, { Component } from "react";
import Input from "./SmartInput";
import Validate from "./inputValidations";

class SmartForm extends Component {
	/* inputs must follow format:
		{ ref: , type: , constraints: [ {}]
		constraints must follow format:
		{ check, type, compare }
		i.e. { check length, type GT, compare 0 } becomes check length greater than 0
	*/

	_parseConstraint = (check, type, compare, value) => {
		switch (check) {
			case "length":
				return Validate.compareLength(type, compare, value);
				break;
			case "regex":
				return Validate.checkRegex(type, value);
				break;
			case "match":
				return Validate.checkMatch(this[compare].value, value);
			default:
				return false;
				break;
		}
	};

	_validate = () => {
		let passThru = true;
		this.props.inputs.map(input => {
			const refValue = this[input.ref].value;
			input.constraints.map(constraint => {
				if (
					!this._parseConstraint(
						constraint.check,
						constraint.type,
						constraint.compare,
						refValue
					)
				) {
					Validate.showMsg(
						this[input.ref + "error"],
						constraint.errorMessage,
						"red"
					);
					passThru = false;
				} else {
					Validate.showMsg(
						this[input.ref + "error"],
						constraint.successMessage,
						"green"
					);
				}
			});
		});
		if (passThru) {
			const data = {};
			this.props.dispatchData.map(input => {
				data[input.as] = this[input.ref].value.trim();
			});
			console.log(data);
			this.props.btnDispatch(data);
		}
	};

	_makeRequest = () => {
		// ajax request
	};

	render() {
		const inputs = this.props.inputs.map(input => {
			let refName = input.ref;
			return (
				<Input
					key={input.ref}
					type={input.type}
					inputRef={input => (this[refName] = input)}
					placeholder={input.ref}
					errorRef={input => (this[refName + "error"] = input)}
					onKeyUp={this._validate}
				/>
			);
		});

		return (
			<div>
				<div>
					<h2> {this.props.title} </h2>
				</div>
				{inputs}
				<button
					className={this.props.btnClass}
					onClick={this._validate}
				>
					{this.props.btnTitle}
				</button>
			</div>
		);
	}
}

export default SmartForm;
