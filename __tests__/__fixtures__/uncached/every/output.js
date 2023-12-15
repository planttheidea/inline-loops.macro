const _collection = [1, 2, 3, 4];
let _determination = true;
for (
  let _key = 0, _length = _collection.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = _collection[_key];
  const _isValueEven = _value % 2 === 0;
  _result = _isValueEven;
  if (!_result) {
    _determination = false;
    break;
  }
}
const areAllEven = _determination;