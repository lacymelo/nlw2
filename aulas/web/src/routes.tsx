import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importação das páginas
import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/study" element={<TeacherList />} />
                <Route path="/give-classes" element={<TeacherForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;