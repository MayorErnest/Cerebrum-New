/** @format */
import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  dashAvater,
  dashboardImg,
  dashImg,
  ellipsesvg1,
  ellipsesvg2,
} from "../../../assets/images";
import { CourseList } from "../../../components/CourseList";
import { DashboardHeader } from "../../../widgets/DashboardHeader";
import { Footer } from "../../../widgets/Footer";
import "./TDashboard.css";
import axios from "axios";

// Api Call to get Authorized User

const TDashboard = () => {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  // const [dashimage, setDashimage] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    // if (!data) {
    //   window.open("/login", "_self");
    // }
    //   const user = JSON.parse(data);
    //   const token = user.data.token;
    //   const config = {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   };
    //   const userId = user.data.uid;
    //   axios
    //     .get(`https://cerebrum-v1.herokuapp.com/api/user/${userId}`, config)
    //     .then((res) => {
    //       console.log("res value", res.data);
    //       setUser(res.data.data);
    //       setRole(res.data.data.role);
    //     })
    //     .catch((err) => {
    //       window.open("/login", "_self");
    //     });
  }, []);

  useEffect(() => {
    if (user.role === "tutor") {
      axios
        .get(`https://cerebrum-v1.herokuapp.com/api/tutor/course/${user._id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    }
  });

  return (
    <>
      <DashboardHeader />
      <section className='container container-fluid tdashboard'>
        <div className='row p-5 shadow'>
          <div className='col-md-8 align-items-center'>
            <div className='card p-5 border-0'>
              <div>
                <header>
                  <h1 className='font-bold'>Welcome {user.firstName}</h1>
                </header>
                <article>
                  Welcome to your cerebrum Dashboard. Cerebrum provides you with
                  boundless access to courses
                </article>
                <div className='d-flex flex-wrap justify-content-start my-3'>
                  {role === "tutor" ? (
                    <>
                      <button className='btn-primary text-light'>
                        <Link
                          to='/dashboard/tutor/addcourse'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Add Course
                        </Link>
                      </button>
                      <button
                        className='btn btn-outline-primary text-light'
                        style={{ marginLeft: "20px" }}
                      >
                        <Link
                          to='/logout'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Logout
                        </Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='btn btn-primary text-light'>
                        <Link
                          to='/courses'
                          style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Buy Course
                        </Link>
                      </button>
                      <button
                        className='btn btn-outline-primary text-light'
                        style={{ marginLeft: "20px" }}
                      >
                        <Link
                          to='/logout'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Logout
                        </Link>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className='col-md-4 align-items-center'> */}
          <div className='col-4 d-none d-md-block d-flex align-items-center mt-5'>
            <img
              src={dashImg}
              className='bg-warning rounded-circle shadow img-fluid'
              alt='cerebrum'
            />
          </div>
        </div>

        {/* <div className='container container-fluid mt-5'>
          <div className='row p-5 shadow'>
            <div className='col-12 d-flex align-items-center'>
              <div className='col-8 m-5 justify-content-between'>
                <header>
                  <h1 className='font-bold'>Welcome {user.firstName}</h1>
                </header>
                <article>
                  Welcome to your cerebrum Dashboard. Cerebrum provides you with
                  boundless access to courses
                </article>
                <div className='d-flex flex-wrap justify-content-start my-3'>
                  {role === "tutor" ? (
                    <>
                      <button className='btn btn-primary'>
                        <Link
                          to='/dashboard/tutor/addcourse'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Add Course
                        </Link>
                      </button>
                      <button
                        className='btn btn-primary'
                        style={{ marginLeft: "20px" }}
                      >
                        <Link
                          to='/logout'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Logout
                        </Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='btn btn-primary'>
                        <Link
                          to='/courses'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Buy Course
                        </Link>
                      </button>
                      <button
                        className='btn btn-primary'
                        style={{ marginLeft: "20px" }}
                      >
                        <Link
                          to='/logout'
                          // style={{ color: "#f4f4f4", textDecoration: "none" }}
                        >
                          Logout
                        </Link>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className='col-4 d-none d-md-block'>
                <img
                  src={dashImg}
                  className='img-responsive bg-warning rounded-circle shadow img-fluid'
                  alt='cerebrum'
                />
              </div>
            </div>
          </div>
        </div> */}
        <section className='row my-4 mt-5 gx-5'>
          {role === "learner" ? (
            <div className='col-md-6 card p-5 shadow mb-sm-5'>
              <div className='row align-items-center'>
                <div className='col-md-6'>
                  <img src={dashboardImg} alt='' />
                </div>
                <div className='col-md-6'>
                  <h1 className='font-bold'>Code 101: Codeology</h1>
                  <p>By {user.lastName}</p>
                  <p>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs.
                  </p>
                  <p>
                    <button className='btn-warning text-light'>
                      Continue Course
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='col-md-6 card py-5 shadow'>
              <div className='row align-items-center'>
                <CourseList
                  courseName='Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
                <CourseList
                  courseName=' Code 101: Codeology'
                  courseDesc='Course +'
                  courseImg={dashAvater}
                />
              </div>
            </div>
          )}
          <div className='col-md-1'>&nbsp;</div>
          <div className='col-md-5'>
            {/* metrics d-flex flex-wrap flex-column */}
            {role === "tutor" ? (
              <>
                <div className='card py-4 h-60 shadow mb-3'>
                  <div className='container'>
                    <div className='row'>
                      {/* mx-auto justify-items-between */}
                      <div className='col-md-6'>
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className='text-primary text-center'
                          >
                            &nbsp;
                          </h1>
                          <p className='text-center'>No Course Uploaded Yet</p>
                        </div>
                      </div>
                      <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-center align-item-center'>
                          <img src={ellipsesvg1} alt='ellipse svg images' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card p-4 h-60 shadow'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-6 col-sm-12'>
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className='text-primary'
                          ></h1>
                          <p className='text-center'>
                            No Student Registered Yet
                          </p>
                        </div>
                      </div>
                      <div className='col-md-6 col-sm-12'>
                        <div className='d-flex align-item-center justify-content-center'>
                          <img src={ellipsesvg2} alt='ellipse svg images' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='card py-4 h-60 shadow mb-3'>
                  <div className='container'>
                    <div className='row'>
                      {/* mx-auto justify-items-between */}
                      <div className='col-md-6'>
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className='text-primary text-center'
                          >
                            &nbsp;
                          </h1>
                          <p className='text-center'>No Course Enrolled Yet</p>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='d-flex align-item-center justify-content-center'>
                          <img src={ellipsesvg1} alt='ellipse svg images' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card p-4 h-60 shadow'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-6 col-sm-12'>
                        <div>
                          <h1
                            style={{ fontSize: "50px", fontWeight: "600" }}
                            className='text-primary'
                          ></h1>
                          <p className='text-center'>No Course Completed Yet</p>
                        </div>
                      </div>
                      <div className='col-md-6 col-sm-12'>
                        <div className='d-flex align-item-center justify-content-center'>
                          <img src={ellipsesvg2} alt='ellipse svg images' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
  // } else {
  // return <Redirect to='/login' />;
  // }
};
export { TDashboard };
