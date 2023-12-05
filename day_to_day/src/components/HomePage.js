// Home.js
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Form, Button } from "react-bootstrap";
import GoalList from "./GoalList";
import Profile from "./Profile-pic";
import { firestore, auth, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [editingGoalIndex, setEditingGoalIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(
            collection(firestore, "goals"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const fetchedGoals = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setGoals(fetchedGoals);
        }
      } catch (error) {
        console.error("Error fetching goals from Firestore:", error);
      }
    };

    fetchGoals();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    if (newGoal.trim() !== "") {
      const user = auth.currentUser;
      if (user) {
        const goalData = {
          userId: user.uid,
          goal: newGoal,
          dueDate: newDueDate,
        };
        if (editingGoalIndex !== null) {
          // Update existing goal
          const updatedGoals = [...goals];
          const goalId = updatedGoals[editingGoalIndex].id;
          updatedGoals[editingGoalIndex] = { id: goalId, ...goalData };
          setGoals(updatedGoals);

          // Update goal in Firestore
          try {
            await updateDoc(doc(firestore, "goals", goalId), goalData);
            console.log("Goal updated in Firestore:", goalId);
          } catch (error) {
            console.error("Error updating goal in Firestore:", error);
          }

          setEditingGoalIndex(null);
        } else {
          // Add new goal
          const docRef = await addDoc(collection(firestore, "goals"), goalData);
          setGoals([...goals, { id: docRef.id, ...goalData }]);
          console.log("Goal added with ID:", docRef.id);
        }

        setNewGoal("");
        setNewDueDate("");
      }
    }
  };

  const handleGoalEdit = (index) => {
    const goalToEdit = goals[index];
    setEditingGoalIndex(index);
    setNewGoal(goalToEdit.goal);
    setNewDueDate(goalToEdit.dueDate);
  };

  const deleteGoal = async (index) => {
    const goalId = goals[index].id;

    // Delete goal from local state
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);

    // Delete goal from Firestore
    try {
      await deleteDoc(doc(firestore, "goals", goalId));
      console.log("Goal deleted from Firestore:", goalId);
    } catch (error) {
      console.error("Error deleting goal from Firestore:", error);
    }
  };

  const handleModalSave = async () => {
    // Update the goal in the local state
    const updatedGoals = [...goals];
    const goalId = updatedGoals[editingGoalIndex].id;
    updatedGoals[editingGoalIndex] = {
      id: goalId,
      goal: newGoal,
      dueDate: newDueDate,
    };
    setGoals(updatedGoals);

    // Update goal in Firestore
    const goalData = {
      goal: newGoal,
      dueDate: newDueDate,
    };

    try {
      // Update goal in Firestore
      await updateDoc(doc(firestore, "goals", goalId), goalData);
      console.log("Goal updated in Firestore:", goalId);
    } catch (error) {
      console.error("Error updating goal in Firestore:", error);
    }

    // Reset editing state and close the modal
    setEditingGoalIndex(null);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    // Close the modal without saving changes
    setModalOpen(false);
  };

  const handleLogout = () => {
    // Perform logout action
    auth.signOut().then(() => {
      // Redirect to the login page after logout
      navigate("/login");
    });
  };
  const handleImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed");

      uploadTask.then(async () => {
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the 'profilePicture' field in Firestore
        await updateDoc(doc(firestore, "users", user.uid), {
          profilePicture: downloadURL,
        });

        // Update the user state with the new profile picture URL
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: downloadURL,
        }));
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  const handleFileSelect = async (file) => {
    try {
      // Upload the file to Firebase Storage and update the profile picture
      await handleImageUpload(file);
    } catch (error) {
      console.error("Error handling file selection:", error);
    }
  };

  return (
    <div id="homeContainer">
      <Profile onFileSelect={handleFileSelect} />

      <h1>Goals</h1>

      <div id="goalInputContainer">
        <Form className="d-flex justify-content-center align-items-center mb-4">
          <div className="form-outline flex-fill">
            <Form.Control
              placeholder="Enter your goal here..."
              as="textarea"
              rows={3}
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          </div>

          <Form.Label htmlFor="dueDate" id="duedate">
            Due date
          </Form.Label>
          <Form.Control
            id="dueDate"
            placeholder="Due date"
            className="date"
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />

          <Button type="submit" className="btn btn-info ms-2" onClick={addGoal}>
            Add
          </Button>
        </Form>
      </div>

      <div id="goalListContainer">
        <GoalList
          id="goalList"
          theoryGoals={goals}
          onEdit={handleGoalEdit}
          onDelete={deleteGoal}
        />
      </div>

      <button id="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
