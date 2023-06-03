import { zodResolver } from '@hookform/resolvers/zod';
import {
  CurrencyYen,
  ImportContacts,
  LocationOn,
  Person,
  School,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface DialogValueInfo {
  icon: React.ReactNode;
  name: string;
  searchField: React.ReactNode;
}
type SearchingTagName = '0' | '1' | '2' | '3' | '4';
export default function SearchDialog(props: {
  value: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchTag: Dispatch<SetStateAction<string>>;
  onClose(): void;
}) {
  const [inputtedData, setInputtedData] = useState<string>('');
  const [inputtedDataWithArray, setInputtedDataWithArray] = useState<string[]>(
    []
  );
  const dialogColesByCancel = () => {
    props.onClose();
  };
  const DialogTitleWithIcons: Record<SearchingTagName, DialogValueInfo> = {
    '0': {
      icon: <School />,
      name: '学歴',
      searchField: (
        <TextField
          value={inputtedData}
          onChange={(e) => {
            setInputtedData(e.target.value);
          }}
          required
          fullWidth
        />
      ),
    },
    '1': {
      icon: <ImportContacts />,
      name: '科目',
      searchField: (
        <FormControl fullWidth>
          <InputLabel>科目</InputLabel>
          <Select
            label="科目"
            multiple
            value={inputtedDataWithArray}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              setInputtedDataWithArray(
                typeof value === 'string' ? value.split(',') : value
              );
            }}
          >
            <MenuItem value={'国語'}>国語</MenuItem>
            <MenuItem value={'数学'}>数学</MenuItem>
            <MenuItem value={'理科'}>理科</MenuItem>
            <MenuItem value={'社会'}>社会</MenuItem>
            <MenuItem value={'英語'}>英語</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    '2': {
      icon: <LocationOn />,
      name: '地域',
      searchField: (
        <FormControl fullWidth>
          <InputLabel>都道府県</InputLabel>
          <Select
            label="都道府県"
            value={inputtedData}
            onChange={(e) => {
              setInputtedData(e.target.value);
            }}
          >
            <MenuItem value="北海道">北海道</MenuItem>
            <MenuItem value="青森県">青森県</MenuItem>
            <MenuItem value="岩手県">岩手県</MenuItem>
            <MenuItem value="宮城県">宮城県</MenuItem>
            <MenuItem value="秋田県">秋田県</MenuItem>
            <MenuItem value="山形県">山形県</MenuItem>
            <MenuItem value="福島県">福島県</MenuItem>
            <MenuItem value="茨城県">茨城県</MenuItem>
            <MenuItem value="栃木県">栃木県</MenuItem>
            <MenuItem value="群馬県">群馬県</MenuItem>
            <MenuItem value="埼玉県">埼玉県</MenuItem>
            <MenuItem value="千葉県">千葉県</MenuItem>
            <MenuItem value="東京都">東京都</MenuItem>
            <MenuItem value="神奈川県">神奈川県</MenuItem>
            <MenuItem value="新潟県">新潟県</MenuItem>
            <MenuItem value="富山県">富山県</MenuItem>
            <MenuItem value="石川県">石川県</MenuItem>
            <MenuItem value="福井県">福井県</MenuItem>
            <MenuItem value="山梨県">山梨県</MenuItem>
            <MenuItem value="長野県">長野県</MenuItem>
            <MenuItem value="岐阜県">岐阜県</MenuItem>
            <MenuItem value="静岡県">静岡県</MenuItem>
            <MenuItem value="愛知県">愛知県</MenuItem>
            <MenuItem value="三重県">三重県</MenuItem>
            <MenuItem value="滋賀県">滋賀県</MenuItem>
            <MenuItem value="京都府">京都府</MenuItem>
            <MenuItem value="大阪府">大阪府</MenuItem>
            <MenuItem value="兵庫県">兵庫県</MenuItem>
            <MenuItem value="奈良県">奈良県</MenuItem>
            <MenuItem value="和歌山県">和歌山県</MenuItem>
            <MenuItem value="鳥取県">鳥取県</MenuItem>
            <MenuItem value="島根県">島根県</MenuItem>
            <MenuItem value="岡山県">岡山県</MenuItem>
            <MenuItem value="広島県">広島県</MenuItem>
            <MenuItem value="山口県">山口県</MenuItem>
            <MenuItem value="徳島県">徳島県</MenuItem>
            <MenuItem value="香川県">香川県</MenuItem>
            <MenuItem value="愛媛県">愛媛県</MenuItem>
            <MenuItem value="高知県">高知県</MenuItem>
            <MenuItem value="福岡県">福岡県</MenuItem>
            <MenuItem value="佐賀県">佐賀県</MenuItem>
            <MenuItem value="長崎県">長崎県</MenuItem>
            <MenuItem value="熊本県">熊本県</MenuItem>
            <MenuItem value="大分県">大分県</MenuItem>
            <MenuItem value="宮崎県">宮崎県</MenuItem>
            <MenuItem value="鹿児島県">鹿児島県</MenuItem>
            <MenuItem value="沖縄県">沖縄県</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    '3': {
      icon: <CurrencyYen />,
      name: '授業料',
      searchField: (
        <TextField
          value={inputtedData}
          onChange={(e) => {
            setInputtedData(e.target.value);
          }}
          required
          fullWidth
        />
      ),
    },
    '4': {
      icon: <Person />,
      name: '性別',
      searchField: (
        <FormControl fullWidth>
          <InputLabel>性別</InputLabel>
          <Select
            label="性別"
            value={inputtedData}
            onChange={(e) => {
              setInputtedData(e.target.value);
            }}
          >
            <MenuItem value={'MAN'}>男性</MenuItem>
            <MenuItem value={'WOMEN'}>女性</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  };
  return (
    <Dialog open fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={3}>
          {DialogTitleWithIcons[props.value].icon}
          <Typography>{DialogTitleWithIcons[props.value].name}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {DialogTitleWithIcons[props.value].searchField}
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogColesByCancel}>キャンセル</Button>
        <Button
          onClick={() => {
            if (props.value !== '1' && inputtedData) {
              props.setSearchValue(inputtedData);
              props.setSearchTag(props.value);
              props.onClose();
            } else if (
              props.value === '1' &&
              inputtedDataWithArray.length !== 0
            ) {
            }
          }}
        >
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
}
