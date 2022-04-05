import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/owls.png";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 90px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--white);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--black);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 660px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 450px;
  height: 253px;
  @media (min-width: 660px) {
    width: 660px;
    height: 371px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledLogo = styled.img`
  width: 300px;
  height: 213px;
  @media (min-width: 213px) {
    width: 300px;
    height: 213px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Ready to mint.");
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  
  const claimNFTs1 = () => {
    let cost = 80000000000000000;
    let gasLimit = 100000; //0.0004275
    let totalCostWei = String(cost * mintAmount);
    //let totalGasLimit = String(gasLimit * mintAmount);

    setFeedback("Minting your Wise Owl...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(gasLimit),
        to: "0x8fA7caEA64C9dDB16676767E9ab9Dc28c52A4Ea3",
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Wise Owl. Go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const claimNFTs2 = () => {
    let cost = 100000000000000000;
    let gasLimit = 100000; //0.0004275
    let totalCostWei = String(cost * mintAmount);
    //let totalGasLimit = String(gasLimit * mintAmount);

    setFeedback("Minting your Wise Owl...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(gasLimit),
        to: "0x8fA7caEA64C9dDB16676767E9ab9Dc28c52A4Ea3",
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Wise Owl. Go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const useData = React.useRef();

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  //const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  
  var dateMain = new Date(Date.parse("Mar 03 2022 13:00:00 -0800"));
  //var dateMain = new Date(Date.parse("Mar 02 2022 19:25:00 -0800"));
  //var datePre = new Date(Date.parse("Mar 03 2022 13:00:00 -0800"));
  var dateNow = new Date();
  
  useData.current = getData;
  
  useEffect(() => {
    return useData.current();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <a
                    target={"_self"}
                    href={"https://wiseowlclub.io/"}
                    rel="noreferrer"
                  >

            <StyledImg alt={"example"} src={i1} />
            </a>
            <s.SpacerMedium />
            {Number(data.totalSupply) < 0 ? (
              <>
            <s.TextTitle
              style={{ textAlign: "right", fontSize: 35, fontWeight: "bold" }}
            >
              {data.totalSupply} MINTED OF 3500
            </s.TextTitle>
            </>
            ) : null}
          </s.Container>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "--white", padding: 24 }}
          >
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 1, fontWeight: "bold" }}
        >
        </s.TextTitle>
            {Number(data.totalSupply) === 3500 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find Wise Owls for sale on {" "}
                  <a
                    target={"_blank"}
                    href={"https://www.opensea.io/"}
                    rel="noreferrer"
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "left" , fontSize: 45}}>
                Mint Wise Owl NFTs
                </s.TextTitle>
                <s.SpacerXSmall />
                {dateNow < dateMain ? (
                <>
                <s.TextDescription style={{ textAlign: "left" , fontSize: 24}}>
                0.08 Eth Presale March 3rd 10AM to 1PM PST
                </s.TextDescription>
                </>
                ) : (
                  <>
                  <s.TextDescription style={{ textAlign: "left" , fontSize: 24}}>
                  0.1 Eth Main Sale
                  </s.TextDescription>
                  </>  
                )}
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the Ethereum network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    > 
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    {dateNow < dateMain ? (
                    <>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs1(mintAmount);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "PRESALE"}
                    </StyledButton>
                    </>
                    ) : (
                      <>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs2(mintAmount);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY"}
                    </StyledButton>
                      </>  
                    )}
                    <s.SpacerSmall />
                    <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--white)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
          <s.SpacerSmall />
        </ResponsiveWrapper>
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 18 }}>
            If you have any questions the please ask in our support channel of our {" "}
                  <a
                    target={"_blank"}
                    href={"https://discord.gg/wiseowlclub"}
                    rel="noreferrer"
                  >
                    Discord
                  </a>
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
