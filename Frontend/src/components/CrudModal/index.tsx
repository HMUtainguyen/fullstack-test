import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled, SxProps } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import classNames from 'clsx';
import ButtonCustom from 'components/ButtonCustom';
import { MESSAGES_CONFIRM } from 'consts/messageConfirm';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSetCheckingChangesState } from 'redux/store/checkingChanges';
import { useSetConfirmModalState } from 'redux/store/confirmModal/confirmModalSlice';

const DialogCustom = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const useStyles = makeStyles(() => ({
  dialogTitle: {
    fontWeight: '700 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    color: '#451C1C',
    backgroundColor: '#FFD392'
  }
}));

interface DialogTitleCustomProps {
  children: React.ReactNode;
  onClose?: (parameters?: any) => void;
}

const DialogTitleCustomDefaultProps = {
  children: <></>,
  onClose: (parameters?: any) => {}
};

const DialogTitleCustom: React.FC<DialogTitleCustomProps> = (props = DialogTitleCustomDefaultProps) => {
  const { children, onClose, ...others } = props;
  const classes = useStyles();

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...others} className={classes.dialogTitle}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface CrudModalProps {
  isOpen: boolean;
  handleClose?: (parameters?: any) => any;
  handleSave?: (parameters?: any) => void;
  handleLogOut?: (parameters?: any) => void;
  handleSaveDraft?: (parameters?: any) => void;
  handleAddNew?: (parameters?: any) => void;
  cancelBtnLabel?: string;
  saveBtnLabel?: string;
  saveDraftBtnLabel?: string;
  formTitle: string;
  addNewLabel?: string;
  children: React.ReactNode;
  dialogProps?: Object;
  contentClassName?: string;
  styleModal?: string | undefined;
  isIconClose?: boolean | undefined;
  loading?: boolean | undefined;
  sx?: SxProps;
  isDisable?: any;
  noCheckingChanges?: boolean;
}

const CrudModalDefaultProps = {
  isOpen: false,
  handleClose: (parameters?: any) => {},
  handleSave: (parameters?: any) => {},
  handleAddNew: (parameters?: any) => {},
  handleLogOut: (parameters?: any) => {},
  handleSaveDraft: (parameters?: any) => {},
  cancelBtnLabel: '',
  saveBtnLabel: '',
  saveDraftBtnLabel: '',
  addNewLabel: '',
  formTitle: '',
  children: <></>,
  dialogProps: {},
  contentClassName: '',
  styleModal: '',
  isIconClose: false,
  loading: false,
  isConfirmModal: false
};

const CrudModal = React.forwardRef<HTMLDivElement, React.PropsWithChildren<CrudModalProps>>(
  (props = CrudModalDefaultProps, ref) => {
    const {
      isOpen,
      handleClose,
      handleSave,
      handleLogOut,
      handleAddNew,
      cancelBtnLabel,
      saveBtnLabel,
      addNewLabel,
      formTitle,
      children,
      dialogProps,
      contentClassName = '',
      styleModal,
      loading,
      isDisable,
      noCheckingChanges
    } = props;

    const isChangeForm = useSelector((state: any) => state.checkingChanges.isChange);
    const { openConfirmModal } = useSetConfirmModalState();
    const { setCheckingChanges } = useSetCheckingChangesState();

    const handleCheckFormChanges = () => {
      if (isChangeForm) {
        openConfirmModal({
          isOpen: true,
          title: 'Warning',
          message: MESSAGES_CONFIRM.CheckingChanges,
          cancelBtnLabel: 'Cancel',
          okBtnLabel: 'Confirm',
          isDeleteConfirm: false,
          onOk: () => {
            handleConfirmClose();
          }
        });
      }
    };

    const handleConfirmClose = () => {
      setCheckingChanges({ isChange: false });
      handleClose && handleClose();
    };

    return (
      <DialogCustom className={styleModal} open={isOpen} {...dialogProps} ref={ref}>
        <DialogTitleCustom
          onClose={loading ? undefined : isChangeForm && !noCheckingChanges ? handleCheckFormChanges : handleClose}
        >
          {formTitle}
        </DialogTitleCustom>
        <DialogContent dividers className={classNames(contentClassName)} sx={{ maxHeight: window.innerHeight - 200 }}>
          <form onSubmit={handleSave}>
            {children}
            <ButtonCustom type="submit" className="d-none" />
          </form>
        </DialogContent>
        <DialogActions>
          {handleSave && (
            <ButtonCustom
              startIcon={<></>}
              disabled={isDisable || loading}
              color="yellow"
              onClick={handleSave}
              loading={loading}
              title={saveBtnLabel}
            />
          )}
          {handleLogOut && (
            <ButtonCustom
              color="red"
              onClick={handleLogOut}
              loading={loading}
              title={saveBtnLabel}
              disabled={isDisable || loading}
            />
          )}
          {handleAddNew && <ButtonCustom startIcon={<></>} color="white" onClick={handleAddNew} loading={loading} disabled={isDisable || loading} title={addNewLabel} />}
          {handleClose && (
            <ButtonCustom
              color="white"
              onClick={isChangeForm && !noCheckingChanges ? handleCheckFormChanges : handleClose}
              disabled={loading}
              title={cancelBtnLabel}
            />
          )}
        </DialogActions>
      </DialogCustom>
    );
  }
);

export default CrudModal;
