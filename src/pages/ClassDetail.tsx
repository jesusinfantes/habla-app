import { View } from "@aws-amplify/ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function ClassDetail() {
    const {id} = useParams();
    const [myName, setMyName] = useState("");
    const [myDescription, setMyDescription] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id)
        {
            await client.models.HablaClass.update({
                id: id,
                name: myName,
                description: myDescription
            });
        } else {
            await client.models.HablaClass.create({
                name: myName,
                description: myDescription
            });
        }
        navigate("/classList");
    };

    useEffect(() => {
        async function fetchClass() {
            if (id)
            {
                const myClass = await client.models.HablaClass.get({id});
                setMyName(myClass.data?.name ?? "");
                setMyDescription(myClass.data?.description ?? "");
            }
        }
        
        fetchClass();
    }, [id]);

    return (
        <View textAlign="left" padding="0">
            <h1>Detalle Clase</h1>
            <form onSubmit={handleSubmit}>
                <input value={myName} className="mbs" placeholder="name" onChange={(e) => setMyName(e.target.value)}/>
                <br/>
                <input value={myDescription} className="mbs" placeholder="description" onChange={(e) => setMyDescription(e.target.value)}/>
                <br/>
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

export default ClassDetail;
