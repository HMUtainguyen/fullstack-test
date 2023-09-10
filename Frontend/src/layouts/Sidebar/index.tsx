/* eslint-disable react/jsx-pascal-case */
import { TreeItem, treeItemClasses, TreeItemProps, TreeView } from '@mui/lab';
import { Box, Hidden, styled, Typography } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import ELEMENT_ID from 'consts/element-id';
import { MESSAGES_CONFIRM } from 'consts/messageConfirm';
import ROUTERS_PATHS from 'consts/router-paths';
import Icons from 'consts/SvgIcon';
import $ from 'jquery';
import { compact } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSetCheckingChangesState } from 'redux/store/checkingChanges';
import { useSetConfirmModalState } from 'redux/store/confirmModal/confirmModalSlice';

declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon?: any;
    labelInfo?: any;
    labelText: string;
    keyLink: string | number;
    href?: any;
    checkHasClass?: boolean;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        // borderTopRightRadius: theme.spacing(2),
        // borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        position: 'relative',
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        },
        ' &.Mui-selected, &.Mui-selected.Mui-focused': {
            // backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.hover})`,
            color: 'var(--tree-view-color)'
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit'
        }
    }
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        keyLink,
        href,
        checkHasClass,
        ...other
    } = props;
    const isChangeForm = useSelector((state: any) => state.checkingChanges.isChange);
    const { openConfirmModal } = useSetConfirmModalState();
    const navigate = useNavigate();
    const { setCheckingChanges } = useSetCheckingChangesState();

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

    const onNavigate = (href: string) => {
        setCheckingChanges({ isChange: false });
        navigate(href, { replace: false });
    };

    if (keyLink && href) {
        return (
            <Link
                key={`Link${keyLink}`}
                to={isChangeForm ? '#' : href}
                onClick={isChangeForm ? () => handleCheckFormChanges(href) : undefined}
            >
                <StyledTreeItemRoot
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                            <Box component={LabelIcon} color="inherit" sx={{ mr: 1, minWidth: '25px' }} />
                            <Typography variant="body2" className="labelText-sideBar" sx={{ flexGrow: 1 }}>
                                {labelText}
                            </Typography>
                            <Box component={labelInfo} color="inherit" sx={{ mr: 1 }} />
                        </Box>
                    }
                    style={{
                        '--tree-view-color': '#FFFFFF',
                        '--tree-view-bg-color': '#BF1E2E'
                    }}
                    {...other}
                />
            </Link>
        );
    } else {
        return (
            <StyledTreeItemRoot
                label={
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1, minWidth: '25px' }} />
                        <Typography variant="body2" className="labelText-sideBar" sx={{ flexGrow: 1 }}>
                            {labelText}
                        </Typography>
                        <Box component={labelInfo} color="inherit" sx={{ mr: 1 }} />
                    </Box>
                }
                style={{
                    '--tree-view-color': '#FFFFFF',
                    '--tree-view-bg-color': '#BF1E2E'
                }}
                {...other}
            />
        );
    }
}

const Sidebar = () => {
    // const { listRoleById } = useSelector((state: any) => state.permission);
    const [expanded, setExpanded] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [checkExpanded, setCheckExpanded] = useState<string | number>('');
    const [checkSelected, setCheckSelected] = useState<any[]>([]);
    const [checkHasClass, setCheckHasClass] = useState<string>(checkSelected[0]);
    const [checkKeyParent, setCheckKeyParent] = useState<string>();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const param = useParams();

    const [menu, setMenu] = useState<any[]>([
        {
            key: 'home',
            title: 'Homepage',
            icon: Icons.home,
            href: ROUTERS_PATHS.DASHBOARD,
            subMenu: []
        },
        {
            key: 'reportManagement',
            title: 'Revenue report',
            icon: Icons.ReportSales,
            subMenu: [
                {
                    parentKey: 'reportManagementSales',
                    key: 'report-sales-list',
                    title: 'Revenue report ',
                    href: ROUTERS_PATHS.REPORT_SALES_LIST
                },
                {
                    parentKey: 'reportManagementProducts',
                    key: 'report-products-list',
                    title: 'Revenue report by Product ',
                    href: ROUTERS_PATHS.REPORT_PRODUCTS_LIST
                },
                {
                    parentKey: 'reportManagementCustomers',
                    key: 'report-customers-list',
                    title: 'Revenue report by User',
                    href: ROUTERS_PATHS.REPORT_CUSTOMERS_LIST
                }
            ]
        },
        {
            key: 'orderManagement',
            title: 'Order Management',
            icon: Icons.Order,
            subMenu: [
                {
                    parentKey: 'orderManagement',
                    key: 'order-list',
                    title: 'Order List',
                    href: ROUTERS_PATHS.LIST_OF_ORDER
                }
            ]
        },
        {
            key: 'store',
            title: 'Store',
            icon: Icons.store,
            href: ROUTERS_PATHS.STORE,
            subMenu: []
        },
        {
            key: 'product',
            title: 'Product',
            icon: Icons.ProductIcon,
            subMenu: [
                {
                    parentKey: 'product',
                    key: 'product-types',
                    title: 'Product category',
                    href: ROUTERS_PATHS.PRODUCT_TYPES,
                },
                {
                    parentKey: 'product',
                    key: 'products',
                    title: 'Product List',
                    href: ROUTERS_PATHS.PRODUCTS,
                }
            ]
        },
        {
            key: 'userManagement',
            title: 'User Management',
            icon: Icons.user,
            subMenu: [
                {
                    parentKey: 'userManagement',
                    key: 'list-of-employee',
                    title: 'Employee List',
                    href: ROUTERS_PATHS.LIST_OF_EMPLOYEE,
                },
                {
                    parentKey: 'userManagement',
                    key: 'list-of-user',
                    title: 'User List',
                    href: ROUTERS_PATHS.LIST_OF_USER,
                },
            ]
        },
    ]);

    const isChangeForm = useSelector((state: any) => state.checkingChanges.isChange);
    const { openConfirmModal } = useSetConfirmModalState();
    const navigate = useNavigate();
    const { setCheckingChanges } = useSetCheckingChangesState();

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

    const handleClickLogo = () => {
        setSelected(['home']);
        setCheckHasClass('home');
    };

    const onNavigate = (href: string) => {
        setCheckingChanges({ isChange: false });
        navigate(href, { replace: false });
    };

    const handleToggle = (_event: any, nodeIds: Array<string | number>) => {
        setCheckExpanded(nodeIds[0]);
        setExpanded([nodeIds[0]]);

        if (
            !!selectedMenu?.mainMenu &&
            nodeIds[0] !== selectedMenu.mainMenu.menu.key &&
            !!selectedMenu?.subMenu?.menu
        ) {
            setSelected([selectedMenu.mainMenu.menu.key]);
        }
        if (!!selectedMenu?.mainMenu && nodeIds[0] === selectedMenu?.mainMenu.menu.key) {
            setSelected([selectedMenu.subMenu.menu.key]);
        }
    };

    const currentPath = window.location.pathname;

    const [selectedMenu, setSelectedMenu] = useState<any>();
    const handleSelect = (_event: any, nodeIds: Array<string | number>) => {
        const selectedMainMenu = menu.find((m) => m.key === nodeIds[0]);
        const isSelectedMainMenuHasSubMenu = selectedMainMenu && selectedMainMenu.subMenu.length > 0;
        if (selectedMainMenu) {
            if (!isSelectedMainMenuHasSubMenu) {
                setSelectedMenu({ mainMenu: { menu: selectedMainMenu, isSelected: true }, subMenu: null });
                setSelected([selectedMainMenu.key]);
            }
        } else {
            for (let i = 0; i < menu.length; i++) {
                for (let x = 0; x < menu[i].subMenu.length; x++) {
                    if (menu[i].subMenu[x].key === nodeIds[0]) {
                        setSelected([menu[i].subMenu[x].key]);
                        setSelectedMenu({
                            mainMenu: { menu: menu[i], isSelected: false },
                            subMenu: { menu: menu[i].subMenu[x], isSelected: true }
                        });
                        break;
                    }
                }
            }
        }
    };

    useEffect(() => {
        const getInitialMenuState = () => {
            let subMenu;
            let mainMenu = menu.find((m) => m.href === currentPath);
            if (!mainMenu) {
                for (let i = 0; i < menu.length; i++) {
                    for (let x = 0; x < menu[i].subMenu.length; x++) {
                        if (menu[i].subMenu[x].href === currentPath) {
                            subMenu = menu[i].subMenu[x];
                            mainMenu = menu[i];
                            break;
                        }
                    }
                }
            }
            if (mainMenu) setExpanded([mainMenu.key]);
            subMenu ? setSelected([subMenu.key]) : mainMenu ? setSelected([mainMenu.key]) : setSelected([]);
            setSelectedMenu({ mainMenu, subMenu });
            setSelectedMenu({
                mainMenu: { menu: mainMenu, isSelected: subMenu ? false : true },
                subMenu: subMenu ? { menu: subMenu, isSelected: true } : null
            });
        };

        getInitialMenuState();
    }, []);

    const handleSetClassChildren = (key: string) => {
        setCheckHasClass(key);
    };

    const handleSetClassParent = (key: string) => {
        setCheckHasClass('');
        setCheckKeyParent(key);
    };

    const headerExpandedClick = () => {
        if ($('.abc').hasClass('toolBar')) {
            setExpanded([checkExpanded]);
            if (checkSelected[0]) {
                setSelected(checkSelected);
            } else if (param['*'] === 'customer-group') {
                setSelected(['customer']);
            } else if (param['*'] !== '') {
                setSelected([param['*']]);
            } else {
                setSelected(['home']);
            }
        }
        if ($('.abc').hasClass('toolBarHide')) {
            setExpanded([param['*']]);
            if (checkHasClass) {
                setSelected([checkHasClass]);
            } else if (checkSelected[0]) {
                setSelected(checkSelected);
            } else if (param['*'] === 'customer-group') {
                setSelected(['customer']);
            } else if (param['*'] !== '') {
                setSelected([param['*']]);
            } else {
                setSelected(['home']);
            }
        }
    };

    function expandSidebarHover(event: any) {
        event.stopPropagation();
        if ($('body').hasClass('mini-sidebar')) {
            if (checkSelected[0]) {
                setSelected(checkSelected);
            } else if (param['*'] === 'customer-group') {
                setSelected(['customer']);
            } else if (param['*'] !== '') {
                setSelected([param['*']]);
            } else {
                setSelected(['home']);
            }
            setExpanded([checkExpanded]);

            var sidebarTarget = $(event.target).closest('.sidebar').length;
            if (sidebarTarget) {
                $('body').addClass('expand-menu');
                // $('#miniLogo').addClass('d-none');
                $('body').addClass('overflow-hidden');
                $('.subdrop + ul').slideDown();
            }
            return false;
        }
    }

    function shrinkSidebarHover(event: any) {
        event.stopPropagation();
        if ($('body').hasClass('mini-sidebar') && $('body').hasClass('expand-menu')) {
            if (checkHasClass) {
                setSelected([checkHasClass]);
            } else if (checkKeyParent) {
                setSelected([checkKeyParent]);
            }
            setExpanded([param['*']]);
            // $('#miniLogo').removeClass('d-none');
            $('body').removeClass('expand-menu');
            $('body').removeClass('overflow-hidden');
            $('.subdrop + ul').slideUp();
            return false;
        }
    }

    const setActiveSidebar = () => {
        const paramUrl = menu.map((x) => {
            if (x.subMenu.length > 0) {
                return x.subMenu.find((m: any) => m.href === window.location.pathname);
            } else {
                if (x.href === window.location.pathname) {
                    return x;
                }
            }
        });
        const _paramUrl = paramUrl.find((x) => x);
        return _paramUrl;
    };

    const onRemoveNull = (_menus: any = []) => {
        if (!_menus || _menus.length <= 0) return [];
        let menuFilter = _menus.filter((m: any) => {
            if (!m) return false;
            else if (!m.href && m.subMenu.length <= 0) return false;
            else return true;
        });

        return compact(
            menuFilter.map((m: any) => {
                if (m && m.subMenu && m.subMenu.length > 0) {
                    return {
                        ...m,
                        subMenu: onRemoveNull(m.subMenu)
                    };
                } else {
                    return m;
                }
            })
        );
    };

    const onLoopMenu = (_menus: any = []) => {
        if (!_menus || _menus.length <= 0) return [];

        return _menus.map((m: any) => {
            if (m.href) {
                return true
                    ? m
                    : null;
            } else {
                if (m.subMenu && m.subMenu.length > 0) {
                    return {
                        ...m,
                        subMenu: onLoopMenu(m.subMenu)
                    };
                } else {
                    return m;
                }
            }
        });
    };

    const handleCheckScreenByRole = () => {
        let _menus = onLoopMenu(menu);
        _menus = onRemoveNull(_menus);
        _menus = onRemoveNull(_menus);
        setMenu(_menus);
    };

    useEffect(() => {
        if (checkSelected[0]) {
            setSelected(checkSelected);
        } else if (param['*'] === 'customer-group') {
            setSelected(['customer']);
        } else if (param['*'] !== '') {
            setSelected([param['*']]);
        } else {
            setSelected(['home']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleCheckScreenByRole();
    }, []);
    return (
        <>
            <Hidden mdDown>
                <div className="sidebar" id="sidebar">
                    <button
                        id={ELEMENT_ID.BUTTON_SIDE_BAR_HIDDEN}
                        onClick={headerExpandedClick}
                        style={{ display: 'none' }}
                    ></button>
                    <div className="sidebar-inner">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <Box
                                className="sidebar-logo"
                                onMouseEnter={(event) => expandSidebarHover(event)}
                                onMouseLeave={(event) => shrinkSidebarHover(event)}
                            >
                                <Link
                                    to={isChangeForm ? '#' : ROUTERS_PATHS.DASHBOARD}
                                    onClick={
                                        isChangeForm ? () => handleCheckFormChanges(ROUTERS_PATHS.DASHBOARD) : undefined
                                    }
                                >
                                </Link>
                            </Box>
                            <TreeView
                                onMouseEnter={(event) => expandSidebarHover(event)}
                                onMouseLeave={(event) => shrinkSidebarHover(event)}
                                aria-label="file system navigator"
                                defaultCollapseIcon={<Icons.arrowDown />}
                                defaultExpandIcon={<Icons.arrowRight />}
                                className="custom-tree-view"
                                expanded={expanded}
                                selected={selected}
                                onNodeToggle={handleToggle}
                                onNodeSelect={handleSelect}
                                multiSelect
                            >
                                <>
                                    {menu.map((m, index) => {
                                        if (m?.subMenu.length > 0) {
                                            return (
                                                <StyledTreeItem
                                                    keyLink={`${window.location.pathname}${index}`}
                                                    key={`${window.location.pathname}${index}`}
                                                    nodeId={m.key}
                                                    labelText={m.title}
                                                    labelIcon={m?.icon}
                                                >
                                                    {m?.subMenu.map((p: any, _index: number) => {
                                                        return (
                                                            <StyledTreeItem
                                                                keyLink={`${p.href}${_index}`}
                                                                key={`${p.href}${_index}`}
                                                                href={p.href}
                                                                nodeId={p.key}
                                                                labelText={p.title}
                                                                onClick={() => {
                                                                    handleSetClassChildren(m.key);
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </StyledTreeItem>
                                            );
                                        } else {
                                            return (
                                                <StyledTreeItem
                                                    keyLink={`${m.href}${index}`}
                                                    key={`${m.href}${index}`}
                                                    nodeId={m.key}
                                                    href={m.href}
                                                    labelText={m.title}
                                                    labelIcon={m?.icon}
                                                    onClick={() => {
                                                        handleSetClassParent(m.key);
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                                </>
                                {/* <DataTreeItem /> */}
                            </TreeView>
                        </div>
                    </div>
                </div>
            </Hidden>
        </>
    );
};
export default Sidebar;
