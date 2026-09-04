import {router} from "./app.routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./features/auth/Auth.Context.jsx";
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App