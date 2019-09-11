import { KEYCODES } from '../utils';
import { events, LitPopupInterface, PluginDestroyer } from '../lit-popup';

export default (instance: LitPopupInterface): PluginDestroyer => {
    const onKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === KEYCODES.ESC) {
            event.preventDefault();
            if (instance.isOpen) instance.close();
        }
    };

    const attachListeners = () => {
        document.addEventListener('keydown', onKeydown as EventListener);
    };

    const deattachListeners = () => {
        document.removeEventListener('keydown', onKeydown as EventListener);
    };

    instance.on(events.OPEN, attachListeners);
    instance.on(events.CLOSE, deattachListeners);

    return () => {
        deattachListeners();
    };
};
