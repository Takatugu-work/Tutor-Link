import {
  ImportContacts,
  LocationOn,
  Person,
  School,
} from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

interface DialogValueInfo {
  icon: React.ReactNode;
  name: string;
}
type SearchingTagName = 'school' | 'subject' | 'prefecture' | 'gender';

const DialogTitleWithIcons: Record<SearchingTagName, DialogValueInfo> = {
  school: {
    icon: <School />,
    name: '学歴',
  },
  subject: {
    icon: <ImportContacts />,
    name: '科目',
  },
  prefecture: {
    icon: <LocationOn />,
    name: '地域',
  },
  gender: {
    icon: <Person />,
    name: '性別',
  },
};

export default function SearchDialog(props: { value: string }) {
  const DialogTitleWithIcon = DialogTitleWithIcons[props.value];
  return (
    <>
      <Dialog open fullWidth>
        <DialogTitle>
          <Stack>
            {DialogTitleWithIcon['icon']}
            {DialogTitleWithIcon['name']}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth />
        </DialogContent>
      </Dialog>
    </>
  );
}
