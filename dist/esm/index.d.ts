export interface EventOptions {
    [key: string]: unknown;
}
export interface EventHandler {
    (eventName: string, fn: EventListener): void;
}
export interface LitPopupInterface {
    isOpen: boolean;
    el: Element;
    innerContainer: Element | null;
    previousActiveElement: Element | null;
    open: () => Promise<void>;
    close: () => Promise<void>;
    destroy: () => void;
    on: EventHandler;
    one: EventHandler;
    off: EventHandler;
    trigger: (eventName: string, options?: EventOptions) => void;
}
export interface LitPopupOptions {
    plugins: Plugin[];
    innerContainerSelector: string;
    onOpen: (instance: LitPopupInterface) => void;
    onOpenComplete: (instance: LitPopupInterface) => void;
    onClose: (instance: LitPopupInterface) => void;
    onCloseComplete: (instance: LitPopupInterface) => void;
    openAnimation: (instance: LitPopupInterface) => Promise<void>;
    closeAnimation: (instance: LitPopupInterface) => Promise<void>;
    onDestroy: (instance: LitPopupInterface) => void;
}
export interface PluginDestroyer {
    (): void;
}
export interface Plugin {
    (instance: LitPopupInterface): PluginDestroyer;
}
export declare type Listener = [string, EventListener];
export default class LitPopup implements LitPopupInterface {
    private options;
    isOpen: boolean;
    el: Element;
    innerContainer: Element | null;
    private openButtons;
    private closeButtons;
    private plugins;
    private pluginDestroyers;
    previousActiveElement: Element | null;
    private listeners;
    constructor(name: string, options?: EventOptions);
    private init;
    destroy(): void;
    on(eventName: string, fn: EventListener): void;
    one(eventName: string, fn: EventListener): void;
    off(eventName: string, fn: EventListener): void;
    trigger(eventName: string, options?: EventOptions): void;
    setOpenAnimation(fn: () => Promise<void>): void;
    setCloseAnimation(fn: () => Promise<void>): void;
    open(): Promise<void>;
    close(): Promise<void>;
}
