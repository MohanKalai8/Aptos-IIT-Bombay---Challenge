import Container from 'react-bootstrap/Container';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar';
import './stylesheets/homepage.css';
import { Alert, Button, Col, Descriptions, Input, Layout, Row, Spin, Typography } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import React, { useEffect, useState } from "react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AptosClient, Network, Provider } from "aptos";

export const NETWORK = "testnet";
export const NODE_URL = `https://fullnode.testnet.aptoslabs.com`;
export const client = new AptosClient(NODE_URL);


export const provider = new Provider(Network.DEVNET);
export const moduleAddress = '0x83cafb3afd09f1878e80ff6a154b0eecbc20b9268b67b50a2ee8f08f516c6a8a';
export const hostAddress = '0x83cafb3afd09f1878e80ff6a154b0eecbc20b9268b67b50a2ee8f08f516c6a8a';



function App() {

    const [data, setData] = useState(0);
    const [universalCount, setUniversalCount] = useState(-2);
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const {
      network,
      wallet,
      account,
      connected,
      disconnect, signAndSubmitTransaction
    } = useWallet();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!updating) { setLoading(true); await fetch(); } // Initial fetch
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  

      const intervalId = setInterval(() => {
        fetchData();
      }, 10000);
  

      return () => clearInterval(intervalId);
    }, [account?.address]);
  
    const fetch = async () => {
      if (!account) return;
      try {
  
        const countResource = await provider.getAccountResource(
          account.address,
          `${moduleAddress}::ClickApt::GlobalCount`,
        );
  
  
        const globalResource = await provider.getAccountResource(
          hostAddress,
          `${moduleAddress}::ClickApt::GlobalCount`,
        );
  
        var data = JSON.parse(countResource.data.count);
        setData(data);
  
        data = JSON.parse(globalResource.data.foo);
        setUniversalCount(data);
  
      }
      catch (error) {
        console.log(error);;
      }
    }
  
  

  
    const incrementButton = async () => {
  
      setTransactionInProgress(true);
      setUpdating(true);
  
      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${moduleAddress}::ClickApt::increment`,
          typeArguments: [],
          functionArguments: [hostAddress],
        },
      });
  
      try {
        await client.waitForTransaction({ transactionHash: response.hash });
        setLoading(true);
        try {
          await fetch(); // Initial fetch
        } catch (error) {
          console.error(error);
        } finally {
          setUpdating(false);
        }
  
      } catch (error) {
        console.error(error);
      }
      finally {
        setTransactionInProgress(false);
        setUpdating(false);
      }
    };
  
    return (
      <div style={{ height: "100%", width: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column',padding:'7vh' }}  >
  
        <Layout style={{ maxHeight: "20vh", backgroundColor: 'transparent' }}>
          <Row align="middle">
            <Col flex={"auto"}>
              <h1>Counter Game</h1>
            </Col>
            <Col flex={12} style={{ textAlign: "right", paddingRight: "200px",color:"black" }}>
              <WalletSelector />
            </Col>
          </Row>
        </Layout>
        {!connected && <Alert style={{ width: "50%", justifyContent: 'center', alignSelf: "center", marginTop: "30vh", backgroundColor: 'transparent', border: 'solid 2px black', color: 'black' }} message={`Please connect your wallet`} type="info" />}
        {connected && (network?.name.toString()).toLowerCase() !== NETWORK && (
          <Alert
            message={`Wallet is connected to ${network?.name}. Please connect to ${NETWORK}`}
            type="warning"
  
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column',alignItems:'center', width: '100%', height: "50vh" }}>
  
          <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', width: '100%', alignItems: 'center' }}>
            <div style={{ width: "49%", marginLeft: '1vw', marginTop: '1vh', height: "100%", color: 'white', paddingTop: loading || updating ? "4vh" : '10vh', border: 'transparent', borderRadius: "10px" }}>
              <div style={{ margin: '1vh', width: "95%", height: "100%" }}>
                {connected && !(loading) && (network?.name.toString()).toLowerCase() === NETWORK && (
                  <Spin spinning={transactionInProgress}>
                    <h3 style={{marginBottom: '3vh'}}>Your Counter Game Stats:</h3>
                    <h3>Your Clicks: {data}</h3>
                  </Spin>
                )}
                {connected && (loading) && (network?.name.toString()).toLowerCase() === NETWORK && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: 'black' }}>Refreshing...</p>
                    <div className="loader"></div>
                  </div>
  
                )}
  
                {connected && (updating) && !transactionInProgress && (network?.name.toString()).toLowerCase() === NETWORK && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: 'black' }}>Updating data...</p>
                    <div className="loader"></div>
                  </div>
                )}
  
              </div>
  
  
  
  
            </div>
  
            <div style={{ width: "50%", height: "100%", }}>
  
              {connected && (network?.name.toString()).toLowerCase() === NETWORK && (
                <div>
                  <h3 style={{ fontWeight: '700', marginTop: '7vh', marginBottom: '-7vh' }}>Click Me to Increment!</h3>
  
                  <Button
                    disabled={!account || transactionInProgress}
                    onClick={incrementButton}
                    style={{
                      width: '20vw',
                      height: '5vw',
                      borderRadius: "20px",
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: '10vh',
                      color: 'black',
                      background: 'lightblue',
                      fontSize: '18px',
  
                    }}
                  >
                    Increment
                  </Button>
  
  
                </div>
              )}
            </div>
          </div>
  
        </div>
      </div>
    );
  
  
  
  };
  

export default App;
