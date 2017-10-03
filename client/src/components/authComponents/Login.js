import React, { Component } from "react";
import { Link } from "react-router";
import SmartForm from "../abstractForm/SmartForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginLocal } from "../../actions";

class Login extends Component {
	render() {
		return (
			<div>
				<SmartForm
					title="Login"
					inputs={[
						{
							ref: "username",
							type: "text",
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
							constraints: [
								{
									check: "length",
									type: "GT",
									compare: 0,
									successMessage: "Looks Good!",
									errorMessage: "We need your password!"
								}
							]
						}
					]}
					btnTitle="Login"
					btnClass="btn"
					btnDispatch={this.props.loginLocal}
					dispatchData={[
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
				<div className="buttonGroup">
					<button className="btn">Register </button>

					<button className="btn">Reset Password </button>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			loginLocal: loginLocal
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Login);
