import axios from "axios";
import urlApi from "../urlApi";
import Iron from '../img/meterials/crud/iron.webp';
import Silver from '../img/meterials/crud/silver.webp';
import Gold from '../img/meterials/crud/gold.webp';
import Diamond from '../img/meterials/crud/diamond.webp';
import Ice from '../img/meterials/crud/ice.webp';
import Petroleum from '../img/meterials/crud/petroleum.webp';

import Iron_bar from '../img/meterials/refined/iron_bar.webp';
import Silver_bar from '../img/meterials/refined/silver_bar.webp';
import Gold_bar from '../img/meterials/refined/gold_bar.webp';
import Cut_diamond from '../img/meterials/refined/cut_diamond.webp';
import Ice_bar from '../img/meterials/refined/ice_bar.webp';
import Oil from '../img/meterials/refined/oil.webp';

const envioVentaAlBackend = async (material, ammount, wallet, gemPrice, Toast) => {
    let img = ""
    if (material === "Iron")
        img = Iron
    if (material === "Silver")
        img = Silver
    if (material === "Gold")
        img = Gold
    if (material === "Diamond")
        img = Diamond
    if (material === "Ice")
        img = Ice
    if (material === "Petroleum")
        img = Petroleum
    if (material === "Ironbar")
        img = Iron_bar
    if (material === "Silverbar")
        img = Silver_bar
    if (material === "Goldbar")
        img = Gold_bar
    if (material === "Cutdiamond")
        img = Cut_diamond
    if (material === "Icebar")
        img = Ice_bar
    if (material === "Oil")
        img = Oil

    if (ammount > 0 && gemPrice > 0) {
        const res = await axios.put(urlApi + "/api/v1/sellMaterials", {
            material, ammount, wallet, price: gemPrice, timeSell: Date.now(), img
        })
        Toast(1, res.data.msg)
        console.log(res.data)
        return true
    } else {
        Toast(0, "Price or Material in 0")
        return false
    }
}

export default envioVentaAlBackend