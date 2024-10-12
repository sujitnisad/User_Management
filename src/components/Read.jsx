import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailSlice.js";
import View from "./View.jsx";
import "./Read.css";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector((state) => state.app);
  const [id, setId] = useState();
  const [radioData, setRadioData] = useState(false);
  const [popup, setpopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const filteredUsers = users
    .filter((ele) => {
      if (searchData.length === 0) {
        return ele;
      } else {
        return ele.FirstName.toLowerCase().includes(searchData.toLowerCase());
      }
    })
    .filter((ele) => {
      if (radioData === "Active") {
        return ele.status === radioData;
      } else if (radioData === "Inactive") {
        return ele.status === radioData;
      } else {
        return ele;
      }
    });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="container py-5">
      {popup && <View id={id} popup={popup} setpopup={setpopup} />}
      <div className="main_container">
        <h2 className="text-center mb-5 display-6 fw-bold text-primary">
          User Management
        </h2>

        <div className="radio-slider-wrapper">
          <div className="radio-slider">
            <div className="radio-slider-container">
              <input
                type="radio"
                name="status"
                id="all"
                checked={radioData === ""}
                onChange={(e) => setRadioData("")}
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="radio-slider-container">
              <input
                type="radio"
                name="status"
                id="active"
                value="Active"
                checked={radioData === "Active"}
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="radio-slider-container">
              <input
                type="radio"
                name="status"
                id="inactive"
                value="Inactive"
                checked={radioData === "Inactive"}
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {currentUsers.map((ele) => (
          <div key={ele.id} className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title text-primary fw-bold mb-1">
                      {ele.FirstName} {ele.LastName}
                    </h5>
                    <small className="text-muted">{ele.userID}</small>
                  </div>
                  <div>
                    <span
                      className={`badge fs-6 py-2 px-3 rounded-pill ${
                        ele.status === "Active"
                          ? "bg-success text-light"
                          : "bg-danger text-light"
                      }`}
                    >
                      {ele.status}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary rounded-pill shadow-sm d-flex align-items-center"
                    onClick={() => [setId(ele.id), setpopup(true)]}
                  >
                    <i className="bi bi-eye me-2"></i> View
                  </button>
                  <button className="btn btn-sm btn-outline-warning rounded-pill shadow-sm d-flex align-items-center">
                    <Link to={`/edit/${ele.id}`}>
                      <i className="bi bi-pencil-square me-2"></i> Edit
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDeleteUser(ele.id)}
                    className="btn btn-sm btn-outline-danger rounded-pill shadow-sm d-flex align-items-center"
                  >
                    <i className="bi bi-trash me-2"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary mx-2"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Read;
