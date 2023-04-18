import { Stack } from "@mui/material";
import { memo } from "react";
import { LogoIcon } from "../../assets/index";
import WalletMenu from "../WalletMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        height: "70px",
        padding: theme.spacing(0, 4),
      })}
    >
      <Link to="/">
        <LogoIcon
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        />
      </Link>
      <WalletMenu />
    </Stack>
  );
};

export default memo(Header);
