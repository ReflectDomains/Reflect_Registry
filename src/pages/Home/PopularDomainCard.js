import { Box, Stack, Typography, styled } from "@mui/material";
import { memo } from "react";
import CommonAvatar from "../../components/CommonAvatar";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  background: "#fff",
  borderRadius: theme.spacing(2),
}));

const ProfileBackground = styled(Box)(({ theme, ...props }) => ({
  position: "relative",
  width: "170px",
  height: "60px",
  background: `url(${props.avatar})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: theme.spacing(1, 1, 0, 0),
  backgroundSize: "cover",
}));

const DomainName = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 600,
}));

const RewardCup = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  right: 10,
  fontSize: "36px",
  lineHeight: "36px",
}));

const PopularDomainCard = ({ name, avatar, cup }) => {
  return (
    <Wrapper>
      <ProfileBackground avatar={avatar}>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            borderRadius: theme.spacing(1, 1, 0, 0),
          })}
        />
        <RewardCup>{cup}</RewardCup>
      </ProfileBackground>
      <Stack
        direction="column"
        alignItems="center"
        sx={{ transform: "translateY(-25px)" }}
      >
        <CommonAvatar avatar={avatar} scope={50} />
        <DomainName>{name}</DomainName>
      </Stack>
    </Wrapper>
  );
};

export default memo(PopularDomainCard);
