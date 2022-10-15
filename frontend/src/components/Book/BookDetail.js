import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeField from 'react-simple-timefield';

const BookDetail = () => {  
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  const [checked, setChecked] = useState(false);
  const [books, setBooks] = new useState();
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/books/${id}`, {
        name: String(inputs.name),
        institute: String(inputs.institute),
        start: String(inputs.start),
        end: String(inputs.end),
        resume: String(inputs.resume),
        available: Boolean(checked),
      })
      .then((res) => res.data);
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            maxWidth={700}
            alignContent={"center"}
            alignSelf="center"
            marginLeft={"auto"}
            marginRight="auto"
            marginTop={10}
          >
            <FormLabel>Name</FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
            <FormLabel>Institute</FormLabel>
            <TextField
              value={inputs.institute}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="institute"
            />
            <FormLabel style={{marginTop:'3px', marginBottom:'8px'}}>Start Time</FormLabel>
            <TimeField
              style={
                {
                  height: '30px',
                  marginBottom: '10px'
                }
              }
              value={inputs.start}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="start"
            /> 
            <FormLabel style={{marginTop:'3px', marginBottom:'8px'}}>End Time</FormLabel>
            <TimeField
              style={
                {
                  height: '30px',
                  marginBottom: '10px'
                }
              }
              value={inputs.end}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="end"
            /> 
            <FormLabel>Resume</FormLabel>
            <TextField
              value={inputs.resume}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="resume"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Available"
            />

            <Button variant="contained" type="submit">
              Update Candidate
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BookDetail;
