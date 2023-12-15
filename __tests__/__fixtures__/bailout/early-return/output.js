const _collection = [1, 2, 3];
const _fn = (_value) => {
  if (_value === 2) {
    return true;
  }
};
const _results = [];
for (
  let _key = 0, _length = _collection.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = _collection[_key];
  _result = _fn(_value, _key, _collection);
  if (_result) {
    _results.push(_value);
  }
}
const result = _results;