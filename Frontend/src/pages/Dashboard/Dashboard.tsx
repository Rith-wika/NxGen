import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";

const Dashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!role) {
            navigate("/student-login");
        }
    }, [navigate, role]);

    if (role === "instructor") {
        return <InstructorDashboard />;
    }

    return <StudentDashboard />;
};

export default Dashboard;
