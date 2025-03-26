export enum InputUserStatus {
  P,
  A,
  R,
  O,
}

export enum UserStatus {
  REJECTED = 'R', // 0
  PENDING = 'P', // 1
  OBSERVED = 'O', // 1
  PRE_APPROVED = 'PA', // 3, 4
  COMPLETED = 'C', // 4
  APPROVED = 'A', // 5
  MODIFIED = 'M', // 1, 2, 3, 4
}

/*
0 - REJECTED
1 - PENDING - first step, when creating user
2 - LOGGIN APPROVED BUT NEED CODE (admin samsung must assign code)  - also appears in the list of pending users for samsung admin
3 - APPROVED BUT NEED CODE (admin samsung must assign code)
4 - PRE-APPROVED - Need to complete documentation (has a code) - also appears in the list of pending users for cheil admin
5 - APPROVED
*/


export interface InputChangeUserStatus {
  approval: number;
  status: UserStatus;
  id: number;
  comment?: string;
  isSpecial: boolean;
}

export interface InputObserveUser {
  id: number;
  comment: string;
  isObserved: boolean;
}

export interface InputPreApprove {
  approval: number;
  status: 'C' | 'PA';
  id: number;
  isSpecial : boolean;
}

export interface InputChangeUserDoc {
  image: string;
  type: 'USER' | 'REPRESENTATIVE';
}
