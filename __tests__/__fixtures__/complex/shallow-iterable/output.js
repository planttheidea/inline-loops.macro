const _length2 = array.length;
const _results = Array(_length2);
for (let _key2 = 0, _item; _key2 < _length2; ++_key2) {
  _item = array[_key2];
  let _determination = true;
  for (
    let _key3 = 0, _length3 = _item.length, _v2, _result3;
    _key3 < _length3;
    ++_key3
  ) {
    _v2 = _item[_key3];
    _result3 = typeof _v2 === 'string';
    if (!_result3) {
      _determination = false;
      break;
    }
  }
  _results[_key2] = _determination;
}
const allStrings = _results;