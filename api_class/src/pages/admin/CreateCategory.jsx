import React from "react";
import { useCreateCategory } from "../../hooks/admin/useAdminCategory";
import * as Yup from "yup";
import { useFormik } from "formik";

const CreateCategory = () => {
  const { mutate, data, error, isPending } = useCreateCategory();
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

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(); // multipart request
      formData.append("name", values.name);
      if (values.image) formData.append("image", values.image);
      mutate(formData, {
        onSuccess: () => {
          formik.resetForm(); // reset fields
        },
      });
    },
  });

  return (
    <div>
      CreateCategory
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
        {formik.values.image && (
          <img
            src={URL.createObjectURL(formik.values.image)}
            className="w-32 h-32 object-cover"
          />
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;
