import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import { LoadingButton } from '@mui/lab';
type VariantType = 'text' | 'outlined' | 'contained' | undefined;
type TypeType = 'button' | 'reset' | 'submit' | undefined;

interface ButtonProps {
  title: React.ReactNode | string;
  loading?: boolean;
  onClick?: (parameters?: any) => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  variant?: VariantType;
  type?: TypeType;
  sx?: any;
  fullWidth?: boolean;
}

const ButtonShared = (props: ButtonProps) => {
  const { title, ...rest } = props;
  return (
    <LoadingButton loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export default ButtonShared;

export const ButtonSearch = (props: ButtonProps) => {
  const { title, ...rest } = props;
  return (
    <LoadingButton className={styles.buttonSearch} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonGreen = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonGreen} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonLogin = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton
      className={`${styles.buttonLogin} buttonLogin`}
      loadingPosition='start'
      {...rest}
    >
      {title}
    </LoadingButton>
  );
};
export const ButtonSendCode = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonSendCode} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};
export const ButtonLogOut = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonLogOut} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonView = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonView} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonUpdate = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonUpdate} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonDelete = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.buttonDelete} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonCancel = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={styles.ButtonCancel} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

export const ButtonWhite = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton
      className={styles.buttonWhite}
      loadingPosition={rest.startIcon ? 'start' : 'center'}
      variant="outlined"
      {...rest}
    >
      {title}
    </LoadingButton>
  );
};

export const ButtonShow = ({ title, ...rest }: ButtonProps) => {
  return (
    <LoadingButton className={title === "Hiển thị" ? styles.buttonShow : styles.buttonHide} loadingPosition={rest.startIcon ? 'start' : 'center'} {...rest}>
      {title}
    </LoadingButton>
  );
};

