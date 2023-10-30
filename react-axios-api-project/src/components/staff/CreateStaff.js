import React, { useState } from "react";
import "./form.css";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const post_data = () => {
    console.log(name);
    console.log(position)
  }
  return (
    <>
      <main className="form-container">
        <form>
          <div>
            <input
            className="input-name"
              type="text"
              id="name"
              value={name}
              placeholder="Enter name here..."
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
            className="input-designation"
              type="text"
              id="position"
              value={position}
              placeholder="Enter position here..."
              autoComplete="off"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <button className="form-btn" onClick={post_data} type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default CreateStaff;
