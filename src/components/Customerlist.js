import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Addcustomer from "./Addcustomer";
import AddTraining from "./Addtraining";
import Editcustomer from "./Editcustomer"; 
import Button from '@mui/material/Button';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

function Customerlist() {
 
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
 

  useEffect(() => {
    console.log("OLLAAN HOOK FUNKTIOSSA");
    fetchCustomers();
    console.log(customers);
  }, []);
  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    console.log(training);
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => fetchTrainings())
      .catch((err) => console.error(err));
  };


  const addCustomer = (customer) => {
    console.log("Carlist.js tiedoston addCar metodissa");
   
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    }).then((response) => {
      if (response.ok) {
        fetchCustomers();
      }
    });
  };

  const fetchCustomers = () => {
   
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

  const deleteCustomer = (link) => {
    console.log("DELETE FUNKTIO");
    fetch(link, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        fetchCustomers();
      }
    });
  };

  const updateCustomer = (updateCar, link) => {
    console.log(" UPDATE FUNKTIO");
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateCar),
    }).then((response) => {
      if (response.ok) {
        fetchCustomers();
      }
    });
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },

    {
      headerName: "",
      width: 100,
      field: "links.0.href",
      cellRenderer: (params) => (
        
        <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>

        

      ),
    },
    {
      headerName: "",
      width: 100,
      field: "links.0.href",
      cellRenderer: (params) => (
        <Editcustomer updateCar={updateCustomer}  params={params} />

      ),
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 170,
      field: "links.0.href",
      cellRenderer: (params) => (
        <AddTraining addTraining={addTraining} customer={params.value} />
      ),
    },
  ]);

  return (
    <>
    <nav>
      <ul>
        <li>
      <Link to={"/traininglist"}>Traininglist</Link>{''}
      </li>
      </ul>
    </nav>
    
      <Addcustomer addCar={addCustomer} />
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div
          style={{ height: 600, width: "90%" }}
          className="ag-theme-material"
        >
          <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            paginationPageSize={10}
            pagination={true}
          />
        </div>
      </div>
    </>
  );
}

export default Customerlist;