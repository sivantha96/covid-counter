// Input data for the single page dialog
export interface DialogData {
  disease: {
    name: string;
    imageUrl: string;
    iconUrl: string;
    severity: number;
  };
}

// Input data for the list dialog
export interface ListDialogData {
  areas: string[];
  diseases: {};
}

// receiving data from the previous route
export interface PostData {
  family_members: number;
  is_visited_foreign_country: string;
  is_member_visited_foreign_country: string;
  age: string;
  gender: string;
  diseases: {
    name: string;
    severity: string;
  }[];
}
