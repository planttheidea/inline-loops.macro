import React from 'react';
function List(props) {
  const _length = props.items.length;
  const _results = Array(_length);
  for (let _key = 0, _item; _key < _length; ++_key) {
    _item = props.items[_key];
    _results[_key] = /*#__PURE__*/ React.createElement(
      'li',
      {
        key: _item.id,
      },
      _item.value,
    );
  }
  return /*#__PURE__*/ React.createElement('ul', null, _results);
}