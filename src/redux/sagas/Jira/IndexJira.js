import React, { useEffect } from 'react';
import ContentMain from '../../../components/Jira/Main/ContentMain';
import HeaderMain from '../../../components/Jira/Main/HeaderMain';
import InfoMain from '../../../components/Jira/Main/InfoMain';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_DETAIL_SAGA } from './../../constants/Jira/Jira';

export default function IndexJira(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url
    //người ta sẽ lấy tham số từ url => gọi saga
    const { projectId } = props.match.params;

    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId,
    });
  }, []);

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />

      <InfoMain projectDetail={projectDetail} />

      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
