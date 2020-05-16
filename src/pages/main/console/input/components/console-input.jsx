import React from "react";
import styled from "@emotion/styled";

import ConsoleInputField from "./console-input-field";

const ConsoleInputContainer = styled("div")`
    display: flex;
    color: green;
`;

const ConsoleInput = () => {
    return (
        <ConsoleInputContainer>
        <span>>>> </span><ConsoleInputField />
        </ConsoleInputContainer>
    );
};

export default ConsoleInput;
