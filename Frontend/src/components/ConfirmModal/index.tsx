import React from 'react';
import ELEMENT_ID from 'consts/element-id';
import { useGetConfirmModalState, useSetConfirmModalState } from 'redux/store/confirmModal/confirmModalSlice';

import CrudModal from 'components/CrudModal';
import { convertBreakToHtml } from 'utils';
import COLORS from 'consts/colors';

const ConfirmModal: () => JSX.Element = () => {
  const { isOpen, title, message, cancelBtnLabel, okBtnLabel, isDeleteConfirm, isNoAction } = useGetConfirmModalState();
  const { closeConfirmModal } = useSetConfirmModalState();
  const onOk = () => {
    const el = document.getElementById(ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON);
    if (el) {
      el.click();
    }
    closeConfirmModal();
  };

  return (
    <>
      <CrudModal
        isOpen={isOpen}
        handleClose={isNoAction ? undefined : closeConfirmModal}
        handleLogOut={isDeleteConfirm ? onOk : undefined}
        handleSave={!isDeleteConfirm ? onOk : undefined}
        cancelBtnLabel={cancelBtnLabel}
        saveBtnLabel={okBtnLabel}
        formTitle={title}
        noCheckingChanges
        dialogProps={{
          fullWidth: true,
          maxWidth: 'sm'
        }}
      >
        <div
          style={{
            padding: '16px 0',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            color: COLORS.TEXT
          }}
          dangerouslySetInnerHTML={{
            __html: convertBreakToHtml(message)
          }}
        ></div>
      </CrudModal>

      <div id={ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON} hidden></div>
    </>
  );
};

export default ConfirmModal;
