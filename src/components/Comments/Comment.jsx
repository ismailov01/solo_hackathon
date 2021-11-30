import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Button, Card } from "react-bootstrap";
import { timeSince } from "../../helpers/calcTimeLeft";
import { commentsContext } from "../../contexts/CommentContext";
import CommentBody from "./CommentBody";
import { useParams } from "react-router";
import { authContext } from "../../contexts/AuthContext";

const Comment = (props) => {
  const params = useParams();
  const { user } = useContext(authContext);
  const {
    addComments,
    getCommentsForRoom,
    commentToEdit,
    getCommentToEdit,
    saveEditedComment,
    deleteComment,
    comments,
  } = useContext(commentsContext);
  const [comment, setComment] = useState("");
  function handleChange(e) {
    //   console.log(true)
    setComment(e.target.value);
  }
  function handleDelete(com) {
    deleteComment(com);
  }
  useEffect(() => {
    getCommentsForRoom(params.id);
  }, []);
  //   let user = localStorage.getItem("user");
  //   user = JSON.parse(user);
  function creatingComment(e) {
    e.preventDefault();
    let time = new Date();
    let timeMls = Date.now();
    addComments(comment, user.email, params.id, time, timeMls);
    setComment("");
  }
  let commenting;
  const [bool, setBool] = useState(false);
  const [editComm, setEditComm] = useState("");
  function handleChangeEdit(e) {
    setEditComm(e.target.value);
  }
  function saveComment(item) {
    saveEditedComment(editComm, item.id);
    setBool(false);
  }
  function handleEdit(item) {
    setBool(true);
    commenting = (
      <>
        <InputGroup className="mb-3 createComment">
          <FormControl
            rows={2}
            as="textarea"
            placeholder="Оставить комментаррий"
            maxLength="140"
            onChange={handleChangeEdit}
            value={comment}
          />
          <Button
            style={{ backgroundColor: "#31B8BF", border: "none" }}
            onClick={creatingComment}
          >
            Отправить
          </Button>
        </InputGroup>
        <Button onClick={() => saveComment(item)}>Сохранить</Button>
      </>
    );
    getCommentToEdit(item.id);
  }
  return (
    <>
      <div className="mt-5" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '5px auto'}}>
        <InputGroup className="mb-3 createComment" style={{width: '50%'}}>
          <FormControl
            
            rows={2}
            as="textarea"
            placeholder="Оставить комментаррий"
            maxLength="140"
            onChange={handleChange}
            value={comment}
          />
          <Button
            style={{border: "none" }}
            onClick={creatingComment}
          >
            Отправить
          </Button>
        </InputGroup>
        {comments ? (
          comments
          .sort((a, b) => b.createdAtMs - a.createdAtMs)
          .map((item) => <CommentBody key={item.id} item={item} />)
          ) : (
            <h2>Loading...</h2>
            )}
      </div>
    </>
  );
};

export default Comment;
