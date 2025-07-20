import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [activeVideos, setActiveVideos] = useState({});

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

  const handleStart = (mediaId) => {
    setActiveVideos((prev) => ({ ...prev, [mediaId]: true }));
  };

  const handleStop = (mediaId) => {
    const video = document.getElementById(mediaId);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setActiveVideos((prev) => ({ ...prev, [mediaId]: false }));
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '0.5rem',
  };

  const startButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    color: 'white',
  };

  if (courses.length === 0) {
    return <div>Loading....!</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: '1px solid gray',
            marginBottom: '1rem',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <h2>{course.title}</h2>

          {course.media.map((mediaFile) => {
            const isActive = activeVideos[mediaFile._id];
            return (
              <div key={mediaFile._id} style={{ marginBottom: '1rem' }}>
                {!isActive ? (
                  <>
                    <img
                      src="https://dummyimage.com/320x240/cccccc/000000&text=Click+Start+to+Play"
                      alt="Video thumbnail"
                      width="320"
                      height="240"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        objectFit: 'cover',
                        borderRadius: '6px',
                      }}
                    />
                    <button style={startButtonStyle} onClick={() => handleStart(mediaFile._id)}>
                      ▶ Start
                    </button>
                  </>
                ) : (
                  <>
                    <video
                      id={mediaFile._id}
                      width="320"
                      height="240"
                      controls
                      autoPlay
                      src={mediaFile.url}
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        borderRadius: '6px',
                      }}
                    />
                    <button style={closeButtonStyle} onClick={() => handleStop(mediaFile._id)}>
                      ✖ Close
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Courses;
