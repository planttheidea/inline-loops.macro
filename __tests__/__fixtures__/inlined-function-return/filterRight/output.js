const _results = [];
let _result, _value;
for (let _key = array.length, _value, _result; --_key >= 0; ) {
  _value = array[_key];
  _result = _value % 2 === 0;
  if (_result) {
    _results.push(_value);
  }
}
const onlyEven = _results;