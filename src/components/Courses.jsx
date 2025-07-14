import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const Courses= () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/user/getAllCourses`, { withCredentials: true })
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-2">{course.title}</h2>

            {course.media?.[0]?.fileType === "auto" && (
              <video
                src={course.media[0].url}
                controls
                className="w-full h-48 object-cover rounded"
              />
            )}

            <p className="text-sm text-gray-500 mt-2">
              <button className="w-20 h-10 object-cover rounded bg-blue-500 justify-center text-black">Enroll</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
