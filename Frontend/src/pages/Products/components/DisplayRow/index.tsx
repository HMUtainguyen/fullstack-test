import React, { useState } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
// import { StickyTableCell } from 'components/StickyTableCell';
import { RowDataProps, StatusType } from 'pages/Products/propTypes';
// import ChipCustom from 'components/ChipCustom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import styles from '../../styles.module.scss';
import ROUTERS_PATHS from 'consts/router-paths';
// import { STATUS_CHIP, STATUS_VALUE, STATUS_VN_TITLE } from 'consts/statusCode';
import clsx from 'clsx';
// import COLORS from 'consts/colors';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DisplayRowProps {
    data: RowDataProps;
    isProduct: boolean;
    handleOpenMenuAction: (event: React.MouseEvent<HTMLButtonElement>, record: RowDataProps) => void;
}


const DisplayRow = (props: DisplayRowProps) => {
    const { data, handleOpenMenuAction, isProduct } = props;
    const [expand, setExpand] = useState<boolean>(false);
    return (
        <>
            <TableRow
                key={data.id}
                hover
                className={clsx(styles.stickyTableRow, styles.tableRowCursor, styles.parentRow)}
                onClick={() => {
                    setExpand(!expand);
                }}
            >

                <TableCell className={styles.stickyTableCell} sx={{ left: '113px !important' }}>
                    <Link
                        to={ROUTERS_PATHS.PRODUCT_DETAIL.replace(':id', data.id + '')}
                        className={styles.linkToDetail}
                    >
                        {data.id}
                    </Link>
                </TableCell>
                <TableCell sx={{ left: '264px !important' }}>
                    <Link
                        to={ROUTERS_PATHS.PRODUCT_DETAIL.replace(':id', data.id + '')}
                        className={styles.linkToDetail}
                    >
                        {data.name}
                    </Link>
                </TableCell>
                <TableCell sx={{ left: '264px !important' }}>
                        {data.description}
                </TableCell>
                <TableCell className="align-center">{data.category}</TableCell>

                <TableCell className="align-center">{data.price ? data.price.toLocaleString('en') + ' $' : ''}</TableCell>
                <TableCell className="align-right ">
                    <IconButton aria-label="more" onClick={(e) => handleOpenMenuAction(e, data)}>
                        <MoreHorizIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
          
        </>
    );
};

export default DisplayRow;
