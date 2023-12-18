import { log } from './log';
function logItems(items) {
  for (let _key = 0, _length = items.length, _item; _key < _length; ++_key) {
    _item = items[_key];
    if (!_item.position) {
      continue;
    }
    log(_item);
  }
}