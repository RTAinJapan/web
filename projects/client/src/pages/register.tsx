import { Button, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../trpc";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

export const Component = () => {
  const { register, handleSubmit, formState } = useForm<{ email: string }>({
    resolver: zodResolver(formSchema),
  });
  const [emailSent, setEmailSent] = useState(false);
  const { mutate } = trpc.registration.initialize.useMutation({
    onSuccess: () => {
      setEmailSent(true);
    },
  });

  return (
    <>
      <Typography variant="h1">新規登録</Typography>
      {emailSent ? (
        <Typography variant="body1">
          メールを送信しました。メールに記載されているURLにアクセスし登録を完了してください。
        </Typography>
      ) : (
        <form
          onSubmit={handleSubmit((data) => {
            mutate({ email: data.email });
          })}
        >
          <TextField
            label="メールアドレス"
            autoComplete="email"
            inputProps={register("email")}
            error={formState.errors.email !== undefined}
            helperText={formState.errors.email?.message}
          />
          <Button type="submit">登録</Button>
        </form>
      )}
    </>
  );
};
