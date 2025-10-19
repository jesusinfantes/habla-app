import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import CustomHeader from "./components/CustomHeader.tsx"

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider
            theme={{
                name: "CustomTheme",
                tokens: {
                    colors: {
                        brand: {
                            primary: {
                                10: "#E8F5E9",
                                80: "#2E7D32",
                                100: "#1B5E20",
                            },
                        },
                    },
                },
            }}
        >
            <Authenticator
                components={{
                    Header: CustomHeader,
                }}
                variation="modal"
            >
                <App />
            </Authenticator>
        </ThemeProvider>
    </React.StrictMode>
);
