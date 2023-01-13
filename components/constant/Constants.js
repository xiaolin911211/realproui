export const HTTP_TIMEOUT = 30000;
export const AGENT_ACCOUNT = 1;
export const ADMIN_ACCOUNT = 2;
export const PHOTOGRAPHER_ACCOUNT = 2;
export const HTTP_HEADER = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const SELECT_ORDER = "SELECT_ORDER";
// export const FETCHER = (url) => axios.get(url).then((res) => res.data);
export const GET_ORDER_STATUS_URL = "http://138.197.164.174:1234/status?type=1";
export const GET_USER_STATUS_URL = "http://138.197.164.174:1234/status?type=2";
export const GET_STATUS_URL = "http://138.197.164.174:1234/status?type=";
export const TABLE_NUM_PAGE = 5;
export const USER_STAT = 2;
export const USER_STAT_ACTIVATED = 1;
export const USER_STAT_NOT_ACTIVATED = 2;
export const USER_TYPE_STAFF = 2;
export const START_YEAR = 2019;
export const USER_ROLES = [
  {
    role: "Admin",
    id: 1,
  },
  {
    role: "Agent",
    id: 2,
  },
  {
    role: "Photographer",
    id: 3,
  },
];

