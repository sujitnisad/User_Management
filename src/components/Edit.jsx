import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice.js";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading } = useSelector((state) => state.app);
  const [updateData, setUpdateData] = useState();
  useEffect(() => {
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Edit User</h2>
      <form
        className="bg-light p-5 rounded shadow-sm w-50 mx-auto"
        onSubmit={handleUpdate}
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
            value={updateData && updateData.userID}
            onChange={newData}
            disabled
            required
          />
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
            value={updateData && updateData.FirstName}
            onChange={newData}
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
            value={updateData && updateData.LastName}
            onChange={newData}
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
              checked={updateData && updateData.status === "Active"}
              onChange={newData}
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
              checked={updateData && updateData.status === "Inactive"}
              onChange={newData}
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
            onClick={() => navigate("/read")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
