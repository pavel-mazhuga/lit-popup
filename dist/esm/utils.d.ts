export declare const withPrefix: (text: string | number) => string;
export declare const KEYCODES: {
    ESC: number;
};
export declare const classes: {
    IS_OPENING: string;
    IS_CLOSING: string;
    OPENED: string;
};
export declare const events: {
    OPEN: string;
    OPEN_COMPLETE: string;
    CLOSE: string;
    CLOSE_COMPLETE: string;
    DESTROY: string;
};
export declare const listenOnce: (element: Element, eventName: string, fn: EventListener) => void;
export declare const triggerCustomEvent: (el: Element | Document | Window, eventName: string, data?: {}) => void;
