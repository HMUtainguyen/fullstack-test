import React from 'react';

//---Styles
import styles from './label-custom.module.scss';
import classNames from 'classnames';

//--- MUI
import { SxProps, Typography } from '@mui/material';

interface LabelCustomProps {
  title: React.ReactNode | string;
  isRequired?: boolean;
  className?: string;
  sx?: SxProps;
}

const LabelCustom = React.forwardRef<HTMLDivElement, React.PropsWithChildren<LabelCustomProps>>(
  (props , ref) => {
    
  const { title, isRequired, className, sx } = props;
  return (
    <Typography variant="subtitle2" className={classNames(styles.typographyLabel, className)} sx={sx} ref={ref}>
      {title} {isRequired && <span className="required"></span>}
    </Typography>
  );
  }
)

export default LabelCustom;
