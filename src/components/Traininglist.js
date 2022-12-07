import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from '@mui/material/Button';
import dayjs from "dayjs";

function Traininglist() {
  
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [trId, setTrId] = useState("");

  useEffect(() => {
    console.log("OLLAAN HOOK FUNKTIOSSA");
    fetchTrainings();
    console.log(trainings);
  }, []);

  const openDeleteCheckbox = (id) => {
    setTrId(id);
    setOpen(true);
  };

  const closeDeleteCheckbox = () => {
    setOpen(false);
  };

  const fetchTrainings = () => {
    // TÄHÄN TULEE FETCH, JOLLA HAETAAN TIEDOT
    // TREENEISTÄ
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  const deleteTraining = () => {
    closeDeleteCheckbox();
    fetch(`https://customerrest.herokuapp.com/api/trainings/${trId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchTrainings();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.error(err));
  };

  const [columnDefs, setColumnDefs] = useState([
   
    {field: "date", sortable: true,filter: true,valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY hh:mm a")},
    { field: "duration",sortable: true,filter: true,},
    { field: "activity", sortable: true,filter: true},
    {field: "customer", sortable: true, filter: true,
      cellRendererFramework: (params) => (
        <div>
          {params.value.firstname} {params.value.lastname}
        </div>
      ),
    },
    {
      cellRenderer: (params) => (
        <IconButton
          color="error"
          onClick={() => openDeleteCheckbox(params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <Dialog open={open} onClose={closeDeleteCheckbox}>
        <DialogTitle>Delete this training?</DialogTitle>
        <DialogActions>
          <Button onClick={deleteTraining} color="success">
            Yes </Button>
          <Button onClick={closeDeleteCheckbox} color="success">
            No</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div
          style={{ height: 600, width: "90%" }}
          className="ag-theme-material"
        >
          <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            paginationPageSize={10}
            pagination={true}
          />
        </div>
      </div>
    </>
  );
}


export default Traininglist;