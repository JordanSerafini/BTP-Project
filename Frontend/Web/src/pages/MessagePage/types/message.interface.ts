export interface Message {
  _id: string;
  groupId: string;
  senderId: string;
  content: string;
  status?: 'sent' | 'delivered' | 'read';
  created_at?: Date;
}
