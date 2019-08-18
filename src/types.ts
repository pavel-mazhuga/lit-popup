export interface EventOptions {
    [key: string]: unknown;
}

export interface EventHandler {
    (eventName: string, fn: EventListener, options: EventOptions): void;
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
    trigger: (eventName: string, options: EventOptions) => void;
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
}

export interface PluginDestroyer {
    (): void;
}

export interface Plugin {
    (instance: LitPopupInterface): PluginDestroyer;
}
