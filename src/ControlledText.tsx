import React, {
    useRef,
    useLayoutEffect,
    useEffect,
    useCallback,
    createElement,
    HTMLAttributes
} from "react";
import {debounce} from "./utils/debounce";

type TagName = "span" | "div" | "p" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props extends HTMLAttributes<HTMLElement> {
    children: string;
    fontSizeMin: number;
    fontSizeMax: number;
    className: string;
    tagName: TagName;
    resizeThrottle: number;
    clampSuffix: string;
    disableScaling: boolean;
    disableTextClamp: boolean;
}

const ControlledText: React.FC<Partial<Props>> = props => {
    const {
        children,
        fontSizeMin = 10,
        fontSizeMax = 16,
        className = "react-controlled-text",
        tagName = "span",
        resizeThrottle = 250,
        clampSuffix = "...",
        disableScaling = false,
        disableTextClamp = false,
        ...otherProps
    } = props;

    const textChildren = typeof children === "string" ? children : "";

    const textContainerRef = useRef<HTMLElement | null>(null);
    const fontSizeRef = useRef<number>(fontSizeMax);

    const isOverflowing = useCallback((): boolean => {
        return textContainerRef.current.scrollHeight > textContainerRef.current.clientHeight;
    }, []);

    const handleClamp = useCallback((): void => {
        while (isOverflowing()) {
            const textString = textContainerRef.current.textContent;
            const lastWordIndex = textString.lastIndexOf(" ");

            if (lastWordIndex > 0) {
                let nextTextString = textString.substring(0, lastWordIndex);
                if (nextTextString.endsWith(",")) nextTextString = nextTextString.slice(0, -1);

                textContainerRef.current.textContent = nextTextString + clampSuffix;
            } else break;
        }
    }, [isOverflowing, clampSuffix]);

    const handleResizeToFit = useCallback((): void => {
        while (fontSizeRef.current > fontSizeMin && isOverflowing()) {
            fontSizeRef.current--;
            textContainerRef.current.style.fontSize = fontSizeRef.current + "px";
        }
    }, [fontSizeMin, isOverflowing]);

    const handleEffects = useCallback((): void => {
        if (!disableScaling) handleResizeToFit();
        if (!disableTextClamp && isOverflowing()) handleClamp();
    }, [disableScaling, disableTextClamp, isOverflowing, handleResizeToFit, handleClamp]);

    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect((): void => {
        fontSizeRef.current = fontSizeMax;
        textContainerRef.current.style.fontSize = fontSizeRef.current + "px";

        handleEffects();
    }, [handleEffects, fontSizeMax, textChildren]);

    useIsomorphicLayoutEffect((): (() => void) => {
        const debouncedHandleResizeToFit = debounce(handleEffects, resizeThrottle);
        window.addEventListener("resize", debouncedHandleResizeToFit);

        return (): void => window.removeEventListener("resize", debouncedHandleResizeToFit);
    }, [handleEffects, resizeThrottle]);

    const elementProps = {
        ref: textContainerRef,
        className,
        "data-testid": "controlledTextNode",
        style: {
            display: "inline-block",
            height: "100%",
            width: "100%"
        },
        ...otherProps
    };

    return createElement(tagName, elementProps, textChildren);
};

export default ControlledText;
