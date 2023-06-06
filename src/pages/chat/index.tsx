import { useMutation, useQuery } from '@blitzjs/rpc';
import { AccountCircle } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Fragment, useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import sendMessage from 'src/server/resolver/mutations/message/sendMessage.resolver';
import getChat from 'src/server/resolver/queries/chat/getChat.resolver';
import getMessage from 'src/server/resolver/queries/message/getMessage.resolver';

export default function ChatPage() {
  const currentUser = useCurrentUser();
  const [clickedChatId, setClickedChatId] = useState<string>('');
  const [inputtedMessage, setInputtedMessage] = useState<string>('');

  const [
    getChatQuery,
    { isLoading: getChatQueryProgress, refetch: chatRefetch },
  ] = useQuery(getChat, null, { suspense: false });
  const [
    getMessageQuery,
    { isLoading: getMessageQueryProgress, refetch: messageRefetch },
  ] = useQuery(getMessage, clickedChatId, { suspense: false });
  const [
    sendMessageMutation,
    { isLoading: sendMessageMutationProgress, isSuccess: sendMessageSuccess },
  ] = useMutation(sendMessage);

  const isLoading = getChatQueryProgress || getMessageQueryProgress;
  if (!getChatQuery || !currentUser) return <LinearProgress />;
  return (
    <Layout>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{ mt: 5, minWidth: '500px' }}>
          <Box>
            <Typography variant="h5">チャット一覧</Typography>
            <Divider />
          </Box>
          <List>
            {getChatQuery.map((chat) => (
              <Fragment key={chat.id}>
                <ListItem
                  sx={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setClickedChatId(chat.id);
                  }}
                >
                  <ListItemAvatar>
                    <AccountCircle sx={{ fontSize: 50 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      currentUser.role === 'STUDENT'
                        ? chat.student.name
                        : chat.teacher.name
                    }
                    secondary={
                      <Fragment>
                        <Stack>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                          {format(
                            chat.lastMessageTimestamp,
                            'yyyy/MM/dd/hh:mm'
                          )}
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Box>
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
            <List>
              {getMessageQuery
                ? getMessageQuery.map((message) => (
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
                                  {format(
                                    message.createdAt,
                                    'yyyy/MM/dd/hh:mm'
                                  )}
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
              value={inputtedMessage}
              onChange={(e) => setInputtedMessage(e.target.value)}
              required
              sx={{ width: '70%' }}
            />
            <Button
              onClick={async () => {
                await sendMessageMutation({
                  chatId: clickedChatId,
                  senderId: currentUser.id,
                  message: inputtedMessage,
                });
                if (sendMessageSuccess) {
                  await chatRefetch();
                  await messageRefetch();
                  setInputtedMessage('');
                }
              }}
              disabled={
                !clickedChatId ||
                !inputtedMessage ||
                sendMessageMutationProgress
              }
              variant="contained"
            >
              送信
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
