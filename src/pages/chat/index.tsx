import { useMutation, useQuery } from '@blitzjs/rpc';
import { AccountCircle } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import sendMessage from 'src/server/resolver/mutations/message/sendMessage.resolver';
import getChat from 'src/server/resolver/queries/chat/getChat.resolver';
import getMessage from 'src/server/resolver/queries/message/getMessage.resolver';
import ChatDetail from './components/chatDetail';

export default function ChatPage() {
  const router = useRouter();
  const chatId = router.query.chatId as string | null;
  const currentUser = useCurrentUser();
  const [clickedChatId, setClickedChatId] = useState<string>(chatId ?? '');
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
                  onClick={async (e) => {
                    e.preventDefault();
                    setClickedChatId(chat.id);
                    await router.push({
                      query: { chatId: chat.id },
                    });
                  }}
                >
                  <ListItemAvatar>
                    <AccountCircle sx={{ fontSize: 50 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      currentUser.role === 'STUDENT'
                        ? chat.teacher.name
                        : chat.student.name
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
                          {chat.updatedAt
                            ? format(chat.updatedAt, 'yyyy/MM/dd hh:mm')
                            : ''}
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
        {getMessageQuery && (
          <ChatDetail
            isLoading={sendMessageMutationProgress}
            messages={getMessageQuery}
            inputtedMessage={inputtedMessage}
            setInputtedMessage={setInputtedMessage}
            sendMessage={async () => {
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
          />
        )}
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
