# LitPopup

## A customizable lightweight popup plugin with no dependencies.

## Why?

I needed full control over popup animation and its lifecycle.

## Installation

### NPM

Install it from NPM:
`npm i lit-popup`

## Usage

```html
<div class="lit-popup" data-lit-popup="popup">
    <div class="lit-popup-container">
        <!-- Layout here -->
    </div>
</div>
```

```javascript
import LitPopup from 'lit-popup';

const popup = new LitPopup('name');
```

## API

### Hooks (lifecycle callbacks)

| Hook            | Parameters           | Description                                                                                                  |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| onOpen          | (instance: LitPopup) | Runs before opening animation                                                                                |
| onOpenComplete  | (instance: LitPopup) | Runs after opening animation                                                                                 |
| onClose         | (instance: LitPopup) | Runs before closing animation                                                                                |
| onCloseComplete | (instance: LitPopup) | Runs after closing animation                                                                                 |
| onDestroy       | (instance: LitPopup) | Runs when 'destroy' method is called                                                                         |
| openAnimation   | (instance: LitPopup) | A function describing an opening animation. **It must return a promise and resolve when animation is done**. |
| closeAnimation  | (instance: LitPopup) | A function describing a closing animation. **It must return a promise and resolve when animation is done**.  |

### Events

| Event          | Parameters | Description                              |
| -------------- | ---------- | ---------------------------------------- |
| open           | none       | Triggers before opening animation        |
| open-complete  | none       | Triggers after opening animation         |
| close          | none       | Triggers before closing animation        |
| close-complete | none       | Triggers after closing animation         |
| destroy        | none       | Triggers when 'destroy' method is called |

### Methods

| Method  | Parameters                              | Return          | Description                                                                       |
| ------- | --------------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| open    | none                                    | Promise`<void>` | Opens the modal                                                                   |
| close   | none                                    | Promise`<void>` | Closes the modal                                                                  |
| destroy | none                                    | void            | Destroys the instance, disposes memory                                            |
| on      | (eventName: string, listener: Function) | void            | Adds an event listener to the popup element                                       |
| one     | (eventName: string, listener: Function) | void            | Adds an event listener to the popup element which will be executed only once      |
| off     | (eventName: string, listener: Function) | void            | Removes an event listener from the popup element which will be executed only once |
| trigger | (eventName: string)                     | void            | Triggers an event on the popup element                                            |

### Accessibility

_Work on progress_
