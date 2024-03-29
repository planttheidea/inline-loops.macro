const { forEachRight } = require('../../../../src/inline-loops.macro');
import { log } from './log';

function logItems(items) {
  forEachRight(items, (item) => {
    if (!this.position) {
      return;
    }

    log(item);
  });
}
