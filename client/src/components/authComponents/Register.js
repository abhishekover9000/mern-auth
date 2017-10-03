import React, { Component } from "react";
import { Link } from "react-router";
import SmartForm from "../abstractForm/SmartForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createLocalUser } from "../../actions";

class Register extends Component {
	render() {
		return (
			<div>
				<SmartForm
					title="Register"
					inputs={[
						{
							ref: "username",
							type: "text",
							placeholder: "username",
							constraints: [
								{
									check: "length",
									type: "GT",
									compare: 0,
									successMessage: "Looks Good!",
									errorMessage: "We need your username!"
								}
							]
						},
						{
							ref: "password",
							type: "password",
							placeholder: "password",
							constraints: [
								{
									check: "length",
									type: "GT",
									compare: 0,
									successMessage: "Looks Good!",
									errorMessage: "We need your password!"
								},
								{
									check: "length",
									type: "GEQ",
									compare: 7,
									successMessage: "Looks Good!",
									errorMessage:
										"Password Must be at least 7 digits long!"
								}
							]
						},
						{
							ref: "passwordMatch",
							type: "password",
							placeholder: "password match",
							constraints: [
								{
									check: "length",
									type: "GT",
									compare: 0,
									successMessage: "Looks Good!",
									errorMessage: "We need your password!"
								},
								{
									check: "length",
									type: "GEQ",
									compare: 7,
									successMessage: "Looks Good!",
									errorMessage:
										"Password Must be at least 7 digits long!"
								},
								{
									check: "match",
									compare: "password",
									successMessage: "Passwords Match!",
									errorMessage:
										"Password Confirm and Password Must Match!"
								}
							]
						},
						{
							ref: "email",
							type: "email",
							placeholder: "email",
							constraints: [
								{
									check: "length",
									type: "GT",
									compare: 0,
									successMessage: "Looks Good!",
									errorMessage: "We need an email address"
								},
								{
									check: "regex",
									type: "EMAIL",
									successMessage: "Looks Good!",
									errorMessage: "Must be a valid email!"
								}
							]
						}
					]}
					btnClass="btn"
					btnTitle="Register"
					btnDispatch={this.props.createLocalUser}
					dispatchData={[
						{
							ref: "email",
							as: "emailAddress"
						},
						{
							ref: "password",
							as: "password"
						},
						{
							ref: "username",
							as: "username"
						}
					]}
				/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			createLocalUser: createLocalUser
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Register);
