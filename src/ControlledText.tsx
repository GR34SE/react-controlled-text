import React, {useRef, useLayoutEffect, createElement, HTMLAttributes} from "react";

type TagName = "span" | "div" | "p" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props extends HTMLAttributes<HTMLElement> {
    children: string;
    fontSizeMin: number;
    fontSizeMax: number;
    className: string;
    tagName: TagName;
}

const ControlledText: React.FC<Partial<Props>> = props => {
    const {
        children,
        fontSizeMin = 10,
        fontSizeMax = 16,
        className = "react-controlled-text",
        tagName = "span",
        ...otherProps
    } = props;

    const textContainerRef = useRef(null);
    const fontSizeRef = useRef(fontSizeMax);

    useLayoutEffect(() => {
        const isFontSizeDecrementNeeded = (): boolean =>
            fontSizeRef.current > fontSizeMin &&
            (textContainerRef.current.scrollHeight > textContainerRef.current.clientHeight ||
                textContainerRef.current.scrollWidth > textContainerRef.current.clientWidth);

        while (isFontSizeDecrementNeeded()) {
            fontSizeRef.current--;
            textContainerRef.current.style.fontSize = fontSizeRef.current + "px";
        }
    }, [fontSizeMin]);

    const elementProps = {ref: textContainerRef, className, ...otherProps};

    return createElement(tagName, elementProps, children);
};

export default ControlledText;
