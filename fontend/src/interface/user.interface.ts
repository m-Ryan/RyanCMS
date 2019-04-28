export interface User {
  user_id: number;
  nickname: string;
  phone: string;
  avatar: string;
  sex: Number;
  domain: string;
  intro: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  token: string;
  theme: {
    color: string;
    music: string;
  };
  concat: Concat;
  resume?: Resume;
}

export interface Resume {
  user_id: number;
  content: string;
}

export interface Concat {
  github: string;
  email: string;
  zhihu: string;
  weibo: string;
}
