import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/signin", "auth/Signin.tsx"),
    route("auth/signup", "auth/Signup.tsx"),
] satisfies RouteConfig;




// import { createBrowserRouter } from "react-router";
// import { Layout } from "./components/layout/Layout";
// import { Home } from "./routes/index";
// import { SignIn } from "./routes/auth/signin";
// import { SignUp } from "./routes/auth/signup";
// import { EventDetails } from "./routes/events/$eventId";
// import { CreateEvent } from "./routes/events/create";
// import { MyEvents } from "./routes/my-events";
// import { Favorites } from "./routes/favorites";

// export ([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "auth/signin",
//         element: <SignIn />,
//       },
//       {
//         path: "auth/signup",
//         element: <SignUp />,
//       },
//       {
//         path: "events/:eventId",
//         element: <EventDetails />,
//       },
//       {
//         path: "events/create",
//         element: <CreateEvent />,
//       },
//       {
//         path: "my-events",
//         element: <MyEvents />,
//       },
//       {
//         path: "favorites",
//         element: <Favorites />,
//       },
//     ],
//   },
// ]);
