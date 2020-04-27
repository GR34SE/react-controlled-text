import React, {useRef, useLayoutEffect, createElement} from "react";

type TagName = "span" | "div" | "p" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props {
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
        tagName = "span"
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

    const elementProps = {ref: textContainerRef, className};

    return createElement(tagName, elementProps, children);
};

export default ControlledText;
