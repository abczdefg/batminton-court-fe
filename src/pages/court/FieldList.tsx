import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  NavBar,
  Icon,
  DatePicker,
  List,
} from 'antd-mobile';
import commonStyles from '@/styles/common.scss';
import { getFieldList, FieldListItem } from '@/api';
import { FieldListTable } from '@/components';
import moment from 'moment';
import styles from './style.scss';

const dateFormat = 'YYYY-MM-DD';

interface PageProps {

}

interface Props extends RouteComponentProps<PageProps> {
}

const FieldList = (props: Props) => {
  const { history } = props;
  const onBack = () => {
    history.goBack();
  };

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [fieldList, setFieldList] = useState<FieldListItem[]>([]);
  const onChange = useCallback((value: Date) => {
    setCurrentDate(value);
  }, []);
  useEffect(() => {
    getFieldList(moment(currentDate).format(dateFormat)).then(({ data, error }) => {
      if (error) {
        return;
      }
      setFieldList(data.list[0].fieldList);
    });
  }, [currentDate]);

  return (
    <div className={commonStyles.pageContainer}>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onBack}
      >
        场地列表
      </NavBar>
      <div className={commonStyles.content}>
        <div className={styles.pageContent}>
          <div className={styles.datePicker}>
            <DatePicker
              mode="date"
              title="Select Date"
              value={currentDate}
              onChange={onChange}
              minDate={new Date()}
            >
              <List.Item arrow="horizontal">Date</List.Item>
            </DatePicker>
          </div>
          <div className={styles.fieldListTablecontainer}>
            <FieldListTable
              fieldList={fieldList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FieldList);
