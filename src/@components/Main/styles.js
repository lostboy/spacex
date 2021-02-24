import styled from "styled-components";

export const StyledMain = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  header {
    position: fixed;
    width: 100%;
    z-index: 100;

    background-color: ${({ theme }) => theme.palette.background.default};
  }

  main {
    padding-top: 120px;
  }
`;
