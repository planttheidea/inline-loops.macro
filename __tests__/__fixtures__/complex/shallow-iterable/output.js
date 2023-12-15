let _determination = true;
for (let _key = 0, _length = item.length, _v, _result; _key < _length; ++_key) {
  _v = item[_key];
  _result = typeof _v === 'string';
  if (!_result) {
    _determination = false;
    break;
  }
}
const _length2 = array.length;
const _results2 = Array(_length2);
for (let _key2 = 0, _item; _key2 < _length2; ++_key2) {
  _item = array[_key2];
  _results2[_key2] = _determination;
}
const allStrings = _results2;