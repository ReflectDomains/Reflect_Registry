import { Avatar, styled } from "@mui/material";
import Blockies from "react-blockies";

const BlockiesAvatar = styled(Blockies)(({ sx, ...props }) => ({
  width: `${props.scope}px !important`,
  height: `${props.scope}px !important`,
  borderRadius: "50px",
  ...sx,
}));

const CommonAvatar = ({ ...props }) => {
  const { address, scope, sx, avatar } = props;

  return avatar ? (
    <Avatar
      src={avatar}
      sx={{
        width: `${scope}px`,
        height: `${scope}px`,
        borderRadius: "50px",
        ...sx,
      }}
    />
  ) : (
    <BlockiesAvatar
      seed={props?.address ? props.address : address}
      sx={sx}
      scope={scope}
    />
  );
};

export default CommonAvatar;
