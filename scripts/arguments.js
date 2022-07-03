const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        address: 0x4e777541765ae2f2ab0363954e545a738ba7b037,
        constructorArguments: [
            "0x64ef3ae48977075d917e448b61c7b030b9c387fc",
            "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            "0x10ED43C718714eb63d5aA57B78B54704E256024E"
        ],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
