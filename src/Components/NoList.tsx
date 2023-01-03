import styled from 'styled-components';
import { useAppSelector } from './../store/store';

const MainTxt = styled.div`
  font-size: 5vw;
  font-weight: bold;
  color: #ececec;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 54px);
  @media screen and (max-width: 767px) {
    font-size: 8vw;
  }
`;

const NoList = () => {
  const getList = useAppSelector((state) => state.postSlice.getList);
  const pageMessage = useAppSelector((state) => state.postSlice.pageMessage);

  return <MainTxt>{pageMessage}</MainTxt>;
};

export default NoList;
