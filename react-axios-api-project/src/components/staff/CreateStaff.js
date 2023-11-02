import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./form.css";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateID, setUpdateID] = useState(null);

  const api = "https://6540c94845bedb25bfc29bac.mockapi.io/staffData";

  const fetchData = () => {
    axios
      .get(api)
      .then((response) => {
        setStaffList(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addOrUpdateStaff = (e) => {
    e.preventDefault();

    if (name && position) {
      if (isUpdateMode && updateID) {
        axios
          .put(`${api}/${updateID}`, {
            name,
            position,
          })
          .then((response) => {
            console.log("Data updated successfully:", response.data);
            setName("");
            setPosition("");
            setIsUpdateMode(false);
            setUpdateID(null);
            fetchData();
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      } else {
        axios
          .post(api, {
            name,
            position,
          })
          .then((response) => {
            console.log("Data posted successfully:", response.data);
            setName("");
            setPosition("");
            fetchData();
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      }
    } else {
      console.log("Please provide name and position");
    }
  };

  const updateStaff = (id) => {
    const staffToUpdate = staffList.find((staff) => staff.id === id);

    if (staffToUpdate) {
      setName(staffToUpdate.name);
      setPosition(staffToUpdate.position);
      setIsUpdateMode(true);
      setUpdateID(id);
    }
  };

  const deleteStaff = (id) => {
    axios
      .delete(`${api}/${id}`)
      .then((response) => {
        console.log("Data deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <>
      <main className="form-container">
        <form onSubmit={addOrUpdateStaff}>
          <div>
            <input
              className="input-name"
              type="text"
              placeholder="Enter name here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-designation"
              type="text"
              placeholder="Enter position here..."
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <button className="form-btn" type="submit">
            {isUpdateMode ? "Update Staff" : "Add Staff"}
          </button>
        </form>
      </main>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.position}</td>
                <td>
                  <button onClick={() => updateStaff(staff.id)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => deleteStaff(staff.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreateStaff;
