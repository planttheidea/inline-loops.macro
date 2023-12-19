import { log } from './log';
function logItems(items) {
  const _fn = (_item) => {
    if (!this.position) {
      return;
    }
    log(_item);
  };
  for (let _key = 0, _length = items.length, _item; _key < _length; ++_key) {
    _item = items[_key];
    _fn(_item, _key, items);
  }
}