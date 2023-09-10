//@ts-check

import { default as classNames, default as clsx } from 'classnames';
import ROUTERS_PATHS from 'consts/router-paths';
import Icons from 'consts/SvgIcon';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Grid, styled, SwipeableDrawer, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './styles.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { TreeItem, treeItemClasses, TreeItemProps, TreeView } from '@mui/lab';
import { MESSAGES_CONFIRM } from 'consts/messageConfirm';
import { useSelector } from 'react-redux';
import { useSetConfirmModalState } from 'redux/store/confirmModal/confirmModalSlice';
import { useSetCheckingChangesState } from 'redux/store/checkingChanges';

const useStyles = makeStyles(() => ({
    muiBottomNavigationRoot: {
        backgroundColor: '#2E2E2E',
        marginTop: 0,
        marginBottom: 0,
        '& .MuiButtonBase-root': {
            color: 'inherit',
            border: '0',
            cursor: 'pointer',
            margin: '0',
            display: 'inline-flex',
            outline: '0',
            padding: '0',
            position: 'relative',
            alignItems: 'center',
            userSelect: 'none',
            borderRadius: '0',
            verticalAlign: 'middle',
            MozAppearance: 'none',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            WebkitAppearance: 'none',
            WebkitTapHighlightColor: 'transparent'
        },
        '& .MuiBottomNavigationAction-root': {
            width: '100%',
            height: 46,
            color: 'rgba(0, 0, 0, 0.54)',
            transition:
                'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,padding-top 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        '& .MuiBottomNavigationAction-root.Mui-before-selected': {
            backgroundColor: '#BF1E2E'
        },
        '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: '#3f51b5',
            backgroundColor: '#BF1E2E',
            // borderTopRightRadius: '2.1875rem',
            // borderBottomRightRadius: '2.1875rem'
            borderRadius: '2.1875rem'
        },
        '& .MuiBottomNavigationAction-wrapper': {
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    }
}));

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
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)'
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit'
        }
    }
}));

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon?: any;
    labelInfo?: any;
    labelText: string;
    keyLink: string | number;
    href?: any;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, keyLink, href, ...other } = props;
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
            <StyledTreeItemRoot
                label={
                    <Link
                        key={`Link${keyLink}`}
                        to={isChangeForm ? '#' : href}
                        onClick={isChangeForm ? () => handleCheckFormChanges(href) : undefined}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                            <Typography variant="body2" className="labelText-sideBar" sx={{ flexGrow: 1 }}>
                                {labelText}
                            </Typography>
                            <Box component={labelInfo} color="inherit" sx={{ mr: 1 }} />
                        </Box>
                    </Link>
                }
                style={{
                    '--tree-view-color': '#FFFFFF',
                    '--tree-view-bg-color': '#BF1E2E'
                }}
                {...other}
            />
        );
    } else {
        return (
            <StyledTreeItemRoot
                label={
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
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

const NavMobile = () => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [expanded, setExpanded] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    type Anchor = 'top' | 'left' | 'bottom' | 'right';

    const [state, setState] = useState({
        right: false
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const [menus, setMenu] = useState<any[]>([
        {
            key: 'home',
            title: 'Home Page ',
            href: ROUTERS_PATHS.DASHBOARD,
            icon: Icons.home,
            subMenu: []
        },
        {
            key: 'reportManagement',
            title: 'Revenue',
            href: ROUTERS_PATHS.REPORT_SALES_LIST,
            icon: Icons.home,
            subMenu: []
        },
        {
            key: 'orderManagement',
            title: 'Order',
            icon: Icons.Order,
            href: ROUTERS_PATHS.LIST_OF_ORDER,
            subMenu: []
        },
        {
            key: 'customer',
            icon: Icons.customer,
            href: '/customer',
            subMenu: []
        },
        {
            key: 'news',
            icon: Icons.news,
            href: ROUTERS_PATHS.NEW,
            subMenu: []
        },
        {
            key: 'storeManagement',
            title: 'Store',
            icon: Icons.store,
            subMenu: []
        }
    ]);

    const handleToggle = (_event: any, nodeIds: Array<string | number>) => {
        setExpanded(nodeIds);
    };
    const handleSelect = (_event: any, nodeIds: Array<string | number>) => {
        setSelected(nodeIds);
    };

    const indexActive = useMemo(() => {
        if (pathname === ROUTERS_PATHS.DASHBOARD) return 0;
        return menus.findIndex((m) => {
            setLoading(true);
            const isRouteMatch = m.href === pathname;
            if (isRouteMatch) return true;
            if (m.routeGroupPath && pathname.includes(m.routeGroupPath)) return true;
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, loading]);

    useEffect(() => {
        setLoading(false);
    }, [loading, pathname]);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classNames(
                classes.muiBottomNavigationRoot,
                styles.navMobile,
                styles.sideBarContainer,
                styles.sideBarMobile,
                'sidebar'
            )}
        >
            {menus.map((m, i) => (
                <Grid key={i} item xs={2}>
                    <Link
                        to={m.href}
                        className={clsx('MuiButtonBase-root MuiBottomNavigationAction-root', {
                            'Mui-before-selected': indexActive === i,
                            'Mui-selected': indexActive === i
                        })}
                    >
                        <span className="MuiBottomNavigationAction-wrapper">
                            {indexActive === i ? (
                                <Box component={m.icon} color="inherit" />
                            ) : (
                                <Box component={m.icon} color="inherit" />
                            )}
                        </span>
                    </Link>
                </Grid>
            ))}
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={toggleDrawer('right', true)}>
                    <MenuIcon />
                </Button>
            </Grid>
        </Grid>
    );
};

export default NavMobile;
