import { Tab, Tabs, styled, TabScrollButton, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(() => ({
    tabs: {
        overflow: 'visible',
        '& span.MuiTabs-indicator': {
            backgroundColor: '#614C4C '
        }
    },
    tab: {
        fontWeight: '700 !important',
        fontSize: '14px !important',
        lineHeight: '20px !important',
        color: '#9C9C9C !important',
        width: '250px !important',
        '&.Mui-selected': {
            color: '#614C4C !important',
            background: 'none !important'
        }
    }
}));

interface TabProps {
    title: string | React.ReactNode;
    key: number;
    icon?: React.ReactElement;
}

interface TabsCustomProps {
    tabs: TabProps[];
    value: number;
    isDisabled?: boolean;
    handleChangeTab: (_event: React.SyntheticEvent<Element, Event> | null, newValue: number) => void;
    containerClassName?: string;
    tabsClassName?: string;
    tabClassName?: string;
    indicatorClassName?: string;
    scrollerClassName?: string;
    scrollButton?: boolean;
}

export const StyledTabScrollButton = styled(TabScrollButton)({
    width: 'fit-content'
});

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const TabsCustom = (props: TabsCustomProps) => {
    const {
        value,
        handleChangeTab,
        tabs,
        containerClassName,
        tabsClassName,
        tabClassName,
        indicatorClassName,
        scrollerClassName,
        isDisabled,
        scrollButton = true
    } = props;
    const classes = useStyles();

    return (
        <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            className={clsx({ [containerClassName || '']: !!containerClassName })}
        >
            <Tabs
                className={clsx(classes.tabs, { [tabsClassName || '']: !!tabsClassName })}
                value={value}
                onChange={handleChangeTab}
                variant="scrollable"
                scrollButtons={scrollButton}
                ScrollButtonComponent={StyledTabScrollButton}
                aria-label="scrollable auto tabs example"
                classes={{
                    indicator: clsx({ [indicatorClassName || '']: !!indicatorClassName }),
                    scroller: clsx({ [scrollerClassName || '']: !!scrollerClassName })
                }}
            >
                {tabs.map((tab) => (
                    <Tab
                        className={clsx(classes.tab, { [tabClassName || '']: !!tabClassName })}
                        disabled={isDisabled}
                        sx={{ textTransform: 'none' }}
                        {...a11yProps(tab.key)}
                        key={tab.key}
                        label={tab.title}
                        icon={tab.icon || undefined}
                        iconPosition="end"
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default TabsCustom;
