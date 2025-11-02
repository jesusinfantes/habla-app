import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function StudentDetail() {
    const [myFirstName, setMyFirstName] = useState("");
    const [myLastName, setMyLastName] = useState("");
    const [myEmail, setMyEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            client.models.HablaStudent.update({
                id: id,
                firstName: myFirstName,
                lastName: myLastName,
                email: myEmail,
            });
        } else {
            client.models.HablaStudent.create({
                firstName: myFirstName,
                lastName: myLastName,
                email: myEmail,
            });
        }
            
        navigate("/studentList");
    };

    const { id } = useParams();

    useEffect(() => {
        async function fetchStudent() {
            if (id) {
                const myStudent = await client.models.HablaStudent.get({ id });
                setMyFirstName(myStudent.data?.firstName ?? "");
                setMyLastName(myStudent.data?.lastName ?? "");
                setMyEmail(myStudent.data?.email ?? "");
            }
        }

        fetchStudent();
    }, [id]);

    return (
        <View textAlign="left" padding="0">
            <h1>Detalle Alumno</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="mbs"
                    value={myFirstName}
                    placeholder="Nombre"
                    name="myFirstName"
                    onChange={(e) => setMyFirstName(e.target.value)}
                />
                <br />
                <input
                    className="mbs"
                    value={myLastName}
                    placeholder="Apellidos"
                    name="myLastName"
                    onChange={(e) => setMyLastName(e.target.value)}
                />
                <br />
                <input
                    className="mbs"
                    value={myEmail}
                    placeholder="Email"
                    name="myEmail"
                    onChange={(e) => setMyEmail(e.target.value)}
                />
                <br />
                <div className="flexGap10">
                    <button type="submit">guardar</button>
                    <button type="button" onClick={() => navigate("/studentList")}>cancelar</button>
                </div>
            </form>
            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default StudentDetail;
