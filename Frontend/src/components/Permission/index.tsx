import React from 'react';
import { Box } from '@mui/material';

const Permission = (props: any) => {
    const { children, role } = props;

    return <Box>{children}</Box>;
};

export default Permission;
