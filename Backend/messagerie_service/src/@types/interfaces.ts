// interfaces.ts
export interface Group {
  id: string;
  name?: string;
  type: 'group' | 'direct';
  members: string[];
  createdBy: string;
}

export interface Message {
  id: string;
  groupId: string;
  content: string;
  email: string;
}
