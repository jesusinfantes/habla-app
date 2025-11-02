import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const client = generateClient<Schema>();

function StudentList() {
    const [hablaStudents, setHablaStudents] = useState<
        Array<Schema["HablaStudent"]["type"]>
    >([]);

    async function fetchStudents() {
        const result = await client.models.HablaStudent.list();
        setHablaStudents(result.data);
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/editStudent/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Seguro que quieres borrar este alumno?")) {
            await client.models.HablaStudent.delete({ id });
            await fetchStudents();
        }
    };

    return (
        <View>
            <h1>Listado de alumnos</h1>
            <ul>
                {hablaStudents.map((hablaStudent) => (
                    <li key={hablaStudent.id} className="list">
                        {hablaStudent.firstName} {hablaStudent.lastName}
                        <div className="flexGap10">
                            <button
                                title="Editar"
                                onClick={() => handleEdit(hablaStudent.id)}
                            >
                                <Pencil size={18} color="blue" />
                            </button>

                            <button
                                title="Borrar"
                                onClick={() => handleDelete(hablaStudent.id)}
                            >
                                <Trash2 size={18} color="red" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => navigate("/newStudent")}>nuevo alumno</button>
            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default StudentList;
