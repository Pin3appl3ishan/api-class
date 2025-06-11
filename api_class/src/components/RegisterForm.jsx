// import { useRegisterUser } from "../hooks/useRegisterUser";
import { useRegisterUser as useRegisterUserTan } from "../hooks/useRegisterUserTan";

export default function RegisterForm() {
  // const { register, data, error } = useRegisterUser();
  const {mutate, data, error} = useRegisterUserTan();

  const handleSubmit = async () => {
    const formData = {
      email: "test123@gmail.com",
      username: "tst234@gmail.com",
      firstname: "Mero name",
      lastName: "Mero last name",
      password: "12345678",
    };
    // let response = await register(formData);
    // e.preventDefault(); // Prevent default form submission behavior
    // if (response) {
    //   //
    // }
    //mutate (not async function)
    mutate(formData,
      {
        onSuccess: (response) => {
          console.log("Registration successful:", response);
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        }
      }
    )
  };

  return (
    <div>
      <button onClick={handleSubmit}>Register</button>
      RegisterForm
      {/*conditional rendering for error and data*/}
      {error && <p>{error.message}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
}

// baby - justin bieber lyrics
// https://www.youtube.com/watch?v=4fndeDfaWCg