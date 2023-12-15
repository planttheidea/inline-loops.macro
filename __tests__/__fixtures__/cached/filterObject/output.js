const _results = {};
let _result, _value;
for (const _key in object) {
  _value = object[_key];
  _result = fn(_value, _key, object);
  if (_result) {
    _results[_key] = _value;
  }
}
const onlyEven = _results;