import { Box } from '@mui/material';
import { ButtonLogin } from 'components/ButtonShared';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import TextFieldCustom from 'components/TextFieldCustom';
import MESSAGES_ERROR from 'consts/messageError';
import { Controller } from 'react-hook-form';

interface LoginJWTProps {
  children?: React.ReactNode;
  Styles?: any;
  classes?: any;
  control?: any;
  errors?: any;
  handleSubmit?: any;
  handleLogin?: any;
  codeOTP?: any;
  setCodeOTP?: any;
  setValue?: any;
  setError?: any;
  handleErrorLogin?: any;
  isLoading?: boolean;
  reset?: any;
  messageErrorLogin?: string | undefined;
  setMessageErrorLogin?: any | undefined;
}

const LoginJWT = ({
  Styles,
  classes,
  control,
  reset,
  errors,
  handleSubmit,
  handleLogin,
  isLoading,
  messageErrorLogin,
  setMessageErrorLogin,
  setValue,
  setError,
  handleErrorLogin
}: LoginJWTProps) => {
  return (
    <Box className={Styles.login}>
      <form>
        <Box sx={{ marginTop: '55px', textAlign: 'center' }}>
          <Box sx={{ mt: 2, textAlign: 'start' }}>
            <Controller
              render={({ field }: any) => (
                <TextFieldCustom
                  {...field}
                  error={!!errors?.userName}
                  className={classes.textBox}
                  placeholder="UserName"
                  type="text"
                  fullWidth
                  errorMessage={errors?.userName?.message}
                  inputRef={field.ref}
                  inputProps={{ maxLength: 255 }}
                  onChange={(e) => {
                    setMessageErrorLogin('');
                    setValue('userName', e.target.value.trim());
                    setError('userName', '');
                  }}
                />
              )}
              name="userName"
              rules={{
                required: MESSAGES_ERROR.fieldRequired
              }}
              control={control}
              defaultValue=""
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: 'start' }}>
            <Controller
              render={({ field }: any) => (
                <TextFieldCustom
                  {...field}
                  error={!!errors?.password}
                  className={classes.textBox}
                  placeholder="Password"
                  type="password"
                  inputRef={field.ref}
                  errorMessage={errors?.password?.message}
                  inputProps={{ maxLength: 15 }}
                  onChange={(e) => {
                    setMessageErrorLogin('');
                    setValue('password', e.target.value.trim());
                    setError('password', '');
                  }}
                  fullWidth
                />
              )}
              name="password"
              rules={{
                required: MESSAGES_ERROR.fieldRequired
              }}
              control={control}
              defaultValue=""
            />
          </Box>
          <ErrorMessage>{messageErrorLogin}</ErrorMessage>
          <ButtonLogin
            variant="contained"
            onClick={handleSubmit(handleLogin)}
            sx={{
              width: '313px',
              height: '50px',
              padding: '15px 20px',
              borderRadius: '25px',
              textAlign: 'center',
              mt: 2
            }}
            type="submit"
            title="Login"
            loading={isLoading}
          />
        </Box>
      </form>
    </Box>
  );
};

export default LoginJWT;
