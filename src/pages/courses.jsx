import {httpInterceptedService} from "@core/http-serviece";
import {useTranslation} from "react-i18next";
import CourseList from "../features/courses/components/course-list.jsx";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

const Courses = () => {
    const {t} = useTranslation()
    const data = useLoaderData();
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='d-flex align-items-center justify-content-between mb-5'>
                    <a className='btn btn-primary fw-bolder mt-n1' href='#'
                       data-direction={localStorage.getItem('language') === 'fa' ? 'rtl' : 'ltr'}>
                        <i className='fas fa-plus ms-2'></i>
                        {t('coursesLayout.addButton')}
                    </a>
                </div>
                <Suspense fallback={<p className='text-info'>{t('loaderString.loading')}</p>}>
                    <Await resolve={data}>
                        {(loadedCourses) => <CourseList courses={loadedCourses}/>}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}



export async function coursesLoader() {
    const response = await httpInterceptedService.get('/Course/list');
    return response.data;
}

export default Courses;