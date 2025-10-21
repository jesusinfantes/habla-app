import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";

const client = generateClient<Schema>();

function App() {
    const [isAdminUser, setIsAdminUser] = useState(false);

    const [hablaclasses, setHablaclasses] = useState<
        Array<Schema["HablaClass"]["type"]>
    >([]);

    useEffect(() => {
        client.models.HablaClass.observeQuery().subscribe({
            next: (data) => setHablaclasses([...data.items]),
        });

        async function checkAdmin() {
            try {
                const { tokens } = await fetchAuthSession();
                const groups = tokens?.idToken?.payload["cognito:groups"] || [];
                if (Array.isArray(groups)) {
                    setIsAdminUser(groups.includes("admin"));
                }
            } catch (e) {
                console.log("groups was not an array");
                setIsAdminUser(false);
            }
        }

        checkAdmin();
    }, []);

    function createHablaClass() {
        client.models.HablaClass.create({
            name: window.prompt("Habla Class name"),
            description: window.prompt("Habla Class description"),
            teacher: window.prompt("Habla class teacher"),
        });
    }

    const { signOut } = useAuthenticator();

    return (
        <main>
            <h1>My Habla Classes</h1>
            {isAdminUser ? (
                <button onClick={createHablaClass}>+ new class</button>
            ) : null}{" "}
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
