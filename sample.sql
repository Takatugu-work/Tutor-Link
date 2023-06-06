START TRANSACTION;
INSERT INTO public."User"(id,name,email,password,role) VALUES ('9a4fabd2-cae9-42fe-aa4b-3d2efe5aa95d','山田太朗','yamadatarou@yamadatarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJG5SQVlQdE8vRGV3SVlJWWtuYnpjbEEkMmowa1A3NjVOZnVjT0lxNTE4UHNRbExrdEpTOWdiTnhjSG9SRkpXb295SQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('7a1e529e-ae7f-4ea3-9492-c0d85f71684d','佐藤太郎','satoutarou@satoutarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGdNSkttbVR5b0RmNmJGcG9wakZLalEkR2ZlM2lnVk9Pb3pnYStCYUFVUFhzd1ljM1pDVkJHaVdtblJQTHYwaE1qRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('167c2886-35c3-4b9f-8fb9-0c8dfe07a261','田中太郎','tanakatarou@tanakatarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJC9yL1oyV2hHU1Q1UnFVaDUzcHlXZWckLzVQaWYzOWZsQ2FwSUc5Vkt1bXMyM0VqQmZ2ZDNuSmZmZzBpKzZ2cVNmSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('1758088c-77c4-488f-b882-0d6548c2a5c0','鈴木太郎','suzukitatou@suzukitarou.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJE04VXRJM2NKQ0VKRTh4YXhHUnJOaUEkMlBCM1NNNVVWTU9ZMEszUXk5K242bXlFMkJGMGxOZVpmcnJmSEZ4WDJlQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('e05a3214-95fd-42f2-8bde-bc9f9ab1ec12','山田花子','yamadahanako@yamadahanako.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJERjVkViZFFYYkdwSFhONUR1YWZrMVEkWjduMUdnUmlEdEdjV0N0TWVLbWlWVmd2cTcvVE4rdlFCODFvUGgwWHBQQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('0d374336-6cd0-4abc-9142-07b00a6abfdb','佐藤花子','satouhanako@satouhanako.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGZtUm1jVHoyNDFyZit6VkNGWE43NEEkOVBlWml5Wk5qWlFiK0ZTUEYyOWRXQ3dSVDdacVdNYXZzZlREL2s1N3hoWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','TEACHER'),
('afeaeefd-d84f-4e26-96c1-472c8849a20d','たかつぐ','takatugu@takatugu.com','JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJHVWUk9JajREV3hGZ0VzVXh1SVZyRFEkaHBIazFwRFFOZEljWkpqa2ZocjhNcERzVFkwazd5ZThwM1JWYm5ZVlQ3QQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=','STUDENT');

INSERT INTO public."Teacher"(id,name,age,subject,gender,school,price,prefecture,comment,"userId") VALUES ('7a7f2603-7cea-4a02-bcdc-f4714ce02cff','山田太朗','23','{数学,理科}','MAN','早稲田大学',null,'東京都',null,'9a4fabd2-cae9-42fe-aa4b-3d2efe5aa95d'),
('aa830f50-4501-4dd5-aa02-126f726c1739','佐藤太郎','21','{理科,数学}','MAN','日本大学',null,'新潟県',null,'7a1e529e-ae7f-4ea3-9492-c0d85f71684d'),
('c016668f-fdc3-4d03-84cd-6ec1e3cb1768','田中太郎','23','{数学,理科}','MAN','駒沢大学',null,'山梨県',null,'167c2886-35c3-4b9f-8fb9-0c8dfe07a261'),
('b11c7a5c-d05e-4d81-88db-9a8eea8a68d3','鈴木太郎','24','{理科}','MAN','東海大学',null,'東京都',null,'1758088c-77c4-488f-b882-0d6548c2a5c0'),
('b97651e0-3596-4e7b-87da-45afb07a2bda','山田花子','24','{理科}','WOMEN','法政大学',null,'東京都',null,'e05a3214-95fd-42f2-8bde-bc9f9ab1ec12'),
('db34ac3a-458f-43be-8a7e-1f629493d938','佐藤花子','25','{英語,国語}','WOMEN','青山学院大学',null,'東京都',null,'0d374336-6cd0-4abc-9142-07b00a6abfdb');

INSERT INTO public."Student"(id,name,school,prefecture,age,subject,gender,comment,"userId") VALUES ('266f0c8f-a1de-4983-86e6-603501acbb29','たかつぐ','高校３年','東京都','18','{社会}','MAN',null,'afeaeefd-d84f-4e26-96c1-472c8849a20d');

INSERT INTO public."Chat"("id","teacherId","studentId","lastMessage","lastMessageTimestamp") VALUES ('e15ee9b6-e8a0-4a0f-947f-e9660ca76f39','7a7f2603-7cea-4a02-bcdc-f4714ce02cff','266f0c8f-a1de-4983-86e6-603501acbb29','初めまして山田と申します','2023-06-06 20:37:36.962');

INSERT INTO public."Message"("id","chatId","senderId","content") VALUES ('029bc422-5a93-4c2c-ad9b-a26c3d53432d','e15ee9b6-e8a0-4a0f-947f-e9660ca76f39','7a1e529e-ae7f-4ea3-9492-c0d85f71684d','こんにちは');
