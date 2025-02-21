import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, {loginAction} from "./features/identity/components/login.jsx";
import Register, { registerAction } from "./features/identity/components/register.jsx";
import MainLayout from "./layouts/mainLayout/main-layout.jsx";
import Courses, {coursesLoader} from "./pages/courses.jsx";
import CourseCategories, {categoriesLoader} from "./pages/course-categories.jsx";
import CourseDetails, {courseDetailsLoader} from "./features/courses/components/course-details.jsx";
import { CategoryProvider } from "./features/categories/components/category-context.jsx";
import NotFound from "./pages/not-found.jsx";
import UnhandledException from "./pages/unhandled-exception.jsx";

const router = createBrowserRouter([


    {
        path: '/',
        element: <MainLayout/>,
        errorElement:<UnhandledException/>,
        children: [
            {
                element: <Courses/>,
                index: true,
                loader: coursesLoader
            }, {
                path: 'course-categories',
                element: (
                    <CategoryProvider>
                        <CourseCategories/>
                    </CategoryProvider>
                ),
                loader: categoriesLoader
            }, {
                path: 'courses/:id',
                element: <CourseDetails/>,
                loader: courseDetailsLoader
            }
        ]
    },
    {
        element: <IdentityLayout />,
        children: [
            {
                path: 'login',
                element: <Login/>,
                action: loginAction,
                errorElement: <Login/>
            }, {
                path: 'register',
                element: <Register/>,
                action: registerAction,
                errorElement: <Register/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])


export default router