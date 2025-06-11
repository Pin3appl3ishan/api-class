import { useLoginUser } from "../../hooks/useLoginUser";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function LoginForm() {
  const { mutate } = useLoginUser();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      //states
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values); // Call the mutation function with form values
    },
  });

  return (
    <div>
      LoginForm
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email" // this should match formik state
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email} // match formik state
        ></input>
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        ></input>
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
