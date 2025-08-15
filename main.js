import * as dotenv from "dotenv";

import eWeLink from "ewelink-api-next";

dotenv.config();

const client = new eWeLink.WebAPI({
  appId: process.env.EWELINK_APP_ID,
  appSecret: process.env.EWELINK_APP_SECRET,
  region: "cn",
  logObj: eWeLink.createLogger("cn"), // or console
});

async function main() {
  try {
    const response = await client.user.login({
      account: process.env.EWELINK_PHONE,
      password: process.env.EWELINK_PASSWORD,
      areaCode: "+86",
    });
    console.log(response);
    // const userInfo = response.error === 0 ? response.data.user : {};
    // console.log("userInfo：", userInfo);
    console.log("access token", response.data.at);
    console.log("refresh token", response.data.rt);
    const things = await client.device.getAllThings();

    // if (things.error === 0 && things.data.thingList.length > 0) {
    //   console.log("=== 设备信息 ===");
    //   things.data.thingList.forEach((device, index) => {
    //     console.log(device);

    //     const deviceData = device.itemData;
    //     const params = deviceData.params;
    //     const uiid = deviceData.extra?.uiid;
    //     const productModel = deviceData.productModel;

    //     console.log(`\n设备 ${index + 1}:`);
    //     console.log(`  名称: ${deviceData.name}`);
    //     console.log(`  品牌: ${deviceData.brandName}`);
    //     console.log(`  型号: ${deviceData.productModel}`);
    //     console.log(`  UIID: ${uiid}`);
    //     console.log(`  在线状态: ${deviceData.online ? "在线" : "离线"}`);

    //     if (params) {
    //       // 根据设备类型输出相应参数
    //       if (productModel === "MideaConditioner") {
    //         // 美的空调
    //         console.log("  === 空调参数 ===");
    //         console.log(`  电源: ${params.power === "on" ? "开启" : "关闭"}`);
    //         console.log(`  模式: ${getModeText(params.mode)}`);
    //         console.log(`  设定温度: ${params.temperature}°C`);
    //         console.log(`  室内温度: ${params.indoor_temperature}°C`);
    //         console.log(`  室内湿度: ${params.indoor_humidity}%`);
    //         console.log(`  风速: ${params.wind_speed}`);
    //         console.log(`  节能模式: ${params.eco === "on" ? "开启" : "关闭"}`);
    //         console.log(
    //           `  省电模式: ${params.power_saving === "on" ? "开启" : "关闭"}`
    //         );
    //         console.log(
    //           `  新风: ${params.fresh_air === "on" ? "开启" : "关闭"}`
    //         );
    //         console.log(
    //           `  屏幕显示: ${params.screen_display_now === "on" ? "开启" : "关闭"}`
    //         );
    //         console.log(`  PTC加热: ${params.ptc === "on" ? "开启" : "关闭"}`);
    //         console.log(
    //           `  防直吹: ${params.prevent_straight_wind ? "开启" : "关闭"}`
    //         );
    //         console.log(
    //           `  自清洁: ${params.self_clean === "on" ? "开启" : "关闭"}`
    //         );
    //         console.log(`  除湿: ${params.dry === "on" ? "开启" : "关闭"}`);
    //       } else if (
    //         productModel?.includes("Switch") ||
    //         [1, 6, 14].includes(uiid)
    //       ) {
    //         // 开关类设备
    //         console.log("  === 开关参数 ===");
    //         console.log(
    //           `  开关状态: ${params.switch === "on" ? "开启" : "关闭"}`
    //         );
    //         if (params.switches) {
    //           params.switches.forEach((sw, i) => {
    //             console.log(
    //               `  开关${i + 1}: ${sw.switch === "on" ? "开启" : "关闭"}`
    //             );
    //           });
    //         }
    //       } else if (
    //         productModel?.includes("Light") ||
    //         [22, 59].includes(uiid)
    //       ) {
    //         // 灯具类设备
    //         console.log("  === 灯具参数 ===");
    //         console.log(
    //           `  开关状态: ${params.switch === "on" ? "开启" : "关闭"}`
    //         );
    //         if (params.bright) console.log(`  亮度: ${params.bright}%`);
    //         if (params.colorR !== undefined) {
    //           console.log(
    //             `  颜色: RGB(${params.colorR}, ${params.colorG}, ${params.colorB})`
    //           );
    //         }
    //       } else if (
    //         productModel?.includes("Sensor") ||
    //         [102, 104].includes(uiid)
    //       ) {
    //         // 传感器类设备
    //         console.log("  === 传感器参数 ===");
    //         if (params.temperature)
    //           console.log(`  温度: ${params.temperature}°C`);
    //         if (params.humidity) console.log(`  湿度: ${params.humidity}%`);
    //         if (params.battery) console.log(`  电量: ${params.battery}%`);
    //       } else {
    //         // 通用设备参数
    //         console.log("  === 通用参数 ===");
    //         Object.keys(params).forEach((key) => {
    //           if (typeof params[key] !== "object") {
    //             console.log(`  ${key}: ${params[key]}`);
    //           }
    //         });
    //       }
    //     }
    //   });
    // } else {
    //   console.log("未找到设备或获取失败");
    // }

    // 控制设备
    const th_res = await client.device.setThingStatus({
      type: 1,
      id: "ab7003ddfe",
      params: {
        total_status_switch: 1, // 总电源开关: 1=开机, 0=关机
        power: "on", // 功能电源: "on" 开机, "off" 关机
        mode: "cool", // 模式: cool=制冷, heat=制热, dry=除湿, fan=送风, auto=自动
        temperature: 26, // 温度设置 (单位: ℃)
        wind_speed: 102, // 风速: 40=低风, 80=中风, 102=自动
        wind_swing_ud: "on", // 上下扫风: "on" 开启, "off" 关闭
        wind_swing_lr: "off", // 左右扫风: "on" 开启, "off" 关闭
        eco: "off", // 节能模式: "on" 开启, "off" 关闭
        comfort_sleep: "off", // 舒适睡眠模式
        ptc: "off", // 辅热 (制热时)
        jet_cool: "off", // 强力制冷
        indoor_temperature: 24.3, // 室内温度 (只读)
        indoor_humidity: 30, // 室内湿度 (只读)
        error_code: 0, // 故障码 (0=正常)
      },
    });

    console.log(th_res);

    // 辅助函数：获取空调模式文本
    function getModeText(mode) {
      const modeMap = {
        cool: "制冷",
        heat: "制热",
        dry: "除湿",
        wind: "送风",
        auto: "自动",
      };
      return modeMap[mode] || mode || "未知";
    }
  } catch (err) {
    console.log("Failed to get user information:", err.message);
  }
}

main();
