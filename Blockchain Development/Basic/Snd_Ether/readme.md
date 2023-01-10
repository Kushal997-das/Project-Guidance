Hi Blockchain Enthusiasts, 
Ever thought about how a contract gets it balance for operating the functions of the smart contract ?

For the same, a similar code block written in solidity programming language is used when dealing with Ethereum Blockchain,

![image](https://user-images.githubusercontent.com/89985553/211272397-f031fa0d-3bbc-4978-9bdc-41bfe53c2535.png)

Let us dive a bit deeper in the code, and understand it in a better way,
The basic solidity code has the following structure 

SPDX License 

pragma solidity [ Version Specification ] 

contract [ Contract Name ]{
  //Code body 
}

SPDX License - ![image](https://user-images.githubusercontent.com/89985553/211272826-083e8542-6848-40ef-98f5-6601682176ad.png)

Version Specification - ![image](https://user-images.githubusercontent.com/89985553/211272918-ad9a336e-c9be-458c-8485-c24e891c56c9.png)

Here the 0.8.0 version of solidity is used, you try compiling the code with other versions as well. 

Code Block - ![image](https://user-images.githubusercontent.com/89985553/211273050-aef87b92-b543-42b5-9024-ea134014392d.png)


Now let us explore how the output side works after deploying this contract 

Click on the deploy button (as shown in the figure):
![image](https://user-images.githubusercontent.com/89985553/211273334-e584cc72-da41-4f6a-8034-50813009cb6c.png)

Deployed Contract :
![image](https://user-images.githubusercontent.com/89985553/211273424-49c9bae4-6d44-47ab-9ba0-bba00d54c651.png)

Select the amount of Ether you want to send to this contract :
![image](https://user-images.githubusercontent.com/89985553/211273668-8913f817-658f-4a7e-9b6f-f9d0b648a1c1.png)

Click on Transact and check the balance :
![image](https://user-images.githubusercontent.com/89985553/211274208-6b13e36f-0d5e-4264-b3de-21cf823e0e40.png)


Now click on the functions and check the balance and address of receiver :
![image](https://user-images.githubusercontent.com/89985553/211274412-ccf3f81b-a970-4d1d-87e3-232c29174e76.png)

The get balance function shows the balance in Wei unit, and 1 Wei = 10^ 18 Eth. 

Thanks for reading this, 
This was it from this code. 

Happy Coding 
