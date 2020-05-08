import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ConsoleContainer from "./console-container";

const inputBackgroundColor = (opacity = 1) => `rgba(251,251,253,${opacity})`;

const InputContainer = styled(ConsoleContainer)`
  overflow: auto;
  margin-bottom: 0px;
  margin-top: 0px;
  background-color: ${inputBackgroundColor()};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const InputBody = styled("pre")`
  padding: 0;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: monospace;
  grid-column: 2 / 4;
  opacity: 0.7;
`;

InputBody.propTypes = {
  language: PropTypes.string
};

const HistoryInputItem = ({ children }) => {
  return (
    <InputContainer>
      <InputBody>
        {children}
      </InputBody>
    </InputContainer>
  );
};

HistoryInputItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default HistoryInputItem;
