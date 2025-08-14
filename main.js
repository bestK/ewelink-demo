import * as dotenv from "dotenv";

import eWeLink from "ewelink-api-next";

dotenv.config()
console.log(process.env)


const client = new eWeLink.WebAPI({
    appId: process.env.EWELINK_APP_ID,
    appSecret: process.env.EWELINK_APP_SECRET,
    region: "cn",
    logObj: eWeLink.createLogger("cn") // or console
});

async function main() {
    try {
        const response = await client.user.login({ account: process.env.EWELINK_PHONE, password: process.env.EWELINK_PASSWORD, areaCode: "+86" });
        console.log(response)
        const userInfo = response.error === 0 ? response.data.user : {};
        console.log("userInfo：", userInfo);
        const things = await client.device.getAllThings()
        console.log(JSON.stringify(things))
    } catch (err) {
        console.log("Failed to get user information:", err.message);
    }
}

main();