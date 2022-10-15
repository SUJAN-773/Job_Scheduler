import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeField from 'react-simple-timefield';

const AddBook = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    institute: "",
    end: "",
    start: "",
    resume: "",
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    //console.log(e.target.name, "Value", e.target.value);
  };

  const URL = "http://localhost:5000/books";
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };
  const sendRequest = async () => {
    console.log(inputs);
    var start=inputs.start, end=inputs.end;
    let check=true;

    // console.log(books);
    console.log("Enyered checkOverlap()")
    Object.values(books).map((book) => {
      console.log(book);
      const s = book.start;
      const e = book.end;
      // console.log(s);
      // console.log(e);
      var smins=parseInt(s.substring(0,2))*60+parseInt(s.substring(3, 5));
      var emins=parseInt(e.substring(0,2))*60+parseInt(e.substring(3, 5));
      var startmins=parseInt(start.substring(0,2))*60+parseInt(start.substring(3, 5));
      var endmins=parseInt(end.substring(0,2))*60+parseInt(end.substring(3, 5));
      // console.log(smins);
      // console.log(emins);
      // console.log(startmins);
      // console.log(endmins);
      if((startmins>=smins && startmins<=emins) || (endmins<=emins && endmins>=smins)){
        alert("There is a meeting scheduled at: "+s+" - "+e).then(()=>{history("/add")});
      }
      else{
        check=false;
      }
    });
    if(!check)
    {
      await axios
      .post("http://localhost:5000/books", {
        name: String(inputs.name),
        institute: String(inputs.institute),
        start: String(inputs.start),
        end: String(inputs.end),
        resume: String(inputs.resume),
        available: Boolean(checked),
      })
      .then((res) => res.data);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history("/books"));
  };

  return (
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
        <FormLabel>Candidate Name</FormLabel>
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
          value={inputs.slot}
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
        <FormLabel>Resume Drive Link</FormLabel>
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
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Available"
        />

        <Button variant="contained" type="submit">
          Add Candidate
        </Button>
      </Box>
    </form>
  );
};

export default AddBook;
