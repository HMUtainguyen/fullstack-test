import { Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import COLORS from 'consts/colors';
import React from 'react';

interface PaginationCustomProps {
  page: number;
  totalCount: number;
  rowsPerPage: number;
  boundaryCount?: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const useStyles = makeStyles(() => ({
  ul: {
    '& button.Mui-selected': {
      backgroundColor: COLORS.YELLOW,
      '&:hover': {
        backgroundColor: COLORS.YELLOW
      }
    }
  }
}));

const PaginationCustom = (props: PaginationCustomProps) => {
  const { page, totalCount, rowsPerPage, onChange, boundaryCount = 2 } = props;
  const classes = useStyles();
  return (
    <Pagination
      boundaryCount={boundaryCount}
      classes={{ ul: classes.ul }}
      page={page + 1}
      count={Math.ceil(totalCount / rowsPerPage)}
      shape="rounded"
      onChange={(e, value) => {
        onChange(e, value - 1);
      }}
    />
  );
};

export default PaginationCustom;
