import React, {useRef, useLayoutEffect, useCallback, createElement, HTMLAttributes} from "react";
import {debounce} from "./utils/debounce";

type TagName = "span" | "div" | "p" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props extends HTMLAttributes<HTMLElement> {
    children: string;
    fontSizeMin: number;
    fontSizeMax: number;
    className: string;
    tagName: TagName;
    resizeThrottle: number;
}

const ControlledText: React.FC<Partial<Props>> = props => {
    const {
        children,
        fontSizeMin = 10,
        fontSizeMax = 16,
        className = "react-controlled-text",
        tagName = "span",
        resizeThrottle = 250,
        ...otherProps
    } = props;

    const textContainerRef = useRef(null);
    const fontSizeRef = useRef(fontSizeMax);

    const isFontSizeDecrementNeeded = useCallback((): boolean => {
        return (
            textContainerRef.current &&
            fontSizeRef.current > fontSizeMin &&
            (textContainerRef.current.scrollHeight > textContainerRef.current.clientHeight ||
                textContainerRef.current.scrollWidth > textContainerRef.current.clientWidth)
        );
    }, [fontSizeMin]);

    const handleResizeToFit = useCallback((): void => {
        while (isFontSizeDecrementNeeded()) {
            fontSizeRef.current--;
            textContainerRef.current.style.fontSize = fontSizeRef.current + "px";
        }
    }, [isFontSizeDecrementNeeded]);

    useLayoutEffect((): (() => void) => {
        handleResizeToFit();

        const debouncedHandleResizeToFit = debounce(handleResizeToFit, resizeThrottle);
        window.addEventListener("resize", debouncedHandleResizeToFit);

        return (): void => window.removeEventListener("resize", debouncedHandleResizeToFit);
    }, [handleResizeToFit, resizeThrottle]);

    const elementProps = {
        ref: textContainerRef,
        className,
        "data-testid": "controlledTextNode",
        ...otherProps
    };

    return createElement(tagName, elementProps, children);
};

export default ControlledText;
