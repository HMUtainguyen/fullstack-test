import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import SkeletonCustom from 'components/SkeletonCustom';
import COLORS from 'consts/colors';
import ELEMENT_ID from 'consts/element-id';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

interface BreadCrumbProps {
  title?: string;
  labelDisplay?: string;
  labelDisplayChildren?: string;
  link?: string;
  linkRoot?: string;
  isLoading?: boolean;
}

const BreadCrumbsComponent = memo<BreadCrumbProps>((props) => {
  const { title, labelDisplay, labelDisplayChildren, link = '#', linkRoot = '#', isLoading } = props;

  const domNode = document.getElementById(ELEMENT_ID.BREADCRUMB_CONTAINER);
  const getContent: () => JSX.Element = () => {
    return (
      <Box className="breadcrumbs" paddingTop="5px">
        {isLoading ? (
          <SkeletonCustom height={36} width="100%" />
        ) : (
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
            {!!labelDisplay ? (
              <Link color="primary" to={linkRoot} style={{ textDecoration: 'none', color: '#000' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '19px', color: COLORS.TEXT, cursor: 'pointer' }}>
                  {title}
                </Typography>
              </Link>
            ) : (
              !!title && (
                <Typography color="textprimary" sx={{ fontWeight: 700, fontSize: '19px', color: COLORS.TEXT }}>
                  {title}
                </Typography>
              )
            )}

            {!!labelDisplayChildren ? (
              <Link color="primary" to={link} style={{ textDecoration: 'none' }}>
                <Typography color="textPrimary" sx={{ fontWeight: 700, fontSize: '14px', marginTop: '3px', color: COLORS.TEXT }}>
                  {labelDisplay}
                </Typography>
              </Link>
            ) : (
              !!labelDisplay && (
                <Typography color="textPrimary" sx={{ fontWeight: 700, fontSize: '14px', marginTop: '3px', color: COLORS.TEXT }}>
                  {labelDisplay}
                </Typography>
              )
            )}

            {!!labelDisplayChildren ? (
              <Typography color="textPrimary" sx={{ fontWeight: 700, fontSize: '14px', marginTop: '3px', color: COLORS.TEXT }}>
                {labelDisplayChildren}
              </Typography>
            ) : (
              ''
            )}
          </Breadcrumbs>
        )}
      </Box>
    );
  };
  if (domNode) {
    return ReactDOM.createPortal(getContent(), domNode);
  }

  return null;
});

export default BreadCrumbsComponent;
