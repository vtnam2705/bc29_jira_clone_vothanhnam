import { DOMAIN_JIRA, TOKEN } from './../util/constants/settingSystem';
const { default: Axios } = require('axios');

export const updateProjectService = {
  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
      data: projectUpdate,
      method: 'PUT',
      //Token yêu cầu từ back end chứng minh user đã đăng nhập rồi.
      headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) }, //JWT
    });
  },
};
