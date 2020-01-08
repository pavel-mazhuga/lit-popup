export declare const withPrefix: (text: string | number) => string;
export declare const KEYCODES: {
    ESC: number;
};
export declare const listenOnce: (element: Element, eventName: string, fn: EventListener) => void;
export declare const triggerCustomEvent: (el: Element | Document | Window, eventName: string, data?: {}) => void;
