import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate=useNavigate();
  const handleExploreCourse=()=>{
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-6">
          About Skillora
        </h1>

        <p className="text-gray-700 mb-6">
          Skillora is a student-driven online learning platform focused on empowering learners with
          practical skills, academic knowledge, and career-building resources. We started this platform
          to help students like ourselves access quality courses and learning materials without barriers.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Our mission is to make quality learning accessible and flexible for everyone, no matter where
          they are. We believe learning should be simple, community-driven, and focused on real-world
          skills.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Diverse Online Courses: Programming, design, academics, soft skills.</li>
          <li>Student-Friendly Experience: Easy-to-use dashboards and progress tracking.</li>
          <li>Certification: Showcase your skills with verifiable certificates.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Who We Are</h2>
        <p className="text-gray-700 mb-6">
          Skillora is built by students, for students. Started as a campus project, we aim to grow into a
          platform that helps learners from across different backgrounds.
        </p>

        <div className="text-center">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          onClick={handleExploreCourse}>
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
