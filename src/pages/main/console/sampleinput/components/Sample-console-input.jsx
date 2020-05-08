import React from "react";
import styled from "@emotion/styled";

import SampleConsoleInputField from "./sample-console-input-field";

const ConsoleInputContainer = styled("div")`
    display: flex;
    border-top: 1px solid #ddd;
`;

const SampleConsoleInput = () => {
    return (
        <ConsoleInputContainer>
            <SampleConsoleInputField />
        </ConsoleInputContainer>
    );
};

export default SampleConsoleInput;
