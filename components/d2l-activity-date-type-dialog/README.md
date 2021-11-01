# Activity Date Type Selection Dialog `[d2l-activity-availability-date-type-dialog]`

This dialog is intended to be used anywhere date type selecition is needed for Activity Availability Dates. The Dialog is a lightweight and simple component that groups the radio button and calendar checkbox together with consistent styling.


## Properties

| Name | Attribute | Type | Description |
|--|--|--|--|
| `opened` | True | Boolean | Whether or not the dialog is open |
| `titleText` | False | String, required | Text displayed in the header of the dialog |
| `descriptionText` | False | String, required | Text displayed in body of the dialog before the input elements |
| `dateType` | False | Number, required | Sets the corresponding radio button on open `{ 0: 'accessRestricted'| 1: 'submissionRestricted'| 2: 'hidden' }` |
| `displayInCalendar` | False | Boolean | DiC checked state on dialog open |
| `width` | True | Number, default: `600` | The preferred width (unit-less) for the dialog |

## Events

- `d2l-activity-date-type-dialog-closed`: dispatched with action, dateType and displayInCalendar values when dialog is closed for any reason. 
  -  ```javascript
     this.dispatchEvent(new CustomEvent('d2l-activity-date-type-dialog-closed', {
       detail: {
         action: e.detail.action, // ['done', 'cancel', 'abort']
         dateType: this.dateType, // { 0: 'accessRestricted'| 1: 'submissionRestricted'| 2: 'hidden'}
         displayInCalendar: this.displayInCalendar
       },
       bubbles: true,
       composed: true,
       cancelable: true
     }));
     ```
  - 
- `d2l-dialog-open`: dispatched when the dialog is opened
- `d2l-dialog-close`: dispatched with the action value when the dialog is closed for any reason

## Usage

### Opening the dialog

Open the dialog declaratively using a boolean attribute `opened`:

```html
<d2l-availability-date-type-dialog ?opened="${this.someProp}"></d2l-availability-date-type-dialog>
```

Alternatively, open the dialog by calling the `open` method to return a promise:

```javascript
document.querySelector('#open').addEventListener('click', async() => {
  const action = await document.querySelector('d2l-availability-date-type-dialog').open();
  console.log('dialog action:', action);
});
```

Alternatively, set the `opened` property/attribute and listen for the `d2l-availability-date-type-dialog-close` event:

```javascript
document.querySelector('#open').addEventListener('click', () => {
  const dialog = document.querySelector('d2l-availability-date-type-dialog');
  dialog.opened = true;
  dialog.addEventListener('d2l-availability-date-type-dialog-close', (e) => {
    console.log('dialog action:', e.detail.action);
  });
});
```

*Important:* The user may close the dialog in a few different ways: clicking the dialog workflow buttons (marked up with `data-dialog-action`); clicking the `[x]` button in the top-right corner; or pressing the `escape` key. Therefore, if your component tracks the `opened` state of the dialog with its own property, it's important to keep it in sync by listening for the `d2l-availability-date-type-dialog-close` event.

```html
<d2l-availability-date-type-dialog ?opened="${this.dialogIsOpened}"></d2l-availability-date-type-dialog>
```

```javascript
// later on...
document.querySelector('d2l-availability-date-type-dialog').addEventListener('d2l-availability-date-type-dialog-close', (e) => {
  this.dialogIsOpened = false;
});
```

### Example in a parent component render
```javascript
render() {
  return html`
    <d2l-activity-date-type-dialog
      id="start-date-type-dialog"
      @d2l-activity-date-type-dialog-closed=${this._onStartDateTypeUpdate}
      .titleText=${'Some title text'}
      .descriptionText=${'Some description text'}
      .dateType=${dateType}
      .displayInCalendar=${displayInCalendar}>
    </d2l-activity-date-type-dialog>`
}
```