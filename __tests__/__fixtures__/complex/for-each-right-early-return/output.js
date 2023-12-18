import { log } from './log';
function logItems(items) {
  for (let _key = items.length, _item; --_key >= 0; ) {
    _item = items[_key];
    if (!_item.position) {
      continue;
    }
    log(_item);
  }
}