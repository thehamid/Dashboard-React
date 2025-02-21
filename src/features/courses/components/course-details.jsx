import {httpInterceptedService} from "@core/http-serviece";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import CourseDetailsPages from "./course-details-pages.jsx";
import {useTranslation} from "react-i18next";

const CourseDetails = () => {
    const data = useLoaderData();
    const {t}=useTranslation();
    return (
            <Suspense fallback={<p className='text-info'>{t('loaderString.loading')}</p>}>
                <Await resolve={data}>
                    {(courseDetails) => <CourseDetailsPages details={courseDetails}/>}
                </Await>
            </Suspense>
    )
}



export async function courseDetailsLoader ({params}) {
    const response = await httpInterceptedService.get(`/Course/by-id/${params.id}`);
    return response.data;
   
}

export default CourseDetails;

