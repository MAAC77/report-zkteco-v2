import InputText from "@/components/inputs/InputText";
import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { SubmitHandler, useForm, UseFormSetError } from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  usuario: string;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

export type LoginFormRefType = {
  setError: UseFormSetError<FormValues>;
};

const LoginForm: ForwardRefRenderFunction<LoginFormRefType, Props> = (
  { onSubmit },
  ref
) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      usuario: "5390235",
      password: "5390235",
    },
  });

  useImperativeHandle(ref, () => ({
    setError,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <InputText
          type="text"
          label="Usuario"
          name="usuario"
          control={control}
        />
        <InputText
          type="password"
          label="Password"
          name="password"
          control={control}
        />
      </Stack>
      <Stack mt={-2} align={"end"}>
        {/* <Link href="/forget-password" passHref>
          <ChakraLink color="blue.500">
            <small>Forgot your password?</small>
          </ChakraLink>
        </Link> */}
      </Stack>
      <Stack align={"center"}>
        <Button
          mt={8}
          colorScheme="brand"
          isLoading={isSubmitting}
          type="submit"
          isFullWidth={true}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default forwardRef(LoginForm);
