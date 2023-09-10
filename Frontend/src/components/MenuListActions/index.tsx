import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { MenuItem, MenuList, Typography } from '@mui/material';
import { STATUS_VALUE } from 'consts/statusCode';

interface MenuListActionsProps {
    actionEdit?: (param: any) => void | undefined;
    actionView?: (param: any) => void | undefined;
    actionDelete?: (param: any) => void | undefined;
    actionActive?: (param: any) => void | undefined;
    actionHandle?: (param: any) => void | undefined;
    actionChangePassword?: (param: any) => void | undefined;
    dataSelected?: any;
}

const MenuListActions = (props: MenuListActionsProps) => {
    const {
        actionView,
        actionEdit,
        actionDelete,
        actionActive,
        dataSelected,
        actionHandle,
        actionChangePassword
    } = props;


    const listOptions = [
        {
            icon: <VisibilityIcon className="icon-view" />,
            label: 'View',
            action: actionView
        },
        {
            icon: <VisibilityIcon className="icon-view" />,
            label: dataSelected?.status === 'Processed' ? 'Xem' : 'Xử lý',
            action: actionHandle
        },
        {
            icon: <EditIcon className="icon-edit" />,
            label: 'Edit',
            action: actionEdit
        },
        {
            icon: <DeleteForeverIcon className="icon-delete" />,
            label: 'Delete',
            action: actionDelete
        },
        {
            icon: <VpnKeyIcon className="icon-view" />,
            label: 'ChangePassword',
            action: actionChangePassword
        },
        {
            icon: dataSelected?.status === STATUS_VALUE.ACTIVE ? <LockIcon /> : <LockOpenIcon />,
            label: dataSelected?.status === STATUS_VALUE.ACTIVE ? 'DeActive' : 'Active',
            action: actionActive
        }
    ];

    return (
        <MenuList>
            {listOptions.map((option, xIndex) => {
                // eslint-disable-next-line array-callback-return
                if (!option.action) return;
                return (
                    <MenuItem onClick={option.action} key={xIndex}>
                        {option.icon}
                        <Typography marginLeft={2} variant="inherit">
                            {option.label}
                        </Typography>
                    </MenuItem>
                );
            })}
        </MenuList>
    );
};

export default MenuListActions;
