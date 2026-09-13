import { router } from "./app.routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./features/auth/Auth.Context.jsx";
import InterviewProvider from "./features/interview/Interview.context.jsx";
const App = () => {
  return (
    <InterviewProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </InterviewProvider>
  );
};

export default App;
