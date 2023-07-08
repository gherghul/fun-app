import { useState } from "react";
const CredentialsForm = ({
  submitRequest,
  title,
  emailState,
  passwordState
}) => {
  const [inputHasValue, setInputHasValue] = useState(false);
  const [doRequest, errors] = submitRequest;
  const [email, setEmail] = emailState;
  const [password, setPassword] = passwordState;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  }

  const handleHasValClass = (target) => {
    if (target.value) {
      target.classList.add('has-val');
    } else {
      target.classList.remove('has-val');
    }
  }

  //   /*==================================================================
  //   [ Validate ]*/
  //   var input = $('.validate-input .input100');
  //   $('.validate-form').on('submit', function () {
  //     var check = true;
  //     for (var i = 0; i < input.length; i++) {
  //       if (validate(input[i]) == false) {
  //         showValidate(input[i]);
  //         check = false;
  //       }
  //     }
  //     return check;
  //   });
  // }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-26">
              {title}
            </span>
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
            </span>

            <div className="wrap-input100 ">
              <input className="input100" type="text" name="email" onChange={e => {
                setEmail(e.target.value)
                handleHasValClass(e.target);
              }} />
              <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input className="input100" type="password" name="pass" onChange={e => {
                setPassword(e.target.value);
                handleHasValClass(e.target);
              }} />
              <span className="focus-input100" data-placeholder="Password"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" onClick={handleSubmit}>
                  Sign Up
                </button>
              </div>
            </div>

            {errors}

          </form>
        </div>
      </div>
    </div>
  )
}


export default CredentialsForm;