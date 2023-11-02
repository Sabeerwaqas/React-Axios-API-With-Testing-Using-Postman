import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [staffList, setStaffList] = useState([]);

  const api = "https://653f47849e8bd3be29e025f9.mockapi.io/staffData";

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

  const addStaff = (e) => {
    e.preventDefault();

    if (name && position) {
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
    } else {
      console.log("Please provide name and position");
    }
  };

  const updateStaff = (id) => {
    const staffToUpdate = staffList.find((staff) => staff.id === id);
    if (staffToUpdate) {
      axios
        .put(`${api}/${id}`, {
          name: name || staffToUpdate.name,
          position: position || staffToUpdate.position,
        })
        .then((response) => {
          console.log("Data updated successfully:", response.data);
          setName("");
          setPosition("");
          fetchData();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
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
        <form onSubmit={addStaff}>
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
            Add Staff
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
                  <button onClick={() => updateStaff(staff.id)}>Edit</button>
                  <button onClick={() => deleteStaff(staff.id)}>Delete</button>
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
