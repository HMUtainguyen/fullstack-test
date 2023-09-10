import React, { useEffect, useState } from 'react';
import styles from '../../styles.module.scss';
import Grid from '@mui/material/Grid';
import LabelCustom from 'components/LabelCustom';
import TextFieldCustom from 'components/TextFieldCustom';
import { Box } from '@mui/material';
import SkeletonCustom from 'components/SkeletonCustom';
import { useForm } from 'react-hook-form';
import apiService from 'services/api-services';
import URL_PATHS from 'services/url-path';
import ButtonCustom from 'components/ButtonCustom';
import { useSetToastInformationState } from 'redux/store/ToastMessage';
import { STATUS_TOAST } from 'consts/statusCode';
import { MessageErrorsAPI, MESSAGES_SUCCESS } from 'consts/messageError';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTERS_PATHS from 'consts/router-paths';
import BreadCrumbsComponent from 'components/BreadcrumbsComponent';


const defaultValues: any = {
  id: 0,
  code: '',
  barCode: '',
  name: '',
  description: '',
  category: "",
  price: 0,
};

const BasicInformation = (props: any) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  // const { productDetail, loadingGetDetail } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const { setToastInformation } = useSetToastInformationState();
  const [loadingGetDetail, setLoadingGetDetail] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<any>(defaultValues);
  const displayDatas = [
    {
      label: 'Code',
      value: productDetail.id || ""
    },
    {
      label: 'Price',
      value: productDetail.price ? productDetail.price.toLocaleString('en') : ""
    },
    {
      label: 'Name',
      value: productDetail.name || ""
    },
    {
      label: 'Category',
      value: productDetail.category || ""
    },
    {
      label: 'Description',
      value: productDetail.description || ""
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
    getValues,
    watch
  } = useForm<any>({
    defaultValues: {
      isFeatured: false,
      productSellWith: []
    }
  });

  const onSave = async (data: any) => {
    setLoading(true);
    const submitModel = {
      isFeatured: data.isFeatured,
      isTopping: data.isTopping,
    };
    try {
      await apiService.put(URL_PATHS.CRUD_PRODUCT + '/' + productDetail.id, submitModel);
      setToastInformation({
        status: STATUS_TOAST.SUCCESS,
        message: MESSAGES_SUCCESS.UpdateProduct
      });
      const currentValues = getValues();
      reset(currentValues);
    } catch (error) {
      setToastInformation({ status: STATUS_TOAST.ERROR, message: MessageErrorsAPI.UpdateProduct });
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const handleComeBack = () => {
    navigate(ROUTERS_PATHS.PRODUCTS);
  };
  const getDetailData = async (id: string) => {
    setLoadingGetDetail(true);
    try {
      const res: any = await apiService.get(URL_PATHS.CRUD_PRODUCT + '/' + id);
      const detailResult = res?.data;
      if (detailResult) {
        const result: any = {
          ...detailResult
        };
        setProductDetail(result);
      } else {
        setProductDetail(defaultValues);
      }
    } catch (error) {
      setProductDetail(defaultValues);
      throw error;
    } finally {
      setLoadingGetDetail(false);
    }
  };

  useEffect(() => {
    if (urlParams?.id) {
      getDetailData(urlParams?.id + '');
    }
  }, []);


  return (
      <Grid container spacing={1} className={styles.basicInformationContainer}>
          <BreadCrumbsComponent title="Product" labelDisplay="Product List" labelDisplayChildren="Product detail" link="/products" />

          <Grid item lg={10} md={12} marginTop="20px">
              <Grid container spacing={3} columnSpacing={{ xs: 15 }} sx={{ marginLeft: '0 !important' }}>
                  {displayDatas.map((data) => {
                      return (
                          <Grid item xs={12} lg={6} key={data.label} sx={{ paddingLeft: '0 !important' }}>
                              {loadingGetDetail ? (
                                  <SkeletonCustom height={37.13} width="100%" />
                              ) : (
                                  <Box sx={{ display: 'flex', alignContent: 'center', paddingLeft: '20px' }}>
                                      <LabelCustom
                                          title={data.label}
                                          className="d-flex-ali-center"
                                          sx={{ marginBottom: '0px !important', minWidth: '130px' }}
                                      />
                                      <TextFieldCustom
                                          type="text"
                                          // fullWidth
                                          multiline={true}
                                          disabled
                                          inputProps={{ maxLength: 255 }}
                                          value={data.value}
                                          className={styles.textField}
                                      />
                                  </Box>
                              )}
                          </Grid>
                      );
                  })}
                  <Grid item xs={12} lg={6} sx={{ paddingLeft: '0 !important' }}>
                      {loadingGetDetail ? (
                          <SkeletonCustom height={37.13} width="100%" />
                      ) : (
                          <Box sx={{ display: 'flex', paddingLeft: '20px', alignContent: 'flex-start' }}>
                          </Box>
                      )}
                  </Grid>
                  <Grid item xs={12} lg={6} sx={{ paddingLeft: '0 !important' }}>
                  </Grid>
                  <Grid item xs={12} lg={6}></Grid>
                  <Grid item xs={12}>
                      <Box display="flex">
                          <Grid item xs={11} display="flex" justifyContent="flex-end" style={{ marginRight: 10 }}>
                              <ButtonCustom
                                  startIcon={<></>}
                                  color="yellow"
                                  onClick={handleComeBack}
                                  loading={loading}
                                  title="Back to list"
                              />
                          </Grid>
                          {!loadingGetDetail && (
                              <Grid item xs={1} display="flex" justifyContent="flex-end">
                                  <ButtonCustom
                                      startIcon={<></>}
                                      disabled={!isDirty || loading}
                                      color="yellow"
                                      onClick={handleSubmit(onSave)}
                                      loading={loading}
                                      title="Save"
                                  />
                              </Grid>
                          )}
                      </Box>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
  );
};

export default BasicInformation;
