import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function TeacherDetail() {
    const [myFirstName, setMyFirstName] = useState("");
    const [myLastName, setMyLastName] = useState("");
    const [myEmail, setMyEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await client.models.HablaTeacher.update({
                id: id,
                firstName: myFirstName,
                lastName: myLastName,
                email: myEmail,
            });
        } else {
            await client.models.HablaTeacher.create({
                firstName: myFirstName,
                lastName: myLastName,
                email: myEmail,
            });
        }
        navigate("/teacherList");
    };

    const { id } = useParams();

    useEffect(() => {
        async function fetchTeacher() {
            if (id) {
                const myTeacher = await client.models.HablaTeacher.get({ id });
                setMyFirstName(myTeacher.data?.firstName ?? "");
                setMyLastName(myTeacher.data?.lastName ?? "");
                setMyEmail(myTeacher.data?.email ?? "");
            }
        }

        fetchTeacher();
    }, [id]);

    return (
        <View textAlign="left" padding="0">
            <h1>Detalle Profesor</h1>
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
                    <button type="button" onClick={() => navigate("/classList")}>cancelar</button>
                </div>
            </form>
            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default TeacherDetail;
