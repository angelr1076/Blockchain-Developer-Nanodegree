# Decentralized Storage

## IPFS

Content Based Addressing vs Location Based Addressing (HTTP)

[Install IPFS](https://docs.ipfs.io/install/)

See instructions on installing on MacOS and Windows as admin
[Github link](https://github.com/ipfs/go-ipfs)

[IPFS Commands](ipfs.io/docs/commands)

[IPFS Web UI](localhost:5001/webui)

Commands
To get started, open your terminal, create a directory, and navigate into this directory.

Create text file

echo "Hello IPFS" > hello-ipfs.txt
See File Contents

cat hello-ipfs.txt
Add File to IPFS

ipfs add hello-ipfs.txt
Read File From IPFS

ipfs cat <hash value>
Update Text File

echo “Hello ipfs. Here is more text” > hello-ipfs.txt
Read Text From File

cat hello-ipfs.txt
Add Updated File to IPFS

ipfs add hello-ipfs.txt
View File in IPFS Gateway

https://gateway.ipfs.io/ipfs/<hash-value>
Open Text File Locally

ipfs open hello-ipfs.txt
Add Final Version of Text File to IPFS

ipfs add hello-ipfs.txt
See Final Version of Text File in IPFS Gateway

https://gateway.ipfs.io/ipfs/<hash-value>