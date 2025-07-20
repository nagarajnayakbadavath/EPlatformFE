import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

const RemoveCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get(`${API_URL}/user/getAllCourses`, { withCredentials: true })
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleRemove = (courseId) => {
    axios.delete(`${API_URL}/deleteCourse/${courseId}`, { withCredentials: true }).then(() => {
        alert('Course removed successfully');
        fetchCourses();
      })
      .catch((err) => {
        console.error('Error deleting course:', err.message);
      });
  };

  if (courses.length === 0) {
    return <div>Loading....!</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {courses.map((course) => (
        <div key={course._id} style={{ border: '1px solid gray', marginBottom: '1rem', padding: '1rem', borderRadius: '8px' }}>
          <h2>{course.title}</h2>
          {course.media.map((mediaFile) => (
            <video
              key={mediaFile._id}
              width="320"
              height="240"
              controls
              src={mediaFile.url}
              style={{ display: 'block', marginBottom: '0.5rem' }}
            />
          ))}
          <button
            onClick={() => handleRemove(course._id)}
            style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default RemoveCourses;
