import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Grid,
    Paper,
    Popover,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import clsx from 'clsx';
import BreadCrumbsComponent from 'components/BreadcrumbsComponent';
import { ButtonIconCustom } from 'components/ButtonIconCustom';
import LabelCustom from 'components/LabelCustom';
import LoadingTableRow from 'components/LoadingTableRow';
import MenuListActions from 'components/MenuListActions';
import NoDataTableRow from 'components/NoDataTableRow';
import SearchPopover from 'components/SearchPopover';
import SearchResult from 'components/SearchResult';
import TextFieldCustom from 'components/TextFieldCustom';
import COLORS from 'consts/colors';
import DISPLAY_TEXTS from 'consts/display-texts';
import ROUTERS_PATHS from 'consts/router-paths';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetLoadingScreenState } from 'redux/store/loadingScreen';
import { useSetToastInformationState } from 'redux/store/ToastMessage';
import apiService from 'services/api-services';
import URL_PATHS from 'services/url-path';
import { labelDisplayedRows, rowsPerPageOptions } from 'utils';
import { Order } from 'utils/sortTable';
import DisplayRow from './components/DisplayRow';
import { FormInputTypes, ParamsType, RowDataProps } from './propTypes';

const headers = [
    {
        title: 'Code',
        sort: 'id',
        key: 3,
        style: { minWidth: '50px' }

    },
    {
        title: 'Name',
        sort: 'name',
        key: 4,
        style: { minWidth: '150px'}
    },

    {
        title: 'Decription',
        // sort: 'name',
        key: 4,
        style: { minWidth: '450px' }
    },
    {
        title: 'Category',
        sort: 'category',
        key: 4,
        style: { minWidth: '50px' , maxWidth:"100px"  }
    },
    {
        title: 'Price',
        sort: 'price',
        key: 10,
        style: { minWidth: '50px' , maxWidth:"100px"  }

        // alignRight: true,
        // style: { textAlign: 'right' as const }
    },
    {
        title: 'action',
        sort: '',
        key: 11,
        style: { textAlign: 'right' as const }
    }
];



const ProductTypes = (props: any) => {
    const tableContainerRef = useRef(null);
    const [products, setProducts] = useState<Array<RowDataProps>>([]);
    const [loadingTable, setLoadingTable] = useState<Boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [filterContext, setFilterContext] = useState<FormInputTypes>({
        name: null,
        category: null,
        // productType: null,
        // code: ''
    });
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('id');
    const navigate = useNavigate();
    const { setLoadingScreen } = useSetLoadingScreenState();
    const { setToastInformation } = useSetToastInformationState();

    const [selectedItem, setSelectedItem] = useState<RowDataProps | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [checkSearch, setCheckSearch] = useState<boolean>(false);
    // const navigate = useNavigate();

    //--- Menu actions
    const open = Boolean(anchorEl);
    const menuId = open ? 'simple-popover' : undefined;

    const handleOpenMenuAction = (event: React.MouseEvent<HTMLButtonElement>, record: RowDataProps) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedItem(record);
    };

    const handleCloseActionMenu = () => {
        setAnchorEl(null);
    };

    const { control, handleSubmit, reset} = useForm<FormInputTypes>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: null,
            category:null,
        }
    });

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        getData({
            pageIndex: newPage
        });
    };

    const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        getData({
            pageIndex: 0,
            pageSize: parseInt(event.target.value)
        });
    };

    const getData = async (context?: ParamsType) => {
        console.log("context",context)
        setLoadingTable(true);
        const pageSize = !!context && context.hasOwnProperty('pageSize') ? context.pageSize || 0 : rowsPerPage;
        const pageIndex = !!context && context.hasOwnProperty('pageIndex') ? context.pageIndex || 0 : page;
        const name = !!context && context.hasOwnProperty('name') ? context.name : filterContext.name;
        const category = !!context && context.hasOwnProperty('category') ? context.category : filterContext.category;
    
        const sortBy = context?.sortBy || orderBy;
        const sortOrder = context?.sortDirection || order;
        const filters = {
        };
        const params = {
            name: name,
            category:category,
            limit:pageSize,
            offset:pageIndex*pageSize,
            sort:sortBy,
            sortOrder:sortOrder.toUpperCase()
        };
        try {
            const res: any = await apiService.getFilter(URL_PATHS.CRUD_PRODUCT, params, filters);
            const resultItems: any[] = res?.data;

            if (resultItems.length >= 0) {
                const items: RowDataProps[] = resultItems.map((item) => {
                    const result: RowDataProps = {
                        ...item,
                        id: item?.id || '',
                        name: item?.name || '',
                        description: item?.description || '',
                        category: item?.category || '',
                        price: item?.price || '',
                    };
                    return result;
                });
                
                setProducts(items);
                setTotalCount(res?.meta?.count || 0);
            } else {
                setProducts([]);
                setTotalCount(0);
            }
        } catch (error) {
        } finally {
            setFilterContext({
                name: name || null,
                category: category || null,
            });
            setTimeout(() => {
                setLoadingTable(false);
            }, 500);
            setOrder(sortOrder);
            setOrderBy(sortBy);
            setPage(pageIndex);
            setRowsPerPage(pageSize);
        }
    };

    const onFilter = (data: FormInputTypes) => {
        getData({
            name: data.name,
            category: data?.category,
            sortBy: 'id',
            sortDirection: 'desc',
            pageIndex: 0
        });
        setCheckSearch(true);
    };

    const gotoProductDetail = () => {
        if (selectedItem) {
            navigate(ROUTERS_PATHS.PRODUCT_DETAIL.replace(':id', selectedItem.id + ''));
        }
    };

    const createSortHandler = (property: keyof RowDataProps | string) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RowDataProps | string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        getData({ sortBy: property, sortDirection: isAsc ? 'desc' : 'asc' });
    };

    const handleSearch = (handleCloseSearch?: () => void) => {
        handleSubmit(onFilter)();
        handleCloseSearch && handleCloseSearch();
    };


    const handleRefresh = () => {
        reset();
        getData({
            pageIndex: 0,
            pageSize: rowsPerPage,
            sortBy: 'id',
            sortDirection: 'desc',
            name: null,
            category: null,
        });
    };

    const searchResults = useMemo(() => {
        let results = [
            {
                label: 'Product Name',
                value: filterContext.name || ''
            },
            {
                label: 'Category ',
                value: filterContext.category || ''
            },
        ];
        return results;
    }, [filterContext]);

    const isShowResult = searchResults.some((result) => !!result.value);

    useEffect(() => {
        getData({ pageIndex: page, pageSize: rowsPerPage });
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={2}>
            <BreadCrumbsComponent title="Product" labelDisplay="Product List" link="#" />
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={10}>
                        <Box display="flex" flexDirection="column">
                            <Box display="flex">
                                <SearchPopover onFilter={handleSearch} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <LabelCustom title="Product name" />
                                            <Controller
                                                control={control}
                                                name="name"
                                                render={({ field: { onChange, value } }) => (
                                                    <TextFieldCustom
                                                        onChange={onChange}
                                                        onBlur={(e) => onChange(e.target.value.trim())}
                                                        value={value}
                                                        placeholder="Enter product name"
                                                        InputProps={{
                                                            startAdornment: <SearchIcon sx={{ marginRight: '5px' }} />
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <LabelCustom title="Category" />
                                            <Controller
                                                control={control}
                                                name="category"
                                                render={({ field: { onChange, value } }) => (
                                                    <TextFieldCustom
                                                        onChange={onChange}
                                                        onBlur={(e) => onChange(e.target.value.trim())}
                                                        value={value}
                                                        placeholder="Enter Category"
                                                        InputProps={{
                                                            startAdornment: <SearchIcon sx={{ marginRight: '5px' }} />
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </SearchPopover>

                                <ButtonIconCustom
                                    className="mg-l-10"
                                    tooltipTitle="refresh"
                                    type="refresh"
                                    color="lightgreen"
                                    onClick={handleRefresh}
                                />
                            </Box>
                            <SearchResult results={searchResults} />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="flex-end" alignItems="flex-end" height="100%">
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box position="relative">
                    <TableContainer
                        component={Paper}
                        sx={{ maxHeight: window.innerHeight - (isShowResult ? 280 : 220) }}
                        ref={tableContainerRef}
                        className="table-scroll-bar"
                    >
                        <Table stickyHeader>
                            <TableHead sx={{ display: 'table-header-group' }}>
                                <TableRow>
                                    {headers.map((header) => {
                                        if (header.title === 'outstanding') {
                                            return (
                                                <>
                                                    <TableCell
                                                        key={header.key}
                                                        className="background-table-header"
                                                        sx={{
                                                            left: '0px !important'
                                                        }}
                                                    >
                                                        <Rating name="read-only" defaultValue={1} max={1} readOnly />
                                                    </TableCell>
                                                    <TableCell
                                                        key={header.key}
                                                        className="background-table-header"
                                                        sx={{
                                                            left: '56px !important',
                                                            borderLeft: `1px solid ${COLORS.TABLE_HEADER_BACKGROUND}`
                                                        }}
                                                    >
                                                        <Box width="24px"></Box>
                                                    </TableCell>
                                                </>
                                            );
                                        }
                                        return (
                                            <TableCell
                                                key={header.key}
                                                style={header?.style}
                                                sx={{
                                                    minWidth: header.title === 'action' ? '100px' : '200px'
                                                }}
                                                className={clsx(
                                                    'background-table-header'
                                                )}
                                                sortDirection={orderBy === header.sort ? order : false}
                                            >
                                                {header.sort ? (
                                                    <TableSortLabel
                                                        active={orderBy === header.sort}
                                                        direction={orderBy === header.sort ? order : 'asc'}
                                                        onClick={createSortHandler(header.sort)}
                                                    >
                                                        {header.title}
                                                        {orderBy === header.sort ? (
                                                            <Box component="span" sx={visuallyHidden}>
                                                                {order === 'desc'
                                                                    ? 'sorted descending'
                                                                    : 'sorted ascending'}
                                                            </Box>
                                                        ) : null}
                                                    </TableSortLabel>
                                                ) : header.title === 'action' ? (
                                                    ''
                                                ) : (
                                                    header.title
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingTable ? (
                                    <LoadingTableRow
                                        colSpan={headers.length + 1}
                                        tableContainerRef={tableContainerRef}
                                    />
                                ) : products.length ? (
                                    <>
                                        {products.map((data) => {
                                            return (
                                                <DisplayRow
                                                    isProduct={true}
                                                    data={data}
                                                    handleOpenMenuAction={handleOpenMenuAction}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <NoDataTableRow
                                        colSpan={headers.length + 1}
                                        tableContainerRef={tableContainerRef}
                                        displayText={checkSearch ? 'No product found.' : ''}
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {!loadingTable && totalCount > 0 && (
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        labelRowsPerPage={DISPLAY_TEXTS.rowsPerPage}
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={labelDisplayedRows}
                    />
                )}
            </Grid>
            {open && (
                <Popover
                    id={menuId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseActionMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                >
                    <MenuListActions actionView={gotoProductDetail} />
                </Popover>
            )}
        </Grid>
    );
};

export default ProductTypes;
