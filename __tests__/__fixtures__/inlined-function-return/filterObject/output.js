const _results = {};
let _result, _value;
for (const _key in object) {
  _value = object[_key];
  _result = _value % 2 === 0;
  if (_result) {
    _results[_key] = _value;
  }
}
const onlyEven = _results;