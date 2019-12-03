//Start Etherum JavaScript Payment Processor

//Settings&Commands      
// set your Ethereum wallet address.
    var ETH_ADDRESS = '0xc36EC1be60B72aAB189dD47A90282De70FefBBD1'; 
// set ETH amount that you want to receive
    var ETH_VALUE_ART = '0.0046';
    var ETH_VALUE_AUDI = '0.0046';
    var ETH_VALUE_ADOPT = '0.0046';
    var ETH_VALUE_GAME = '0.046';
    var ETH_VALUE_SPEC = '0.77';
    var ETH_VALUE_Walk = '0.092';
    var ETH_VALUE_ADD1 = '0.00554786';
    var ETH_VALUE_ADD5 = '0.02773928';
    var ETH_VALUE_ADD10 = '0.05547856';
    var ETH_VALUE_ADD20= '0.11095712';
    var ETH_VALUE_ADD50= '0.27739281';
    var ETH_VALUE_ADD100= '0.55478562';
    var ETH_VALUE_ADDSPON= '1.00';
// set the default gas price    
    var ETH_DEFAULT_GAS_PRICE = 21000000000;
// set a message to show when Ethereum transaction is successfully sent. 
    var ETH_SUCCESS_MESSAGE = 'Thank you!'; 
// set a message to show when Ethereum transaction is failed. 
    var ETH_ERROR_MESSAGE = 'Something went wrong if insufficent funds: a Refresh(F5) is required to try again.';     
// set a message to show when MetaMask is not available.
    var ETH_WEB3_UNAVAILABLE_MESSAGE = 'MetaMask Not Found. Please Install MetaMask from OUR site by downloading Brave. If already downloaded, leave the MetaMask Window Open. If you need any assistance please do not hesitate to contact us. Thank You! -Nine-Neins Development Team!';
// set a message to show when MetaMask is Logged In.
    var ETH_LOGGED_IN = "You are now Signed In. :)"
// set a message to show when MetaMask is NOT Logged In.
    var ETH_NOT_LOGGED_IN = "Download and log into MetaMak via Brave to access all of Nine-Neins dont wry it is all still free. :)"
    var isWeb3Available = false; 

//Click Function Start

    function onEthTipButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEth5ButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            send5Ether();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEth10ButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            send10Ether();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEth20ButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            send20Ether();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEth50ButtonClick() {
       var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            send50Ether();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEth100ButtonClick() {
       var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            send100Ether();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEthSponButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendsponEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEthGameButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendgameEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEthArtButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendartEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEthAudiButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendaudiEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

    function onEthLiteButtonClick() {
        var isWeb3Available = false;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            isWeb3Available = true;
        }
        if (isWeb3Available && web3.eth.defaultAccount) {
            sendliteEther();
        } else {
            alert(ETH_WEB3_UNAVAILABLE_MESSAGE); } 
        }

//Click Function End
//Payment Function Start
  
    function sendEther() {
        var weiValue = web3.toWei(ETH_VALUE_ADD1, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function send5Ether() {
        var weiValue = web3.toWei(ETH_VALUE_ADD5, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function send10Ether() {
        var weiValue = web3.toWei(ETH_VALUE_ADD10, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function send20Ether() {
        var weiValue = web3.toWei(ETH_VALUE_ADD20, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function send50Ether() {
        var weiValue = web3.toWei(ETH_VALUE_ADD50, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function send100Ether() {
        var weiValue = web3.toWei(ETH_VALUE_ADD100, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };

        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function sendsponEther() {
        var weiValue = web3.toWei(ETH_VALUE_ADDSPON, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function sendgameEther() {
        var weiValue = web3.toWei(ETH_VALUE_GAME, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function sendartEther() {
        var weiValue = web3.toWei(ETH_VALUE_ART, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function sendaudiEther() {
        var weiValue = web3.toWei(ETH_VALUE_AUDI, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE);
        }
        });
        }

    function sendliteEther() {
        var weiValue = web3.toWei(ETH_VALUE_GAME, 'ether');
        var transactionObj = {
            to: ETH_ADDRESS,
            value: weiValue,
            gasPrice: ETH_DEFAULT_GAS_PRICE };
            
        web3.eth.sendTransaction(transactionObj, function(error, txHash) {
        if (error) {
            alert(ETH_ERROR_MESSAGE);
        } else {
            alert(ETH_SUCCESS_MESSAGE); }
        });
        }

//Payment Function End
