import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
export default function ChatDetail(props: {
  messages: (Message & {
    sender: User;
  })[];
  sendMessage(): Promise<void>;
  inputtedMessage: string;
  setInputtedMessage: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr max-content',
        backgroundColor: '#FFFFFB',
        height: '93.2vh',
        width: '100vw',
      }}
    >
      <Box sx={{ overflowY: 'scroll' }}>
        <List disablePadding>
          <ListItem></ListItem>
          {props.messages
            ? props.messages.map((message) => (
                <Fragment key={message.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <AccountCircle sx={{ fontSize: 50 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Fragment>
                          <Stack direction="row" spacing={3}>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {message.sender.name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              {format(message.createdAt, 'yyyy/MM/dd/hh:mm')}
                            </Typography>
                          </Stack>
                        </Fragment>
                      }
                      secondary={message.content}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))
            : null}
        </List>
      </Box>
      <Divider />
      <Stack direction="row" justifyContent="center" spacing={2} my={2}>
        <Divider />
        <TextField
          value={props.inputtedMessage}
          onChange={(e) => props.setInputtedMessage(e.target.value)}
          required
          sx={{ width: '70%' }}
        />
        <Button
          onClick={props.sendMessage}
          disabled={!props.inputtedMessage || props.isLoading}
          variant="contained"
        >
          送信
        </Button>
      </Stack>
    </Box>
  );
}
