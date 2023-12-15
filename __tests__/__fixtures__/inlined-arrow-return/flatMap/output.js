let _results = [];
for (
  let _key = 0, _length = array.length, _entry, _result;
  _key < _length;
  ++_key
) {
  _entry = array[_key];
  _result = [_entry[0]];
  _results = _results.concat(_result);
}
const flattened = _results;