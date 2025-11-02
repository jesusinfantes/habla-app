import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function SessionDetail() {
    const [hablaClasses, setHablaClasses] = useState<
        Array<Schema["HablaClass"]["type"]>
    >([]);
    
    const [hablaTeachers, setHablaTeachers] = useState<
        Array<Schema["HablaTeacher"]["type"]>
    >([]);
    
    const [myHablaClassId, setMyHablaClassId] = useState("");
    const [myHablaTeacherId, setMyHablaTeacherId] = useState("");
    // const [myLastName, setMyLastName] = useState("");
    // const [myEmail, setMyEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
        // do nothing
        //     client.models.HablaStudent.update({
        //         id: id,
        //         firstName: myFirstName,
        //         lastName: myLastName,
        //         email: myEmail,
        //     });
        } else {
            client.models.HablaClassSession.create({
                hablaClassId: myHablaClassId,
                hablaTeacherId: myHablaTeacherId,
                startDate: new Date("2025-10-25T15:00:00Z").toISOString(),
                endDate: new Date("2025-11-25T15:00:00Z").toISOString(),
            });
        }
            
        // navigate("/studentList");
    };

    const { id } = useParams();

    useEffect(() => {
        async function fetchHablaClasses() {
            const myClasses = await client.models.HablaClass.list();
            setHablaClasses(myClasses.data);

            if (id) {    
                // setMyFirstName(myStudent.data?.firstName ?? "");
                // setMyLastName(myStudent.data?.lastName ?? "");
                // setMyEmail(myStudent.data?.email ?? "");
            } else {
                // do nothing for now
            }
        }
        
        async function fetchHablaTeachers() {
            const myTeachers = await client.models.HablaTeacher.list();
            setHablaTeachers(myTeachers.data)
        }

        fetchHablaClasses();
        fetchHablaTeachers();
    }, [id]);

    return (
        <View textAlign="left" padding="0">
            <h1>Detalle Sesión</h1>
            <form onSubmit={handleSubmit}>
                <select title="Clase" className="mbs"
                    onChange={(o) => setMyHablaClassId(o.target.value)}
                >
                    <option>-seleccione clase-</option>
                    {(
                        hablaClasses.map(
                            (o) => <option key={o.id} value={o.id}>{o.name}</option>
                        )
                    )}
                </select>
                <br/>
                <select title="Profesor" className="mbs"
                    onChange={(o) => setMyHablaTeacherId(o.target.value)}
                >
                    <option>-seleccione profesor-</option>
                    {(
                        hablaTeachers.map(
                            (o) => <option key={o.id} value={o.id}>{o.firstName} {o.lastName}</option>
                        )
                    )}
                </select>
                {/* <input
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
                <br /> */}
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

export default SessionDetail;
