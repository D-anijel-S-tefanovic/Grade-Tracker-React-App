import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Header from "../DataStorePageElements/Header.js";
import CourseForm from "../DataStorePageElements/CourseForm.js";
import CourseTable from "../DataStorePageElements/CourseTable.js";
import ResponsiveDialog from "../DataStorePageElements/ResponsiveDialog.js";
import LoadingModal from "../CommonComponents/LoadingModal.js";
import SnackbarComponent from "../CommonComponents/SnackbarComponent.js";

export default function DataStoreMainPage(props) {
  return (
    <React.Fragment>
      <LoadingModal startLoading={props.startLoading} />

      <Header
        anchorEl={props.anchorEl}
        openAnchorEl={props.openAnchorEl}
        handleMenu={props.handleMenu}
        handleClose={props.handleClose}
        handleOpenProfile={props.handleOpenProfile}
        handleSignOut={props.handleSignOut}
      />

      <Grow in={true} timeout={1500}>
        <Grid
          container
          component="main"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid xs={10} sm={7} md={7} lg={7} xl={7} container>
            <CourseForm
              courseDetails={props.courseDetails}
              handleCourseName={props.handleCourseName}
              handleCourseGrade={props.handleCourseGrade}
              handleCourseSemester={props.handleCourseSemester}
              handleCourseRating={props.handleCourseRating}
              showCourseValidation={props.showCourseValidation}
              showCourseValidationText={props.showCourseValidationText}
              handleAddCourse={props.handleAddCourse}
            />
          </Grid>

          <Grid xs={10} sm={10} md={10} lg={10} xl={10} container>
            <CourseTable
              showCourseDetails={props.showCourseDetails}
              showLoading={props.showLoading}
            />
          </Grid>
        </Grid>
      </Grow>

      <ResponsiveDialog
        openProfile={props.openProfile}
        handleCloseProfile={props.handleCloseProfile}
        firstInitial={props.firstInitial}
        secondInitial={props.secondInitial}
        maximumNum={props.maximumNum}
        minimumNum={props.minimumNum}
        averageNum={props.averageNum}
        maximumList={props.maximumList}
        minimumList={props.minimumList}
        feedbackColorGreen={props.feedbackColorGreen}
        feedbackColorOrange={props.feedbackColorOrange}
        feedbackColorRed={props.feedbackColorRed}
      />

      <SnackbarComponent
        showMessage={props.showMessage}
        showMessageText={props.showMessageText}
      />
    </React.Fragment>
  );
}
