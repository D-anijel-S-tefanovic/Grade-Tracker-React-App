import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import CourseField from "../DataStoreComponents/CourseField.js";
import CourseSelect from "../DataStoreComponents/CourseSelect.js";
import ButtonComponent from "../CommonComponents/ButtonComponent.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    padding: theme.spacing(2, 0),
  },
}));

export default function CourseForm(props) {
  const classes = useStyles();

  return (
    <Grow in={true} timeout={1500}>
      <React.Fragment>
        <CourseField
          type="string"
          id="courseName"
          name="courseName"
          label="Course Name"
          autoFocus={true}
          courseDetails={props.courseDetails.courseName}
          setCourseDetails={props.handleCourseName}
          showCourseValidation={props.showCourseValidation.courseNameValidation}
          showCourseValidationText={
            props.showCourseValidationText.courseNameValidationText
          }
        />

        <CourseField
          type="number"
          id="courseGrade"
          name="courseGrade"
          label="Course Grade"
          courseDetails={props.courseDetails.courseGrade}
          setCourseDetails={props.handleCourseGrade}
          showCourseValidation={
            props.showCourseValidation.courseGradeValidation
          }
          showCourseValidationText={
            props.showCourseValidationText.courseGradeValidationText
          }
        />

        <Grid spacing={2} container className={classes.rootStyle}>
          <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
            <CourseSelect
              name="Semester"
              label="Semester"
              courseDetails={props.courseDetails.courseSemester}
              setCourseDetails={props.handleCourseSemester}
              showCourseValidation={
                props.showCourseValidation.courseSemesterValidation
              }
              showCourseValidationText={
                props.showCourseValidationText.courseSemesterValidationText
              }
              firstValue="First"
              secondValue="Second"
              thirdValue="Third"
              fourthValue="Fourth"
              fifthValue=""
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
            <CourseSelect
              name="Rating"
              label="Rating"
              courseDetails={props.courseDetails.courseRating}
              setCourseDetails={props.handleCourseRating}
              showCourseValidation={
                props.showCourseValidation.courseRatingValidation
              }
              showCourseValidationText={
                props.showCourseValidationText.courseRatingValidationText
              }
              firstValue="1"
              secondValue="2"
              thirdValue="3"
              fourthValue="4"
              fifthValue="5"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid xs={10} sm={10} md={6} lg={6} xl={6} item>
            <ButtonComponent
              currentButtonName="Add Course"
              currentButtonFunction={props.handleAddCourse}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </Grow>
  );
}
