import { Chip, SxProps } from '@mui/material';
import clsx from 'clsx';
import { STATUS_CHIP } from 'consts/statusCode';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface ChipProps {
  label: string;
  className?: string;
  chipType: string;
  sx?: SxProps;
}

const ChipCustom = (props: ChipProps) => {
  const { label, className, chipType, sx } = props;
  let classNameByType = useMemo(() => {
    let _classNameByType = '';
    switch (chipType) {
      case STATUS_CHIP.WARNING:
        _classNameByType = styles.warning;
        break;

      case STATUS_CHIP.ACTIVE:
      case STATUS_CHIP.SUCCESS:
        _classNameByType = styles.active;
        break;
      case STATUS_CHIP.FAILURE:
      case STATUS_CHIP.INACTIVE:
        _classNameByType = styles.inactive;
        break;

      default:
        break;
    }
    return _classNameByType;
  }, [chipType]);

  return (
    <Chip
      label={label}
      className={clsx(styles.chipStyles, classNameByType, { [className || '']: !!className })}
      sx={sx}
    />
  );
};

export default ChipCustom;
