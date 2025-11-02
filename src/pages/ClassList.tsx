import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const client = generateClient<Schema>();

function ClassList() {
    const [hablaclasses, setHablaclasses] = useState<
        Array<Schema["HablaClass"]["type"]>
    >([]);

    useEffect(() => {
        const sub = client.models.HablaClass.observeQuery().subscribe({
            next: (data) => setHablaclasses([...data.items]),
        });

        return () => sub.unsubscribe();
    }, []);

    const navigate = useNavigate();
    
    const handleEdit = (id: string) => {
        navigate("/editClass/" + id);
    }

    const handleDelete = (id: string) => {
        if (confirm("¿Seguro que quieres borrar esta clase?")) {
            client.models.HablaClass.delete({id});
        }
    }
    
    return (
        <View>
            <h1>Listado de clases</h1>
            <ul>
                {hablaclasses.map((hablaclass) => (
                    <li key={hablaclass.id} className="list">
                        <span>{hablaclass.name}</span>
                        <div className="flexGap10">
                            <button title="Editar"
                                onClick={() => handleEdit(hablaclass.id)}>
                                <Pencil size={18} color="blue" />
                            </button>

                            <button title="Borrar"
                                onClick={() => handleDelete(hablaclass.id)}>
                                <Trash2 size={18} color="red" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => navigate("/newClass")}>nueva clase</button>
            <br />
            <Link to={`/`}>&lt; Inicio</Link>
        </View>
    );
}

export default ClassList;
