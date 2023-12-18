const { forEach } = require('../../../../src/inline-loops.macro');
import { log } from './log';

function logItems(items) {
  forEach(items, (item) => {
    if (!item.position) {
      return;
    }

    log(item);
  });
}
