import "@testing-library/jest-dom";

import React from "react";
import {render, getByTestId} from "@testing-library/react";
import ControlledText from "./ControlledText";

const testText =
    "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.";

const testId = "controlledTextNode";
const className = "test-classname";

it("should render without crash", () => {
    render(<ControlledText>{testText}</ControlledText>);
});

it("should render provided text", () => {
    const {container} = render(<ControlledText>{testText}</ControlledText>);
    const controlledTextNode = getByTestId(container, testId);

    expect(controlledTextNode).toHaveTextContent(testText);
});

it("should have provided className", () => {
    const {container} = render(<ControlledText className={className}>{testText}</ControlledText>);
    const controlledTextNode = getByTestId(container, testId);

    expect(controlledTextNode).toHaveClass(className);
});

it("should create specified tag type", () => {
    const {container} = render(<ControlledText tagName={"a"}>{testText}</ControlledText>);
    const controlledTextNode = container.getElementsByTagName("a")[0];

    expect(controlledTextNode).not.toBeUndefined();
});
