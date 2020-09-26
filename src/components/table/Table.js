import {ExcelCopmonent} from '@core/ExcelCopmonent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelCopmonent {
  static className = 'excel__table';

  toHTML() {
    return createTable();
  }
}
