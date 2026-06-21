import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "../util/validation.js";
export default function Signup() {
  function handleSubmit(prevFormState, formData) {
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");
    const enteredConfirmPassword = formData.get("confirm-password");
    const enteredFirstName = formData.get("first-name");
    const enteredLastName = formData.get("last-name");
    const enteredRole = formData.get("role");
    const enteredAcquisition = formData.getAll("acquisition");
    const acceptedTerms = formData.get("terms");

    let errors = [];
    if (!isEmail(enteredEmail)) {
      errors.push("Please enter a valid email address.");
    }

    if (!hasMinLength(enteredPassword, 6)) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (!isEqualToOtherValue(enteredConfirmPassword, enteredPassword)) {
      errors.push("Passwords do not match.");
    }

    if (!isNotEmpty(enteredFirstName)) {
      errors.push("First name is required.");
    }

    if (!isNotEmpty(enteredLastName)) {
      errors.push("Last name is required.");
    }

    if (!isNotEmpty(enteredRole)) {
      errors.push("Role is required.");
    }

    if (!isNotEmpty(enteredAcquisition.join(" "))) {
      errors.push("Please tell us how you found us.");
    }

    if (!acceptedTerms) {
      errors.push("You must agree to the terms and conditions.");
    }
    if (errors.length > 0) {
      return { errors };
    }
    return { errors: null };
  }
  const [formDtate, formAction] = useActionState(handleSubmit, {
    errors: null,
  });
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      {formDtate.errors && (
        <ul className="errors">
          {formDtate.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
