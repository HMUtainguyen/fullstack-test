import { Box, IconButton, Popover, Typography } from '@mui/material';
import ButtonCustom from 'components/ButtonCustom';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonIconCustom } from 'components/ButtonIconCustom';
import COLORS from 'consts/colors';

interface SearchPopoverProps {
  onFilter?: (handleCloseSearch?: () => void) => void;
  isLoading?: boolean;
  children: React.ReactNode;
  contentWidth?: string | number;
  isDisabledClearBtn?: boolean;
  isDisabledSearchBtn?: boolean;
}

const SearchPopover = (props: SearchPopoverProps) => {
  const { onFilter, isLoading, children, contentWidth, isDisabledClearBtn = false, isDisabledSearchBtn = false } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | HTMLSpanElement | null>(null);
  const [disableEventButton, setDisableEventButton] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const handleOpenSearch = (event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
    setDisableEventButton(true);
  };

  const handleCloseSearch = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter && onFilter();
    handleCloseSearch();
    setTimeout(() => {
      setDisableEventButton(false);
    }, 1000);
  };
  return (
    <>
      <ButtonIconCustom
        tooltipTitle="Search"
        onSpanClick={handleOpenSearch}
        type="search"
        color="darkgreen"
        isLoading={isLoading}
      />
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseSearch}
        style={{ backgroundColor: COLORS.BACKGROUND_LOADING }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box width={contentWidth || '20rem'} padding="15px" className={styles.headerSearch}>
          <Typography variant={'h5'}>Search</Typography>
          <IconButton aria-label="close" size="small" onClick={isLoading ? undefined : handleCloseSearch}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box width={contentWidth || '20rem'} padding="15px">
          <form onSubmit={handleSearch}>
            {children}
            <Box textAlign="right" paddingTop="15px">
              <ButtonCustom
                id="button-submit"
                type="submit"
                disabled={isLoading || isDisabledSearchBtn}
                onClick={handleSearch}
                className={styles.buttonSearch}
                color="yellow"
                // startIcon={isLoading ? <CircularProgress color="inherit" size="20px" /> : <SearchIcon />}
              >
                Search
              </ButtonCustom>
            </Box>
          </form>
        </Box>
      </Popover>
    </>
  );
};

export default SearchPopover;
