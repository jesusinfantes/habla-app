import { View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ClassList from "./pages/ClassList";
import ClassDetail from "./pages/ClassDetail";
import TeacherList from "./pages/TeacherList";
import TeacherDetail from "./pages/TeacherDetail";
import StudentList from "./pages/StudentList";
import StudentDetail from "./pages/StudentDetail";
import SessionList from "./pages/SessionList";
import SessionDetail from "./pages/SessionDetail";

function App() {
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const { tokens } = await fetchAuthSession();
                const groups = tokens?.idToken?.payload["cognito:groups"] || [];
                if (Array.isArray(groups)) {
                    setIsAdminUser(groups.includes("admin"));
                }
            } catch (e) {
                console.log("groups was not an array");
                setIsAdminUser(false);
            }
        }

        checkAdmin();
    }, []);

    const { signOut } = useAuthenticator();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <h1 className="gradient-text">HABLA</h1>
                            {isAdminUser ? (
                                <View className="button-link-container">
                                    <Link to={`/classList/`} className="button-link">Clases</Link>
                                    <Link to={`/teacherList/`} className="button-link">Profesores</Link>
                                    <Link to={`/studentList/`} className="button-link">Alumnos</Link>
                                    <Link to={`/sessionList/`} className="button-link">Sesiones</Link>
                                </View>
                            ) : null}{" "}
                            <button onClick={signOut}>Sign out</button>
                        </main>
                    }
                ></Route>
                
                <Route path="/classList" element={<ClassList />}></Route>
                <Route path="/newClass" element={<ClassDetail />}></Route>
                <Route path="/editClass/:id" element={<ClassDetail />}></Route>

                <Route path="/teacherList" element={<TeacherList />}></Route>
                <Route path="/newTeacher" element={<TeacherDetail />}></Route>
                <Route path="/editTeacher/:id" element={<TeacherDetail />}></Route>
                
                <Route path="/studentList" element={<StudentList />}></Route>
                <Route path="/newStudent" element={<StudentDetail />}></Route>
                <Route path="/editStudent/:id" element={<StudentDetail />}></Route>
                
                <Route path="/sessionList" element={<SessionList />}></Route>
                <Route path="/newSession" element={<SessionDetail />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
