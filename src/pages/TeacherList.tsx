import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const client = generateClient<Schema>();

function TeacherList() {
    const [hablaTeachers, setHablaTeachers] = useState<
        Array<Schema["HablaTeacher"]["type"]>
    >([]);

    useEffect(() => {
        async function fetchTeachers() {
            const result = await client.models.HablaTeacher.list();
            setHablaTeachers(result.data);
        }

        fetchTeachers();
    }, []);

    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate("/editTeacher/" + id);
    };

    const handleDelete = (id: string) => {
        if (confirm("¿Seguro que quieres borrar este profesor?")) {
            client.models.HablaTeacher.delete({ id });
        }
    };

    return (
        <View>
            <h1>Listado de profesores</h1>
            <ul>
                {hablaTeachers.map((hablaTeacher) => (
                    <li key={hablaTeacher.id} className="list">
                        {hablaTeacher.firstName} {hablaTeacher.lastName}
                        <div>
                            <button
                                title="Editar"
                                onClick={() => handleEdit(hablaTeacher.id)}
                            >
                                <Pencil size={18} color="blue" />
                            </button>

                            <button
                                title="Borrar"
                                onClick={() => handleDelete(hablaTeacher.id)}
                            >
                                <Trash2 size={18} color="red" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => navigate("/newTeacher")}>nuevo profesor</button>

            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default TeacherList;
