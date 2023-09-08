import BlogList from "../components/BlogList";
import classnames from "classnames";

const AdminPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Admin</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      <BlogList isAdmin={true} />
    </div>
  );
};

export default AdminPage;