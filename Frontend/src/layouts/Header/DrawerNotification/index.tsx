import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Drawer, IconButton, Link, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Icons from 'consts/SvgIcon';
import { rowsPerPageOptions, convertToDate, dateTimeFormat } from 'utils';
import apiService from 'services/api-services';
import URL_PATHS from 'services/url-path';

import { DataNotificationModel, DrawerNotificationPropsModel } from './drawer-notification.model';
import Loadmore from 'components/Loadmore';
import LoadingIcon from 'components/LoadingIcon';
import { findErrorMessage } from 'utils/errors';
import { useSetToastInformationState } from 'redux/store/ToastMessage';
import { STATUS_TOAST } from 'consts/statusCode';
import { MessageErrorsAPI } from 'consts/messageError';
import { useNavigate } from 'react-router-dom';
import ROUTERS_PATHS from 'consts/router-paths';
import { useSelector } from 'react-redux';
const DrawerNotification = (props: DrawerNotificationPropsModel) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const initPage = 1;

    const { setToastInformation } = useSetToastInformationState();
    const { notiUnseen } = useSelector((state: any) => state.notification);
    const containerRef = useRef();
    const pageIndexState = useRef(initPage);
    const canLoadMore = useRef(false);
    const loadingState = useRef(false);

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage] = useState<number>(rowsPerPageOptions[0]);
    const [datas, setDatas] = useState<Array<DataNotificationModel>>([]);
    const [isLoading, setLoading] = useState(true);

    const getListNotification = async () => {
        setLoading(true);
        const params = {
            Page: page,
            PageSize: rowsPerPage,
            Sorts: '-created',
            Filters: 'platform==Web'
        };

        try {
            const res: any = await apiService.getFilter(URL_PATHS.GET_NOTIFICATION, params);
            const resultItems: any[] = res?.commentDto?.items;
            if (resultItems.length >= 0) {
                const items: DataNotificationModel[] = resultItems.map((item) => {
                    const result: DataNotificationModel = {
                        ...item,
                        id: item?.id || '',
                        title: item?.title || '',
                        content: item?.content || '',
                        isSeen: item?.isSeen || '',
                        subject: item?.subject || '',
                        orderId: item?.orderId || '',
                        created: item?.created || ''
                    };
                    return result;
                });
                if (res?.commentDto.pageIndex === 1) {
                    setDatas(items);
                } else {
                    setDatas([...datas, ...items]);
                }
                canLoadMore.current =
                    res?.commentDto.pageIndex * res?.commentDto.pageSize <= res?.commentDto.totalItems;
            } else {
                setDatas([]);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = (entries: any) => {
        if (canLoadMore.current && !loadingState.current && entries[0].isIntersecting) {
            setPage(pageIndexState.current + 1);
        }
    };

    const handleReadAllNoti = async () => {
        if (notiUnseen > 0) {
            try {
                await apiService.put(URL_PATHS.UPDATE_ALL_STATUS_NOTIFICATION, { platform: 'Web' });
                setPage(1);
                pageIndexState.current = 1;
                getListNotification();
            } catch (error: any) {
                const errRes = findErrorMessage(error.errors);
                setToastInformation({ status: STATUS_TOAST.ERROR, message: MessageErrorsAPI[errRes.errorCode] });
            }
        }
    };

    const contentNoti = useCallback((content: string) => {
        let customContent: any = content.split(' ');
        for (let i = 0; i < customContent.length; i++) {
            if (customContent[i] === 'Lý') {
                customContent[i] = '<br>' + customContent[i];
            }
        }
        return customContent.join(' ');
    }, []);

    const handleRedrict = async (id: number, idNoti: number, isSeen: boolean) => {
        if (isSeen) {
            navigate(ROUTERS_PATHS.VIEW_ORDER.replace(':id', id + ''));
            onClose();
        } else {
            try {
                await apiService.put(`${URL_PATHS.UPDATE_STATUS_NOTIFICATION}${idNoti}`);
                navigate(ROUTERS_PATHS.VIEW_ORDER.replace(':id', id + ''));
                onClose();
            } catch (error: any) {
                const errRes = findErrorMessage(error.errors);
                setToastInformation({ status: STATUS_TOAST.ERROR, message: MessageErrorsAPI[errRes.errorCode] });
            }
        }
    };
    useEffect(() => {
        loadingState.current = isLoading;
    }, [isLoading]);

    useEffect(() => {
        pageIndexState.current = page;
        getListNotification();
    }, [page]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box width={400}>
                <Box
                    position="sticky"
                    top={0}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bgcolor="#FFD392"
                    py={1}
                    px={2}
                    borderBottom={1}
                    borderColor="#FFD392"
                    zIndex={9999999}
                >
                    <Typography fontSize={16} fontWeight={700} color="#451C1C">
                    Notification
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Link
                    sx={{ color: '#451C1C !important', cursor: 'pointer' }}
                    underline="hover"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    m={2}
                    ml={30}
                    onClick={() => handleReadAllNoti()}
                >
                    <Icons.CheckIcon />
                    <Typography ml={1} fontWeight={700} fontSize={14} color="#614C4C">
                        already read
                    </Typography>
                </Link>

                <Box>
                    {datas &&
                        datas.length > 0 &&
                        datas.map((item: DataNotificationModel, index: number) => (
                            <Box
                                key={index}
                                bgcolor={!item.isSeen ? '#EAEAEA' : 'white'}
                                p={2}
                                borderBottom={1}
                                borderTop={1}
                                borderColor="#96999C"
                                style={{ cursor: 'pointer' }}
                                sx={{
                                    ':hover': { opacity: 0.6 }
                                }}
                                onClick={() => handleRedrict(item.redirectId, item.id, item.isSeen)}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography fontSize={14} fontWeight={700} color="#614C4C">
                                        {item.title}
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} color="#614C4C">
                                        {convertToDate(item.created, dateTimeFormat)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        fontSize={14}
                                        color="#614C4C"
                                        fontWeight={500}
                                        dangerouslySetInnerHTML={{
                                            __html: contentNoti(item.content)
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    {!isLoading && datas.length === 0 && (
                        <Box textAlign="center" pt="20px" color="rgb(150, 153, 156)" fontSize={14} fontWeight={500}>
                            No notification
                        </Box>
                    )}
                    {isLoading && (
                        <Box textAlign="center" pt="20px" color="rgb(150, 153, 156)">
                            {' '}
                            <LoadingIcon />
                        </Box>
                    )}
                    {datas.length !== 0 && (
                        <Loadmore
                            rootMargin="0px 0px 100px 0px"
                            containerElement={containerRef.current}
                            loadMore={handleLoadMore}
                        />
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};
export default DrawerNotification;
