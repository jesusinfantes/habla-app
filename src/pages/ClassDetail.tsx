import { View } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

function ClassDetail() {
    return (
    <View textAlign="center" padding="0">
        <h1>Class Detail</h1>
        <Link to={`/`}>&lt; Inicio</Link>
    </View>
    )
}

export default ClassDetail;
