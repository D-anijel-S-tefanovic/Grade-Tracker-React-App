import { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { DataStore } from "aws-amplify";
import { CourseDetails } from "../Models";
import Rating from "@material-ui/lab/Rating";
import CustomNoRowsOverlay from "../DataStoreComponents/CustomNoRowsOverlay.js";
import CustomPagination from "../DataStoreComponents/CustomPagination.js";
import EnhancedTableToolbar from "../DataStoreComponents/EnhancedTableToolbar.js";

function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

function getFullDetails(params) {
  return `Name: (${params.getValue(params.id, "CourseName") || ""})
  Grade: (${params.getValue(params.id, "CourseGrade") || ""})
  Semester: (${params.getValue(params.id, "CourseSemester") || ""})
  Rating: (${params.getValue(params.id, "CourseRating") || ""}) `;
}

export default function CourseTable(props) {
  const [selectionModel, setSelectionModel] = useState([]);

  const rows: GridRowsProp = props.showCourseDetails.map((courseItem) => ({
    id: courseItem.id,
    CourseName: courseItem.courseName,
    CourseGrade: courseItem.courseGrade,
    CourseSemester: courseItem.courseSemester,
    CourseRating: courseItem.courseRating,
  }));

  const columns: GridColDef[] = [
    {
      field: "CourseName",
      headerName: "Course Name",
      width: 250,
      editable: false,
    },
    {
      field: "CourseGrade",
      headerName: "Course Grade",
      width: 150,
      editable: false,
    },
    {
      field: "CourseSemester",
      headerName: "Course Semester",
      width: 200,
      editable: false,
    },
    {
      field: "CourseRating",
      headerName: "Course Rating",
      width: 150,
      editable: false,
      renderCell: renderRating,
    },
    {
      field: "FullDetails",
      headerName: "Full Details",
      width: 460,
      valueGetter: getFullDetails,
      sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
    },
  ];

  const handleDeleteCourse = () => {
    selectionModel.forEach((itemModel) => {
      try {
        DataStore.delete(CourseDetails, itemModel);

        // console.log("Post deleted successfully!");
      } catch (error) {
        // console.log("Error deleting post", error);
      }

      setSelectionModel([]);
    });
  };

  return (
    <DataGrid
      loading={props.showLoading}
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={10}
      disableColumnFilter
      disableColumnMenu
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={(newSelection) => {
        setSelectionModel(newSelection.selectionModel);
      }}
      selectionModel={selectionModel}
      components={{
        Toolbar: EnhancedTableToolbar,
        Pagination: CustomPagination,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      componentsProps={{
        toolbar: {
          selectionModel,
          handleDeleteCourse,
        },
      }}
    />
  );
}
