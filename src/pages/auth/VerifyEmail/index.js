/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { verifyImage } from "../../../assets/images";
import { Button } from "../../../components/Button";
import { Loader } from "../../../components/Loader";
// import { emailVerification } from "../../../api";
import "./VerifyEmail.css";
import axios from "axios";
import { AuthHeader } from "../../../widgets/AuthHeader";

function VerifyEmail() {
  const padTime = (time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = (time) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  const [counter, setCounter] = useState(15);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  // Email verification Api
  useEffect(() => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    setName(url.searchParams.get("name"));
    setEmail(url.searchParams.get("email"));
  }, []);

  const resendEmail = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://cerebrum-v1.herokuapp.com/api/auth/request-email-verification/?email=${email}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <AuthHeader />
      <main className="container-fluid vh-100 verifymail-section">
        <section className="row h-100">
          <div className="col-lg-7 col-md-8 col-sm-12 d-flex justify-content-center align-items-center">
            <div className="card shadow w-c">
              <form>
                <h3> Congratulations {name} </h3>
                <p className="mt-4 mb-3 signup-p">
                  Your registration was successful, but we need to verify your
                  email before you can access your account. <br />
                  <br />
                  Kindly check your email @ {email} and click on the verifiction
                  link to complete your registration. <br />
                </p>
                <hr />
                <p className="signup-p">
                  <span className="text-muted">
                    Haven't seen the mail? Click the resend button
                  </span>
                </p>
                <Button
                  className="btn btn-primary w-100 mb-5"
                  text={"Resend Verification Mail"}
                  loadingIcon={counter === 0 ? null : <Loader />}
                  disabled={counter === 0 ? false : true}
                  onClick={resendEmail}
                />
                <p className="mt-1 signup-p text-center">
                  {counter === 0 ? (
                    "Click Resend"
                  ) : (
                    <span className="verification-timeout">
                      Time left <span className="pl-1 pr-1"> : </span>
                      {format(counter)}
                    </span>
                  )}
                </p>
              </form>
            </div>
          </div>
          <div
            className="col-lg-5 col-md-4 d-lg-block d-md-block d-sm-none d-none vh-100"
            style={{
              background: `url(${verifyImage})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `cover`,
            }}
          ></div>
        </section>
      </main>
    </>
  );
}

export { VerifyEmail };
