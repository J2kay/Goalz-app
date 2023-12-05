// GoalList.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const GoalList = ({ theoryGoals, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      {theoryGoals.map((goal, index) => (
        <Card key={goal.id} className="listitem">
          <Card.Header>
            <Button variant="outline-info" onClick={() => onEdit(index)}>
              <FontAwesomeIcon className="button1" icon={faPencil} />
            </Button>{" "}
            <Button
              className="buttons"
              variant="outline-danger"
              onClick={() => onDelete(index)}
            >
              <FontAwesomeIcon className="trash" icon={faTrashCan} />
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>{goal.goal}</Card.Text>
            <Card.Text>Due Date: {goal.dueDate}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GoalList;
