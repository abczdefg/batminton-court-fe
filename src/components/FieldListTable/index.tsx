import React from 'react';
import { mergeCssModuleList } from '@/utils';
import { FieldListItem, PriceListItem } from '@/api';
import styles from './style.scss';

interface Props {
  fieldList: FieldListItem[];
}
interface CellProps {
  priceListItem: PriceListItem;
}
interface RowProps {
  fieldListItem: FieldListItem;
}

const FieldListCell = (props: CellProps) => {
  const { priceListItem } = props;
  return (
    <div
      className={mergeCssModuleList([
        styles.tableCell,
        priceListItem.status === '0' ? styles.avaliable : styles.disabled,
      ])}
    />
  );
};

const FieldList = (props: RowProps) => {
  const { fieldListItem } = props;
  return (
    <div
      className={styles.tableRow}
    >
      <div className={mergeCssModuleList([styles.tableCell, styles.firstCell])}>
        { fieldListItem.fieldName }
      </div>
      { fieldListItem.priceList.map(price => (
        <FieldListCell
          key={price.id}
          priceListItem={price}
        />
      )) }
    </div>
  );
};

const FieldHeaderRow = (props: { data: Array<{ startTime: string; endTime: string; }> }) => {
  const { data } = props;
  return (
    <div
      className={mergeCssModuleList([styles.tableRow, styles.tableHeaderRow])}
    >
      <div className={mergeCssModuleList([styles.tableCell, styles.firstCell, styles.tableHeaderCell])} />
      { data.map(v => (
        <div className={mergeCssModuleList([styles.tableCell, styles.tableHeaderCell])}>
          { `${v.startTime}-${v.endTime}` }
        </div>
      )) }
    </div>
  );
};

const FieldListTable = (props: Props) => {
  const { fieldList } = props;
  if (!fieldList.length) return null;
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <FieldHeaderRow
            data={fieldList[0].priceList.map(({ startTime, endTime }) => ({ startTime, endTime }))}
          />
        </div>
        <div className={styles.tableBody}>
          { fieldList.map(field => (
            <FieldList
              key={field.id}
              fieldListItem={field}
            />
          )) }
        </div>
      </div>
    </div>
  );
};

export default FieldListTable;
