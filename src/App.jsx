import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import Layout from "./routes/Layout";
import JobDetail from "./routes/JobDetail";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ApplyForJob from "./routes/ApplyForJob";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFound /> },
      { path: "jobDetail/:id", element: <JobDetail /> },
      { path: "applyForJob/:id", element: <ApplyForJob /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
