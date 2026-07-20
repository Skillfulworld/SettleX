import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

// Note: DynamicContext requires wrapper component in layout. 
// This file initializes the configuration object.

export const dynamicConfig = {
  environmentId: 'PLACEHOLDER_DYNAMIC_ENVIRONMENT_ID',
  walletConnectors: [EthereumWalletConnectors],
  settings: { initialAuthenticationMode: 'connect-only' },
};
