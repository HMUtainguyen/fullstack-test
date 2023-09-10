import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  titleProps?: string;
  hanldeSearch: (parameters?: any) => void;
  formProps?: any;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const SearchProps = (props: SearchProps) => {
  const { titleProps, hanldeSearch, formProps } = props;
  const { register } = formProps;
  return (
    <>
      <TextField
        {...register("title")}
        size="small"
        fullWidth
        placeholder={titleProps}
        InputProps={{
          startAdornment: <SearchIcon sx={{ cursor: 'pointer' }} onClick={hanldeSearch} />
        }}
      />
    </>
  );
};

export default SearchProps;
