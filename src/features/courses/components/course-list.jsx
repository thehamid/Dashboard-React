import Course from "./course.jsx";

const CourseList = ({courses}) => {
    return(
       <>
           <div className='row'>
               {
                   courses.map((course)=>(
                       <div className='col-3' key={course.id}>
                           <Course {...course}/>
                       </div>
                   ))
               }
           </div>
       </>
    )
}
export default CourseList;