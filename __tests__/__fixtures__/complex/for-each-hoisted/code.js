const { forEach } = require('../../../../src/inline-loops.macro');
import { log } from './log';

function logItems(items) {
  forEach(items, (item) => {
    if (!this.position) {
      return;
    }

    log(item);
  });
}
