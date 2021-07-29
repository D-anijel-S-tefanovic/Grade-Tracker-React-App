import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthenticationMainPage from "./MainAppPages/AuthenticationMainPage.js";
import DataStoreMainPage from "./MainAppPages/DataStoreMainPage.js";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { CourseDetails } from "./Models";
import * as EmailValidator from "email-validator";
import { useUserFormFields } from "./Other/customHook.js";

export default function AppLogic() {
  /** ----------------------------------------------------------- AUTHENTICATION LOGIC START ------------------------------------------------------ **/

  const [authenticationFlow, setAuthenticationFlow] = useState("SignIn");

  let history = useHistory();

  const [userAttributes, setUserAttributes] = useUserFormFields({
    userEmail: "",
    userPassword: "",
    userCode: "",
    firstName: "",
    lastName: "",
  });

  const [showValidation, setShowValidation] = useState({
    userEmailValidation: false,
    userPasswordValidation: false,
    userCodeValidation: false,
    firstNameValidation: false,
    lastNameValidation: false,
  });

  const [showValidationText, setShowValidationText] = useState({
    userEmailValidationText: "",
    userPasswordValidationText: "",
    userCodeValidationText: "",
    firstNameValidationText: "",
    lastNameValidationText: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const [showMessageText, setShowMessageText] = useState("");

  const [startLoading, setStartLoading] = useState(false);

  const [emailCheck, setEmailCheck] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const {
    userEmail,
    userPassword,
    userCode,
    firstName,
    lastName,
  } = userAttributes;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const ClearFields = () => {
    userAttributes.userEmail = "";
    userAttributes.userPassword = "";
    userAttributes.userCode = "";
    userAttributes.firstName = "";
    userAttributes.lastName = "";
  };

  useEffect(() => {
    if (userEmail.length >= 1) {
      setShowValidation((objectValues) => ({
        ...objectValues,
        userEmailValidation: false,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        userEmailValidationText: "",
      }));
    }

    if (userPassword.length >= 1) {
      setShowValidation((objectValues) => ({
        ...objectValues,
        userPasswordValidation: false,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        userPasswordValidationText: "",
      }));
    }

    if (userCode.length >= 1) {
      setShowValidation((objectValues) => ({
        ...objectValues,
        userCodeValidation: false,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        userCodeValidationText: "",
      }));
    }

    if (firstName.length >= 1) {
      setShowValidation((objectValues) => ({
        ...objectValues,
        firstNameValidation: false,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        firstNameValidationText: "",
      }));
    }

    if (lastName.length >= 1) {
      setShowValidation((objectValues) => ({
        ...objectValues,
        lastNameValidation: false,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        lastNameValidationText: "",
      }));
    }

    if (EmailValidator.validate(userEmail)) {
      setEmailCheck("correctFormat");
    } else if (userEmail === "") {
      setEmailCheck("nonFormat");
    } else {
      setEmailCheck("incorrectFormat");
    }
  }, [userEmail, userPassword, userCode, firstName, lastName]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (
      userEmail === "" ||
      userPassword === "" ||
      emailCheck === "incorrectFormat"
    ) {
      if (userEmail === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Empty!",
        }));
      }

      if (emailCheck === "incorrectFormat") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Not Valid!",
        }));
      }

      if (userPassword === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userPasswordValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userPasswordValidationText: "Password Is Empty!",
        }));
      }
    } else {
      let outputText = "";

      // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
      await Auth.signIn({ username: userEmail, password: userPassword })
        .then(() => ClearFields())
        .then(() => setStartLoading(true))
        .then(() =>
          setTimeout(() => {
            history.push("/user-session");
          }, 3500)
        )
        .then(() => setStartLoading(false))
        .catch((err) => (outputText = err.message));

      if (outputText !== "" || typeof outputText === "undefined") {
        setShowMessage(true);
        setShowMessageText(outputText);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleRequestCode = async (event) => {
    event.preventDefault();

    if (userEmail === "" || emailCheck === "incorrectFormat") {
      if (userEmail === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Empty!",
        }));
      }

      if (emailCheck === "incorrectFormat") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Not Valid!",
        }));
      }
    } else {
      let outputText = "";

      await Auth.forgotPassword(userEmail)
        .then((data) => (outputText = data.CodeDeliveryDetails.AttributeName))
        .then(() =>
          setTimeout(() => {
            setAuthenticationFlow("ResetPassword");
          }, 3500)
        )
        .catch((err) => (outputText = err.message));

      if (outputText === "email") {
        setShowMessage(true);
        setShowMessageText("Code is sent! Check your email.");
      } else {
        setShowMessage(true);
        setShowMessageText(outputText);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (userCode === "" || userPassword === "") {
      if (userCode === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userCodeValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userCodeValidationText: "User Code Is Empty!",
        }));
      }

      if (userPassword === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userPasswordValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userPasswordValidationText: "Password Is Empty!",
        }));
      }
    } else {
      let outputText = "";

      await Auth.forgotPasswordSubmit(userEmail, userCode, userPassword)
        .then((data) => (outputText = data))
        .catch((err) => (outputText = err.message));

      if (outputText === "undefined" || typeof outputText === "undefined") {
        userAttributes.userCode = "";
        userAttributes.userPassword = "";

        setShowMessage(true);
        setShowMessageText("Password Reseted! Go Back To Sign In");
      } else {
        setShowMessage(true);
        setShowMessageText(outputText);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      userEmail === "" ||
      emailCheck === "incorrectFormat" ||
      userPassword === ""
    ) {
      if (firstName === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          firstNameValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          firstNameValidationText: "First Name Is Empty!",
        }));
      }

      if (lastName === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          lastNameValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          lastNameValidationText: "Last Name Is Empty!",
        }));
      }

      if (userEmail === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Empty!",
        }));
      }

      if (emailCheck === "incorrectFormat") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userEmailValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userEmailValidationText: "Email Is Not Valid!",
        }));
      }

      if (userPassword === "") {
        setShowValidation((objectValues) => ({
          ...objectValues,
          userPasswordValidation: true,
        }));

        setShowValidationText((objectValues) => ({
          ...objectValues,
          userPasswordValidationText: "Password Is Empty!",
        }));
      }
    } else {
      let outputText = "";

      await Auth.signUp({
        username: userEmail,
        password: userPassword,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          email: userEmail,
        },
      })
        .then((data) => (outputText = data.codeDeliveryDetails.AttributeName))
        .then(() =>
          setTimeout(() => {
            setAuthenticationFlow("Verify");
          }, 3500)
        )
        .catch((err) => (outputText = err.message));

      if (outputText === "email") {
        setShowMessage(true);
        setShowMessageText("Account with " + userEmail + " is created!");
      } else {
        setShowMessage(true);
        setShowMessageText(outputText);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();

    if (userCode === "") {
      setShowValidation((objectValues) => ({
        ...objectValues,
        userCodeValidation: true,
      }));

      setShowValidationText((objectValues) => ({
        ...objectValues,
        userCodeValidationText: "User Code Is Empty!",
      }));
    } else {
      let outputText = "";

      await Auth.confirmSignUp(userEmail, userCode)
        .then((data) => (outputText = data))
        .catch((err) => (outputText = err.message));

      if (outputText === "SUCCESS") {
        userAttributes.userCode = "";

        setShowMessage(true);
        setShowMessageText("Account with " + userEmail + " is verified!");
      } else {
        setShowMessage(true);
        setShowMessageText(outputText);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleSignOut = async () => {
    await Auth.signOut()
      .then(() => setStartLoading(true))
      .then(() =>
        setTimeout(() => {
          history.push("/");
        }, 3500)
      )
      .then(() => setStartLoading(false))
      .catch((err) => console.log(err.message));

    userAttributes.userEmail = "";
    userAttributes.userPassword = "";

    DataStore.clear();
  };

  const showSignUp = () => {
    setAuthenticationFlow("SignUp");

    userAttributes.userEmail = "";
    userAttributes.userPassword = "";
    userAttributes.firstName = "";
    userAttributes.lastName = "";
    showValidation.userEmailValidation = false;
    showValidationText.userEmailValidationText = "";
    showValidation.userPasswordValidation = false;
    showValidationText.userPasswordValidationText = "";
    showValidation.firstNameValidation = false;
    showValidationText.firstNameValidationText = "";
    showValidation.lastNameValidation = false;
    showValidationText.lastNameValidationText = "";
  };

  const showSignIn = () => {
    setAuthenticationFlow("SignIn");

    userAttributes.userEmail = "";
    userAttributes.userPassword = "";
    userAttributes.userCode = "";
    showValidation.userEmailValidation = false;
    showValidationText.userEmailValidationText = "";
    showValidation.userPasswordValidation = false;
    showValidationText.userPasswordValidationText = "";
    showValidation.userCodeValidation = false;
    showValidation.userCodeValidationText = "";
  };

  const showResetCode = () => {
    setAuthenticationFlow("ResetCode");

    userAttributes.userEmail = "";
    userAttributes.userPassword = "";
    showValidation.userEmailValidation = false;
    showValidationText.userEmailValidationText = "";
    showValidation.userPasswordValidation = false;
    showValidationText.userPasswordValidationText = "";
    showValidation.userCodeValidation = false;
    showValidationText.userCodeValidationText = "";
  };

  /** ----------------------------------------------------------- AUTHENTICATION LOGIC END -------------------------------------------------------- **/

  /** --------------------------------------------------------------- DATA STORE LOGIC START ------------------------------------------------------ **/

  const [anchorEl, setAnchorEl] = useState(null);

  const openAnchorEl = Boolean(anchorEl);

  const [openProfile, setOpenProfile] = useState(false);

  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseGrade: "",
    courseSemester: "",
    courseRating: "",
  });

  const [showCourseValidation, setShowCourseValidation] = useState({
    courseNameValidation: false,
    courseGradeValidation: false,
    courseSemesterValidation: false,
    courseRatingValidation: false,
  });

  const [showCourseValidationText, setShowCourseValidationText] = useState({
    courseNameValidationText: "",
    courseGradeValidationText: "",
    courseSemesterValidationText: "",
    courseRatingValidationText: "",
  });

  const [courseCheck, setCourseCheck] = useState(false);

  const [showCourseDetails, setShowCourseDetails] = useState([]);

  const [showLoading, setShowLoading] = useState(true);

  const [firstInitial, setFirstInitial] = useState("");

  const [secondInitial, setSecondInitial] = useState("");

  const [maximumNum, setMaximumNum] = useState(0);

  const [minimumNum, setMinimumNum] = useState(0);

  const [averageNum, setAverageNum] = useState(0);

  const [maximumList, setMaximumList] = useState([]);

  const [minimumList, setMinimumList] = useState([]);

  const [feedbackColorGreen, setFeedbackColorGreen] = useState(false);

  const [feedbackColorOrange, setFeedbackColorOrange] = useState(false);

  const [feedbackColorRed, setFeedbackColorRed] = useState(false);

  const {
    courseName,
    courseGrade,
    courseSemester,
    courseRating,
  } = courseDetails;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = async () => {
    setOpenProfile(true);

    const { attributes } = await Auth.currentAuthenticatedUser();

    let firstName = attributes.given_name.charAt(0);
    let lastName = attributes.family_name.charAt(0);

    setFirstInitial(firstName);
    setSecondInitial(lastName);

    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
    setFeedbackColorGreen(false);
    setFeedbackColorOrange(false);
    setFeedbackColorRed(false);
  };

  useEffect(() => {
    if (courseName.length >= 1) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseNameValidation: false,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseNameValidationText: "",
      }));
    }

    if (courseGrade.length >= 1) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseGradeValidation: false,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseGradeValidationText: "",
      }));
    }

    if (courseGrade !== "100" && courseGrade.length >= 3) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseGradeValidation: true,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseGradeValidationText: "Can Not Enter Bigger Than 100!",
      }));
    }

    if (courseGrade.length === 0) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseGradeValidation: false,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseGradeValidationText: "",
      }));
    }

    if (Math.sign(courseGrade) === -1) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseGradeValidation: true,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseGradeValidationText: "Can Not Enter Smaller Than 0!",
      }));
    }

    if (courseSemester.length >= 1) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseSemesterValidation: false,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseSemesterValidationText: "",
      }));
    }

    if (courseRating.length >= 1) {
      setShowCourseValidation((objectValues) => ({
        ...objectValues,
        courseRatingValidation: false,
      }));

      setShowCourseValidationText((objectValues) => ({
        ...objectValues,
        courseRatingValidationText: "",
      }));
    }
  }, [courseName, courseGrade, courseSemester, courseRating]);

  const handleCourseName = (event) => {
    setCourseDetails((objectValues) => ({
      ...objectValues,
      courseName: event.target.value,
    }));
  };

  const handleCourseGrade = (event) => {
    setCourseDetails((objectValues) => ({
      ...objectValues,
      courseGrade: event.target.value,
    }));
  };

  const handleCourseSemester = (event) => {
    setCourseDetails((objectValues) => ({
      ...objectValues,
      courseSemester: event.target.value,
    }));
  };

  const handleCourseRating = (event) => {
    setCourseDetails((objectValues) => ({
      ...objectValues,
      courseRating: event.target.value,
    }));
  };

  const handleAddCourse = async (event) => {
    event.preventDefault();

    if (
      courseName === "" ||
      courseGrade === "" ||
      (courseGrade !== "100" && courseGrade.length >= 3) ||
      Math.sign(courseGrade) === -1 ||
      courseSemester === "" ||
      courseRating === "" ||
      courseCheck === true
    ) {
      if (courseName === "") {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseNameValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseNameValidationText: "Course Name Is Empty!",
        }));
      }

      if (courseGrade === "") {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseGradeValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseGradeValidationText: "Course Grade Is Empty!",
        }));
      }

      if (courseGrade !== "100" && courseGrade.length >= 3) {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseGradeValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseGradeValidationText: "Can Not Enter Bigger Than 100!",
        }));
      }

      if (Math.sign(courseGrade) === -1) {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseGradeValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseGradeValidationText: "Can Not Enter Smaller Than 0!",
        }));
      }

      if (courseSemester === "") {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseSemesterValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseSemesterValidationText: "Select Course Semester!",
        }));
      }

      if (courseRating === "") {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseRatingValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseRatingValidationText: "Select Course Rating!",
        }));
      }

      if (courseCheck === true) {
        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseNameValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseNameValidationText: "Course Name Is Same!",
        }));
      }
    } else {
      try {
        await DataStore.save(
          new CourseDetails({
            courseName: courseName,
            courseGrade: courseGrade,
            courseSemester: courseSemester,
            courseRating: courseRating,
          })
        )
          .then(() => setShowMessage(true))
          .then(() => setShowMessageText(courseName + " is added!"));

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } catch (error) {
        setShowMessage(true);
        setShowMessageText(error);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }

      setCourseDetails((objectValues) => ({
        ...objectValues,
        courseName: "",
      }));
      setCourseDetails((objectValues) => ({
        ...objectValues,
        courseGrade: "",
      }));
      setCourseDetails((objectValues) => ({
        ...objectValues,
        courseSemester: "",
      }));
      setCourseDetails((objectValues) => ({
        ...objectValues,
        courseRating: "",
      }));
    }
  };

  const handleRead = async () => {
    try {
      await DataStore.query(CourseDetails)
        .then((courseDetails) => setShowCourseDetails(courseDetails))
        .then(() => setShowLoading(false));

      // console.log("Posts retrieved successfully!", JSON.stringify(CourseDetails, null, 2));
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  };

  useEffect(() => {
    handleRead();

    showCourseDetails.forEach((courseDetails, index) => {
      if (courseDetails.courseName === courseName) {
        setCourseCheck(true);

        setShowCourseValidation((objectValues) => ({
          ...objectValues,
          courseNameValidation: true,
        }));

        setShowCourseValidationText((objectValues) => ({
          ...objectValues,
          courseNameValidationText: "Course Name Is Same!",
        }));
      } else {
        setCourseCheck(false);
      }
    });
  }, [showCourseDetails, courseName]);

  let maxNum = Math.max.apply(
    Math,
    showCourseDetails.map((course) => course.courseGrade)
  );

  if (maxNum === -Infinity) maxNum = 0;

  let minNum = Math.min.apply(
    Math,
    showCourseDetails.map((course) => course.courseGrade)
  );

  if (minNum === Infinity) minNum = 0;

  let avgNum = 0;
  let sum = 0;
  let size = 0;

  size = showCourseDetails.length;

  sum = showCourseDetails.reduce(
    (sum, course) => sum + parseInt(course.courseGrade),
    0
  );

  avgNum = Math.round(sum / size);

  if (isNaN(avgNum)) {
    avgNum = 0;
  }

  let maxList = [];
  let minList = [];

  maxList = showCourseDetails
    .sort((a, b) => {
      return b.courseGrade - a.courseGrade;
    })
    .slice(0, 3);

  minList = showCourseDetails
    .sort((a, b) => {
      return a.courseGrade - b.courseGrade;
    })
    .slice(0, 3);

  useEffect(() => {
    setMaximumNum(maxNum);

    setMinimumNum(minNum);

    setAverageNum(avgNum);

    setMaximumList(maxList);

    setMinimumList(minList);

    if (avgNum >= 1 && avgNum <= 50) {
      setFeedbackColorGreen(false);

      setFeedbackColorOrange(false);

      setTimeout(() => {
        setFeedbackColorRed(true);
      }, avgNum * 70);
    } else if (avgNum >= 51 && avgNum <= 80) {
      setFeedbackColorGreen(false);

      setFeedbackColorRed(false);

      setTimeout(() => {
        setFeedbackColorOrange(true);
      }, avgNum * 70);
    } else if (avgNum >= 81 && avgNum <= 100) {
      setFeedbackColorOrange(false);

      setFeedbackColorRed(false);

      setTimeout(() => {
        setFeedbackColorGreen(true);
      }, avgNum * 70);
    } else {
      setFeedbackColorGreen(false);

      setFeedbackColorOrange(false);

      setFeedbackColorRed(false);
    }
  }, [
    maxNum,
    minNum,
    avgNum,
    feedbackColorGreen,
    feedbackColorOrange,
    feedbackColorRed,
  ]);

  /** --------------------------------------------------------------- DATA STORE LOGIC END ------------------------------------------------------ **/

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <AuthenticationMainPage
              {...props}
              authenticationFlow={authenticationFlow}
              showGrowEffect={true}
              startLoading={startLoading}
              userAttributes={userAttributes}
              setUserAttributes={setUserAttributes}
              showValidation={showValidation}
              showValidationText={showValidationText}
              handleSignUp={handleSignUp}
              handleVerifyCode={handleVerifyCode}
              handleSignIn={handleSignIn}
              handleRequestCode={handleRequestCode}
              handleResetPassword={handleResetPassword}
              showSignIn={showSignIn}
              showSignUp={showSignUp}
              showResetCode={showResetCode}
              emailCheck={emailCheck}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              showMessage={showMessage}
              showMessageText={showMessageText}
            />
          )}
        />

        <Route
          exact
          path="/user-session"
          render={(props) => (
            <DataStoreMainPage
              {...props}
              startLoading={startLoading}
              anchorEl={anchorEl}
              openAnchorEl={openAnchorEl}
              handleMenu={handleMenu}
              handleClose={handleClose}
              handleOpenProfile={handleOpenProfile}
              handleSignOut={handleSignOut}
              courseDetails={courseDetails}
              handleCourseName={handleCourseName}
              handleCourseGrade={handleCourseGrade}
              handleCourseSemester={handleCourseSemester}
              handleCourseRating={handleCourseRating}
              showCourseValidation={showCourseValidation}
              showCourseValidationText={showCourseValidationText}
              handleAddCourse={handleAddCourse}
              showCourseDetails={showCourseDetails}
              showLoading={showLoading}
              openProfile={openProfile}
              handleCloseProfile={handleCloseProfile}
              firstInitial={firstInitial}
              secondInitial={secondInitial}
              maximumNum={maximumNum}
              minimumNum={minimumNum}
              averageNum={averageNum}
              maximumList={maximumList}
              minimumList={minimumList}
              feedbackColorGreen={feedbackColorGreen}
              feedbackColorOrange={feedbackColorOrange}
              feedbackColorRed={feedbackColorRed}
              showMessage={showMessage}
              showMessageText={showMessageText}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
}
