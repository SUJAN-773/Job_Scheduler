import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
const Book = (props) => {
  const history = useNavigate();
  const { _id, name, institute, start, end, resume, checked } = props.book;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/books"));
  };

  return (
    <div className="card">
      {/*<img src={image} alt={name} />*/}
      <p className="name">{name}</p>
      <article className="institute">{institute}</article>
      <p style={{fontSize: '0.7rem', marginTop: '6px'}}><i>{start} - {end}</i></p>
      <p><a href={resume} style={{color: 'GrayText'}}>Resume</a></p>
      <Button style={{background: 'rgba(83, 158, 223, 0.495)', 
        width: '120px', height:'25px', margin: '5px auto auto 15px'}} LinkComponent={Link} 
        to={`/books/${_id}`} sx={{ mt: "auto" }} className="update">
        Update
      </Button>
      <Button style={{background: 'rgba(193, 71, 55, 0.495)', 
        width: '120px', height:'25px', margin: '5px auto auto 15px'}} 
        color="error" onClick={deleteHandler} sx={{ mt: "auto" }} className="delete">
        Delete
      </Button>
    </div>
  );
};

export default Book;
