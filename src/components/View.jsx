import { useSelector } from "react-redux";
import "./View.css";
const View = ({ id, popup, setpopup }) => {
  const users = useSelector((state) => state.app.users);
  const singleUser = users.filter((elememt) => elememt.id == id);
  return (
    <div className="viewback">
      <div className="viewContainer">
        <button className="close-btn" onClick={() => setpopup(false)}>
          <i className="bi bi-x-circle"></i>
        </button>
        <h2 className="user-info">{singleUser[0].FirstName}</h2>
        <h2 className="user-info">{singleUser[0].LastName}</h2>
        <h2 className="user-info">{singleUser[0].userID}</h2>
        <h2 className="user-info status">
          {singleUser[0].status === "Active" ? (
            <span className="status-active">Active</span>
          ) : (
            <span className="status-inactive">Inactive</span>
          )}
        </h2>
      </div>
    </div>
  );
};

export default View;
