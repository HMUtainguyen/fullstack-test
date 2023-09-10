import { ReactNode } from 'react';

export interface LoginPropsModel {
  type?: string;
  children?: ReactNode;
  label?: string;
  registerLabel?: string;
  register?: any;
  required?: any;
}
