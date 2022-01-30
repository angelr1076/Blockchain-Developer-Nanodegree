pragma solidity >=0.4.22 <0.8.0;

contract StringsContract {
    string stringStorage = "udacity";

    function stringSearch (string _name, uint index) public view returns (uint _length, byte _letter) {
        // Convert string _name to byte
        bytes memory temp = bytes(_name);
        // Get length of converted temp
        _length = temp.length;
        // Convert 
        temp = bytes(stringStorage);
        // Return the character of the string at the index value, in bytes
        _letter = temp[index];
    }
}

// Below is a sample code of how we approached this exercise
contract stringsContract {
// Retrieves the element at specified index
//  Cannot do with strings, hence converting to bytes

  function  getElementAt(string name, uint index) public pure returns(byte) {

    // Convert string to bytes
    bytes  memory bytesData = bytes(name);  
    // Get the element at the specified index
    return bytesData[index]; 
    }
}