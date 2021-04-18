import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Grid,
} from 'antd-mobile';

interface PageProps {

}

interface Props extends RouteComponentProps<PageProps> {
}

const CourtIndex = (props: Props) => {
  const { history } = props;
  const gridData = [{
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '查询场地',
    onClick: () => {
      history.push('/fieldList');
    },
  }];

  const onGridClick = (el: any, index: number) => gridData[index].onClick?.();

  return (
    <div>
      <Grid
        data={gridData}
        columnNum={3}
        activeStyle={false}
        onClick={onGridClick}
      />
    </div>
  );
};

export default withRouter(CourtIndex);
