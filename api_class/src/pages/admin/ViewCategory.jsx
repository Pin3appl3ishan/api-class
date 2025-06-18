import React from "react";
import { useGetOneCategory } from "../../hooks/admin/useAdminCategory";
import { useParams } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/backend-image";

const ViewCategory = () => {
  const { id } = useParams();
  const { category, error, isPending } = useGetOneCategory(id);
  if (error) <>{error}</>;
  return (
    <div>
      ViewCategory
      {category.name}
      <img src={getBackendImageUrl(category.filepath)} />
    </div>
  );
};

export default ViewCategory;
