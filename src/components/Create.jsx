import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, showUser } from "../features/userDetailSlice.js";
import { useEffect } from "react";

const Create = () => {
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const { users: userList } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = userList.some(
      (user) => user.userID.toLowerCase() === users.userID.toLowerCase()
    );

    if (userExists) {
      setError("UserID/EmailID already exists. Please enter a unique ID.");
    } else {
      setError("");
      dispatch(createUser(users));
      navigate("/read");
    }
  };

  const handleCancel = () => {
    navigate("/read");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Create User</h2>
      <form
        className="bg-light p-5 rounded shadow-sm w-50 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="userID"
            className="form-label fw-bold text-center w-100"
          >
            UserID/EmailID
          </label>
          <input
            type="email"
            id="userID"
            name="userID"
            className="form-control"
            placeholder="Enter User ID or Email ID"
            onChange={getUserData}
            required
          />
          {error && <small className="text-danger">{error}</small>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="FirstName"
            className="form-label fw-bold text-center w-100"
          >
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            className="form-control"
            placeholder="Enter First Name"
            onChange={getUserData}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="LastName"
            className="form-label fw-bold text-center w-100"
          >
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={getUserData}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold text-center w-100">Status</label>
          <div className="form-check d-inline-block me-4">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="statusActive"
              value="Active"
              onChange={getUserData}
              required
            />
            <label className="form-check-label ms-1" htmlFor="statusActive">
              Active
            </label>
          </div>
          <div className="form-check d-inline-block">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="statusInactive"
              value="Inactive"
              onChange={getUserData}
              required
            />
            <label className="form-check-label ms-1" htmlFor="statusInactive">
              Inactive
            </label>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
