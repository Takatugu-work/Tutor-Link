START TRANSACTION;

INSERT INTO public."User"(id,name,email,password,role) VALUES ('9a4fabd2-cae9-42fe-aa4b-3d2efe5aa95d','山田太朗','yamadatarou@yamadatarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJG5SQVlQdE8vRGV3SVlJWWtuYnpjbEEkMmowa1A3NjVOZnVjT0lxNTE4UHNRbExrdEpTOWdiTnhjSG9SRkpXb295SQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('7a1e529e-ae7f-4ea3-9492-c0d85f71684d','佐藤太郎','satoutarou@satoutarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGdNSkttbVR5b0RmNmJGcG9wakZLalEkR2ZlM2lnVk9Pb3pnYStCYUFVUFhzd1ljM1pDVkJHaVdtblJQTHYwaE1qRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('167c2886-35c3-4b9f-8fb9-0c8dfe07a261','田中太郎','tanakatarou@tanakatarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJC9yL1oyV2hHU1Q1UnFVaDUzcHlXZWckLzVQaWYzOWZsQ2FwSUc5Vkt1bXMyM0VqQmZ2ZDNuSmZmZzBpKzZ2cVNmSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('1758088c-77c4-488f-b882-0d6548c2a5c0','鈴木太郎','suzukitatou@suzukitarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJE04VXRJM2NKQ0VKRTh4YXhHUnJOaUEkMlBCM1NNNVVWTU9ZMEszUXk5K242bXlFMkJGMGxOZVpmcnJmSEZ4WDJlQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('e05a3214-95fd-42f2-8bde-bc9f9ab1ec12','山田花子','yamadahanako@yamadahanako.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJERjVkViZFFYYkdwSFhONUR1YWZrMVEkWjduMUdnUmlEdEdjV0N0TWVLbWlWVmd2cTcvVE4rdlFCODFvUGgwWHBQQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('0d374336-6cd0-4abc-9142-07b00a6abfdb','佐藤花子','satouhanako@satouhanako.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGZtUm1jVHoyNDFyZit6VkNGWE43NEEkOVBlWml5Wk5qWlFiK0ZTUEYyOWRXQ3dSVDdacVdNYXZzZlREL2s1N3hoWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('afeaeefd-d84f-4e26-96c1-472c8849a20d','たかつぐ','takatugu@takatugu.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHVWUk9JajREV3hGZ0VzVXh1SVZyRFEkaHBIazFwRFFOZEljWkpqa2ZocjhNcERzVFkwazd5ZThwM1JWYm5ZVlQ3QQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('21a8990c-ee4e-4c6b-9f4c-8e6a9ebd11ce','南亮','SouthRyo@outlook.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHEwY2NoWUJpYStnR1lrcThqeFFRSEEkRzJDUnVaazlVWE1zemdNd1drcEFVNTFheVBYSmtsRWY0NlVmLzBBSGxGWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('b2c86179-0cfb-4391-88ac-134aa5b2d4ba','高橋亨','takahashiko@ko.ac.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJEpSMFBvS3RDTmpzZFNiS3VzdWlrNEEkdXdKYzNoeW1DOUdRaC8zOHdQN0VSdTBQOG5ma2R3ek5mbWlLVThmcUlITQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('b823452b-12fb-432a-b1d9-87d05927b811','田中紬葵','tumugi@gmail.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDRFMmlPVTN6ZjRJWU9aVEhzRE9LcGckS3Z1QmZPdkFDTDg3Smh0YkJ4Nkx2a2lJK3dxbDh3b3RkS0NjM3FCempLSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('d33f9656-3e19-4812-b131-98b453fe6d1b','渡辺湊','watanabeso@gmail.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDlTQ0ppd3Q0MFdjenVHb2pKSmx3RmckNktWeWErZmxTeTV4UmM2d0o5QlErSGtlbUlKb2lRUGo5V1VQODUwUStCOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('055b3690-bb59-42b5-8aa1-f522a2b0dd02','山本ひな','yamamotohina@gmail.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDg5WmpwS3dFNTJob2RKdm51TGRUdUEkVWdCZTBhS3BsUnZQS1FOelJMNnhNRzV1NTQ5YnFLZmdGRHd2czJJZEdodwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('4f0db192-927a-438b-9523-2a1e6a764ad4','伊藤颯一','itosoichi@1234.ac.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGE1OC9JQUw2NEJ0dDRtR0wwTzNPZlEkZ0lTTHlkWXRCUnlOZE5MaTd3aWZGejZJRDdlamxRcGFzNXZIWEJWVHd5dwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('32de24b1-f0e0-4506-9bd8-bddc17c72f85','伊藤すず','itosuzu@aaa.ac.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDNOaFQyZTI3THVRMUI5TnNnK1ZqTHckUkU5Z3JJUldlVXk1alZ1dUpmbVhLUXRHaGNEdWphY1hkUUFUdXRpWm10QQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('ffe46cb9-fc06-49fe-8b85-25d9b500e8e6','中村風香','fuka12@fuka.ac.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJEtXQ3ZBSWlxYmNQWUQ4NEVFVnJ3Z0EkcE9Ma1VOTGxiT1UrWlIvNzNsRmtvNjdvSEVIWDg2QjBSMWMvOEh4OFQxNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('1c0052b9-22a5-4484-adcc-d9afc017b0e1','小林亮介','ryosuke@kobayashi.ac.jp','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGo4cVZvV3pPaDRTdEtqVnQ2VnBrZ3ckRXlSUjc0QjhBNE1Za3g5cTRJNERTeDBaRnpHS3ZjRUdUUlpyMVdjRW00TQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT'),
('2ceac7bb-bf37-4cf9-b72e-5c8cc268c150','加藤千佳','katochika@gmail.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJG1XVGlmWHk4ZC9Cay96U3FYNnByc0EkOVBvOFRSci9VMDBheVEwSzhXcmhmYUlsc2VHS1N5enhIYUwwdC81Si9XUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT');

INSERT INTO public."Teacher"(id,name,age,subject,gender,school,price,prefecture,comment,"userId") VALUES ('7a7f2603-7cea-4a02-bcdc-f4714ce02cff','山田太朗','23','{数学,理科}','MAN','早稲田大学',null,'東京都',null,'9a4fabd2-cae9-42fe-aa4b-3d2efe5aa95d'),
('aa830f50-4501-4dd5-aa02-126f726c1739','佐藤太郎','21','{理科,数学}','MAN','日本大学',null,'新潟県',null,'7a1e529e-ae7f-4ea3-9492-c0d85f71684d'),
('c016668f-fdc3-4d03-84cd-6ec1e3cb1768','田中太郎','23','{数学,理科}','MAN','駒沢大学',null,'山梨県',null,'167c2886-35c3-4b9f-8fb9-0c8dfe07a261'),
('b11c7a5c-d05e-4d81-88db-9a8eea8a68d3','鈴木太郎','24','{理科}','MAN','東海大学',null,'東京都',null,'1758088c-77c4-488f-b882-0d6548c2a5c0'),
('b97651e0-3596-4e7b-87da-45afb07a2bda','山田花子','24','{理科}','WOMEN','法政大学',null,'東京都',null,'e05a3214-95fd-42f2-8bde-bc9f9ab1ec12'),
('db34ac3a-458f-43be-8a7e-1f629493d938','佐藤花子','25','{英語,国語}','WOMEN','青山学院大学',null,'東京都',null,'0d374336-6cd0-4abc-9142-07b00a6abfdb');

INSERT INTO public."Student"(id,name,school,prefecture,age,subject,gender,comment,"userId") VALUES ('266f0c8f-a1de-4983-86e6-603501acbb29','たかつぐ','高校３年','東京都','18','{社会}','MAN',null,'afeaeefd-d84f-4e26-96c1-472c8849a20d'),
('0dfe91d5-2bcd-4c7e-9a28-94e30510d861','伊藤颯一','高校１年','栃木県','16','{英語}','MAN',null,'4f0db192-927a-438b-9523-2a1e6a764ad4'),
('4c480a53-73b2-495c-b483-820bfec81375','高橋亨','高校２年','神奈川県','16','{国語,数学,理科,社会}','MAN',null,'b2c86179-0cfb-4391-88ac-134aa5b2d4ba'),
('618a21c3-b01e-4e33-8fd4-969a8050f023','加藤千佳','高校３年','茨城県','17','{英語,社会,国語}','WOMEN',null,'2ceac7bb-bf37-4cf9-b72e-5c8cc268c150'),
('71dac46a-ce70-4a76-b44c-9a1d839ee614','山本ひな','中学２年','神奈川県','14','{数学}','WOMEN',null,'055b3690-bb59-42b5-8aa1-f522a2b0dd02')
('7e49a6e8-9841-4144-b437-2e5720bee713','田中紬葵','中学３年','東京都','14','{数学,国語}','MAN',null,'b823452b-12fb-432a-b1d9-87d05927b811'),
('90948f8d-1958-4273-97a9-8de38531b603','伊藤すず','高校２年','茨城県','16','{国語,社会,英語}','WOMEN',null,'32de24b1-f0e0-4506-9bd8-bddc17c72f85'),
('917c7e42-1c64-44b1-91e2-8a0dce75f2e0','渡辺湊','高校１年','千葉県','16','{数学,国語,理科,社会}','MAN',null,'d33f9656-3e19-4812-b131-98b453fe6d1b'),
('98860225-14df-42ce-aafe-94a61f3c5ad8','中村風香','高校２年','埼玉県','16','{数学,理科}','WOMEN',null,'ffe46cb9-fc06-49fe-8b85-25d9b500e8e6'),
('b46c1a45-977b-4f6a-86f4-a7025da303bf','小林亮介','高校１年','栃木県','15','{英語,社会,数学}','MAN',null,'1c0052b9-22a5-4484-adcc-d9afc017b0e1'),
('d79ac0f6-a524-40e3-888b-c2a64f1bf152','南亮','高校２年','栃木県','16','{数学}','MAN',null,'21a8990c-ee4e-4c6b-9f4c-8e6a9ebd11ce');


INSERT INTO public."Chat"("id","teacherId","studentId","lastMessage","lastMessageTimestamp") VALUES ('e15ee9b6-e8a0-4a0f-947f-e9660ca76f39','7a7f2603-7cea-4a02-bcdc-f4714ce02cff','266f0c8f-a1de-4983-86e6-603501acbb29','初めまして山田と申します','2023-06-06 20:37:36.962');

INSERT INTO public."Message"("id","chatId","senderId","content") VALUES ('029bc422-5a93-4c2c-ad9b-a26c3d53432d','e15ee9b6-e8a0-4a0f-947f-e9660ca76f39','7a1e529e-ae7f-4ea3-9492-c0d85f71684d','こんにちは');

COMMIT
