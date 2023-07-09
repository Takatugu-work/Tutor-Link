import { useMutation, useQuery } from '@blitzjs/rpc';
import { ImportContacts, LocationOn, School } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import createChat from 'src/server/resolver/mutations/chat/createChat.resolver';
import getStudentData from 'src/server/resolver/queries/student/student.resolver';
import getTeacher from 'src/server/resolver/queries/teacher/getTeacher.resolver';
import { i } from 'vitest/dist/index-9f5bc072';

export default function TeacherDetail() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const teacherId = router.query.teacherId as string;
  const [getTeacherQuery, { isLoading: getTeacherQueryProgress }] = useQuery(
    getTeacher,
    teacherId,
    {
      suspense: false,
    }
  );

  const [createChatMutation, { isLoading: createChatProgress }] =
    useMutation(createChat);
  const [getStudentQuery, { isLoading: getStudentQueryProgress }] = useQuery(
    getStudentData,
    null,
    {
      suspense: false,
    }
  );
  const isLoading =
    getTeacherQueryProgress || getStudentQueryProgress || createChatProgress;
  if (!getTeacherQuery) return <LinearProgress />;
  return (
    <Layout>
      <Box sx={{ width: '90%', margin: '0 auto' }}>
        <Stack
          direction="row"
          sx={{ p: 3, border: 1, mt: 3 }}
          alignItems="center"
        >
          <Image
            src="/noImage.png"
            width={305}
            height={169}
            alt="Picture of the author"
          />
          <Box sx={{ width: '100%', ml: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h5">{getTeacherQuery.name}</Typography>
              <Stack direction="row" spacing={1}>
                <School fontSize="medium" />
                <Typography variant="h6">学校</Typography>
                <Typography variant="h6">{getTeacherQuery.school}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <ImportContacts fontSize="medium" />
                <Typography variant="h6">科目</Typography>
                <Typography variant="h6">
                  {getTeacherQuery.subject.join(' ')}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn fontSize="medium" />
                <Typography variant="h6">地域</Typography>
                <Typography variant="h6">
                  {getTeacherQuery.prefecture}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack sx={{ mt: 3 }} direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5">評価</Typography>
          <Rating
            name="read-only"
            value={2.4}
            size="large"
            readOnly
            precision={0.5}
          />
        </Stack>
        <Stack direction="row">
          <Box sx={{ mt: 3, width: '500px' }}>
            <Typography variant="h6" color="text.secondary">
              プロフィール
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {getTeacherQuery.comment ? (
                <Typography>{getTeacherQuery.comment}</Typography>
              ) : (
                <Typography>コメントなし</Typography>
              )}
            </Typography>
          </Box>
          <Box sx={{ border: 1, borderColor: 'text.secondary', ml: 'auto' }}>
            <Box sx={{ m: 3 }}>
              <Typography variant="h6">
                {getTeacherQuery.name}先生にチャットをする
              </Typography>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  disabled={!currentUser || !getStudentQuery || isLoading}
                  sx={{ textAlign: 'center' }}
                  variant="contained"
                  onClick={async () => {
                    await createChatMutation({
                      teacherId: getTeacherQuery.id,
                      studentId: getStudentQuery!.id,
                    }).then((data) =>
                      router.push({
                        pathname: 'chat',
                        query: { chatId: data.id },
                      })
                    );
                  }}
                >
                  チャットする
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
