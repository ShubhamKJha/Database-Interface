import React from "react";
import styled from "@emotion/styled";

import ConsoleInputField from "./console-input-field";

const ConsoleInputContainer = styled("div")`
    display: flex;
    border-top: 1px solid #ddd;
`;

const ConsoleInput = () => {
    return (
        <ConsoleInputContainer>
            <ConsoleInputField />
        </ConsoleInputContainer>
    );
};

export default ConsoleInput;

