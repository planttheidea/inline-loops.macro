let _result = [];

for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];

  _result.push.apply(_result, fn(_value, _key, array));
}

const flattened = _result;
