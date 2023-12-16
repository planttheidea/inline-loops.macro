const _collection = [1, 2, 3, 4];
let _match = -1;
for (let _key = _collection.length, _value, _result; --_key >= 0; ) {
  _value = _collection[_key];
  const _isValueEven = _value % 2 === 0;
  _result = _isValueEven;
  if (_result) {
    _match = _key;
    break;
  }
}
const firstEven = _match;