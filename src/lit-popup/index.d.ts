interface EventOptions {
    [key: string]: unknown;
}

interface EventHandler {
    (eventName: string, fn: EventListener): void;
}

interface LitPopupInterface {
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

interface LitPopupOptions {
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

interface PluginDestroyer {
    (): void;
}

interface Plugin {
    (instance: LitPopupInterface): PluginDestroyer;
}

type Listener = [string, EventListener];

export default class LitPopup {
    private options: LitPopupOptions;
    public isOpen: boolean;
    public el: Element;
    public innerContainer: Element | null;
    private openButtons: Element[];
    private closeButtons: Element[];
    private plugins: Plugin[];
    private pluginDestroyers: PluginDestroyer[];
    public previousActiveElement: Element | null;
    private listeners: Listener[];

    constructor(name: string, options: EventOptions | {});

    private init(): void;

    public destroy(): void;

    public on(eventName: string, fn: EventListener): void;

    public one(eventName: string, fn: EventListener): void;

    public off(eventName: string, fn: EventListener): void;

    public trigger(eventName: string, options?: EventOptions): void;

    public async open(): Promise<void>;

    public async close(): Promise<void>;
}
