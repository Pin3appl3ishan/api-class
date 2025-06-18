import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  useGetOneCategory,
  useUpdateOneCategory,
} from "../../hooks/admin/useAdminCategory";
import { useParams } from "react-router-dom";
import { getBackendImageUrl } from "../../utils/backend-image";

const UpdateCategory = () => {
  const { id } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ),
  });

  const categoryOne = useGetOneCategory(id);

  const updateCategory = useUpdateOneCategory();

  const formik = useFormik({
    enableReinitialize: true, // allow re-render
    initialValues: {
      name: categoryOne.category?.name || "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.image) formData.append("image", values.image);
      updateCategory.mutate(
        { id, data: formData },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

  return (
    <div>
      UpdateCategory
      <form onSubmit={formik.handleSubmit}>
        <label>Category Name</label>
        <input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></input>
        {formik.touched && formik.errors.name && <>{formik.errors.name}</>}
        <label>Category Image</label>
        <input
          name="image"
          type="file"
          accept="image/"
          onChange={(e) => {
            const file = e.currentTarget.files[0]; // O indexed cause browser indentifies file as plural
            if (file) formik.setFieldValue("image", file);
          }}
        />
        {formik.touched.image && formik.errors.image && (
          <>{formik.errors.image}</>
        )}
        {formik.values.image ? (
          <img
            src={URL.createObjectURL(formik.values.image)}
            className="w-32 h-32 object-cover"
          />
        ) : (
          <img
            src={getBackendImageUrl(categoryOne.category?.name)}
            className="w-32 h-32 object-cover"
          ></img>
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default UpdateCategory;
