import { Box } from '@mui/material';
import CrudModal from 'components/CrudModal';

interface ModalLogout {
  isOpen: boolean;
  handleClose: (parameters?: any) => void;
  handleSubmit: any;
  cancelBtnLabel: string;
  saveBtnLabel: string;
  formTitle: string;
  setIsOpenModalLogout: (parameters?: any) => void;
}
const ModalLogout: React.FC<ModalLogout> = (props) => {
  const { isOpen, handleClose, cancelBtnLabel, saveBtnLabel, formTitle, handleSubmit } = props;
  return (
    <CrudModal
      isOpen={isOpen}
      handleClose={handleClose}
      handleLogOut={handleSubmit}
      cancelBtnLabel={cancelBtnLabel}
      saveBtnLabel={saveBtnLabel}
      formTitle={formTitle}
      dialogProps={{
        fullWidth: true,
        maxWidth: 'sm'
      }}
    >
      <Box
        style={{
          margin: 'auto',
          marginTop: '13px',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '20px',
          color: '#614C4C'
        }}
      >
        Are you want to logout ?
      </Box>
    </CrudModal>
  );
};

export default ModalLogout;
