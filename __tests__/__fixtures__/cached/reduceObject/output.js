let _result = {};

for (let _key in object) {
  _value = object[_key];
  _result = fn(_result, _value, _key, object);
}

const doubledValues = _result;
