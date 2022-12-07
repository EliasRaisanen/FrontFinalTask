import { Button } from "@mui/material";
import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



export default function Editcustomer({updateCar, params}) {
    
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname:'',
        lastname:'',
        streetaddress:'',
        postcode:'',
        city:'',
        email:'',
        phone:'',
        
    });


    const Open = () => {
        
        setOpen(true);
        setCustomer({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone,
        })
    }

    const Close = () => {
        

        setOpen(false);
    }

    const handleCancel = () => {
        console.log("painettiin cancel");

        setOpen(false);
    }
    const handleSave = () => {
        updateCar(customer, params.value);
        setOpen(false)
    }
    const inputChanged = (event) => {
        console.log("yritetään tallentaa attr arvoa");
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button variant="outlined" onClick={Open}>Edit</Button>
            <Dialog onClose={Close} open={open}>
            <DialogContent>
            <DialogTitle>New customer</DialogTitle>
          <TextField
            name="firstname"
            value={customer.firstname}
            autoFocus
            margin="dense"
            label="Firstname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="lastname"
           value={customer.lastname}
            margin="dense"
            label="Lastname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="streetaddress"
           value={customer.streetaddress}
            margin="dense"
            label="Streetaddress"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="postcode"
           value={customer.postcode}
            margin="dense"
            label="Postcode"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="city"
           value={customer.city}
            margin="dense"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="email"
           value={customer.email}
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
           name="phone"
           value={customer.phone}
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>


            
               
            </Dialog>

        </div>

    );

}