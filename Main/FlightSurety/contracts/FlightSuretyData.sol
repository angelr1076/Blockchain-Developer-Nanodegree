// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                         // Account used to deploy contract
    bool private operational = true;                       // Blocks all state changes throughout the contract if false

    address[] private airlines;
    mapping(address => bool) private isAirline;

    uint256 private consensusCount = 0;
    mapping(address => bool) private hasCalled;

    mapping(address => uint256) private balances;
    mapping(bytes32 => address[]) private insureesByFlight;
    mapping(bytes32 => uint256[]) private amountInsured;

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor() {
        contractOwner = msg.sender;
        airlines.push(msg.sender);
        isAirline[msg.sender] = true;
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */
    function isOperational() public view returns(bool) {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */
    function setOperatingStatus(bool mode) external requireContractOwner {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */
    function registerAirline(address newAirline) external requireIsOperational {
      require(isAirline[msg.sender], "only registered airlines can register a new airline");
      if(airlines.length < 4) {
        airlines.push(newAirline);
        isAirline[newAirline] = true;
        return;
      } else {
        if(!hasCalled[msg.sender]) {
          consensusCount.add(1);
        } else {
          resetConsensus();
          airlines.push(newAirline);
          isAirline[newAirline] = true;
        }
      }
    }

    function resetConsensus() internal {
      for(uint i = 0; i < airlines.length; i++) {
        hasCalled[airlines[i]] = false;
      }
      consensusCount = 0;
    }

   /**
    * @dev Buy insurance for a flight
    *
    */
    function buy(address airline, string memory flight, uint256 timestamp) external payable requireIsOperational {
      bytes32 key = getFlightKey(airline, flight, timestamp);
      insureesByFlight[key].push(msg.sender);
      amountInsured[key].push(msg.value);
    }

    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees(address airline, string memory flight, uint256 timestamp) external requireIsOperational {
      bytes32 key = getFlightKey(airline, flight, timestamp);
      for(uint i = 0; i < insureesByFlight[key].length; i += 1)
      {
        address insuree = insureesByFlight[key][i];
        uint256 credit = amountInsured[key][i];
        amountInsured[key][i] = 0;
        balances[insuree].add(credit);
      }
    }

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay(address account) external payable requireIsOperational {
      uint256 bal = balances[account];
      require(msg.value >= bal, "The to withdraw amount exceeds the balance.");
      balances[account].sub(msg.value);
      payable(account).transfer(msg.value);
    }

   /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */
    function fund(address account) public payable requireIsOperational {
      balances[account].add(msg.value);
    }

    function getFlightKey(address airline, string memory flight, uint256 timestamp) pure internal returns(bytes32) {
      return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    fallback() external payable {
        fund(msg.sender);
    }

    /**
    * @dev Receive function for funding smart contract
    *
    */
    receive() external payable {
        fund(msg.sender);
    }

}
