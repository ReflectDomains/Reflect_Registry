import { Box, Container, styled } from "@mui/material";
import { Suspense, memo } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import BackgroundImage from "../../assets/images/background.png";

const Wrapper = styled(Box)(() => ({
  width: "100vw",
  minHeight: "100vh",
  height: "100%",
  background: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={"loading"}>
        <Container
          maxWidth="md"
          disableGutters={true}
          sx={{ padding: "0", margin: "0 auto" }}
        >
          <Outlet />
        </Container>
      </Suspense>
    </Wrapper>
  );
};

export default memo(Layout);
