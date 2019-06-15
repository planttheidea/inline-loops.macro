let _result = [];

for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];

  _result.push.apply(_result, [_value[0]]);
}

const flattened = _result;
