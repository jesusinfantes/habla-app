import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
    const [hablaclasses, setHablaclasses] = useState<Array<Schema["HablaClass"]["type"]>>([]);

    useEffect(() => {
        client.models.HablaClass.observeQuery().subscribe({
            next: (data) => setHablaclasses([...data.items]),
        });
    }, []);

    function createHablaClass() {
        client.models.HablaClass.create({
           name: window.prompt("Habla Class name"),
           description: window.prompt("Habla Class description"),
           teacher: window.prompt("Habla class teacher")
          });
    }

    const { signOut, user } = useAuthenticator();

    console.log(user);
    
    return (
        <main>
            <h1>My Habla Classes</h1>
            <button onClick={createHablaClass}>+ new</button>
            <ul>
                {hablaclasses.map((hablaclass) => (
                    <li key={hablaclass.id}>{hablaclass.name}</li>
                ))}
            </ul>
            <button onClick={signOut}>Sign out</button>
        </main>
    );
}

export default App;
