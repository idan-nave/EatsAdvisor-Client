// import { useAuth } from '@context';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '@constants';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     login('User123');
//     navigate(ROUTES.HOME);  
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
import { useAuth } from "@context";

export default function Login() {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Sign in with Google</button>
    </div>
  );
}