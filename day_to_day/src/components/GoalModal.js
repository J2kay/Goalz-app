import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const GoalModal = ({
  isOpen,
  onClose,
  onSave,
  goalValue: initialGoalValue,
  dueDateValue: initialDueDateValue,
}) => {
  const [goalValue, setGoalValue] = useState(initialGoalValue);
  const [dueDateValue, setDueDateValue] = useState(initialDueDateValue);

  const handleSave = () => {
    onSave({ goal: goalValue, dueDate: dueDateValue });
    onClose();
  };
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGoal">
            <Form.Label>Goal:</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Enter your goal"
              value={goalValue}
              onChange={(e) => setGoalValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter due date"
              value={dueDateValue}
              onChange={(e) => setDueDateValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoalModal;
