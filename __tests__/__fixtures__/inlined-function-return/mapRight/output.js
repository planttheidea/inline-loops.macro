let _result = [];

for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];
  _result[_result.length] = _value * 2;
}

const doubledValues = _result;
