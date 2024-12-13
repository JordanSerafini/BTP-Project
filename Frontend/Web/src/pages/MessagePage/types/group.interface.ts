export interface GroupMember {
  userId: string;
  joinedAt: Date;
}

export interface Group {
  _id: string;
  type: 'group' | 'direct';
  name?: string;
  members: GroupMember[];
  createdBy: string;
  created_at?: Date;
}
