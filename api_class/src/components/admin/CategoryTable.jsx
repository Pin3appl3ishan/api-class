import React, { useState } from "react";
import {
  useAdminCategory,
  useDeleteOneCategory,
} from "../../hooks/admin/useAdminCategory";
import { getBackendImageUrl } from "../../utils/backend-image";
import DeleteModal from "../DeleteModal";

export default function CategoryTable() {
  const { categories } = useAdminCategory();
  const deleteCategoryHook = useDeleteOneCategory();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteCategoryHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  function Welcome(props) {
    return <h1>{props.name}</h1>;
  }

  function NameComponent({ name, age }) {
    return (
      <h1>
        {name} {age}
      </h1>
    );
  }

  return (
    <div>
      <Welcome name="AArya" />
      <NameComponent name="Shyam" age="20" />
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete?"
      />
      CategoryTable
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <img
                className="w-16 h-16 object-cover"
                src={getBackendImageUrl(row.filepath)}
              ></img>
              <td>
                <Link to={"/admin/category" + row._id}>
                  <button>View</button>
                </Link>
                <Link to={"/admin/category" + row._id + "/edit"}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => setDeleteId(row._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
