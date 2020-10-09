import React, { ChangeEvent, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { registerUser } from "../../API/api";

type locationState = {
  id: string;
};

class RegisterPage extends React.Component<
  RouteComponentProps,
  RegisterPageState
> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    VisitorType: "",
    StudentID: "",
    DateOfBirth: "",
    agreeToTerms: false,
  };

  changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "FirstName":
        this.setState({ firstName: e.target.value });
        break;
      case "LastName":
        this.setState({ lastName: e.target.value });
        break;
      case "Email":
        this.setState({ email: e.target.value });
        break;
      case "studentID":
        this.setState({ StudentID: e.target.value });
        break;
      case "student":
      case "visitor":
        this.setState({ VisitorType: e.target.value });
        break;
      case "dob":
        this.setState({ DateOfBirth: e.target.value });
        break;
      case "agreeToTerms":
        this.setState({ agreeToTerms: !this.state.agreeToTerms });
    }
  };

  submitHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const toSend = { ...this.state };
    if (!toSend.email.includes("@")) {
      alert("Invalid Email");
      return;
    } else if (!new RegExp(/^\d*$/).test(toSend.StudentID)) {
      alert("Invalid StudentID");
      return;
    }
    //use axios to send data to backend
    registerUser(this.state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //go back to main page
    this.props.history.goBack();
  };

  render() {
    const buttonDisable =
      this.state.VisitorType === "" ||
      !this.state.agreeToTerms ||
      this.state.firstName.trim() === "" ||
      this.state.lastName.trim() === "" ||
      this.state.DateOfBirth.trim() === "" ||
      this.state.email.trim() === "" ||
      (this.state.VisitorType === "student" &&
        this.state.StudentID.trim() === "");
    const buttonClasses = buttonDisable
      ? `${classes.submitButton} ${classes.grey}`
      : classes.submitButton;
    console.log(buttonClasses);
    return (
      <div className={classes.MainContainer}>
        <div className={classes.container}>
          <form id="form">
            <img alt="logo" src="./assets/logo.svg" />
            <div className={classes.formControl}>
              <label htmlFor="FirstName">First Name:</label>
              <input
                type="text"
                id="FirstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.changeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label htmlFor="LastName">Last Name:</label>
              <input
                type="text"
                id="LastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.changeHandler}
              />
            </div>
            <div className={classes.formControl}>
              <label htmlFor="Email">Email:</label>
              <input
                type="text"
                id="Email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </div>
            <div
              className={`${classes.formControl} ${classes.inline}`}
              style={{ marginLeft: "" }}
            >
              <input
                type="radio"
                id="student"
                name="VisitorType"
                value="student"
                onChange={this.changeHandler}
                checked={this.state.VisitorType === "student"}
              />
              <label htmlFor="student">Student</label>
              <input
                type="radio"
                id="visitor"
                name="VisitorType"
                value="visitor"
                onChange={this.changeHandler}
                checked={this.state.VisitorType === "visitor"}
              />
              <label htmlFor="visitor">Visitor</label>
            </div>
            {this.state.VisitorType === "student" ? (
              <div className={classes.formControl}>
                <label htmlFor="studentID">StudentID:</label>
                <input
                  type="text"
                  id="studentID"
                  placeholder="Enter StudentID:"
                  value={this.state.StudentID}
                  onChange={this.changeHandler}
                />
              </div>
            ) : undefined}
            <div className={classes.formControl}>
              <label htmlFor="dob">Date of birth:</label>
              <input
                type="date"
                id="dob"
                value={this.state.DateOfBirth}
                onChange={this.changeHandler}
              />
            </div>
            <div className={`${classes.formControl} ${classes.inline}`}>
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                checked={this.state.agreeToTerms}
                onChange={this.changeHandler}
              />
              I agree to the MakerLab terms and Services.
            </div>
            <div className={classes.formControl}>
              <button
                className={buttonClasses}
                type="submit"
                disabled={buttonDisable}
                onClick={this.submitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
