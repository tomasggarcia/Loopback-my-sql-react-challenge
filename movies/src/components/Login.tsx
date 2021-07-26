import swal from "sweetalert";
import isStrongPassword from "validator/lib/isStrongPassword";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { url as URL } from "../config";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { IErrorUser } from "../interfaces/forms";
import { useHistory } from "react-router-dom";




function Login() {
  interface IColors {
    email?: string;
    pass?: string;
  }

  const history = useHistory();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [invalid, setInvalid] = useState<boolean>();

  const [emailInitialState, setEmailInitialState] = useState<boolean>(true)
  const [passInitialState, setPassInitialState] = useState<boolean>(true)

  const [errors, setErrors] = useState<IErrorUser>({
    email: false,
    pass: false,
  });

  const [colors, setColors] = useState<IColors>({});

  const handleChange = (event: React.FormEvent<any>) => {
    setInvalid(false);
    if (event.target) {
      let tName = (event.target as HTMLButtonElement).name;
      let tValue = (event.target as HTMLButtonElement).value;
      // console.log(tName,tValue)
      if (tName === "pass") {
        setPassword(tValue);
        setErrors({
          ...errors,
          pass: !isStrongPassword(tValue, {
            returnScore: false,
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          }),
        });
      }

      if (tName === "email") {
        setEmail(tValue);
        setErrors({
          ...errors,
          email: !isEmail(tValue),
        });
      }
    }
  };

  useEffect(() => {
    if (email) {
      setEmailInitialState(false)
      if (errors?.email === true) {
        console.log("entro", colors);
        setColors({
          ...colors,
          email: "secondary",
        });
      } else {
        setColors({
          ...colors,
          email: "primary",
        });
      }
    }
  }, [email]);//eslint-disable-line

  useEffect(() => {
    if (password) {
      setPassInitialState(false)
      if (errors?.pass === true) {
        setColors({
          ...colors,
          pass: "secondary",
        });
      } else {
        setColors({
          ...colors,
          pass: "primary",
        });
      }
    }
  }, [password]);//eslint-disable-line


  const handleSubmit = async () => {
    console.log({ email: email, pass: password });

    let localCart: string = localStorage.getItem("cart") || "[]";

    const resp = await axios
      .post(`${URL}/login`, {
        email: email,
        pass: password,
        cart: JSON.parse(localCart),
      })
      .catch((err) => console.log(err));

    console.log(resp);

    if (resp) {
      console.log(resp.data.reset);
      if (resp.data.reset === true) {
        localStorage.setItem("token", resp.data.token);
        swal("You need to reset your password").then(() =>
          history.push("/login/passReset")
        );
      } else {
        if (resp.data.message === "User") {
          localStorage.setItem("token", resp.data.token);
          swal("Welcome");
          history.push("/home");
        }
        if (resp.data.message === "Admin") {
          localStorage.setItem("token", resp.data.token);
          console.log("entro admin");
          history.push("/adminValidation");
        }
        if (resp.data.message === "Disabled") {
          swal(
            "Your Account has not been validated yet, please check your mail"
          );
        }
        if (resp.data.message === "User or password are incorrect") {
          swal("User or password are incorrect");
          localStorage.removeItem("token");
        }
      }
    } else swal("network error");
  };

  return (
    <Container className="w-50 p-4 ">
      <h2 className="text-center">Login</h2>
      <Form className="bg-light border shadow p-5 mb-4 rounded ">
        <Form.Group controlId="formBasicEmail">
          <Form.Label className='d-flex justify-content-center'>User</Form.Label>

          <Form.Control
            className={`border-${colors.email} border-2 ml-auto mr-auto`}
            type="text"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            />
          {errors?.email ? (
            <Form.Label className="mt-1 d-flex justify-content-center">Email is invalid</Form.Label>
            ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className='mt-3 d-flex justify-content-center'>Password</Form.Label>
          <Form.Control
            className={`border-${colors.pass} border-2  ml-auto mr-auto`}
            type="password"
            placeholder="Enter Password"
            name="pass"
            onChange={handleChange}
          />
          {errors?.pass ? (
            <Form.Label className="mt-1 d-flex justify-content-center">
              Password is too short (Make sure it's at least 8 characters)
            </Form.Label>
          ) : null}
        </Form.Group>

        <div className='row justify-content-center'>
        {errors?.email === true || errors?.pass === true || invalid === true || emailInitialState === true || passInitialState === true ? (
          <Button className="mt-3" variant="info" disabled>
            Log In
          </Button>
        ) : (
          <Button className="mt-3" variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        )}
        </div>
        {invalid ? (
          <label className="">Invalid email or password </label>
        ) : null}
        
      </Form>
    </Container>
  );
}

export default Login;
