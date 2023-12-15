for (let _key = array.length, _value; --_key >= 0; ) {
  _value = array[_key];
  fn(_value, _key, array);
}