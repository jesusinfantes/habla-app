import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const client = generateClient<Schema>();

type SessionWithRelations = {
  id: string;
  startDate?: string | null;
  endDate?: string | null;
  hablaClassId?: string | null;
  hablaTeacherId?: string | null;
  hablaClass?: { name?: string | null } | null;
  hablaTeacher?: { firstName?: string | null; lastName?: string | null } | null;
};

function SessionList() {
    const [hablaClassSessions, setHablaClassSessions] = useState<
            SessionWithRelations[]
        >([]);

    const fetchHablaClassSessions = async () => {
        const result = await client.models.HablaClassSession.list({
            selectionSet: [
                "id",
                "startDate",
                "endDate",
                "hablaClassId",
                "hablaTeacherId",
                "hablaClass.name", // ✅ nested field
                "hablaTeacher.firstName", // ✅ another nested relation
                "hablaTeacher.lastName",
            ],
        });

        setHablaClassSessions(result.data);
    };

    useEffect(() => {
        fetchHablaClassSessions();
    }, []);

    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate("/editClass/" + id);
    };

    const handleDelete = (id: string) => {
        if (confirm("¿Seguro que quieres borrar esta sesión?")) {
            client.models.HablaClass.delete({ id });
        }
    };

    return (
        <View>
            <h1>Listado de sesiones</h1>
            <ul>
                {hablaClassSessions.map((hablaclassSession) => (
                    <li key={hablaclassSession.id} className="list">
                        <span>{hablaclassSession.hablaClass?.name}</span>
                        <span>{hablaclassSession.hablaTeacher?.firstName} {hablaclassSession.hablaTeacher?.lastName}</span>
                        <div className="flexGap10">
                            <button
                                title="Editar"
                                onClick={() => handleEdit(hablaclassSession.id)}
                            >
                                <Pencil size={18} color="blue" />
                            </button>

                            <button
                                title="Borrar"
                                onClick={() =>
                                    handleDelete(hablaclassSession.id)
                                }
                            >
                                <Trash2 size={18} color="red" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => navigate("/newSession")}>
                nueva sesión
            </button>
            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default SessionList;
