import LitPopup from '../index';
import { withPrefix } from '../utils';

const name = 'test';
const element = document.createElement('div');
element.dataset.litModal = name;

beforeEach(() => {
    document.body.appendChild(element);
});

afterEach(() => {
    document.body.innerHTML = '';
});

it('throws when no DOM element found', () => {
    element.remove();
    expect(() => new LitPopup(name)).toThrow(withPrefix('Element not found.'));
});

it('inits properly', () => {
    LitPopup.prototype.init = jest.fn();

    const openButton = document.createElement('button');
    openButton.dataset.litModalOpen = name;
    document.body.appendChild(openButton);

    const closeButton = document.createElement('button');
    closeButton.dataset.litModalClose = name;
    document.body.appendChild(closeButton);

    const instance = new LitPopup(name);

    expect(instance.init).toHaveBeenCalledTimes(1);
    expect(instance.el).toEqual(element);
    expect(instance.isOpen).toEqual(false);
    expect(instance.innerContainer).toBeNull();
    expect((instance as any).openButtons.length).toEqual(1);
    expect((instance as any).closeButtons.length).toEqual(1);
});
