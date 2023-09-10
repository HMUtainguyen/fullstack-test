/* eslint-disable react/jsx-pascal-case */
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Badge, Box, IconButton, MenuItem, MenuList, Popover, Toolbar, Tooltip } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import avatarDefault from 'assets/images/avatar-default.png';
import clsx from 'clsx';
import ELEMENT_ID from 'consts/element-id';
import { MESSAGES_CONFIRM } from 'consts/messageConfirm';
import ROUTERS_PATHS from 'consts/router-paths';
import Icons from 'consts/SvgIcon';
import useAuth from 'hooks/useAuth';
import $ from 'jquery';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOutAccount } from 'redux/store/account';
import { useSetCheckingChangesState } from 'redux/store/checkingChanges';
import { useSetConfirmModalState } from 'redux/store/confirmModal/confirmModalSlice';
import { BASE_URL } from 'services/base-url';
import URL_PATHS from 'services/url-path';
import DrawerNotification from './DrawerNotification';
import styles from './styles.module.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Header = () => {
    const { logout } = useAuth();
    const { pathname } = useLocation();

    const anchorElRef = useRef(null);

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    // const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenNotification, setOpenNotification] = useState<boolean>(false);
    const idAction = openMenu ? 'simple-popover' : undefined;

    const isChangeForm = useSelector((state: any) => state.checkingChanges.isChange);
    const { currentUser } = useSelector((state: any) => state.currentUser);
    const { notiUnseen } = useSelector((state: any) => state.notification);

    const { openConfirmModal } = useSetConfirmModalState();
    const navigate = useNavigate();
    const { setCheckingChanges } = useSetCheckingChangesState();

    const handleClosePopover = () => {
        setOpenMenu(false);
    };

    // const handleCloseModalLogout = () => {
    //   setIsOpenModalLogout(false);
    // };

    // const handleSubmit = () => {
    //   LogOutAccount(logout);
    // };

    const getPath = (path: string) => {
        if (path === pathname) {
            return path;
        } else {
            if (isChangeForm) {
                return '#';
            } else {
                return path;
            }
        }
    };

    const handleCheckFormChanges = (href: string) => {
        if (isChangeForm) {
            openConfirmModal({
                isOpen: true,
                title: 'Warning',
                message: MESSAGES_CONFIRM.CheckingChanges,
                cancelBtnLabel: 'Cancel',
                okBtnLabel: 'Confirm',
                isDeleteConfirm: false,
                onOk: () => onNavigate(href)
            });
        }
    };

    const hidenSidebar = () => {
        if ($('body').hasClass('mini-sidebar')) {
            $('#miniLogo').addClass('d-none');
            $('body').removeClass('mini-sidebar');
            $('.subdrop + ul').slideDown();
        } else {
            $('#miniLogo').removeClass('d-none');
            $('body').addClass('mini-sidebar');
            $('.subdrop + ul').slideUp();
        }

        if ($('.toolBarClick').hasClass('toolBar')) {
            $('.toolBarClick').removeClass('toolBar');
            $('.toolBarClick').addClass('toolBarHide');
        } else {
            $('.toolBarClick').removeClass('toolBarHide');
            $('.toolBarClick').addClass('toolBar');
        }
        const buttonSidebarHidden = document.getElementById(ELEMENT_ID.BUTTON_SIDE_BAR_HIDDEN);
        if (buttonSidebarHidden) {
            buttonSidebarHidden.click();
        }
    };

    const onNavigate = (href: string) => {
        setCheckingChanges({ isChange: false });
        navigate(href, { replace: false });
    };

    const ImageSrc = `${BASE_URL}${currentUser.avatar}`;

    const handleAddCart = () => {
        navigate(ROUTERS_PATHS.CREATE_NEW_ORDER, {state:{reInit: {}}})
    };

    useEffect(() => {
        $('body').removeClass('mini-sidebar');
        $('.toolBarClick').addClass('toolBar').remove('toolBarHide');
    }, []);

    return (
        <AppBar className="appBar">
            <Toolbar className="toolBar abc toolBarClick">
                <Box
                    className="iconMenu"
                    sx={{ color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    id={ELEMENT_ID.SIDEBAR_TOGGLE_ICON_BUTTON}
                    onClick={hidenSidebar}
                >
                    <MenuIcon sx={{ fontSize: 30 }} />
                </Box>
                <div className={styles.breadCrumbsContainer} id={ELEMENT_ID.BREADCRUMB_CONTAINER}></div>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '20px'
                    }}
                >
                    <Tooltip title="order">
                        <IconButton>
                            <AddShoppingCartIcon onClick={handleAddCart} />
                        </IconButton>
                    </Tooltip>

                    <Badge color="error" badgeContent={notiUnseen} max={99} onClick={() => setOpenNotification(true)}>
                        <NotificationsNoneIcon sx={{ color: '#614C4C' }} />
                    </Badge>

                    <Box
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        ref={anchorElRef}
                        onClick={(e) => setOpenMenu(true)}
                    >
                        <div className="textContainer">
                            <p className="userName">
                                {currentUser?.lastName} {currentUser?.firstName}
                            </p>
                        </div>
                        {/* <Icons.DefaultAvatarIcon /> */}
                        <img
                            src={currentUser.avatar ? ImageSrc : avatarDefault}
                            width={40}
                            height={40}
                            style={{ borderRadius: '50%' }}
                            alt="avatarAdmin"
                        />
                    </Box>
                </Box>

                <Popover
                    id={idAction}
                    open={openMenu}
                    anchorEl={anchorElRef.current}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <MenuList>
                        <Link
                            style={{ textDecoration: 'unset', color: '#614C4C' }}
                            to={getPath(ROUTERS_PATHS.MY_PROFILE)}
                            onClick={
                                getPath(ROUTERS_PATHS.MY_PROFILE) === '#'
                                    ? () => handleCheckFormChanges(ROUTERS_PATHS.MY_PROFILE)
                                    : undefined
                            }
                        >
                            <MenuItem
                                key="1"
                                className={clsx({
                                    [styles.menuItem]: true,
                                    [styles.menuItemLogOut]: true
                                })}
                                onClick={() => handleClosePopover()}
                            >
                                Account
                                <Icons.profile style={{ marginLeft: '10px' }} />
                            </MenuItem>
                        </Link>

                        <MenuItem
                            key="1"
                            className={clsx({
                                [styles.menuItem]: true,
                                [styles.menuItemLogOut]: true
                            })}
                            // onClick={() => setIsOpenModalLogout(true)}
                            onClick={() => LogOutAccount(logout)}
                        >
                            Logout
                            <LogoutIcon color="error" sx={{ marginLeft: '10px' }} />
                        </MenuItem>
                    </MenuList>
                </Popover>
                {isOpenNotification && (
                    <DrawerNotification open={isOpenNotification} onClose={() => setOpenNotification(false)} />
                )}
            </Toolbar>
        </AppBar>
    );
};
export default Header;
