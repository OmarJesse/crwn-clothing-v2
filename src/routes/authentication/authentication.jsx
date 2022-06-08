import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

// useEffect(() => {
//   async function getResultAsync() {
//     const response = await getRedirectResult(auth);
//     if (response) {
//       const userDocRef = await createUserDocumentFromAuth(response.user);
//     }
//   }
//   getResultAsync();
// }, []);
//  <button onClick={signInWithGoogleRedirect}>
//     SIGN IN WITH MY G REDIRECT
//   </button>
